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

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <SectionContainer>
          <About />
        </SectionContainer>

        <SectionContainer>
          <Portfolio />
        </SectionContainer>

        <SectionContainer>
          <Services />
        </SectionContainer>

        <SectionContainer>
          <CTABanner />
        </SectionContainer>

        <SectionContainer>
          <FAQ />
        </SectionContainer>

        <SectionContainer>
          <Testimonials />
        </SectionContainer>
      </main>

      <SectionContainer>
        <Footer />
      </SectionContainer>
    </>
  );
}
