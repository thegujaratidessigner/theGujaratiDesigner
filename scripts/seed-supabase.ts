/**
 * One-time seed: uploads all local data/*.json files into Supabase kv_store.
 * Run with:  npx tsx scripts/seed-supabase.ts
 * Requires .env.local to have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const DATA_DIR = join(process.cwd(), "data");

const FILES = [
  "featured.json",
  "packages.json",
  "projects-graphics.json",
  "projects-website.json",
  "services.json",
  "stats.json",
];

async function seed() {
  for (const filename of FILES) {
    const key = filename.replace(".json", "");
    const value = JSON.parse(readFileSync(join(DATA_DIR, filename), "utf-8"));

    const { error } = await supabase
      .from("kv_store")
      .upsert({ key, value, updated_at: new Date().toISOString() });

    if (error) {
      console.error(`✗ ${key}:`, error.message);
    } else {
      console.log(`✓ ${key}`);
    }
  }
}

seed().catch(console.error);
