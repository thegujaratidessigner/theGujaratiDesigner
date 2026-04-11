"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Mehul Shah",
    role: "Client",
    quote:
      "The Gujarati Designer helped build my brand from scratch. Their team understood my vision and created a unique brand identity and website that perfectly fits my business. Highly recommended!",
    rating: 5,
  },
  {
    name: "Viral Desai",
    role: "Client",
    quote:
      "The Gujarati Designer is not just a logo designer — they are a complete branding and digital marketing solution provider. Their strategy-driven approach makes a real difference.",
    rating: 5,
  },
  {
    name: "Rina Patel",
    role: "Client",
    quote:
      "Their website design and UI/UX skills are excellent. The website they developed for us is modern, responsive, and optimised for SEO and conversions.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} className="py-32 px-6 bg-[#0d0d0d]">
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
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            What Clients{" "}
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Say
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl border border-white/8 bg-white/3 p-10 md:p-14 overflow-hidden min-h-[280px] flex flex-col justify-between">
            {/* Quote mark */}
            <div
              className="absolute top-8 right-10 text-8xl font-serif text-[#7c3aed]/15 leading-none pointer-events-none select-none"
              aria-hidden
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[active].rating }).map(
                    (_, i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="#a855f7"
                      >
                        <path d="M8 1l1.8 3.6L14 5.5l-3 2.9.7 4.1L8 10.4l-3.7 2.1.7-4.1-3-2.9 4.2-.9L8 1z" />
                      </svg>
                    )
                  )}
                </div>

                {/* Quote */}
                <p
                  className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  "{testimonials[active].quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center text-white font-bold text-sm">
                    {testimonials[active].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {testimonials[active].name}
                    </p>
                    <p className="text-[#a1a1aa] text-xs">
                      {testimonials[active].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-300 rounded-full ${
                  active === i
                    ? "w-8 h-2 bg-[#7c3aed]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
