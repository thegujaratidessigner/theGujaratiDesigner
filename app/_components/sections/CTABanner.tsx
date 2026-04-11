"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-[#0d0d0d]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]" />
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-12 md:p-16">
          <div>
            <p className="text-sm text-white/60 tracking-widest uppercase mb-3">
              Ready to grow?
            </p>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Unique & Trendy Design
              <br />
              Approach — Let's Talk.
            </h2>
          </div>
          <Link
            href="#contact"
            className="shrink-0 px-8 py-4 rounded-full bg-white text-[#7c3aed] font-bold text-sm tracking-wide hover:bg-white/90 transition-colors duration-200 hover:scale-105 active:scale-95 inline-block"
          >
            Contact Us →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
