"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

export type WebsiteProject = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  gradient: string;
  description: string;
  url: string;
  href: string;
};

const DEFAULT_CATEGORIES = ["All", "Business", "E-Commerce", "Food & Lifestyle", "Real Estate"];

function ScreenshotImage({ href, title }: { href: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const src = `https://s0.wp.com/mshots/v1/${encodeURIComponent(href)}?w=1280&h=720`;

  return (
    <div className="absolute inset-0 top-7">
      {!loaded && !errored && (
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.6s infinite linear",
            }}
          />
        </div>
      )}
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={title}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

export default function WebsitePortfolio({ projects }: { projects: WebsiteProject[] }) {
  const [active, setActive] = useState("All");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Derive categories from the actual projects data
  const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
  const categories = ["All", ...DEFAULT_CATEGORIES.slice(1).filter((c) => projectCategories.includes(c)), ...projectCategories.filter((c) => !DEFAULT_CATEGORIES.includes(c))];

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section ref={ref} className="min-h-screen bg-background pt-20">
      <div className="relative py-14 md:py-20 px-4 sm:px-6 overflow-hidden">
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

      <div className="px-4 sm:px-6 pb-10">
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

      <div className="px-4 sm:px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] hover:border-foreground/15 transition-all duration-500 cursor-pointer"
                >
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    <div className="absolute top-0 left-0 right-0 z-10 h-7 bg-[#1e1e1e]/90 backdrop-blur-sm flex items-center px-3 gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                      <div className="mx-auto px-3 py-0.5 rounded-md bg-white/10 text-white/40 text-[9px] font-mono truncate max-w-[180px]">
                        {project.url}
                      </div>
                    </div>
                    <ScreenshotImage href={project.href} title={project.title} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <span className="text-white text-sm font-semibold border border-white/30 px-5 py-2 rounded-full backdrop-blur-sm">
                        Visit Website ↗
                      </span>
                    </div>
                  </div>

                  <div className="p-5 bg-[var(--card-bg)] group-hover:bg-[var(--card-bg-hover)] transition-colors duration-300">
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
                      className="text-foreground font-bold text-base mb-1 group-hover:text-[#ec4899] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed">{project.description}</p>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
