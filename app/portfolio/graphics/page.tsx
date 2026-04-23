export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/sections/Footer";
import GraphicsPortfolioSection from "../../_components/sections/portfolio/GraphicsPortfolio";
import { readData, readDataOr } from "@/lib/db";
import type { GraphicsProject } from "../../_components/sections/portfolio/GraphicsPortfolio";
import type { FooterLinks } from "../../api/footer-links/route";

export const metadata: Metadata = {
  title: "Graphics Portfolio – The Gujarati Designer",
  description:
    "Explore our graphics portfolio — logo design, brand identity, product design, packaging, and more by The Gujarati Designer.",
};

export default async function GraphicsPortfolioPage() {
  const [projects, footerLinks] = await Promise.allSettled([
    readData<GraphicsProject[]>("projects-graphics.json"),
    readDataOr<FooterLinks>("footer-links.json", {}),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <GraphicsPortfolioSection projects={projects.status === "fulfilled" ? projects.value : []} />
      </main>
      <Footer footerLinks={footerLinks.status === "fulfilled" ? footerLinks.value : {}} />
    </>
  );
}
