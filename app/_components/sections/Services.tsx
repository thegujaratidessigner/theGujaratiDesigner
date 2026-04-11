"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Logo Design & Graphic Design",
    description:
      "We build brand identities that are creative, unique, and memorable — from logo systems to brand assets that work across every medium.",
    tags: ["Logo Design", "Brand Identity", "Typography"],
  },
  {
    number: "02",
    title: "Website Design & Development",
    description:
      "SEO-optimised, mobile-responsive, high-performance websites designed to improve your online visibility and generate real business leads.",
    tags: ["UI/UX", "Web Dev", "SEO"],
  },
  {
    number: "03",
    title: "Video Creation & Editing",
    description:
      "Professional video production and editing services — from explainer videos and promotional ads to social media reels and motion graphics.",
    tags: ["Motion Graphics", "Reels", "Ads"],
  },
  {
    number: "04",
    title: "Social Media Marketing",
    description:
      "Scroll-stopping visuals, engaging content, and data-driven strategies designed to grow your brand globally across all social platforms.",
    tags: ["Content Strategy", "SMM", "Analytics"],
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-32 px-6 bg-[#0d0d0d]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p className="text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4">
            What We Do
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Services Built
              <br />
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                For Your Growth
              </span>
            </h2>
            <p className="text-[#a1a1aa] max-w-xs leading-relaxed">
              Every service we offer is designed to deliver measurable results
              for your business.
            </p>
          </div>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative p-8 rounded-2xl border border-white/8 bg-white/3 hover:border-[#7c3aed]/40 hover:bg-[#7c3aed]/5 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(circle at top left, rgba(124,58,237,0.08) 0%, transparent 60%)" }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <span
                    className="text-5xl font-extrabold text-white/5 group-hover:text-white/10 transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {service.number}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#a855f7]/60 group-hover:bg-[#7c3aed]/20 transition-all duration-300">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-[#a1a1aa] group-hover:text-[#a855f7] -rotate-45 group-hover:rotate-0 transition-all duration-300"
                    >
                      <path
                        d="M1 7h12M7 1l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <h3
                  className="text-xl font-bold text-white mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {service.title}
                </h3>
                <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full border border-white/10 text-[#a1a1aa] bg-white/3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
