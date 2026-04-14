"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

/* ─── DATA ─────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "logo", label: "Logo Design", icon: "✦" },
  { id: "combo", label: "Combo Packages", icon: "⬡" },
  { id: "website", label: "Website Design", icon: "⬛" },
  { id: "social", label: "Social Media", icon: "◉" },
  { id: "other", label: "Add-on Services", icon: "◈" },
] as const;

type CategoryId = typeof CATEGORIES[number]["id"];

const LOGO_PACKAGES = [
  {
    name: "Standard",
    price: 499,
    description: "3 logo samples + 1 round of changes",
    features: ["3 unique logo concepts", "1 revision round", "PNG & JPG files", "Basic color palette"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "Premium",
    price: 999,
    description: "7 customised logo samples + 2-3 rounds of changes",
    features: ["7 unique logo concepts", "2–3 revision rounds", "PNG, JPG & SVG files", "Color + monochrome variants", "Brand color palette"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "Prime",
    price: 1999,
    description: "5 copyright free designs + 5 rounds of changes",
    features: ["5 copyright-free concepts", "5 revision rounds", "All file formats", "Copyright ownership", "Full brand colors"],
    popular: true,
    accent: "#a855f7",
  },
  {
    name: "Signature",
    price: 2999,
    description: "10 copyright free designs + satisfied round of changes",
    features: ["10 copyright-free concepts", "Unlimited revisions", "All file formats", "Copyright ownership", "Brand guidelines doc"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "TGD Special",
    price: 4999,
    description: "15 handmade designs, fully customizable until satisfaction",
    features: ["15 handcrafted designs", "Unlimited revisions", "All formats + source files", "Copyright ownership", "Full brand guidelines", "Priority support"],
    popular: false,
    accent: "#ec4899",
    featured: true,
  },
];

const COMBO_PACKAGES = [
  {
    name: "Pro",
    price: 899,
    description: "Standard logo design package + 3D intro video",
    features: ["Standard Logo Package", "3D intro video", "PNG & JPG delivery"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "Ultra",
    price: 1999,
    description: "Premium logo + visiting card + letterhead + 3D intro video",
    features: ["Premium Logo Package", "Visiting card design", "Letterhead design", "3D intro video"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "Gold",
    price: 2999,
    description: "Prime logo + visiting card + letterhead + envelope + HD video + invoice",
    features: ["Prime Logo Package", "Visiting card design", "Letterhead design", "Envelope design", "HD intro video", "Invoice design"],
    popular: true,
    accent: "#f59e0b",
  },
  {
    name: "Crown",
    price: 3999,
    description: "Signature logo + full stationery suite + HD video + invoice",
    features: ["Signature Logo Package", "Visiting card design", "Letterhead design", "Envelope design", "HD intro video", "Invoice design"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "Legacy",
    price: 6999,
    description: "TGD Special logo + full stationery + HD video + invoice + 5 custom posters",
    features: ["TGD Special Logo Package", "Visiting card design", "Letterhead design", "Envelope design", "HD intro video", "Invoice design", "5 custom poster designs"],
    popular: false,
    accent: "#ec4899",
    featured: true,
  },
];

const WEBSITE_PACKAGES = [
  {
    name: "WordPress + Elementor Pro",
    price: 9999,
    description: "5–10 pages fully responsive website",
    features: ["5–10 pages", "Fully responsive", "Full setup", "1 year free hosting", "Contact form", "Basic SEO"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "WordPress + WooCommerce",
    price: 14999,
    description: "8–10 pages e-commerce website with full setup",
    features: ["8–10 pages", "E-commerce ready", "Product management", "Payment gateway", "1 year free hosting", "Basic SEO"],
    popular: true,
    accent: "#a855f7",
  },
  {
    name: "Shopify Website",
    price: 19999,
    description: "8–10 pages Shopify store with full setup",
    features: ["8–10 pages", "Shopify theme customisation", "Payment integration", "Inventory management", "Full setup", "+ Shopify subscription charges"],
    popular: false,
    accent: "#ec4899",
  },
  {
    name: "HTML Coded Website",
    price: 35000,
    startingFrom: true,
    description: "Unlimited pages, custom design, unlimited hosting",
    features: ["Unlimited pages", "100% custom design", "Unlimited hosting", "Full setup", "Advanced SEO", "Blazing-fast performance"],
    popular: false,
    accent: "#f59e0b",
  },
  {
    name: "HTML E-Commerce",
    price: 80000,
    startingFrom: true,
    description: "Full custom e-commerce with smooth design and unlimited hosting",
    features: ["Unlimited products", "100% custom design", "Unlimited hosting", "Payment gateway", "Admin dashboard", "Advanced SEO + analytics"],
    popular: false,
    accent: "#ec4899",
    featured: true,
  },
];

const SOCIAL_PACKAGES = [
  {
    name: "Star-Ups",
    price: 5999,
    duration: "/ month",
    description: "Kickstart your social media presence",
    features: ["16 social media posts", "4 reels", "Design only"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "Basics",
    price: 9999,
    duration: "/ month",
    description: "Content + platform management for growing brands",
    features: ["20 social media posts", "5 reel edits", "2 platform handling", "Content calendar"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "Business Owners",
    price: 24999,
    duration: "/ month",
    description: "Professional reels with models + full management",
    features: ["10 reels shooting + editing", "10 posts", "2 platform handling", "Model included", "Monthly performance report"],
    popular: true,
    accent: "#ec4899",
  },
  {
    name: "Ready To Go",
    price: 34999,
    duration: "/ month",
    description: "Full-service management with guaranteed organic growth",
    features: ["15 reels shooting + editing", "15 posts", "2 platform handling", "Organic growth guaranteed", "Weekly performance reports"],
    popular: false,
    accent: "#a855f7",
  },
  {
    name: "TGD Special",
    price: 49999,
    duration: "/ month",
    description: "Elite package with meta ads + full growth strategy",
    features: ["20 reels shooting + editing", "20 posts", "2 platform handling", "Meta ad setup", "Weekly reports", "Growth strategy consultation"],
    popular: false,
    accent: "#ec4899",
    featured: true,
  },
];

const ADDON_SERVICES = {
  services: [
    { name: "Meta Ad Campaign", price: 4000, unit: "" },
    { name: "Reel Editing", price: 1500, unit: "" },
    { name: "Website SEO", price: null, unit: "" },
    { name: "Brochure Design", price: 499, unit: "/ page" },
    { name: "Flyer / Banner Design", price: 499, unit: "" },
    { name: "Certificate Design", price: 499, unit: "" },
  ],
  stationary: [
    { name: "Visiting Card Design", price: 399 },
    { name: "Letterhead Design", price: 299 },
    { name: "Invoice Design", price: 499 },
    { name: "Envelope Design", price: 399 },
  ],
  product: [
    { name: "Box Design", price: 3999 },
    { name: "Pouch Design", price: 2999 },
    { name: "Sticker / Label Design", price: 1499 },
  ],
};

/* ─── PACKAGE CARD ──────────────────────────────────────────────────────── */

function PackageCard({
  name, price, description, features, popular, featured, accent, startingFrom, duration,
  index,
}: {
  name: string; price: number; description: string; features: string[];
  popular?: boolean; featured?: boolean; accent: string;
  startingFrom?: boolean; duration?: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "border-[#a855f7]/50 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
          : popular
          ? "border-[var(--border-color)] shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          : "border-[var(--border-color)]"
      } bg-[var(--card-bg)]`}
    >
      {/* Popular badge */}
      {popular && !featured && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#7c3aed] text-white text-[10px] font-bold tracking-widest uppercase">
          Popular
        </div>
      )}
      {featured && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white text-[10px] font-bold tracking-widest uppercase">
          Best Value
        </div>
      )}

      {/* Top gradient line */}
      {(popular || featured) && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      )}

      <div className="p-7 flex flex-col flex-1 gap-5">
        {/* Name + price */}
        <div>
          <h3
            className="text-lg font-bold text-foreground mb-3"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {name}
          </h3>
          <div className="flex items-end gap-1">
            {startingFrom && (
              <span className="text-muted text-sm mb-1">from</span>
            )}
            <span
              className="text-4xl font-extrabold"
              style={{ fontFamily: "var(--font-syne)", color: accent }}
            >
              ₹{price?.toLocaleString("en-IN") ?? "—"}
            </span>
            {duration && (
              <span className="text-muted text-sm mb-1">{duration}</span>
            )}
          </div>
          <p className="text-muted text-xs mt-2 leading-relaxed">{description}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border-color)]" />

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
              <span
                className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${accent}20`, color: accent }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4L3 5.5L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact-us"
          className={`mt-auto w-full py-3.5 rounded-2xl text-sm font-semibold text-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            featured
              ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_0_24px_rgba(168,85,247,0.35)]"
              : popular
              ? "bg-[#7c3aed] text-white hover:bg-[#6d28d9]"
              : "border border-[var(--border-color)] text-foreground hover:border-foreground/20 hover:bg-[var(--card-bg-hover)]"
          }`}
        >
          Get Started →
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── ADDON TABLE ───────────────────────────────────────────────────────── */

function AddonTable({
  title, items, accent, index,
}: {
  title: string;
  items: { name: string; price: number | null; unit?: string }[];
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden"
    >
      <div
        className="px-7 py-5 border-b border-[var(--border-color)]"
        style={{ background: `${accent}08` }}
      >
        <h3
          className="text-base font-bold text-foreground"
          style={{ fontFamily: "var(--font-syne)", color: accent }}
        >
          {title}
        </h3>
      </div>
      <div className="divide-y divide-[var(--border-color)]">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between px-7 py-4 group hover:bg-[var(--card-bg-hover)] transition-colors">
            <span className="text-sm text-foreground">{item.name}</span>
            <div className="flex items-center gap-1">
              {item.price != null ? (
                <>
                  <span className="text-sm font-bold" style={{ color: accent }}>
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  {item.unit && (
                    <span className="text-xs text-muted">{item.unit}</span>
                  )}
                </>
              ) : (
                <span className="text-xs text-muted italic">Contact for pricing</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────── */

export default function ServicesPricing() {
  const [activeTab, setActiveTab] = useState<CategoryId>("logo");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const getPackages = () => {
    switch (activeTab) {
      case "logo": return LOGO_PACKAGES;
      case "combo": return COMBO_PACKAGES;
      case "website": return WEBSITE_PACKAGES;
      case "social": return SOCIAL_PACKAGES;
      default: return [];
    }
  };

  return (
    <section ref={ref} id="pricing" className="py-16 pb-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2 justify-center mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === cat.id
                  ? "bg-[#7c3aed] text-white shadow-[0_0_24px_rgba(124,58,237,0.4)]"
                  : "border border-[var(--border-color)] text-muted hover:text-foreground hover:border-foreground/20 bg-[var(--card-bg)]"
              }`}
            >
              <span className="text-xs">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Section anchors for navbar */}
        <div id="logo" className="absolute" style={{ marginTop: "-100px" }} />
        <div id="combo" />
        <div id="website" />
        <div id="social" />
        <div id="other" />

        {/* Package cards */}
        <AnimatePresence mode="wait">
          {activeTab !== "other" ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {getPackages().map((pkg, i) => (
                <PackageCard
                  key={pkg.name}
                  {...pkg}
                  features={pkg.features}
                  index={i}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="other"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-3 gap-6"
            >
              <AddonTable
                title="Marketing & Creative Services"
                items={ADDON_SERVICES.services}
                accent="#a855f7"
                index={0}
              />
              <AddonTable
                title="Stationery Designs"
                items={ADDON_SERVICES.stationary}
                accent="#ec4899"
                index={1}
              />
              <AddonTable
                title="Product & Packaging Design"
                items={ADDON_SERVICES.product}
                accent="#f59e0b"
                index={2}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 rounded-3xl border border-[#7c3aed]/30 bg-gradient-to-br from-[#7c3aed]/10 via-[var(--card-bg)] to-[#ec4899]/10 p-10 text-center"
        >
          <p className="text-muted text-sm tracking-widest uppercase font-semibold mb-3">Custom Requirements?</p>
          <h3
            className="text-2xl md:text-3xl font-extrabold text-foreground mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Not sure which plan fits?{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Let&apos;s talk.
            </span>
          </h3>
          <p className="text-muted text-sm max-w-md mx-auto mb-8">
            We&apos;ll understand your goals and recommend the right package — or build a custom one for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors shadow-[0_0_30px_rgba(124,58,237,0.35)]"
            >
              Contact Us →
            </Link>
            <a
              href="tel:+97977798984"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-[var(--border-color)] text-foreground text-sm font-semibold hover:border-foreground/20 transition-colors"
            >
              Call Us Directly
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
