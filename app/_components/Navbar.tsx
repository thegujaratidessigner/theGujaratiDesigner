"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  {
    label: "Portfolio",
    href: "#portfolio",
    dropdown: [
      { label: "Website Portfolio", href: "/portfolio/website" },
      { label: "Graphics Portfolio", href: "/portfolio/graphics" },
      { label: "UGC Portfolio", href: "https://drive.google.com/drive/folders/1eyH_NnQze8zOVHb_iq5PusZM5gDP3IWD?usp=drive_link", external: true },
    ],
  },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Logo Design", href: "/services#logo" },
      { label: "Combo Packages", href: "/services#combo" },
      { label: "Website Design Packages", href: "/services#website" },
      { label: "Social Media Management", href: "/services#social" },
      { label: "Other Design Services", href: "/services#other" },
    ],
  },
  { label: "Contact US", href: "/contact-us" },
];

function NavDropdown({ link, onClose }: { link: typeof navLinks[number]; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  let timer: ReturnType<typeof setTimeout>;

  const show = () => { clearTimeout(timer); setOpen(true); };
  const hide = () => { timer = setTimeout(() => setOpen(false), 120); };

  if (!link.dropdown) {
    return (
      <Link
        href={link.href}
        className="text-sm text-muted hover:text-foreground transition-colors duration-200 relative group"
      >
        {link.label}
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#a855f7] to-[#ec4899] group-hover:w-full transition-all duration-300" />
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors duration-200 relative group">
        {link.label}
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#a855f7] to-[#ec4899] group-hover:w-full transition-all duration-300" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[220px] rounded-2xl border border-[var(--border-color)] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]"
            style={{ background: "var(--nav-bg)", backdropFilter: "blur(20px)" }}
          >
            {link.dropdown.map((item, i) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`flex items-center gap-3 px-4 py-3 text-sm text-muted hover:text-foreground hover:bg-[var(--card-bg)] transition-all duration-150 ${
                  i < link.dropdown!.length - 1 ? "border-b border-[var(--border-color)]" : ""
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#a855f7] to-[#ec4899] shrink-0" />
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl border-b border-[var(--border-color)] shadow-[0_1px_40px_rgba(0,0,0,0.2)]"
            : "bg-transparent"
        }`}
        style={scrolled ? { background: "var(--nav-bg)" } : undefined}
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="The Gujarati Designer"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavDropdown key={link.label} link={link} onClose={() => setMenuOpen(false)} />
            ))}
          </nav>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors"
            >
              View Brochure
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-foreground origin-center transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-foreground origin-center transition-all"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-6 md:hidden overflow-y-auto py-20"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center gap-2 text-center"
              >
                {link.dropdown ? (
                  <>
                    <span
                      className="text-xl font-bold text-muted"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {link.label}
                    </span>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        {...("external" in item && item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-base text-foreground hover:text-[#a855f7] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-bold text-foreground hover:text-[#a855f7] transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
            >
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#7c3aed] text-white text-sm font-semibold shadow-[0_0_36px_rgba(124,58,237,0.45)]"
              >
                View Brochure
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
