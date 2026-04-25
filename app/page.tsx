export const dynamic = "force-dynamic";

import Navbar from "./_components/Navbar";
import Hero from "./_components/sections/Hero";
import About from "./_components/sections/About";
import Portfolio from "./_components/sections/Portfolio";
import Services from "./_components/sections/Services";
import CTABanner from "./_components/sections/CTABanner";
import FAQ from "./_components/sections/FAQ";
import Testimonials from "./_components/sections/Testimonials";
import ContactForm from "./_components/sections/contact/ContactForm";
import Footer from "./_components/sections/Footer";
import SectionContainer from "./_components/SectionContainer";
import CurtainReveal from "./_components/CurtainReveal";
import { readData, readDataOr } from "@/lib/db";
import type { Testimonial } from "./api/testimonials/route";
import type { FeaturedProject } from "./_components/sections/Portfolio";
import type { ServiceItem } from "./_components/sections/Services";
import type { StatItem } from "./api/stats/route";
import type { FaqItem } from "./api/faq/route";
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "1", author: "Mehul Shah", rating: 5, time: "", photoUrl: "", text: "The Gujarati Designer helped build my brand from scratch. Their team understood my vision and created a unique brand identity and website that perfectly fits my business. Highly recommended!" },
  { id: "2", author: "Viral Desai", rating: 5, time: "", photoUrl: "", text: "The Gujarati Designer is not just a logo designer — they are a complete branding and digital marketing solution provider. Their strategy-driven approach makes a real difference." },
  { id: "3", author: "Rina Patel", rating: 5, time: "", photoUrl: "", text: "Their website design and UI/UX skills are excellent. The website they developed for us is modern, responsive, and optimised for SEO and conversions." },
];
import type { Highlight } from "./api/about-highlights/route";
import type { HeroSettings } from "./api/hero-settings/route";
import type { CtaSettings } from "./api/cta/route";
import type { FooterLinks } from "./api/footer-links/route";

const DEFAULT_HERO: HeroSettings = { rotatingWords: ["Convert", "Inspire", "Dominate", "Captivate"] };
const DEFAULT_CTA: CtaSettings = { headline: "Unique & Trendy Design Approach — Let's Talk.", subtext: "", buttonText: "Contact Us", buttonHref: "#contact" };
const DEFAULT_HIGHLIGHTS: Highlight[] = [
  { id: "1", label: "Founded", value: "2018" },
  { id: "2", label: "Based in", value: "Ahmedabad" },
  { id: "3", label: "Serving", value: "Global" },
  { id: "4", label: "Founder", value: "Kunal Thacker" },
];
const DEFAULT_FAQS: FaqItem[] = [];
const DEFAULT_FOOTER: FooterLinks = {};

export default async function Home() {
  const [featured, services, testimonials, stats, heroSettings, cta, highlights, faqs, footerLinks] = await Promise.allSettled([
    readData<FeaturedProject[]>("featured.json"),
    readData<ServiceItem[]>("services.json"),
    readDataOr<Testimonial[]>("testimonials.json", DEFAULT_TESTIMONIALS),
    readData<StatItem[]>("stats.json"),
    readDataOr<HeroSettings>("hero-settings.json", DEFAULT_HERO),
    readDataOr<CtaSettings>("cta.json", DEFAULT_CTA),
    readDataOr<Highlight[]>("about-highlights.json", DEFAULT_HIGHLIGHTS),
    readDataOr<FaqItem[]>("faq.json", DEFAULT_FAQS),
    readDataOr<FooterLinks>("footer-links.json", DEFAULT_FOOTER),
  ]);

  return (
    <>
      <CurtainReveal />
      <Navbar />

      <main>
        <Hero
          stats={stats.status === "fulfilled" ? stats.value : []}
          heroSettings={heroSettings.status === "fulfilled" ? heroSettings.value : DEFAULT_HERO}
        />

        <SectionContainer>
          <About highlights={highlights.status === "fulfilled" ? highlights.value : DEFAULT_HIGHLIGHTS} />
        </SectionContainer>

        <SectionContainer>
          <Services services={services.status === "fulfilled" ? services.value : []} />
        </SectionContainer>

        <Portfolio featured={featured.status === "fulfilled" ? featured.value : []} />

        <SectionContainer>
          <CTABanner cta={cta.status === "fulfilled" ? cta.value : DEFAULT_CTA} />
        </SectionContainer>

        <SectionContainer>
          <FAQ faqs={faqs.status === "fulfilled" ? faqs.value : DEFAULT_FAQS} />
        </SectionContainer>

        <SectionContainer>
          <Testimonials testimonials={testimonials.status === "fulfilled" ? testimonials.value : DEFAULT_TESTIMONIALS} stats={stats.status === "fulfilled" ? stats.value : []} />
        </SectionContainer>

        <SectionContainer>
          <ContactForm />
        </SectionContainer>
      </main>

      <SectionContainer>
        <Footer footerLinks={footerLinks.status === "fulfilled" ? footerLinks.value : DEFAULT_FOOTER} />
      </SectionContainer>
    </>
  );
}
