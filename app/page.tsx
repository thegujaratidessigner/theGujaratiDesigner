import Navbar from "./_components/Navbar";
import Hero from "./_components/sections/Hero";
import About from "./_components/sections/About";
import Portfolio from "./_components/sections/Portfolio";
import Services from "./_components/sections/Services";
import CTABanner from "./_components/sections/CTABanner";
import FAQ from "./_components/sections/FAQ";
import Testimonials from "./_components/sections/Testimonials";
import Footer from "./_components/sections/Footer";
import SectionContainer from "./_components/SectionContainer";
import CurtainReveal from "./_components/CurtainReveal";
import { readData } from "@/lib/db";
import { fetchGoogleReviews } from "@/lib/reviews";
import type { FeaturedProject } from "./_components/sections/Portfolio";
import type { ServiceItem } from "./_components/sections/Services";

export default async function Home() {
  const [featured, services, reviews] = await Promise.all([
    readData<FeaturedProject[]>("featured.json"),
    readData<ServiceItem[]>("services.json"),
    fetchGoogleReviews(),
  ]);

  return (
    <>
      <CurtainReveal />
      <Navbar />

      <main>
        <Hero />

        <SectionContainer>
          <About />
        </SectionContainer>

        <Portfolio featured={featured} />

        <SectionContainer>
          <Services services={services} />
        </SectionContainer>

        <SectionContainer>
          <CTABanner />
        </SectionContainer>

        <SectionContainer>
          <FAQ />
        </SectionContainer>

        <SectionContainer>
          <Testimonials reviews={reviews} />
        </SectionContainer>
      </main>

      <SectionContainer>
        <Footer />
      </SectionContainer>
    </>
  );
}
