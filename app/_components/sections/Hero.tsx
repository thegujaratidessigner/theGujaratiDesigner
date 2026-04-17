"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("../HeroScene"), { ssr: false });

const rotatingWords = ["Convert", "Inspire", "Dominate", "Captivate"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Mouse parallax on orbs
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX / w - 0.5) * 2;
    const y = (e.clientY / h - 0.5) * 2;
    if (orb1Ref.current) gsap.to(orb1Ref.current, { x: x * 40, y: y * 40, duration: 1.2, ease: "power2.out" });
    if (orb2Ref.current) gsap.to(orb2Ref.current, { x: x * -25, y: y * -25, duration: 1.4, ease: "power2.out" });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Rotating words
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // GSAP entrance timeline — triggered by curtain:open event
  useEffect(() => {
    if (!headlineRef.current || !sectionRef.current) return;

    // Hide chars immediately so they don't flash before animation
    const chars = headlineRef.current.querySelectorAll(".char-reveal");
    gsap.set(chars, { y: 50, opacity: 0 });

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Badge fades in
        tl.fromTo(
          ".hero-badge",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0
        );

        // 2. Headline chars stagger in (y + opacity only — no 3D rotateX)
        tl.fromTo(
          chars,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.015 },
          0.15
        );

        // 3. Subtext
        tl.fromTo(
          ".hero-subtext",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.3"
        );

        // 4. CTA buttons
        tl.fromTo(
          ".hero-cta",
          { y: 20, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );

        // 5. Stats bar + counters
        tl.fromTo(
          ".hero-stats",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2"
        );

        // 6. Counter animation
        const counters = statsRef.current!.querySelectorAll(".stat-counter");
        counters.forEach((el) => {
          const target = parseInt(el.getAttribute("data-target") || "0", 10);
          const suffix = el.getAttribute("data-suffix") || "";
          const obj = { val: 0 };
          tl.to(
            obj,
            {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate() {
                el.textContent = Math.round(obj.val) + suffix;
              },
            },
            "-=1.6"
          );
        });
      }, sectionRef);
    };

    window.addEventListener("curtain:open", startAnimation, { once: true });
    return () => window.removeEventListener("curtain:open", startAnimation);
  }, []);


  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden bg-background"
    >
      {/* ── Gradient orbs (parallax targets) ── */}
      <div
        ref={orb1Ref}
        aria-hidden
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none will-change-transform"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        ref={orb2Ref}
        aria-hidden
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none will-change-transform"
        style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      {/* ── 3D Scene ── */}
      <div className="absolute inset-0" aria-hidden>
        <HeroScene />
      </div>

      {/* Grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto text-center pt-36 px-6">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-6 opacity-0">
          <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
          <span className="text-sm text-muted tracking-widest uppercase">
            Creative Design Studio · Ahmedabad
          </span>
        </div>

        {/* Headline — character-by-character reveal */}
        <div ref={headlineRef}>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-6 text-foreground"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="block overflow-hidden pb-1">
              <SplitChars text="We Design Brands" />
            </span>
            <span className="block overflow-hidden pb-1">
              <SplitChars text="That" />
            </span>
            <span className="relative inline-block overflow-hidden align-bottom h-[1.15em]">
              <AnimatePresence mode="wait">
                <AnimatedWord key={wordIndex} word={rotatingWords[wordIndex]} />
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="hero-subtext text-lg md:text-xl text-muted max-w-3xl mx-auto mt-8 leading-relaxed opacity-0">
          From logo design to full-scale digital branding — The Gujarati
          Designer crafts visual identities that make your business unforgettable.
        </p>

        {/* CTAs with magnetic effect */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
          <MagneticWrap>
            <Link
              href="#portfolio"
              className="hero-cta inline-flex px-8 py-4 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm tracking-wide transition-all duration-200 active:scale-95 opacity-0 shadow-[0_0_0_rgba(124,58,237,0)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
            >
              View Our Work
            </Link>
          </MagneticWrap>
          <MagneticWrap>
            <Link
              href="#contact"
              className="hero-cta inline-flex px-8 py-4 rounded-full border border-foreground/15 hover:border-foreground/30 text-foreground font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-foreground/5 opacity-0"
            >
              Get In Touch
            </Link>
          </MagneticWrap>
        </div>

        {/* Stats with counters */}
        <div
          ref={statsRef}
          className="hero-stats flex items-center justify-center gap-16 mt-14 pt-8 border-t border-[var(--border-subtle)] opacity-0"
        >
          {[
            { target: 9, suffix: "+", label: "Years Experience" },
            { target: 500, suffix: "+", label: "Projects Delivered" },
            { target: 200, suffix: "+", label: "Happy Clients" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="stat-counter text-3xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-syne)" }}
                data-target={stat.target}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </p>
              <p className="text-xs text-muted mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#7c3aed] to-transparent"
        />
      </motion.div>
    </section>
  );
}

/* ── Helpers ─────────────────────────────── */

function SplitChars({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char-reveal inline-block"
          style={{
            display: char === " " ? "inline-block" : undefined,
            width: char === " " ? "0.3em" : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

function MagneticWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
  };

  return (
    <div ref={ref} className="will-change-transform" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function AnimatedWord({ word }: { word: string }) {
  return (
    <motion.span
      initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
      exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="block bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
    >
      {word}
    </motion.span>
  );
}
