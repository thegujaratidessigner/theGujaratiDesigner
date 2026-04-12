"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutFounder() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-background relative overflow-hidden">
      {/* Accent */}
      <div
        aria-hidden
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              Founder &amp; Director
            </div>

            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Kunal{" "}
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Thacker
              </span>
            </h2>

            <p className="text-muted text-lg leading-relaxed mb-5">
              Kunal Thacker is the Founder &amp; Director of The Gujarati Designer,
              a globally serving creative design studio based in Ahmedabad. With
              a strong vision for building powerful brands and years of hands-on
              industry experience, he leads the studio with a focus on quality,
              strategy, and creative excellence.
            </p>

            <p className="text-muted text-lg leading-relaxed mb-8">
              Under his leadership, The Gujarati Designer has grown into a
              trusted name for branding, logo design, graphic design, website
              development, and digital creative solutions. His approach is deeply
              rooted in understanding the client&apos;s business goals and crafting
              designs that deliver real, measurable results.
            </p>

            {/* Skills/tags */}
            <div className="flex flex-wrap gap-2">
              {["Brand Strategy", "Logo Design", "Visual Identity", "Web Design", "Creative Direction", "Digital Marketing"].map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--border-color)] text-muted bg-[var(--card-bg)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Photo card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center"
          >
            {/* Card */}
            <div className="relative w-full max-w-sm">
              <div className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] aspect-[3/4]">
                {/* Gradient bg placeholder (replace with actual photo) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/40 via-[#4c1d95]/30 to-[#ec4899]/20" />
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Initials placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white text-3xl font-extrabold" style={{ fontFamily: "var(--font-syne)" }}>
                    KT
                  </div>
                  <p className="text-foreground font-bold text-lg" style={{ fontFamily: "var(--font-syne)" }}>Kunal Thacker</p>
                  <p className="text-muted text-sm">Founder &amp; Director</p>
                </div>
              </div>

              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-5 -right-5 bg-background border border-[var(--border-color)] rounded-2xl p-4 shadow-xl backdrop-blur-sm"
              >
                <p className="text-xs text-[#7c3aed] font-semibold uppercase tracking-widest mb-1">Founded</p>
                <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "var(--font-syne)" }}>2018</p>
                <p className="text-xs text-muted">Ahmedabad, India</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
