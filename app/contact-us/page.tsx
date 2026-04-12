import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";
import ContactHero from "../_components/sections/contact/ContactHero";
import ContactForm from "../_components/sections/contact/ContactForm";
import ContactMap from "../_components/sections/contact/ContactMap";

export const metadata: Metadata = {
  title: "Contact Us – The Gujarati Designer",
  description:
    "Get in touch with The Gujarati Designer. Call, email, or visit us in Ahmedabad, Gujarat.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactMap />
      </main>
      <Footer />
    </>
  );
}
