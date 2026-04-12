"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    category: "Brand Identity",
    title: "Sunrise Wellness Co.",
    description: "Full brand identity — logo, colour palette, typography, and stationery design.",
    gradient: "from-[#7c3aed] via-[#9333ea] to-[#4c1d95]",
    tags: ["Logo", "Branding"],
  },
  {
    category: "Web Design",
    title: "Apex Legal Associates",
    description: "Modern law firm website with SEO optimisation and lead generation focus.",
    gradient: "from-[#ec4899] via-[#db2777] to-[#9333ea]",
    tags: ["UI/UX", "Web Dev"],
  },
  {
    category: "Social Media",
    title: "FreshByte Cafe",
    description: "Social media content strategy, templates, and 3-month growth campaign.",
    gradient: "from-[#f59e0b] via-[#d97706] to-[#ec4899]",
    tags: ["SMM", "Content"],
  },
  {
    category: "Video Production",
    title: "TechNova Launch Ad",
    description: "60-second product launch video with motion graphics and sound design.",
    gradient: "from-[#10b981] via-[#059669] to-[#7c3aed]",
    tags: ["Video", "Motion"],
  },
  {
    category: "Brand Identity",
    title: "Golden Spice Restaurant",
    description: "Complete brand overhaul including menu design, packaging, and signage.",
    gradient: "from-[#6366f1] via-[#4f46e5] to-[#ec4899]",
    tags: ["Logo", "Print"],
  },
  {
    category: "Web Design",
    title: "Bloom Florals & Co.",
    description: "E-commerce website with custom CMS, mobile-first design, and SEO strategy.",
    gradient: "from-[#ec4899] via-[#a855f7] to-[#6366f1]",
    tags: ["E-commerce", "SEO"],
  },
];

export default function Portfolio() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="portfolio" ref={ref} className="relative py-32 px-6 bg-background">
      {/* Accent */}
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-8 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4">
              Our Work
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Selected
              <br />
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
          </div>
          <p className="text-muted max-w-sm leading-relaxed">
            A curated selection of brand identities, websites, and digital campaigns we&apos;ve built for clients worldwide.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-3xl overflow-hidden cursor-pointer border border-[var(--border-subtle)] hover:border-foreground/15 transition-all duration-500"
            >
              {/* Visual block */}
              <div className={`relative h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                {/* Grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Floating initials */}
                <span
                  className="relative z-10 text-6xl font-extrabold text-white/20 group-hover:text-white/30 group-hover:scale-110 transition-all duration-500"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {project.title.charAt(0)}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold tracking-wide border border-white/30 px-5 py-2 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors">
                    View Project →
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 bg-[var(--card-bg)] group-hover:bg-[var(--card-bg-hover)] transition-colors duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted tracking-widest uppercase">
                    {project.category}
                  </span>
                  <div className="flex gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-muted border border-[var(--border-color)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3
                  className="text-foreground font-bold text-lg mb-1.5 group-hover:text-[#a855f7] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground/15 hover:border-[#a855f7]/50 text-foreground font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#7c3aed]/10 group"
          >
            Discuss Your Project
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
