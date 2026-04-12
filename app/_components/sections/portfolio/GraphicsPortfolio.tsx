"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = ["All", "Logo", "Brand Identity", "Product Design", "Packaging", "Social Media"];

const projects = [
  { title: "Sunrise Wellness Co.", category: "Brand Identity", tags: ["Logo", "Brand Identity"], gradient: "from-[#7c3aed] via-[#9333ea] to-[#4c1d95]", description: "Full brand identity system with logo, palette, and typography." },
  { title: "GoldenBite Foods", category: "Packaging", tags: ["Packaging", "Print"], gradient: "from-[#f59e0b] via-[#d97706] to-[#ec4899]", description: "Premium food packaging design with brand storytelling." },
  { title: "Apex Law Associates", category: "Logo", tags: ["Logo"], gradient: "from-[#ec4899] via-[#db2777] to-[#9333ea]", description: "Sophisticated logo mark for a corporate law firm." },
  { title: "TechNova Startup", category: "Brand Identity", tags: ["Logo", "Brand Identity"], gradient: "from-[#10b981] via-[#059669] to-[#7c3aed]", description: "Modern tech startup brand identity and visual guidelines." },
  { title: "FreshByte Cafe", category: "Social Media", tags: ["Social Media", "Content"], gradient: "from-[#6366f1] via-[#4f46e5] to-[#ec4899]", description: "Social media templates and content strategy for F&B brand." },
  { title: "Bloom Organics", category: "Packaging", tags: ["Packaging", "Logo"], gradient: "from-[#ec4899] via-[#a855f7] to-[#6366f1]", description: "Eco-friendly product packaging for organic skincare line." },
  { title: "Steel Force Gym", category: "Logo", tags: ["Logo", "Brand Identity"], gradient: "from-[#ef4444] via-[#dc2626] to-[#7c3aed]", description: "Bold gym brand identity with logo system and signage." },
  { title: "Nari Boutique", category: "Product Design", tags: ["Product Design", "Print"], gradient: "from-[#f472b6] via-[#ec4899] to-[#a855f7]", description: "Luxury fashion boutique stationery and brand collateral." },
  { title: "Urban Eats Menu", category: "Product Design", tags: ["Product Design", "Print"], gradient: "from-[#f59e0b] via-[#f97316] to-[#ec4899]", description: "Restaurant menu design with full brand application." },
];

export default function GraphicsPortfolio() {
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section ref={ref} className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              Our Creative Work
            </div>
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight text-foreground mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Graphics{" "}
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-muted text-lg max-w-xl leading-relaxed">
              Logo design, brand identities, packaging, and visual design crafted to make your business unforgettable.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat
                    ? "bg-[#7c3aed] text-white shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                    : "border border-[var(--border-color)] text-muted hover:text-foreground hover:border-foreground/20 bg-[var(--card-bg)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-foreground/15 transition-all duration-500 cursor-pointer"
                >
                  {/* Visual */}
                  <div className={`relative h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <span
                      className="relative z-10 text-6xl font-extrabold text-white/20 group-hover:text-white/35 group-hover:scale-110 transition-all duration-500"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {project.title.charAt(0)}
                    </span>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold border border-white/30 px-5 py-2 rounded-full backdrop-blur-sm">
                        View Project →
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 bg-[var(--card-bg)] group-hover:bg-[var(--card-bg-hover)] transition-colors duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted tracking-widest uppercase">{project.category}</span>
                      <div className="flex gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-muted border border-[var(--border-color)]">
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
                    <p className="text-muted text-sm leading-relaxed">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
