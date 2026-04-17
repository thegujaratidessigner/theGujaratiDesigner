"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import type { GoogleReview } from "@/lib/reviews";

const FALLBACK = [
  {
    author_name: "Mehul Shah",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "",
    text: "The Gujarati Designer helped build my brand from scratch. Their team understood my vision and created a unique brand identity and website that perfectly fits my business. Highly recommended!",
  },
  {
    author_name: "Viral Desai",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "",
    text: "The Gujarati Designer is not just a logo designer — they are a complete branding and digital marketing solution provider. Their strategy-driven approach makes a real difference.",
  },
  {
    author_name: "Rina Patel",
    profile_photo_url: "",
    rating: 5,
    relative_time_description: "",
    text: "Their website design and UI/UX skills are excellent. The website they developed for us is modern, responsive, and optimised for SEO and conversions.",
  },
];

const GRADIENTS = [
  "from-[#7c3aed] to-[#4c1d95]",
  "from-[#ec4899] to-[#9333ea]",
  "from-[#f59e0b] to-[#ec4899]",
  "from-[#06b6d4] to-[#7c3aed]",
  "from-[#10b981] to-[#06b6d4]",
];

export default function Testimonials({ reviews }: { reviews?: GoogleReview[] }) {
  const items = reviews && reviews.length > 0 ? reviews : FALLBACK;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const hasAnimated = useRef(false);

  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".test-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);
      tl.fromTo(
        ".test-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
        0.3
      );
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

        {/* Desktop: up to 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {items.slice(0, 3).map((t, idx) => (
            <ReviewCard key={t.author_name + idx} review={t} gradient={GRADIENTS[idx % GRADIENTS.length]} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden relative max-w-lg mx-auto">
          <div className="relative rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 overflow-hidden min-h-[300px] flex flex-col justify-between">
            <div
              className="absolute top-0 left-8 right-8 h-px opacity-60"
              style={{ background: "linear-gradient(90deg, transparent, #a855f7, transparent)" }}
            />
            <div className="absolute bottom-6 right-8 text-7xl font-serif text-foreground/5 leading-none select-none" aria-hidden>&ldquo;</div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <StarRow rating={items[active].rating} />
                <p className="text-foreground/85 text-lg leading-relaxed mb-6 mt-4">
                  &ldquo;{items[active].text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  <Avatar review={items[active]} gradient={GRADIENTS[active % GRADIENTS.length]} />
                  <div>
                    <p className="text-foreground font-semibold text-sm">{items[active].author_name}</p>
                    {items[active].relative_time_description && (
                      <p className="text-muted text-xs">{items[active].relative_time_description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#a855f7]/50 hover:text-foreground transition-all"
              aria-label="Previous"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${active === i ? "w-6 h-2 bg-[#7c3aed]" : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#a855f7]/50 hover:text-foreground transition-all"
              aria-label="Next"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Trust stats */}
        <div className="test-stats flex flex-wrap items-center justify-center gap-10 mt-16 pt-12 border-t border-[var(--border-subtle)] opacity-0">
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "200+", label: "Happy Clients" },
            { value: "4.9★", label: "Average Rating" },
            { value: "9+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl font-bold bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-muted mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review, gradient }: { review: GoogleReview; gradient: string }) {
  return (
    <div className="test-card relative rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 flex flex-col justify-between hover:border-foreground/15 transition-all duration-300 overflow-hidden group hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] opacity-0">
      <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${gradient} opacity-60`} />
      <div className="absolute bottom-6 right-8 text-7xl font-serif text-foreground/5 leading-none pointer-events-none select-none group-hover:text-foreground/8 transition-colors" aria-hidden>
        &ldquo;
      </div>
      <div>
        <StarRow rating={review.rating} />
        <p className="text-foreground/85 text-base leading-relaxed mb-6 mt-4">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
        <Avatar review={review} gradient={gradient} />
        <div>
          <p className="text-foreground font-semibold text-sm">{review.author_name}</p>
          {review.relative_time_description && (
            <p className="text-muted text-xs">{review.relative_time_description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Avatar({ review, gradient }: { review: GoogleReview; gradient: string }) {
  if (review.profile_photo_url) {
    return (
      <Image
        src={review.profile_photo_url}
        alt={review.author_name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full object-cover shrink-0"
        unoptimized
      />
    );
  }
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
      {review.author_name.charAt(0)}
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 15 15" fill={i < rating ? "#a855f7" : "currentColor"} className={i < rating ? "" : "opacity-20"}>
          <path d="M7.5 1l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8-2.7-2.7 3.8-.6L7.5 1z"/>
        </svg>
      ))}
    </div>
  );
}
