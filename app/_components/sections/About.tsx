"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const highlights = [
  { label: "Founded", value: "2018" },
  { label: "Based in", value: "Ahmedabad" },
  { label: "Serving", value: "Global" },
  { label: "Founder", value: "Kunal Thacker" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 bg-background overflow-hidden"
    >
      {/* Subtle accent */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4"
        >
          About Us
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Text */}
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-foreground"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              A Global Creative Studio
              <br />
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Born in Ahmedabad
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-muted text-lg leading-relaxed mb-6"
            >
              Founded on 9th February 2018 by Kunal Thacker, The Gujarati
              Designer is a globally serving creative design studio. With over 9
              years of experience, we have built a reputation for delivering
              high-impact, strategy-driven design solutions to businesses
              worldwide.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-muted text-lg leading-relaxed"
            >
              We specialise in transforming ideas into powerful brand identities
              through professional logo design, branding, graphic design, website
              development, and video content creation. Every project is crafted
              with precision, clarity, and a deep understanding of brand
              psychology.
            </motion.p>
          </div>

          {/* Right - Highlights */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                custom={i}
                className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#7c3aed]/40 transition-colors duration-300"
              >
                <p className="text-xs text-muted tracking-widest uppercase mb-2">
                  {item.label}
                </p>
                <p
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {item.value}
                </p>
              </motion.div>
            ))}

            {/* Extra card */}
            <motion.div
              variants={itemVariants}
              className="col-span-2 p-6 rounded-2xl border border-[#7c3aed]/30 bg-[#7c3aed]/8 hover:bg-[#7c3aed]/12 transition-colors duration-300"
            >
              <p className="text-xs text-[#a855f7] tracking-widest uppercase mb-2">
                Our Mission
              </p>
              <p className="text-foreground font-medium leading-relaxed">
                We believe design is a business tool — meant to communicate,
                influence, and convert. Every brand we build drives real results.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
