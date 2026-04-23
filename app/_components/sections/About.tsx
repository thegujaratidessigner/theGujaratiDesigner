"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import type { Highlight } from "@/app/api/about-highlights/route";

export default function About({ highlights }: { highlights: Highlight[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Label
      tl.fromTo(".about-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);

      // Paragraphs
      tl.fromTo(
        ".about-para",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15 },
        0.4
      );

      // Highlight cards stagger in with scale
      tl.fromTo(
        ".about-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08 },
        0.3
      );

      // Mission card
      tl.fromTo(
        ".about-mission",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.2"
      );
    }, ref);

    return () => ctx.revert();
  }, [inView]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-8 md:py-32 px-4 sm:px-6 bg-background overflow-hidden"
    >
      {/* Subtle accent */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, #7c3aed33 35%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p className="about-label text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4 opacity-0">
          About Us
        </p>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left - Text */}
          <div>
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-foreground"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              A Global Creative Studio
              <br />
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Born in Ahmedabad
              </span>
            </h2>

            <p className="about-para text-muted text-lg leading-relaxed mb-6 opacity-0">
              Founded on 9th February 2018 by Kunal Thacker, The Gujarati
              Designer is a globally serving creative design studio. With over 9
              years of experience, we have built a reputation for delivering
              high-impact, strategy-driven design solutions to businesses
              worldwide.
            </p>

            <p className="about-para text-muted text-lg leading-relaxed opacity-0">
              We specialise in transforming ideas into powerful brand identities
              through professional logo design, branding, graphic design, website
              development, and video content creation. Every project is crafted
              with precision, clarity, and a deep understanding of brand
              psychology.
            </p>
          </div>

          {/* Right - Highlights */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="about-card p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[#7c3aed]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(124,58,237,0.08)] opacity-0"
              >
                <p className="text-xs text-muted tracking-widest uppercase mb-2">
                  {item.label}
                </p>
                <p
                  className="text-2xl font-bold text-foreground"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {item.value}
                </p>
              </div>
            ))}

            {/* Extra card */}
            <div className="about-mission col-span-2 p-6 rounded-2xl border border-[#7c3aed]/30 bg-[#7c3aed]/8 hover:bg-[#7c3aed]/12 transition-all duration-300 hover:-translate-y-1 opacity-0">
              <p className="text-xs text-[#a855f7] tracking-widest uppercase mb-2">
                Our Mission
              </p>
              <p className="text-foreground font-medium leading-relaxed">
                We believe design is a business tool — meant to communicate,
                influence, and convert. Every brand we build drives real results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SplitWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="about-word inline-block mr-[0.3em]">
          {word}
        </span>
      ))}
    </span>
  );
}
