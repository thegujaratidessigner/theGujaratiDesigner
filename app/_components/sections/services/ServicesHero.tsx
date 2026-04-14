"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "7", label: "Service Categories" },
  { value: "25+", label: "Packages Available" },
  { value: "₹399", label: "Starting From" },
  { value: "100%", label: "Satisfaction Guaranteed" },
];

export default function ServicesHero() {
  return (
    <section className="relative bg-background pt-32 pb-20 px-6 overflow-hidden">
      {/* Background orbs */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-6 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
            Our Services & Pricing
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Transparent{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Pricing
            </span>
            {" "}For Every
            <br />
            Business Need
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            From logo design to full social media management — choose a package that fits your goals and budget. No hidden charges.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-center p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]"
            >
              <p
                className="text-3xl font-extrabold bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent mb-1"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.value}
              </p>
              <p className="text-muted text-xs tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
