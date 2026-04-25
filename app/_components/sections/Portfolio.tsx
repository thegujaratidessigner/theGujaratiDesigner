"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type FeaturedProject = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  gradient: string;
};

export default function Portfolio({ featured }: { featured: FeaturedProject[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hasHeaderAnimated = useRef(false);

  useEffect(() => {
    if (!headerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          if (hasHeaderAnimated.current) return;
          hasHeaderAnimated.current = true;

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.fromTo(".port-label", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0);

          tl.fromTo(".port-desc", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.1);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const panels = sectionRef.current.querySelectorAll<HTMLElement>(".featured-panel");
    if (panels.length === 0) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return;
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
        });
      }

      panels.forEach((panel) => {
        const img = panel.querySelector(".panel-img");
        const text = panel.querySelectorAll(".panel-text-item");

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.15, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (text.length) {
          gsap.fromTo(
            text,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative bg-background">
      <div
        aria-hidden
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899 0%, #ec489922 35%, transparent 70%)" }}
      />

      <div ref={headerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-10 md:pt-32 pb-8 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="port-label text-sm text-[#7c3aed] font-semibold tracking-widest uppercase mb-4 opacity-0">
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
          <p className="port-desc text-muted max-w-sm leading-relaxed opacity-0">
            A curated selection of brand identities, websites, and digital campaigns
            we&apos;ve built for clients worldwide.
          </p>
        </div>
      </div>

      {featured.map((project, i) => (
        <div
          key={project.id}
          className="featured-panel relative min-h-0 md:min-h-screen flex items-center bg-background py-16 md:py-0 group/panel"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">
            <a
              href="https://drive.google.com/drive/folders/15WmQTvpNPtqFWbNrFG8dXmMEqgDn5_1V?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on Google Drive`}
              className={`grid lg:grid-cols-2 gap-12 items-center cursor-pointer block`}
              style={{ direction: i % 2 === 1 ? "rtl" : "ltr" }}
            >
              <div className="overflow-hidden rounded-3xl" style={{ direction: "ltr" }}>
                <div className="panel-img relative aspect-[4/3] opacity-0 transition-all duration-500 group-hover/panel:shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover/panel:scale-[1.01] rounded-3xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top rounded-3xl"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent rounded-b-3xl" />
                  <div className="absolute inset-0 rounded-3xl bg-foreground/0 group-hover/panel:bg-foreground/5 transition-colors duration-300" />
                </div>
              </div>

              <div style={{ direction: "ltr" }}>
                <div
                  className="panel-text-item opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[var(--card-bg)] text-xs font-semibold tracking-widest uppercase mb-6"
                  style={{ borderColor: `${project.accent}40`, color: project.accent }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
                  {project.category}
                </div>

                <h3
                  className="panel-text-item opacity-0 text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-4"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {project.title}
                </h3>

                <p className="panel-text-item opacity-0 text-muted text-lg leading-relaxed mb-8 max-w-md">
                  {project.description}
                </p>

                <div
                  className="panel-text-item opacity-0 flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover/panel:gap-3"
                  style={{ color: project.accent }}
                >
                  <span>View Project</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3">
            {featured.map((_, j) => (
              <div
                key={j}
                className={`transition-all duration-500 rounded-full ${
                  j === i ? "w-8 h-1.5 bg-[#7c3aed]" : "w-1.5 h-1.5 bg-foreground/15"
                }`}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-4 py-20 px-4 sm:px-8 lg:px-16">
        <Link
          href="/portfolio/graphics"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground/15 hover:border-[#a855f7]/50 text-foreground font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#7c3aed]/10 hover:scale-105 active:scale-95"
        >
          View Full Portfolio
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

