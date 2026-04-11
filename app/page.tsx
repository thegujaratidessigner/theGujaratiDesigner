import Navbar from "./_components/Navbar";
import Hero from "./_components/sections/Hero";
import About from "./_components/sections/About";
import Services from "./_components/sections/Services";
import CTABanner from "./_components/sections/CTABanner";
import FAQ from "./_components/sections/FAQ";
import Testimonials from "./_components/sections/Testimonials";
import Footer from "./_components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <CTABanner />
        <FAQ />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
