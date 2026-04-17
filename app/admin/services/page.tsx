import AdminNav from "../_components/AdminNav";
import { readData } from "@/lib/db";
import type { ServiceItem } from "../../_components/sections/Services";
import ServicesManager from "./_client";

export default async function ServicesPage() {
  const services = await readData<ServiceItem[]>("services.json");
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Services</h1>
            <p className="text-sm text-white/40 mt-1">
              Manage the service cards displayed on the home page.
            </p>
          </div>
          <ServicesManager initialServices={services} />
        </div>
      </main>
    </div>
  );
}
