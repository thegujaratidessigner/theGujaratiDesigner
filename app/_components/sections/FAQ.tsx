"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What services does The Gujarati Designer offer?",
    a: "We offer logo design, graphic design, website design & development, video creation & editing, social media marketing, branding packages, and festival poster design — all under one roof.",
  },
  {
    q: "Is The Gujarati Designer only a logo design company?",
    a: "No. While logo design is one of our core offerings, we are a full-service creative studio. We handle everything from brand strategy and identity to website development and digital marketing.",
  },
  {
    q: "Do you provide website design and development services?",
    a: "Yes. We design and develop SEO-optimised, mobile-responsive, high-performance websites that improve online visibility and generate real business leads.",
  },
  {
    q: "Do you offer Social Media Marketing (SMM) services?",
    a: "Absolutely. We create scroll-stopping visuals, engaging content strategies, and data-driven social media campaigns to grow your brand globally.",
  },
  {
    q: "How does your design and branding process work?",
    a: "Our process starts with discovery — understanding your business, audience, and goals. Then we move through strategy, design concepts, revisions, and final delivery with full brand guidelines.",
  },
  {
    q: "Who founded The Gujarati Designer?",
    a: "The Gujarati Designer was founded by Kunal Thacker on 9th February 2018 in Ahmedabad, India.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="py-32 px-6 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4">
            The Gujarati Designer
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                openIndex === i
                  ? "border-[#7c3aed]/40 bg-[#7c3aed]/5"
                  : "border-white/8 bg-white/3 hover:border-white/15"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span
                  className="font-semibold text-white text-sm md:text-base"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-[#a1a1aa]"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 text-[#a1a1aa] text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
