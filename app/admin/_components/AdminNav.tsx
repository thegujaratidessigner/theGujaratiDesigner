"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "⬡" },
  { href: "/admin/featured", label: "Featured", icon: "✦" },
  { href: "/admin/projects", label: "Portfolio", icon: "⬛" },
  { href: "/admin/services", label: "Services", icon: "◉" },
  { href: "/admin/packages", label: "Packages", icon: "◈" },
  { href: "/admin/stats", label: "Hero Stats", icon: "◎" },
  { href: "/admin/faq", label: "FAQ", icon: "?" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "★" },
  { href: "/admin/about-content", label: "About Content", icon: "◑" },
  { href: "/admin/site-settings", label: "Site Settings", icon: "⚙" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-56 bg-white/3 border-r border-white/8 flex flex-col z-40">
      {/* Brand */}
      <div className="px-5 py-6 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#ec4899] flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-none">TGD Admin</p>
            <p className="text-[10px] text-white/30 mt-0.5">Content Manager</p>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-[#7c3aed]/20 text-white border border-[#7c3aed]/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-xs w-4 text-center">{icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all disabled:opacity-30"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          {loggingOut ? "Signing out…" : "Sign Out"}
        </button>
      </div>
    </aside>
  );
}
