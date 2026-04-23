import AdminNav from "../_components/AdminNav";
import { readDataOr } from "@/lib/db";
import type { FaqItem } from "@/app/api/faq/route";
import FaqManager from "./_client";

const DEFAULT: FaqItem[] = [];

export default async function FaqPage() {
  const items = await readDataOr<FaqItem[]>("faq.json", DEFAULT);
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">FAQ</h1>
            <p className="text-sm text-white/40 mt-1">Manage frequently asked questions shown on the home page.</p>
          </div>
          <FaqManager initial={items} />
        </div>
      </main>
    </div>
  );
}
