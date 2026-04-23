import { supabase } from "./supabase";

/**
 * Atomically increment and check a rate-limit counter via Postgres RPC.
 * Returns true if the hit is allowed, false if the limit is exceeded.
 * Fails open (returns true) on DB errors to avoid locking out legitimate users.
 */
export async function hit(key: string, limit: number, windowMs: number): Promise<boolean> {
  const { data, error } = await supabase.rpc("rate_limit_hit", {
    p_key: key,
    p_limit: limit,
    p_window_ms: windowMs,
  });
  if (error) return true; // fail open — don't block on DB errors
  return data as boolean;
}

/** Extract a best-effort client IP from request headers. */
export function clientIp(headers: Headers): string {
  // On Vercel, x-vercel-forwarded-for is set by the platform and cannot be spoofed
  const vercel = headers.get("x-vercel-forwarded-for");
  if (vercel) return vercel.split(",")[0]?.trim() || "unknown";
  // Outside Vercel (dev / self-hosted), x-real-ip is set by a trusted reverse proxy
  return headers.get("x-real-ip")?.trim() || "unknown";
}
