export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/sections/Footer";
import WebsitePortfolioSection from "../../_components/sections/portfolio/WebsitePortfolio";
import { readData, readDataOr } from "@/lib/db";
import type { WebsiteProject } from "../../_components/sections/portfolio/WebsitePortfolio";
import type { FooterLinks } from "../../api/footer-links/route";

export const metadata: Metadata = {
  title: "Website Portfolio – The Gujarati Designer",
  description:
    "Explore our website portfolio — UI/UX design, web development, e-commerce, and SEO-optimised websites by The Gujarati Designer.",
};

export default async function WebsitePortfolioPage() {
  const [projects, footerLinks] = await Promise.allSettled([
    readData<WebsiteProject[]>("projects-website.json"),
    readDataOr<FooterLinks>("footer-links.json", {}),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <WebsitePortfolioSection projects={projects.status === "fulfilled" ? projects.value : []} />
      </main>
      <Footer footerLinks={footerLinks.status === "fulfilled" ? footerLinks.value : {}} />
    </>
  );
}
