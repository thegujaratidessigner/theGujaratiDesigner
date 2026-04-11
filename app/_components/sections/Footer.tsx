"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

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
    <footer ref={ref} id="contact" className="bg-[#0d0d0d] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >
          {/* Brand */}
          <div className="md:col-span-2">
            <p
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <span className="text-white">Gujarati</span>
              <span className="text-[#a855f7]">.</span>
            </p>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs mb-6">
              A creative design studio based in Ahmedabad, founded in 2018. We
              help businesses bring their ideas to life through powerful
              branding, graphics, websites, and video content.
            </p>

            {/* Email subscribe */}
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
              />
              <button className="px-5 py-2.5 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium transition-colors whitespace-nowrap">
                Subscribe →
              </button>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {["f", "in", "ig"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#a1a1aa] hover:border-[#7c3aed]/40 hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs text-[#a1a1aa] tracking-widest uppercase mb-5 font-semibold">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#a1a1aa] hover:text-white transition-colors"
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
          className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-[#a1a1aa]">
            <span>📞 +91 97977 98984</span>
            <span>✉️ thegujaratidesigner@gmail.com</span>
            <span>📍 Ahmedabad, Gujarat</span>
          </div>
          <p className="text-xs text-[#a1a1aa]">
            © {new Date().getFullYear()} The Gujarati Designer. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
