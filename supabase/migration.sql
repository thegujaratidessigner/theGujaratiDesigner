-- Run this in Supabase Dashboard → SQL Editor

create table if not exists kv_store (
  key        text        primary key,
  value      jsonb       not null,
  updated_at timestamptz not null default now()
);

-- Enable RLS and restrict to service role only (bypasses RLS by design)
alter table kv_store enable row level security;
-- No client-side policies needed: only the service role key (server-side) accesses this table

-- Storage bucket for uploaded portfolio images (run once; idempotent)
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

-- Allow public reads on the portfolio bucket
drop policy if exists "portfolio_public_read" on storage.objects;
create policy "portfolio_public_read"
  on storage.objects for select
  using (bucket_id = 'portfolio');

-- Allow service role to upload
drop policy if exists "portfolio_service_insert" on storage.objects;
create policy "portfolio_service_insert"
  on storage.objects for insert
  with check (bucket_id = 'portfolio');

-- Rate limiting table (replaces in-memory Map — works across serverless instances)
create table if not exists rate_limits (
  key        text        primary key,
  count      int         not null default 1,
  reset_at   timestamptz not null
);

alter table rate_limits enable row level security;
-- Service role bypasses RLS; no anon/authenticated policies needed

-- Atomic rate-limit increment — eliminates the TOCTOU race condition
create or replace function rate_limit_hit(
  p_key      text,
  p_limit    int,
  p_window_ms bigint
) returns boolean language plpgsql security definer as $$
declare
  v_count  int;
  v_now    timestamptz := now();
  v_reset  timestamptz := v_now + (p_window_ms * interval '1 millisecond');
begin
  insert into rate_limits (key, count, reset_at)
  values (p_key, 1, v_reset)
  on conflict (key) do update
    set
      count    = case when rate_limits.reset_at <= v_now then 1 else rate_limits.count + 1 end,
      reset_at = case when rate_limits.reset_at <= v_now then v_reset else rate_limits.reset_at end
  returning count into v_count;
  return v_count <= p_limit;
end;
$$;

-- Auto-clean expired rows so the table stays small
create or replace function prune_rate_limits() returns trigger language plpgsql as $$
begin
  delete from rate_limits where reset_at <= now();
  return null;
end;
$$;

drop trigger if exists trg_prune_rate_limits on rate_limits;
create trigger trg_prune_rate_limits
  after insert on rate_limits
  execute procedure prune_rate_limits();
