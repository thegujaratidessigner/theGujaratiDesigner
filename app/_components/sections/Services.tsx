"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";

/* ─── Icon types ────────────────────────────────────────────────────────── */

export type ServiceIconType = "design" | "web" | "video" | "social" | "photo" | "print" | "brand" | "marketing";

function ServiceIcon({ type }: { type: ServiceIconType }) {
  switch (type) {
    case "design":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.22 6.22l2.12 2.12M19.66 19.66l2.12 2.12M19.66 6.22l-2.12 2.12M6.22 19.66l2.12 2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    case "web":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="5" width="22" height="15" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M9 24h10M14 20v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M8 11l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "video":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M11 10l7 4-7 4V10z" fill="currentColor"/>
        </svg>
      );
    case "social":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 5C8.48 5 4 9.48 4 15s4.48 10 10 10 10-4.48 10-10S19.52 5 14 5z" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M14 5c-2.5 3-4 6.5-4 10s1.5 7 4 10M14 5c2.5 3 4 6.5 4 10s-1.5 7-4 10M4 15h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    case "photo":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="3" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="21" cy="9" r="1.5" fill="currentColor"/>
        </svg>
      );
    case "print":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M8 8V4h12v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <rect x="3" y="8" width="22" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/>
          <path d="M8 24h12v-8H8v8z" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      );
    case "brand":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M14 4l2.5 7.5H24l-6.5 4.5 2.5 7.5L14 19l-6 4.5 2.5-7.5L4 11.5h7.5L14 4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      );
    case "marketing":
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 18V10l10-6 10 6v8l-10 6-10-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
          <path d="M14 4v20M4 10l10 6 10-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
}

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type ServiceItem = {
  id: string;
  number: string;
  iconType: ServiceIconType;
  title: string;
  description: string;
  tags: string[];
  color: string;
  accent: string;
};

/* ─── Component ─────────────────────────────────────────────────────────── */

export default function Services({ services }: { services: ServiceItem[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".svc-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);

      tl.fromTo(".svc-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);

      tl.fromTo(
        ".svc-card",
        { y: 60, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1 },
        0.35
      );

      tl.fromTo(".svc-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");
    }, ref);

    return () => ctx.revert();
  }, [inView]);

  return (
    <section id="services" ref={ref} className="relative py-16 md:py-32 px-4 sm:px-6 bg-background overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, #7c3aed22 35%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <p className="svc-label text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4 opacity-0">
            What We Do
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Services Built
              <br />
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                For Your Growth
              </span>
            </h2>
            <p className="svc-desc text-muted max-w-xs leading-relaxed opacity-0">
              Every service we offer is designed to deliver measurable results
              for your business.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="svc-card group relative p-5 sm:p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-foreground/15 transition-all duration-500 cursor-default overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] opacity-0"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${service.color}`}
              />
              <div
                className="absolute top-0 left-8 w-20 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${service.accent}15`,
                      border: `1px solid ${service.accent}30`,
                      color: service.accent,
                    }}
                  >
                    <ServiceIcon type={service.iconType} />
                  </div>
                  <span
                    className="text-4xl font-extrabold text-foreground/5 group-hover:text-foreground/10 transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {service.number}
                  </span>
                </div>

                <h3
                  className="text-xl font-bold text-foreground mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-[var(--border-color)] text-muted bg-[var(--card-bg)] group-hover:border-foreground/15 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="svc-cta mt-12 text-center opacity-0">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-all duration-200 shadow-[0_0_30px_rgba(124,58,237,0.35)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:scale-105 active:scale-95"
          >
            View All Packages & Pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="svc-word inline-block mr-[0.3em]">
          {word}
        </span>
      ))}
    </span>
  );
}

export { ServiceIcon };
