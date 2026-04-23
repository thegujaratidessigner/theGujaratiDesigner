import AdminNav from "../_components/AdminNav";
import { readDataOr } from "@/lib/db";
import type { FounderData } from "@/app/api/founder/route";
import type { Highlight } from "@/app/api/about-highlights/route";
import type { ValueItem } from "@/app/api/about-values/route";
import AboutContentManager from "./_client";

const DEFAULT_FOUNDER: FounderData = { name: "Kunal Thacker", role: "Founder & Director", bio: [], skills: [] };

export default async function AboutContentPage() {
  const [founder, highlights, values] = await Promise.all([
    readDataOr<FounderData>("founder.json", DEFAULT_FOUNDER),
    readDataOr<Highlight[]>("about-highlights.json", []),
    readDataOr<ValueItem[]>("about-values.json", []),
  ]);

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">About Content</h1>
            <p className="text-sm text-white/40 mt-1">Manage founder profile, about highlights, and brand values.</p>
          </div>
          <AboutContentManager founder={founder} highlights={highlights} values={values} />
        </div>
      </main>
    </div>
  );
}
