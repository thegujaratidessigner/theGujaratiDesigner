import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "./supabase";

const ALLOWED_KEYS = new Set([
  "projects-website", "projects-graphics", "services", "featured",
  "packages", "stats", "faq", "testimonials", "founder", "cta",
  "hero-settings", "contact-settings", "footer-links",
  "about-highlights", "about-values",
]);

export async function readData<T>(filename: string): Promise<T> {
  noStore();
  const key = filename.replace(".json", "");
  if (!ALLOWED_KEYS.has(key)) throw new Error(`Invalid key: "${key}"`);
  const { data, error } = await supabase
    .from("kv_store")
    .select("value")
    .eq("key", key)
    .single();

  if (error || !data) {
    throw new Error(`Failed to read "${key}": ${error?.message ?? "no data"}`);
  }
  return data.value as T;
}

export async function readDataOr<T>(filename: string, fallback: T): Promise<T> {
  try {
    return await readData<T>(filename);
  } catch {
    return fallback;
  }
}

export async function writeData<T>(filename: string, value: T): Promise<void> {
  const key = filename.replace(".json", "");
  if (!ALLOWED_KEYS.has(key)) throw new Error(`Invalid key: "${key}"`);
  const { error } = await supabase
    .from("kv_store")
    .upsert({ key, value, updated_at: new Date().toISOString() });

  if (error) {
    throw new Error(`Failed to write "${key}": ${error.message}`);
  }
}

export function generateId(): string {
  return crypto.randomUUID();
}
