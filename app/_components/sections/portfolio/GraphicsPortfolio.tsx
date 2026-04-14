"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLenis } from "../../SmoothScroll";

const categories = ["All", "Logo Design", "2D Designs", "Brand Identity", "Product Design", "Printables", "Social Media"];

const projects = [
  // Logo Design
  {
    title: "Logo Design Collection",
    category: "Logo Design",
    description: "Naari Weaver, Dhonenath, Shawarma Walla, The Grand Palm's, Ethnico, MR Private, Infinity, Hotel GL RINN, Murli Sweets, Rajadhiraj, Khan Era, Astha, Naruvi & more.",
    image: "/portfolio/graphics/logo-design.png",
    count: "15+ Logos",
    bg: "bg-[#1a1a2e]",
  },

  // 2D Designs
  {
    title: "2D Designs — Vol. 1",
    category: "2D Designs",
    description: "Mamo Katta, OSM, Diesel Daddy, Shankh Kranti, Ameerix, Patilji, USA Cargo Bridge, AGI, Chatty & Scatty, Dr. Krishna's Dental Care, Prem Tea Stall, Shiva Book, The Column Space.",
    image: "/portfolio/graphics/2d-designs-1.png",
    count: "14 Designs",
    bg: "bg-white",
  },
  {
    title: "2D Designs — Vol. 2",
    category: "2D Designs",
    description: "Tastura Foods, Studio Bright Lens, Kalyan Photography, Classic Rolls, Rushab Dryfruits, Sasta Mobile, XSRP Industries, Radha Krishna Textile, The CK Salon, Morvi Agro, Divisha, Future Plan Facilities.",
    image: "/portfolio/graphics/2d-designs-2.png",
    count: "12 Designs",
    bg: "bg-white",
  },

  // Brand Identity
  {
    title: "Brand Identity — Vol. 1",
    category: "Brand Identity",
    description: "Full brand identity systems for Krishna Dryfruit (multiple logo variants + packaging), Juco (logo + bottle mockups), and Shankh Kranti (spice jar & pouch packaging).",
    image: "/portfolio/graphics/brand-identity-1.png",
    count: "3 Projects",
    bg: "bg-[#f5f5f0]",
  },
  {
    title: "Brand Identity — Vol. 2",
    category: "Brand Identity",
    description: "Complete brand systems for AGI (Aurum Global Immigration), Swastik, Keylot Overseas Private Limited, MPS Ambica, Cliniroots, WoodWell Candles, and GVK Sports.",
    image: "/portfolio/graphics/brand-identity-2.png",
    count: "7 Projects",
    bg: "bg-[#3a1f6e]",
  },
  {
    title: "Logo Design Process",
    category: "Brand Identity",
    description: "Behind-the-scenes look at the handcrafted logo design process — sketches to final mark for ACR Technical Center, Rubaani Exports, NFC Premium Cafe, Marvella, and Tillage.",
    image: "/portfolio/graphics/logo-process.png",
    count: "5 Projects",
    bg: "bg-[#3a1f6e]",
  },

  // Printables
  {
    title: "Printables & Stationery",
    category: "Printables",
    description: "Complete stationery suites — visiting cards, letterheads, envelopes, and invoice designs for Shirke Hospital, ELS, DS Intox, Polaris, and Olim.",
    image: "/portfolio/graphics/printables.png",
    count: "5 Projects",
    bg: "bg-white",
  },

  // Product Design
  {
    title: "Product Design — Vol. 1",
    category: "Product Design",
    description: "Packaging design for Bom Gusceuz chips, Jojoba extract, Matcha, Farm Fresh Green Beans, Healthyfood, Lafgawan, Sugar Free, Mushroom Coffee, Orange Made Drink, VAV Athletic Values, Ameerix Block Jointer.",
    image: "/portfolio/graphics/product-design-1.png",
    count: "11 Designs",
    bg: "bg-[#2a1a6e]",
  },
  {
    title: "Product Design — Vol. 2",
    category: "Product Design",
    description: "Premium product visuals — Organic Juice (Cherry & Peach), Guava drink, Devil Energy Drink, Makhana snacks, and ZLYN Advanced Skin Wellness face cream.",
    image: "/portfolio/graphics/product-design-2.png",
    count: "5 Projects",
    bg: "bg-[#3a1f6e]",
  },
  {
    title: "Product Design — Hitarva & Artiss",
    category: "Product Design",
    description: "Stand-up pouch designs for Hitarva Roasted Makhana (Pista, Tangy Tomato, Cheese) and Artiss Pure & Organic spices (Black Pepper, Jeera, Jaifal).",
    image: "/portfolio/graphics/product-design-3.png",
    count: "6 Designs",
    bg: "bg-white",
  },
  {
    title: "Product Design — Food Packaging",
    category: "Product Design",
    description: "Large-scale food product packaging for Bahurani Atta, RS Gold Atta & Mogra Rice, and Shajar Natural dehydrated powders (Red Onion, Mint Leaf, Garlic).",
    image: "/portfolio/graphics/product-design-4.png",
    count: "9 Designs",
    bg: "bg-white",
  },
  {
    title: "Product Design — Heavenmist",
    category: "Product Design",
    description: "Complete product range label design for Heavenmist — natural home care products including surface cleaners, floor cleaners, and hand wash with lifestyle photography.",
    image: "/portfolio/graphics/product-design-5.png",
    count: "1 Brand",
    bg: "bg-white",
  },

  // Social Media
  {
    title: "Social Media — Branding Posts",
    category: "Social Media",
    description: "High-converting promotional creatives for Social Cardify — website offer campaigns, service advertisements, referral programs, and brand awareness posts.",
    image: "/portfolio/graphics/social-media-branding.png",
    count: "6 Posts",
    bg: "bg-[#0a1128]",
  },
  {
    title: "Social Media — Vol. 1",
    category: "Social Media",
    description: "Festival, product, and promo posts for Ameerix, Financepe, Momokatta, Rajdhani Chai, Xavi Jewels, Deshi Tokri, Column Space, Shajar Natural, and Pandit Herbs.",
    image: "/portfolio/graphics/social-media-1.png",
    count: "9 Posts",
    bg: "bg-[#1a1a1a]",
  },
  {
    title: "Social Media — Vol. 2",
    category: "Social Media",
    description: "Creative social media posts for Nammha Vidya, Ckyin, Elite Academy, Hari Pure Ghee, Food Travel, Leo Kynd, Shival Hospital, Tevi, and Bechdu.",
    image: "/portfolio/graphics/social-media-2.png",
    count: "9 Posts",
    bg: "bg-[#1a1a1a]",
  },
];

export default function GraphicsPortfolio() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const lenisRef = useLenis();

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  // Stop Lenis + lock page scroll when lightbox is open
  useEffect(() => {
    if (lightbox) {
      lenisRef?.current?.stop();
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      lenisRef?.current?.start();
      const scrollY = parseInt(document.body.style.top || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, -scrollY);
    }
    return () => {
      lenisRef?.current?.start();
      const scrollY = parseInt(document.body.style.top || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, -scrollY);
    };
  }, [lightbox, lenisRef]);

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
              Logo design, brand identities, product packaging, printables, and social media creatives — 2018 to 2026.
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
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  onClick={() => setLightbox(project.image)}
                >
                  {/* Image preview */}
                  <div className={`relative h-72 ${project.bg} overflow-hidden`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={i < 3}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold border border-white/30 px-5 py-2.5 rounded-full backdrop-blur-sm flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                        View Full Sheet
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 bg-[var(--card-bg)] group-hover:bg-[var(--card-bg-hover)] transition-colors duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted tracking-widest uppercase">{project.category}</span>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#7c3aed]/10 text-[#a855f7] border border-[#7c3aed]/20 font-medium">
                        {project.count}
                      </span>
                    </div>
                    <h3
                      className="text-foreground font-bold text-base mb-1.5 group-hover:text-[#a855f7] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed line-clamp-2">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md"
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="fixed top-5 right-5 z-[110] w-10 h-10 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors border border-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Scrollable area — stopPropagation prevents Lenis from hijacking wheel/touch */}
            <div
              className="absolute inset-0 overflow-y-auto overscroll-contain"
              onClick={() => setLightbox(null)}
              onWheel={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-2xl mx-auto my-10 px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightbox}
                  alt="Portfolio sheet"
                  width={800}
                  height={1200}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
