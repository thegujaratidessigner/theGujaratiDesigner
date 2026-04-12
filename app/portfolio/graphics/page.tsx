import type { Metadata } from "next";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/sections/Footer";
import GraphicsPortfolioSection from "../../_components/sections/portfolio/GraphicsPortfolio";

export const metadata: Metadata = {
  title: "Graphics Portfolio – The Gujarati Designer",
  description:
    "Explore our graphics portfolio — logo design, brand identity, product design, packaging, and more by The Gujarati Designer.",
};

export default function GraphicsPortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <GraphicsPortfolioSection />
      </main>
      <Footer />
    </>
  );
}
