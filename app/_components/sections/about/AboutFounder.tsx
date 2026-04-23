"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import type { FounderData } from "@/app/api/founder/route";

export default function AboutFounder({ founder }: { founder: FounderData }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const initials = founder.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const [firstName, ...rest] = founder.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Accent */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              {founder.role}
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {firstName}{" "}
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                {lastName}
              </span>
            </h2>

            {founder.bio.map((para, i) => (
              <p key={i} className="text-muted text-lg leading-relaxed mb-5">{para}</p>
            ))}

            {/* Skills/tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {founder.skills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-color)] text-muted bg-[var(--card-bg)]">{skill}</span>
              ))}
            </div>
          </motion.div>

          {/* Right — Photo card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] aspect-[3/4]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/40 via-[#4c1d95]/30 to-[#ec4899]/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white text-3xl font-extrabold" style={{ fontFamily: "var(--font-syne)" }}>
                    {initials}
                  </div>
                  <p className="text-foreground font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>{founder.name}</p>
                  <p className="text-muted text-sm">{founder.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
