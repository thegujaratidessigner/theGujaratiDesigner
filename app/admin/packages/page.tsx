import AdminNav from "../_components/AdminNav";
import { readData } from "@/lib/db";
import type { PackagesData } from "../../_components/sections/services/ServicesPricing";
import PackagesManager from "./_client";

export default async function PackagesPage() {
  const packages = await readData<PackagesData>("packages.json");
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Packages & Pricing</h1>
            <p className="text-sm text-white/40 mt-1">
              Manage all pricing packages — logo, combo, website, social media, and add-on services.
            </p>
          </div>
          <PackagesManager initialPackages={packages} />
        </div>
      </main>
    </div>
  );
}
