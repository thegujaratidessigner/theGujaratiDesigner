export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";
import ServicesHero from "../_components/sections/services/ServicesHero";
import ServicesPricing from "../_components/sections/services/ServicesPricing";
import { readData, readDataOr } from "@/lib/db";
import type { PackagesData } from "../_components/sections/services/ServicesPricing";
import type { FooterLinks } from "../api/footer-links/route";

export const metadata: Metadata = {
  title: "Services & Pricing – The Gujarati Designer",
  description:
    "Explore transparent pricing for logo design, website development, social media management, branding combo packages and more. Starting from ₹399.",
};

const VALID_TABS = ["logo", "combo", "website", "social", "other"] as const;
type TabId = (typeof VALID_TABS)[number];

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab: TabId = VALID_TABS.includes(tab as TabId) ? (tab as TabId) : "logo";

  const [packages, footerLinks] = await Promise.allSettled([
    readData<PackagesData>("packages.json"),
    readDataOr<FooterLinks>("footer-links.json", {}),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <ServicesHero />
        <ServicesPricing
          packages={packages.status === "fulfilled" ? packages.value : { logo: [], combo: [], website: [], social: [], addon: { services: [], stationary: [], product: [] } }}
          initialTab={initialTab}
        />
      </main>
      <Footer footerLinks={footerLinks.status === "fulfilled" ? footerLinks.value : {}} />
    </>
  );
}
