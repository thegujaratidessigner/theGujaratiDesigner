"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Services: [
    { label: "Logo Design", href: "#services" },
    { label: "Website Design", href: "#services" },
    { label: "Video Creation", href: "#services" },
    { label: "Social Media", href: "#services" },
    { label: "Branding Packages", href: "#services" },
  ],
  Company: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact Us", href: "#contact" },
  ],
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <footer ref={ref} id="contact" className="bg-background border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex mb-4">
              <Image
                src="/logo.png"
                alt="The Gujarati Designer"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
              A creative design studio based in Ahmedabad, founded in 2018. We
              help businesses bring their ideas to life through powerful
              branding, graphics, websites, and video content.
            </p>

            {/* Email subscribe */}
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="flex-1 px-4 py-2.5 rounded-full bg-foreground/5 border border-[var(--border-color)] text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
              />
              <button className="px-5 py-2.5 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium transition-colors whitespace-nowrap">
                Subscribe →
              </button>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {/* Facebook */}
              <a
                href="https://facebook.com/thegujaratidesigner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#7c3aed]/40 hover:text-foreground transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com/thegujaratidesigner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#7c3aed]/40 hover:text-foreground transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/thegujaratidesigner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#7c3aed]/40 hover:text-foreground transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs text-muted tracking-widest uppercase mb-5 font-semibold">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Contact info + bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted">
            <span>📞 +91 97977 98984</span>
            <span>✉️ thegujaratidesigner@gmail.com</span>
            <span>📍 Ahmedabad, Gujarat</span>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} The Gujarati Designer. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
