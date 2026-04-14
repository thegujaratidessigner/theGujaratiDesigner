"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = ["All", "Business", "E-Commerce", "Food & Lifestyle", "Real Estate"];

const projects = [
  {
    title: "Avniri",
    category: "E-Commerce",
    tags: ["E-Commerce", "Fashion"],
    gradient: "from-[#db2777] via-[#ec4899] to-[#a855f7]",
    description: "Fashion brand online store with curated collections and mobile-first design.",
    url: "avniri.in",
    href: "https://www.avniri.in",
  },
  {
    title: "Hitarva",
    category: "Business",
    tags: ["Business", "Web Dev"],
    gradient: "from-[#059669] via-[#10b981] to-[#6366f1]",
    description: "Professional business website built for credibility and lead generation.",
    url: "hitarva.com",
    href: "https://hitarva.com",
  },
  {
    title: "Advanced Modern Concepts",
    category: "Business",
    tags: ["Business", "Corporate"],
    gradient: "from-[#475569] via-[#6366f1] to-[#7c3aed]",
    description: "Corporate business website with service showcases and professional branding.",
    url: "advancedmodernconcepts.com",
    href: "https://advancedmodernconcepts.com",
  },
  {
    title: "Curious Wings",
    category: "Business",
    tags: ["Business", "Web Dev"],
    gradient: "from-[#0ea5e9] via-[#6366f1] to-[#7c3aed]",
    description: "Creative brand website with modern UI and engaging animations.",
    url: "curiouswings.com",
    href: "https://www.curiouswings.com",
  },
  {
    title: "Perfumeesh",
    category: "E-Commerce",
    tags: ["E-Commerce", "Fragrance"],
    gradient: "from-[#9333ea] via-[#a855f7] to-[#f472b6]",
    description: "Fragrance brand e-commerce with a premium, sensory-first design approach.",
    url: "perfumeesh.com",
    href: "https://perfumeesh.com",
  },
  {
    title: "Prabhav Veda",
    category: "Food & Lifestyle",
    tags: ["Wellness", "E-Commerce"],
    gradient: "from-[#84cc16] via-[#16a34a] to-[#d97706]",
    description: "Ayurveda & wellness brand website with online product store.",
    url: "prabhavveda.in",
    href: "https://prabhavveda.in",
  },
  {
    title: "Funbox Property",
    category: "Real Estate",
    tags: ["Real Estate", "Business"],
    gradient: "from-[#1e40af] via-[#3b82f6] to-[#7c3aed]",
    description: "Real estate platform with property listings, enquiry forms, and smooth UX.",
    url: "funboxproperty.com",
    href: "https://funboxproperty.com",
  },
  {
    title: "Xavi Jewels",
    category: "E-Commerce",
    tags: ["E-Commerce", "Jewellery"],
    gradient: "from-[#d97706] via-[#b45309] to-[#a855f7]",
    description: "Luxury jewellery e-commerce store with refined product showcasing.",
    url: "xavijewels.com",
    href: "https://xavijewels.com",
  },
  {
    title: "Aditya Vardhan Corp",
    category: "Business",
    tags: ["Business", "Corporate"],
    gradient: "from-[#1e3a5f] via-[#1e40af] to-[#d97706]",
    description: "Corporate group website built to reflect authority and brand trust.",
    url: "adityavardhancorp.com",
    href: "https://adityavardhancorp.com",
  },
  {
    title: "Ziwa Jewels",
    category: "E-Commerce",
    tags: ["E-Commerce", "Jewellery"],
    gradient: "from-[#ec4899] via-[#f472b6] to-[#d97706]",
    description: "Elegant jewellery e-commerce store with curated collections and smooth checkout.",
    url: "ziwajewels.com",
    href: "https://ziwajewels.com",
  },
  
  {
    title: "M-Line Logistics",
    category: "Business",
    tags: ["Logistics", "Business"],
    gradient: "from-[#0369a1] via-[#0ea5e9] to-[#6366f1]",
    description: "Logistics company website with service breakdowns and enquiry management.",
    url: "mlinelogistics.com",
    href: "https://mlinelogistics.com",
  },
  {
    title: "Maison Ether",
    category: "E-Commerce",
    tags: ["E-Commerce", "Lifestyle"],
    gradient: "from-[#4c1d95] via-[#7c3aed] to-[#ec4899]",
    description: "High-end fashion & lifestyle brand with an immersive shopping experience.",
    url: "maisonether.in",
    href: "https://www.maisonether.in",
  },
  {
    title: "RS Prime Group",
    category: "Real Estate",
    tags: ["Real Estate", "Business"],
    gradient: "from-[#292524] via-[#44403c] to-[#d97706]",
    description: "Premium real estate group website with project showcases and lead capture.",
    url: "rsprimegroup.com",
    href: "https://rsprimegroup.com",
  },
  {
    title: "The Shahi Bites",
    category: "Food & Lifestyle",
    tags: ["Food", "Business"],
    gradient: "from-[#dc2626] via-[#f97316] to-[#d97706]",
    description: "Food brand website with rich visuals, menu showcasing, and online presence.",
    url: "theshahibites.com",
    href: "https://theshahibites.com",
  },
  {
    title: "Kakooshah Jewels",
    category: "E-Commerce",
    tags: ["E-Commerce", "Jewellery"],
    gradient: "from-[#b45309] via-[#f59e0b] to-[#ec4899]",
    description: "Heritage jewellery brand e-commerce with rich product photography integration.",
    url: "kakooshahjewels.com",
    href: "https://kakooshahjewels.com",
  },
  {
    title: "Radhey Foods",
    category: "Food & Lifestyle",
    tags: ["Food", "E-Commerce"],
    gradient: "from-[#16a34a] via-[#84cc16] to-[#f59e0b]",
    description: "Food products brand website with clean design and online ordering capability.",
    url: "radhey-foods.com",
    href: "https://www.radhey-foods.com",
  },
];

function ScreenshotImage({ href, title }: { href: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const src = `https://s0.wp.com/mshots/v1/${encodeURIComponent(href)}?w=1280&h=720`;

  return (
    <div className="absolute inset-0 top-7">
      {/* Shimmer shown while loading */}
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

      {/* Actual screenshot — invisible until loaded */}
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
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.a
                  key={project.title}
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
                  {/* Browser mockup visual */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                    {/* Browser chrome bar */}
                    <div className="absolute top-0 left-0 right-0 z-10 h-7 bg-[#1e1e1e]/90 backdrop-blur-sm flex items-center px-3 gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                      <div className="mx-auto px-3 py-0.5 rounded-md bg-white/10 text-white/40 text-[9px] font-mono truncate max-w-[180px]">
                        {project.url}
                      </div>
                    </div>

                    {/* Actual screenshot */}
                    <ScreenshotImage href={project.href} title={project.title} />

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <span className="text-white text-sm font-semibold border border-white/30 px-5 py-2 rounded-full backdrop-blur-sm">
                        Visit Website ↗
                      </span>
                    </div>
                  </div>

                  {/* Info */}
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
