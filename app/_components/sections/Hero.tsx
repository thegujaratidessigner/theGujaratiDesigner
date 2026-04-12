"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const rotatingWords = ["Convert", "Inspire", "Dominate", "Captivate"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden bg-background">
      {/* Background gradient orbs */}
      <div
        aria-hidden
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto text-center pt-36"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
          <span className="text-sm text-muted tracking-widest uppercase">
            Creative Design Studio · Ahmedabad
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.0] tracking-tight mb-6 text-foreground"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          We Design Brands
          <br />
          That
          <br />
          <span className="relative inline-block overflow-hidden align-bottom h-[1.1em]">
            <AnimatedWord word={rotatingWords[wordIndex]} />
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted max-w-3xl mx-auto mt-8 leading-relaxed"
        >
          From logo design to full-scale digital branding — The Gujarati
          Designer crafts visual identities that make your business unforgettable.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          <Link
            href="#portfolio"
            className="px-8 py-4 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
          >
            View Our Work
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 rounded-full border border-foreground/15 hover:border-foreground/30 text-foreground font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-foreground/5"
          >
            Get In Touch
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-16 mt-14 pt-8 border-t border-[var(--border-subtle)]"
        >
          {[
            { value: "9+", label: "Years Experience" },
            { value: "500+", label: "Projects Delivered" },
            { value: "200+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-3xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-muted mt-1 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#7c3aed] to-transparent"
        />
      </motion.div>
    </section>
  );
}

function AnimatedWord({ word }: { word: string }) {
  return (
    <motion.span
      key={word}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="block bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
    >
      {word}
    </motion.span>
  );
}
