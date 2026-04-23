"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactMap({ mapsEmbedUrl }: { mapsEmbedUrl: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="pb-16 md:pb-24 px-4 sm:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-[0_8px_40px_rgba(0,0,0,0.2)] h-[260px] sm:h-[380px] md:h-[460px]"
        >
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="The Gujarati Designer — Ahmedabad, Gujarat"
          />
        </motion.div>
      </div>
    </section>
  );
}
