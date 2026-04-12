import type { Metadata } from "next";
import Navbar from "../../_components/Navbar";
import Footer from "../../_components/sections/Footer";
import WebsitePortfolioSection from "../../_components/sections/portfolio/WebsitePortfolio";

export const metadata: Metadata = {
  title: "Website Portfolio – The Gujarati Designer",
  description:
    "Explore our website portfolio — UI/UX design, web development, e-commerce, and SEO-optimised websites by The Gujarati Designer.",
};

export default function WebsitePortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <WebsitePortfolioSection />
      </main>
      <Footer />
    </>
  );
}
