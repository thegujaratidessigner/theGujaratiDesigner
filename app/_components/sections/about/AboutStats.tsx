"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "12,300+", label: "Projects Completed", accent: "from-[#a855f7] to-[#7c3aed]" },
  { value: "11,980+", label: "Happy Clients", accent: "from-[#ec4899] to-[#a855f7]" },
  { value: "8+", label: "Years of Experience", accent: "from-[#f59e0b] to-[#ec4899]" },
  { value: "50+", label: "Industries Served", accent: "from-[#10b981] to-[#a855f7]" },
];

export default function AboutStats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 sm:px-6 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(124,58,237,0.08) 0%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Divider label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4">
            By The Numbers
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold text-foreground"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 text-center overflow-hidden group hover:border-foreground/15 transition-all duration-300"
            >
              {/* Top accent */}
              <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${stat.accent} opacity-50 group-hover:opacity-80 transition-opacity`} />

              <p
                className={`text-4xl md:text-5xl font-extrabold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent mb-3`}
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.value}
              </p>
              <p className="text-muted text-sm tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <a
            href="/#portfolio"
            className="px-8 py-4 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm tracking-wide transition-colors"
          >
            View Our Work
          </a>
          <a
            href="/#contact"
            className="px-8 py-4 rounded-full border border-foreground/15 hover:border-foreground/30 text-foreground font-semibold text-sm tracking-wide transition-all hover:bg-foreground/5"
          >
            Get In Touch →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
