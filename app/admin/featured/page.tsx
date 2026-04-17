import AdminNav from "../_components/AdminNav";
import { readData } from "@/lib/db";
import type { FeaturedProject } from "../../_components/sections/Portfolio";
import FeaturedManager from "./_client";

export default async function FeaturedPage() {
  const featured = await readData<FeaturedProject[]>("featured.json");
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Featured Projects</h1>
            <p className="text-sm text-white/40 mt-1">
              Manage the scroll-pinned panels shown on the home page. Up to 4 recommended.
            </p>
          </div>
          <FeaturedManager initialFeatured={featured} />
        </div>
      </main>
    </div>
  );
}
