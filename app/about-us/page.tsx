export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";
import AboutHero from "../_components/sections/about/AboutHero";
import AboutFounder from "../_components/sections/about/AboutFounder";
import AboutStats from "../_components/sections/about/AboutStats";
import AboutValues from "../_components/sections/about/AboutValues";
import { readDataOr, readData } from "@/lib/db";
import type { FounderData } from "../api/founder/route";
import type { ValueItem } from "../api/about-values/route";
import type { FooterLinks } from "../api/footer-links/route";
import type { StatItem } from "../api/stats/route";

const DEFAULT_FOUNDER: FounderData = {
  name: "Kunal Thacker",
  role: "Founder & Director",
  bio: [
    "Kunal Thacker is the Founder & Director of The Gujarati Designer, a globally serving creative design studio based in Ahmedabad. With a strong vision for building powerful brands and years of hands-on industry experience, he leads the studio with a focus on quality, strategy, and creative excellence.",
    "Under his leadership, The Gujarati Designer has grown into a trusted name for branding, logo design, graphic design, website development, and digital creative solutions. His approach is deeply rooted in understanding the client's business goals and crafting designs that deliver real, measurable results.",
  ],
  skills: ["Brand Strategy", "Logo Design", "Visual Identity", "Web Design", "Creative Direction", "Digital Marketing"],
};

export const metadata: Metadata = {
  title: "About Us – The Gujarati Designer",
  description: "Learn about The Gujarati Designer — a globally serving creative design studio founded in 2018 by Kunal Thacker, based in Ahmedabad, India.",
};

export default async function AboutPage() {
  const [founder, values, footerLinks, stats] = await Promise.allSettled([
    readDataOr<FounderData>("founder.json", DEFAULT_FOUNDER),
    readDataOr<ValueItem[]>("about-values.json", []),
    readDataOr<FooterLinks>("footer-links.json", {}),
    readData<StatItem[]>("stats.json"),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <AboutHero stats={stats.status === "fulfilled" ? stats.value : []} />
        <AboutFounder founder={founder.status === "fulfilled" ? founder.value : DEFAULT_FOUNDER} />
        <AboutValues values={values.status === "fulfilled" ? values.value : []} />
        <AboutStats stats={stats.status === "fulfilled" ? stats.value : []} />
      </main>
      <Footer footerLinks={footerLinks.status === "fulfilled" ? footerLinks.value : {}} />
    </>
  );
}
