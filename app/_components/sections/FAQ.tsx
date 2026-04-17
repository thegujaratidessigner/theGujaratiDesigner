"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Heading
      tl.fromTo(".faq-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);

      // Accordion items stagger in
      tl.fromTo(
        ".faq-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
        0.3
      );
    }, ref);

    return () => ctx.revert();
  }, [inView]);

  return (
    <section ref={ref} className="py-16 md:py-32 px-4 sm:px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="faq-label text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4 opacity-0">
            The Gujarati Designer
          </p>
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Frequently Asked
            <br />
            <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item rounded-2xl border transition-all duration-300 overflow-hidden opacity-0 ${
                openIndex === i
                  ? "border-[#7c3aed]/40 bg-[#7c3aed]/5 shadow-[0_4px_20px_rgba(124,58,237,0.08)]"
                  : "border-[var(--border-color)] bg-[var(--card-bg)] hover:border-foreground/15"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span
                  className="font-semibold text-foreground text-sm md:text-base"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="shrink-0 w-7 h-7 rounded-full border border-foreground/15 flex items-center justify-center text-muted"
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
                    transition={{
                      height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.25, delay: 0.05 },
                    }}
                  >
                    <p className="px-6 pb-6 text-muted text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="faq-word inline-block mr-[0.3em]">
          {word}
        </span>
      ))}
    </span>
  );
}
