import AdminNav from "../_components/AdminNav";
import { readDataOr } from "@/lib/db";
import type { HeroSettings } from "@/app/api/hero-settings/route";
import type { CtaSettings } from "@/app/api/cta/route";
import type { ContactSettings } from "@/app/api/contact-settings/route";
import type { FooterLinks } from "@/app/api/footer-links/route";
import SiteSettingsManager from "./_client";

const DEFAULT_HERO: HeroSettings = { rotatingWords: ["Convert", "Inspire", "Dominate", "Captivate"] };
const DEFAULT_CTA: CtaSettings = { headline: "Ready to Build a Brand That Converts?", subtext: "", buttonText: "Start Your Project", buttonHref: "/contact-us" };
const DEFAULT_CONTACT: ContactSettings = { mapsEmbedUrl: "" };
const DEFAULT_FOOTER: FooterLinks = {};

export default async function SiteSettingsPage() {
  const [hero, cta, contact, footerLinks] = await Promise.all([
    readDataOr<HeroSettings>("hero-settings.json", DEFAULT_HERO),
    readDataOr<CtaSettings>("cta.json", DEFAULT_CTA),
    readDataOr<ContactSettings>("contact-settings.json", DEFAULT_CONTACT),
    readDataOr<FooterLinks>("footer-links.json", DEFAULT_FOOTER),
  ]);

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Site Settings</h1>
            <p className="text-sm text-white/40 mt-1">Manage hero words, CTA banner, contact map, and footer links.</p>
          </div>
          <SiteSettingsManager hero={hero} cta={cta} contact={contact} footerLinks={footerLinks} />
        </div>
      </main>
    </div>
  );
}
