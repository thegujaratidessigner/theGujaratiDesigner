import AdminNav from "../_components/AdminNav";
import { readData } from "@/lib/db";
import type { StatItem } from "@/app/api/stats/route";
import StatsManager from "./_client";

export default async function StatsPage() {
  const stats = await readData<StatItem[]>("stats.json");
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Hero Stats</h1>
            <p className="text-sm text-white/40 mt-1">
              Edit the numbers shown on the hero section of the home page.
            </p>
          </div>
          <StatsManager initialStats={stats} />
        </div>
      </main>
    </div>
  );
}
