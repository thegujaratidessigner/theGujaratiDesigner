"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Entire banner slides up + fades
      gsap.fromTo(
        ".cta-card",
        { y: 60, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        }
      );

      // Text stagger
      gsap.fromTo(
        ".cta-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        }
      );

      // Button scale in
      gsap.fromTo(
        ".cta-btn",
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
        }
      );

      // Subtle parallax on internal grid pattern
      gsap.to(".cta-grid", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-background">
      <div className="cta-card max-w-7xl mx-auto relative overflow-hidden rounded-3xl opacity-0">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]" />
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ec4899 0%, #ec489933 35%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="cta-grid absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-10 md:p-16">
          <div>
            <p className="cta-text text-sm text-white/60 tracking-widest uppercase mb-3 opacity-0">
              Ready to grow?
            </p>
            <h2
              className="cta-text text-3xl md:text-4xl font-extrabold text-white leading-tight opacity-0"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Unique & Trendy Design
              <br />
              Approach — Let&apos;s Talk.
            </h2>
          </div>
          <Link
            href="#contact"
            className="cta-btn shrink-0 px-8 py-4 rounded-full bg-white text-[#7c3aed] font-bold text-sm tracking-wide hover:bg-white/90 transition-all duration-200 hover:scale-105 active:scale-95 inline-block opacity-0 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            Contact Us →
          </Link>
        </div>
      </div>
    </section>
  );
}
