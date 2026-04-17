"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-background overflow-hidden pt-20">
      {/* Background orbs */}
      <div
        aria-hidden
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-xs font-semibold tracking-widest uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              Design With Purpose. Branding With Impact.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-foreground mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              About{" "}
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Us
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted text-lg leading-relaxed mb-4"
            >
              Founded in 2018, The Gujarati Designer is a professional creative
              design studio based in Ahmedabad, delivering globally trusted
              branding and digital design solutions. We specialise in logo design,
              graphic design, website development, branding, and video content
              creation that help businesses build a strong and impactful brand
              identity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted text-lg leading-relaxed"
            >
              With a deep passion for visuals and a sharp eye for detail, we
              transform ideas into powerful brand experiences. Our approach
              combines creativity, strategic thinking, and cultural understanding
              to ensure every design communicates effectively with the target
              audience.
            </motion.p>
          </div>

          {/* Right — Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] aspect-[4/3]">
              {/* Gradient fill placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/30 via-[#4c1d95]/20 to-[#ec4899]/20" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              {/* Studio initials */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[120px] font-extrabold text-white/10 select-none"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  TGD
                </span>
              </div>

              {/* Floating stat — Experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm border border-[var(--border-color)] rounded-2xl px-4 py-3 text-center shadow-xl"
              >
                <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-syne)" }}>8+</p>
                <p className="text-xs text-muted tracking-wide mt-0.5">Years Experience</p>
              </motion.div>

              {/* Floating stat — Clients */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.85 }}
                className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm border border-[var(--border-color)] rounded-2xl px-4 py-3 text-center shadow-xl"
              >
                <p className="text-2xl font-extrabold bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-syne)" }}>6,800+</p>
                <p className="text-xs text-muted tracking-wide mt-0.5">Happy Clients</p>
              </motion.div>
            </div>

            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-3xl border border-[#7c3aed]/10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
