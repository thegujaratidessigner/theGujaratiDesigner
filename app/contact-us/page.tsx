export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";
import ContactHero from "../_components/sections/contact/ContactHero";
import ContactForm from "../_components/sections/contact/ContactForm";
import ContactMap from "../_components/sections/contact/ContactMap";
import { readDataOr } from "@/lib/db";
import type { ContactSettings } from "../api/contact-settings/route";
import type { FooterLinks } from "../api/footer-links/route";

const DEFAULT_MAPS = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.64624749428!2d72.4166!3d23.0204978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1681000000000!5m2!1sen!2sin";

export const metadata: Metadata = {
  title: "Contact Us – The Gujarati Designer",
  description: "Get in touch with The Gujarati Designer. Call, email, or visit us in Ahmedabad, Gujarat.",
};

export default async function ContactPage() {
  const [contact, footerLinks] = await Promise.allSettled([
    readDataOr<ContactSettings>("contact-settings.json", { mapsEmbedUrl: DEFAULT_MAPS }),
    readDataOr<FooterLinks>("footer-links.json", {}),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <ContactHero />
        <ContactForm />
        <ContactMap mapsEmbedUrl={contact.status === "fulfilled" ? contact.value.mapsEmbedUrl : DEFAULT_MAPS} />
      </main>
      <Footer footerLinks={footerLinks.status === "fulfilled" ? footerLinks.value : {}} />
    </>
  );
}
