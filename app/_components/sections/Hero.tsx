"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import dynamic from "next/dynamic";
import type { StatItem } from "@/app/api/stats/route";

const HeroScene = dynamic(() => import("../HeroScene"), { ssr: false });

import type { HeroSettings } from "@/app/api/hero-settings/route";

export default function Hero({ stats, heroSettings }: { stats: StatItem[]; heroSettings: HeroSettings }) {
  const rotatingWords = heroSettings.rotatingWords.length > 0 ? heroSettings.rotatingWords : ["Convert", "Inspire", "Dominate", "Captivate"];
  const line1 = heroSettings.headlineLine1 || "We Design Brands";
  const line2 = heroSettings.headlineLine2 || "That";
  const [wordIndex, setWordIndex] = useState(0);
  const [showScene, setShowScene] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // pointer:fine = mouse (real desktop/laptop). pointer:coarse = touchscreen.
    // This correctly returns false even when a phone requests "Desktop Site" in browser.
    const isRealDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setShowScene(isRealDesktop);
    setIsDesktop(isRealDesktop);
  }, []);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Mouse parallax on orbs — throttled to one update per animation frame
  const rafPending = useRef(false);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      if (orb1Ref.current) gsap.to(orb1Ref.current, { x: x * 40, y: y * 40, duration: 1.2, ease: "power2.out" });
      if (orb2Ref.current) gsap.to(orb2Ref.current, { x: x * -25, y: y * -25, duration: 1.4, ease: "power2.out" });
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
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
    // Fallback: if curtain:open fired before this listener attached (slow network), start after 4s
    const fallback = setTimeout(startAnimation, 4000);
    return () => {
      window.removeEventListener("curtain:open", startAnimation);
      clearTimeout(fallback);
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className={`relative flex flex-col items-center overflow-hidden bg-background ${isDesktop ? "min-h-screen pb-0" : "min-h-0 pb-8"}`}
    >
      {/* ── Gradient orbs — only on real desktop/laptop (pointer: fine) ── */}
      {isDesktop && (
        <div
          ref={orb1Ref}
          aria-hidden
          className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full opacity-25 pointer-events-none will-change-transform"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, #7c3aed44 30%, transparent 70%)" }}
        />
      )}
      {isDesktop && (
        <div
          ref={orb2Ref}
          aria-hidden
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full opacity-20 pointer-events-none will-change-transform"
          style={{ background: "radial-gradient(circle, #ec4899 0%, #ec489944 30%, transparent 70%)" }}
        />
      )}

      {/* ── 3D Scene ── */}
      {showScene && (
        <div className="absolute inset-0" aria-hidden>
          <HeroScene />
        </div>
      )}

      {/* Grid overlay */}
      {isDesktop && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* ── Content ── */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto text-center px-3 sm:px-6 ${isDesktop ? "pt-36" : "pt-24"}`}>
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-3 md:mb-6 opacity-0">
          <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
          <span className="text-sm text-muted tracking-widest uppercase">
            Creative Design Studio · Ahmedabad
          </span>
        </div>

        {/* Headline — character-by-character reveal */}
        <div ref={headlineRef}>
          <h1
            className={`font-extrabold leading-[1.05] tracking-tight mb-4 text-foreground ${isDesktop ? "text-7xl xl:text-8xl" : "text-[2rem] sm:text-5xl"}`}
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span className="block overflow-hidden pb-1">
              <SplitChars text={line1} />
            </span>
            <span className="block overflow-hidden pb-1">
              <SplitChars text={line2} />
            </span>
            <span className="relative block overflow-hidden h-[1.2em]">
              <AnimatePresence mode="wait">
                <AnimatedWord key={wordIndex} word={rotatingWords[wordIndex]} />
              </AnimatePresence>
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="hero-subtext text-lg md:text-xl text-muted max-w-3xl mx-auto mt-4 md:mt-8 leading-relaxed opacity-0">
          From logo design to full-scale digital branding — The Gujarati
          Designer crafts visual identities that make your business unforgettable.
        </p>

        {/* CTAs with magnetic effect */}
        <div className="flex flex-row flex-wrap items-center justify-center gap-4 mt-6 md:mt-12">
          <MagneticWrap>
            <a
              href="/start-project"
              className="hero-cta inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-300 active:scale-95 opacity-0 hover:shadow-[0_0_30px_rgba(109,47,240,0.55)] hover:scale-[1.03] cursor-pointer"
              style={{ backgroundImage: "linear-gradient(135deg, #874cff 0%, #6d2ff0 60%, #5a22ca 100%)" }}
            >
              Start Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </MagneticWrap>
          <MagneticWrap>
            <a
              href="https://drive.google.com/drive/folders/15WmQTvpNPtqFWbNrFG8dXmMEqgDn5_1V?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta inline-flex px-8 py-4 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm tracking-wide transition-all duration-300 active:scale-95 opacity-0 shadow-[0_0_0_rgba(124,58,237,0)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:scale-[1.03] cursor-pointer"
            >
              View Our Work
            </a>
          </MagneticWrap>
          <MagneticWrap>
            <a
              href="https://wa.me/message/ZOIT6ZOKNI4PG1"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta inline-flex px-8 py-4 rounded-full border border-foreground/15 hover:border-foreground/30 text-foreground font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-foreground/5 opacity-0 hover:scale-[1.03] cursor-pointer"
            >
              Get In Touch
            </a>
          </MagneticWrap>
        </div>

        {/* Stats with counters */}
        <div
          ref={statsRef}
          className="hero-stats flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-6 md:mt-14 pt-6 md:pt-8 border-t border-[var(--border-subtle)] opacity-0"
        >
          {stats.map((stat) => (
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

      {/* Scroll indicator — only on real desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDesktop ? 1 : 0 }}
        transition={{ delay: 2.6, duration: 0.6 }}
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 ${isDesktop ? "flex" : "hidden"}`}
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
