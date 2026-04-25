"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import type { Testimonial } from "@/app/api/testimonials/route";
import type { StatItem } from "@/app/api/stats/route";

const GRADIENTS = [
  "from-[#7c3aed] to-[#4c1d95]",
  "from-[#ec4899] to-[#9333ea]",
  "from-[#f59e0b] to-[#ec4899]",
  "from-[#06b6d4] to-[#7c3aed]",
  "from-[#10b981] to-[#06b6d4]",
];

const AUTO_SLIDE_MS = 3000;

export default function Testimonials({ testimonials, stats = [] }: { testimonials: Testimonial[]; stats: StatItem[] }) {
  const items = testimonials;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const hasAnimated = useRef(false);

  const next = useCallback(() => setActive((a) => (a + 1) % items.length), [items.length]);
  const prev = useCallback(() => setActive((a) => (a - 1 + items.length) % items.length), [items.length]);

  // Auto-slide
  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const id = setInterval(next, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [isPaused, next, items.length]);

  const handleMouseEnter = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setIsPaused(true);
    }
  }, []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".test-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
      tl.fromTo(".test-carousel", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.3);
      tl.fromTo(".test-stats", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3");
    }, ref);

    return () => ctx.revert();
  }, [inView]);

  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="test-label text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4 opacity-0">
            Client Love
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            What Clients{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
        </div>

        {/* Unified carousel */}
        <div
          className="test-carousel opacity-0 relative max-w-2xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 md:p-12 overflow-hidden min-h-[280px] flex flex-col justify-between">
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-8 right-8 h-px opacity-60"
              style={{ background: "linear-gradient(90deg, transparent, #a855f7, transparent)" }}
            />
            {/* Accent bar cycling with testimonial */}
            <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r ${GRADIENTS[active % GRADIENTS.length]} opacity-70 transition-all duration-500`} />
            {/* Decorative quote */}
            <div className="absolute bottom-6 right-8 text-7xl font-serif text-foreground/5 leading-none select-none" aria-hidden>
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <StarRow rating={items[active].rating} />
                <p className="text-foreground/85 text-lg leading-relaxed mb-6 mt-4">
                  &ldquo;{items[active].text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  <Avatar review={items[active]} gradient={GRADIENTS[active % GRADIENTS.length]} />
                  <div>
                    <p className="text-foreground font-semibold text-sm">{items[active].author}</p>
                    {items[active].time && (
                      <p className="text-muted text-xs">{items[active].time}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots + nav */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#a855f7]/50 hover:text-foreground transition-all"
              aria-label="Previous testimonial"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${
                    active === i ? "w-6 h-2 bg-[#7c3aed]" : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#a855f7]/50 hover:text-foreground transition-all"
              aria-label="Next testimonial"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Trust stats */}
        <div className="test-stats flex flex-wrap items-center justify-center gap-10 mt-16 pt-12 border-t border-[var(--border-subtle)] opacity-0">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl font-bold bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.target}{stat.suffix}
              </p>
              <p className="text-xs text-muted mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ review, gradient }: { review: Testimonial; gradient: string }) {
  if (review.photoUrl) {
    return (
      <Image
        src={review.photoUrl}
        alt={review.author}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover shrink-0"
        unoptimized
      />
    );
  }
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
      {review.author.charAt(0).toUpperCase()}
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 15 15" fill={i < rating ? "#a855f7" : "currentColor"} className={i < rating ? "" : "opacity-20"}>
          <path d="M7.5 1l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8-2.7-2.7 3.8-.6L7.5 1z" />
        </svg>
      ))}
    </div>
  );
}
