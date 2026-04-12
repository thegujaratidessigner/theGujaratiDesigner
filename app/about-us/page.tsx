import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";
import AboutHero from "../_components/sections/about/AboutHero";
import AboutFounder from "../_components/sections/about/AboutFounder";
import AboutStats from "../_components/sections/about/AboutStats";
import AboutValues from "../_components/sections/about/AboutValues";

export const metadata: Metadata = {
  title: "About Us – The Gujarati Designer",
  description:
    "Learn about The Gujarati Designer — a globally serving creative design studio founded in 2018 by Kunal Thacker, based in Ahmedabad, India.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <AboutFounder />
        <AboutValues />
        <AboutStats />
      </main>
      <Footer />
    </>
  );
}
