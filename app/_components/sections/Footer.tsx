"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import type { FooterLinks } from "@/app/api/footer-links/route";

export default function Footer({ footerLinks }: { footerLinks: FooterLinks }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      // Brand column
      gsap.fromTo(
        ".footer-brand",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );

      // Link columns stagger
      const cols = gsap.utils.toArray<Element>(".footer-col", ref.current);
      if (cols.length) {
        gsap.fromTo(
          cols,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
          }
        );
      }

      // Bottom bar
      gsap.fromTo(
        ".footer-bottom",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer-bottom", start: "top 95%", once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={ref} id="contact" className="bg-background border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="footer-brand md:col-span-2 opacity-0">
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

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://facebook.com/thegujaratidesigner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#7c3aed]/40 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/the_gujarati_designer?igsh=N2JoMjk0cTZ2enl0"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#7c3aed]/40 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/thegujaratidesigner"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[var(--border-color)] flex items-center justify-center text-muted hover:border-[#7c3aed]/40 hover:text-foreground hover:-translate-y-0.5 transition-all duration-200"
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
            <div key={category} className="footer-col opacity-0">
              <p className="text-xs text-muted tracking-widest uppercase mb-5 font-semibold">
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#a855f7] to-[#ec4899] group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info + bottom bar */}
        <div className="footer-bottom mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 opacity-0">
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted">
            <span>+91 97977 98984</span>
            <span>thegujaratidesigner@gmail.com</span>
            <span>Ahmedabad, Gujarat</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted">
            <p>© {new Date().getFullYear()} The Gujarati Designer. All rights reserved.</p>
            <Link
              href="/terms"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
