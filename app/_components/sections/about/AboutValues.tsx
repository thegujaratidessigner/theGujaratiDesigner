"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Creative Excellence",
    description: "Every design we produce is crafted with precision, passion, and a relentless pursuit of quality.",
    accent: "#a855f7",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    title: "Results-Driven",
    description: "We believe design is a business tool. Every project is measured by the real impact it creates.",
    accent: "#ec4899",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: "Global Perspective",
    description: "Based in Ahmedabad, we serve clients worldwide — understanding diverse markets and audiences.",
    accent: "#f59e0b",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Client-First",
    description: "Long-term partnerships built on trust, transparency, and a genuine commitment to your growth.",
    accent: "#10b981",
  },
];

export default function AboutValues() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4">
            What Drives Us
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Our Core{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Values
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group p-7 rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-foreground/15 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${v.accent}, transparent)` }}
              />
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${v.accent}15`, border: `1px solid ${v.accent}30`, color: v.accent }}
              >
                {v.icon}
              </div>
              <h3
                className="text-foreground font-bold text-base mb-2"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {v.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
