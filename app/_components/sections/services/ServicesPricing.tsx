"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type PackageItem = {
  id: string;
  name: string;
  price: number | null;
  description: string;
  features: string[];
  popular: boolean;
  featured: boolean;
  accent: string;
  startingFrom: boolean;
  duration: string;
};

export type AddonServiceItem = {
  id: string;
  name: string;
  price: number | null;
  unit: string;
};

export type AddonData = {
  services: AddonServiceItem[];
  stationary: AddonServiceItem[];
  product: AddonServiceItem[];
};

export type PackagesData = {
  logo: PackageItem[];
  combo: PackageItem[];
  website: PackageItem[];
  social: PackageItem[];
  addon: AddonData;
};

/* ─── Static category config ────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "logo", label: "Logo Design", icon: "✦" },
  { id: "combo", label: "Combo Packages", icon: "⬡" },
  { id: "website", label: "Website Design", icon: "⬛" },
  { id: "social", label: "Social Media", icon: "◉" },
  { id: "other", label: "Add-on Services", icon: "◈" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

/* ─── Package Card ──────────────────────────────────────────────────────── */

function PackageCard({ name, price, description, features, popular, featured, accent, startingFrom, duration, index }: PackageItem & { index: number }) {
  const priceText = price != null ? `₹${price.toLocaleString("en-IN")}` : "custom pricing";
  const waText = encodeURIComponent(`Hi, I'm interested in the *${name}* package (${priceText}). Could you share more details?`);
  const waHref = `https://wa.me/919797798984?text=${waText}`;

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

      {(popular || featured) && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      )}

      <div className="p-7 flex flex-col flex-1 gap-5">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-syne)" }}>
            {name}
          </h3>
          <div className="flex items-end gap-1">
            {startingFrom && <span className="text-muted text-sm mb-1">from</span>}
            <span className="text-4xl font-extrabold" style={{ fontFamily: "var(--font-syne)", color: accent }}>
              {price != null ? `₹${price.toLocaleString("en-IN")}` : "—"}
            </span>
            {duration && <span className="text-muted text-sm mb-1">{duration}</span>}
          </div>
          <p className="text-muted text-xs mt-2 leading-relaxed">{description}</p>
        </div>

        <div className="border-t border-[var(--border-color)]" />

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

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-auto w-full py-3.5 rounded-2xl text-sm font-semibold text-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
            featured
              ? "bg-gradient-to-r from-[#a855f7] to-[#ec4899] text-white shadow-[0_0_24px_rgba(168,85,247,0.35)]"
              : popular
              ? "bg-[#7c3aed] text-white hover:bg-[#6d28d9]"
              : "border border-[var(--border-color)] text-foreground hover:border-foreground/20 hover:bg-[var(--card-bg-hover)]"
          }`}
        >
          Get Started →
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Addon Table ───────────────────────────────────────────────────────── */

function AddonTable({ title, items, accent, index }: { title: string; items: AddonServiceItem[]; accent: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden"
    >
      <div className="px-7 py-5 border-b border-[var(--border-color)]" style={{ background: `${accent}08` }}>
        <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "var(--font-syne)", color: accent }}>
          {title}
        </h3>
      </div>
      <div className="divide-y divide-[var(--border-color)]">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-7 py-4 group hover:bg-[var(--card-bg-hover)] transition-colors">
            <span className="text-sm text-foreground">{item.name}</span>
            <div className="flex items-center gap-1">
              {item.price != null ? (
                <>
                  <span className="text-sm font-bold" style={{ color: accent }}>
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  {item.unit && <span className="text-xs text-muted">{item.unit}</span>}
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

/* ─── Main Component ────────────────────────────────────────────────────── */

export default function ServicesPricing({ packages, initialTab = "logo" }: { packages: PackagesData; initialTab?: CategoryId }) {
  const [activeTab, setActiveTab] = useState<CategoryId>(initialTab);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const getPackages = (): PackageItem[] => {
    switch (activeTab) {
      case "logo": return packages.logo;
      case "combo": return packages.combo;
      case "website": return packages.website;
      case "social": return packages.social;
      default: return [];
    }
  };

  return (
    <section ref={ref} id="pricing" className="py-16 pb-32 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
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

        <div id="logo" className="absolute" style={{ marginTop: "-100px" }} />
        <div id="combo" />
        <div id="website" />
        <div id="social" />
        <div id="other" />

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
                <PackageCard key={pkg.id} {...pkg} index={i} />
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
              <AddonTable title="Marketing & Creative Services" items={packages.addon.services} accent="#a855f7" index={0} />
              <AddonTable title="Stationery Designs" items={packages.addon.stationary} accent="#ec4899" index={1} />
              <AddonTable title="Product & Packaging Design" items={packages.addon.product} accent="#f59e0b" index={2} />
            </motion.div>
          )}
        </AnimatePresence>

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
