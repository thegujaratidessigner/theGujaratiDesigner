"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = ["All", "Business", "E-Commerce", "Portfolio", "Landing Page", "Law & Legal"];

const projects = [
  {
    title: "Apex Legal Associates",
    category: "Law & Legal",
    tags: ["UI/UX", "Web Dev"],
    gradient: "from-[#1e3a5f] via-[#1e40af] to-[#7c3aed]",
    description: "Modern law firm website with SEO optimisation and lead generation focus.",
    url: "apexlegal.in",
  },
  {
    title: "Bloom Florals & Co.",
    category: "E-Commerce",
    tags: ["E-commerce", "SEO"],
    gradient: "from-[#ec4899] via-[#a855f7] to-[#6366f1]",
    description: "E-commerce store with custom CMS, mobile-first design, and conversion optimisation.",
    url: "bloomflorals.in",
  },
  {
    title: "TechNova Solutions",
    category: "Business",
    tags: ["UI/UX", "Web Dev"],
    gradient: "from-[#10b981] via-[#059669] to-[#7c3aed]",
    description: "Corporate tech website with animated sections and service showcases.",
    url: "technova.io",
  },
  {
    title: "Kunal Thacker Creative",
    category: "Portfolio",
    tags: ["Portfolio", "UI/UX"],
    gradient: "from-[#7c3aed] via-[#9333ea] to-[#ec4899]",
    description: "Personal portfolio for a creative director with project showcase.",
    url: "kunalthacker.com",
  },
  {
    title: "FreshByte Cafe",
    category: "Landing Page",
    tags: ["Landing Page", "SEO"],
    gradient: "from-[#f59e0b] via-[#d97706] to-[#ec4899]",
    description: "High-converting landing page for a cafe with online booking integration.",
    url: "freshbytecafe.in",
  },
  {
    title: "Golden Spice Restaurant",
    category: "Business",
    tags: ["Business", "SEO"],
    gradient: "from-[#6366f1] via-[#4f46e5] to-[#ec4899]",
    description: "Restaurant website with menu, reservation system, and Google Maps integration.",
    url: "goldenspice.in",
  },
  {
    title: "SteelForce Gym",
    category: "Landing Page",
    tags: ["Landing Page", "UI/UX"],
    gradient: "from-[#ef4444] via-[#dc2626] to-[#7c3aed]",
    description: "Fitness studio landing page with membership plans and online sign-up.",
    url: "steelforce.in",
  },
  {
    title: "Nari Fashion Store",
    category: "E-Commerce",
    tags: ["E-commerce", "Web Dev"],
    gradient: "from-[#f472b6] via-[#ec4899] to-[#a855f7]",
    description: "Full-featured fashion e-commerce with filters, wishlist, and payment gateway.",
    url: "narifashion.in",
  },
];

const techStack: Record<string, string[]> = {
  "Business": ["Next.js", "Tailwind", "SEO"],
  "E-Commerce": ["Next.js", "Stripe", "CMS"],
  "Portfolio": ["React", "Framer Motion"],
  "Landing Page": ["HTML/CSS", "JS", "SEO"],
  "Law & Legal": ["Next.js", "SEO", "CRM"],
};

export default function WebsitePortfolio() {
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
          className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ec4899]/30 bg-[#ec4899]/10 text-[#ec4899] text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899]" />
              Web Design & Development
            </div>
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight text-foreground mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Website{" "}
              <span className="bg-gradient-to-r from-[#ec4899] to-[#a855f7] bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-muted text-lg max-w-xl leading-relaxed">
              SEO-optimised, mobile-responsive websites built for performance, conversions, and real business growth.
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
                    ? "bg-[#ec4899] text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]"
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
          <motion.div layout className="grid md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-foreground/15 transition-all duration-500 cursor-pointer"
                >
                  {/* Browser mockup visual */}
                  <div className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    {/* Browser bar */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-black/30 backdrop-blur-sm flex items-center px-4 gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                      <div className="mx-auto px-4 py-0.5 rounded bg-white/10 text-white/50 text-[10px] font-mono">
                        {project.url}
                      </div>
                    </div>

                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pt-8">
                      <span
                        className="text-7xl font-extrabold text-white/15 group-hover:text-white/25 group-hover:scale-110 transition-all duration-500"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {project.title.charAt(0)}
                      </span>
                    </div>

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
                      className="text-foreground font-bold text-lg mb-1.5 group-hover:text-[#ec4899] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

                    {/* Tech stack */}
                    {techStack[project.category] && (
                      <div className="flex gap-2 flex-wrap">
                        {techStack[project.category].map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2.5 py-1 rounded-full bg-[#ec4899]/10 text-[#ec4899] border border-[#ec4899]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
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
