"use client";

import { motion } from "framer-motion";

const info = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.86a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16.92z"/>
      </svg>
    ),
    label: "Contact Phone Number",
    value: "+97977798984",
    href: "tel:+97977798984",
    accent: "#a855f7",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Our Email Address",
    value: "thegujaratidesigner@gmail.com",
    href: "mailto:thegujaratidesigner@gmail.com",
    accent: "#ec4899",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Our Location",
    value: "Ahmedabad – Gujarat",
    href: "https://maps.google.com/?q=Ahmedabad,Gujarat,India",
    accent: "#f59e0b",
  },
];

export default function ContactHero() {
  return (
    <section className="relative bg-background pt-32 pb-20 px-6 overflow-hidden">
      {/* Background orbs */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
            Contact Us
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Connect
            </span>{" "}
            With Us
          </h1>
        </motion.div>

        {/* Info cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {info.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-foreground/15 transition-all duration-300 overflow-hidden"
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
              />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30`, color: item.accent }}
              >
                {item.icon}
              </div>
              <p className="text-xs text-muted tracking-widest uppercase mb-2 font-semibold">{item.label}</p>
              <p
                className="text-foreground font-bold text-lg group-hover:text-[#a855f7] transition-colors duration-200"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {item.value}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
