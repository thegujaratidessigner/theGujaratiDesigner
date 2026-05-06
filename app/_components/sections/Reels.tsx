"use client";

import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Edit this list to update the featured reels/work shown on the homepage.
// Keep it 4–6 items for a clean grid. Each card needs:
//   - title:        short name shown on the card
//   - category:     small label above the title (e.g. "Branding")
//   - href:         the Instagram reel/post URL
//   - thumbnail:    optional. If provided, the image is loaded from /public.
//                   If omitted, a branded gradient placeholder is rendered.
//   - accent:       Tailwind gradient classes used for the placeholder.
// ─────────────────────────────────────────────────────────────────────────────
type Reel = {
  id: string;
  title: string;
  category: string;
  href: string;
  thumbnail?: string;
  accent: string;
};

const INSTAGRAM_PROFILE = "https://www.instagram.com/the_gujarati_designer";

const REELS: Reel[] = [
  {
    id: "r1",
    title: "Brand Identity Reveal",
    category: "Branding",
    href: INSTAGRAM_PROFILE,
    accent: "from-fuchsia-500 via-purple-600 to-indigo-600",
  },
  {
    id: "r2",
    title: "Logo Animation",
    category: "Logo Design",
    href: INSTAGRAM_PROFILE,
    accent: "from-orange-400 via-pink-500 to-purple-600",
  },
  {
    id: "r3",
    title: "Website Launch",
    category: "Web Design",
    href: INSTAGRAM_PROFILE,
    accent: "from-cyan-400 via-blue-500 to-indigo-600",
  },
  {
    id: "r4",
    title: "Social Campaign",
    category: "Social Media",
    href: INSTAGRAM_PROFILE,
    accent: "from-emerald-400 via-teal-500 to-cyan-600",
  },
  {
    id: "r5",
    title: "Packaging Design",
    category: "Print",
    href: INSTAGRAM_PROFILE,
    accent: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: "r6",
    title: "Motion Graphics",
    category: "Video",
    href: INSTAGRAM_PROFILE,
    accent: "from-violet-500 via-purple-600 to-pink-500",
  },
];

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function Reels() {
  return (
    <section
      aria-labelledby="reels-heading"
      className="relative px-4 sm:px-8 lg:px-12 py-20 md:py-28"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-block text-xs sm:text-sm uppercase tracking-[0.2em] text-muted mb-3">
            Featured Work
          </span>
          <h2
            id="reels-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Our Latest Work &amp;{" "}
            <span className="bg-gradient-to-r from-[#a855f7] via-[#d946ef] to-[#ec4899] bg-clip-text text-transparent">
              Reels
            </span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Explore our recent design, branding, website and creative work.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {REELS.map((reel) => (
            <a
              key={reel.id}
              href={reel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(124,58,237,0.18)]"
            >
              {/* Thumbnail (1:1 square — perfect for IG reel covers) */}
              <div className="relative aspect-square overflow-hidden">
                {reel.thumbnail ? (
                  <Image
                    src={reel.thumbnail}
                    alt={reel.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${reel.accent}`}
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
                      backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6) 0, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.4) 0, transparent 60%)",
                    }} />
                  </div>
                )}

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/95 text-[#6d2ff0] flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
                    <PlayIcon />
                  </div>
                </div>

                {/* Top-left category pill */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/55 backdrop-blur-sm text-white text-[11px] font-semibold tracking-wide">
                    {reel.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                  {reel.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#a855f7] group-hover:text-[#d946ef] transition-colors">
                  <InstagramIcon size={15} />
                  Watch on Instagram
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12 md:mt-14">
          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(217,70,239,0.45)]"
            style={{ backgroundImage: "linear-gradient(135deg, #f97316 0%, #d946ef 50%, #7c3aed 100%)" }}
          >
            <InstagramIcon size={18} />
            View More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
