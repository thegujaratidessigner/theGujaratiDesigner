"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Mehul Shah",
    role: "Business Owner",
    company: "MS Enterprises",
    quote:
      "The Gujarati Designer helped build my brand from scratch. Their team understood my vision and created a unique brand identity and website that perfectly fits my business. Highly recommended!",
    rating: 5,
    gradient: "from-[#7c3aed] to-[#4c1d95]",
  },
  {
    name: "Viral Desai",
    role: "Founder",
    company: "VD Solutions",
    quote:
      "The Gujarati Designer is not just a logo designer — they are a complete branding and digital marketing solution provider. Their strategy-driven approach makes a real difference.",
    rating: 5,
    gradient: "from-[#ec4899] to-[#9333ea]",
  },
  {
    name: "Rina Patel",
    role: "Director",
    company: "Patel & Co.",
    quote:
      "Their website design and UI/UX skills are excellent. The website they developed for us is modern, responsive, and optimised for SEO and conversions.",
    rating: 5,
    gradient: "from-[#f59e0b] to-[#ec4899]",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4">
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
        </motion.div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 flex flex-col justify-between hover:border-foreground/15 transition-all duration-300 overflow-hidden group"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${t.gradient} opacity-60`} />

              {/* Quote mark */}
              <div
                className="absolute bottom-6 right-8 text-7xl font-serif text-foreground/5 leading-none pointer-events-none select-none group-hover:text-foreground/8 transition-colors"
                aria-hidden
              >
                &ldquo;
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="15" height="15" viewBox="0 0 15 15" fill="#a855f7">
                      <path d="M7.5 1l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8-2.7-2.7 3.8-.6L7.5 1z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/85 text-base leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{t.name}</p>
                  <p className="text-muted text-xs">{t.role} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden relative max-w-lg mx-auto"
        >
          <div className="relative rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 overflow-hidden min-h-[300px] flex flex-col justify-between">
            <div
              className="absolute top-0 left-8 right-8 h-px opacity-60"
              style={{ background: `linear-gradient(90deg, transparent, #a855f7, transparent)` }}
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
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 15 15" fill="#a855f7">
                      <path d="M7.5 1l1.7 3.4 3.8.6-2.7 2.7.6 3.8-3.4-1.8-3.4 1.8.6-3.8-2.7-2.7 3.8-.6L7.5 1z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/85 text-lg leading-relaxed mb-6">
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonials[active].gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {testimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{testimonials[active].name}</p>
                    <p className="text-muted text-xs">{testimonials[active].role} · {testimonials[active].company}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
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
              {testimonials.map((_, i) => (
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
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center justify-center gap-10 mt-16 pt-12 border-t border-[var(--border-subtle)]"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
