// One-time script: adds `link` field to services stored in Supabase kv_store.
// Run with: node scripts/migrate-services-links.mjs

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://gfqordwtbwwmlbdqnwbt.supabase.co",
  "sb_secret_iJDjfY0sbBNSo-rtYKMuvQ_R6C5USxP"
);

const LINK_MAP = {
  "logo-graphic-design": "/services?tab=logo",
  "website-design-dev":  "/services?tab=website",
  "social-media-marketing": "/services?tab=social",
  "video-creation-editing": "",
};

const { data, error } = await supabase
  .from("kv_store")
  .select("value")
  .eq("key", "services")
  .single();

if (error || !data) {
  console.error("Failed to read services:", error?.message);
  process.exit(1);
}

const services = data.value;
console.log("Current services:", services.map((s) => s.id));

const updated = services.map((s) => ({
  ...s,
  link: LINK_MAP[s.id] ?? s.link ?? "",
}));

console.log("Updated links:", updated.map((s) => `${s.id} → "${s.link}"`));

const { error: writeError } = await supabase
  .from("kv_store")
  .upsert({ key: "services", value: updated, updated_at: new Date().toISOString() });

if (writeError) {
  console.error("Failed to write services:", writeError.message);
  process.exit(1);
}

console.log("✓ Services updated in Supabase successfully.");
