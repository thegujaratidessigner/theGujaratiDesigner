import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";
import ServicesHero from "../_components/sections/services/ServicesHero";
import ServicesPricing from "../_components/sections/services/ServicesPricing";
import { readData } from "@/lib/db";
import type { PackagesData } from "../_components/sections/services/ServicesPricing";

export const metadata: Metadata = {
  title: "Services & Pricing – The Gujarati Designer",
  description:
    "Explore transparent pricing for logo design, website development, social media management, branding combo packages and more. Starting from ₹399.",
};

export default async function ServicesPage() {
  const packages = await readData<PackagesData>("packages.json");

  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesPricing packages={packages} />
      </main>
      <Footer />
    </>
  );
}
