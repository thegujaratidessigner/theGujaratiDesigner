import AdminNav from "./_components/AdminNav";
import { readData } from "@/lib/db";
import type { FeaturedProject } from "../_components/sections/Portfolio";
import type { ServiceItem } from "../_components/sections/Services";
import type { WebsiteProject } from "../_components/sections/portfolio/WebsitePortfolio";
import type { GraphicsProject } from "../_components/sections/portfolio/GraphicsPortfolio";
import type { PackagesData } from "../_components/sections/services/ServicesPricing";

export default async function AdminDashboard() {
  const [featuredRes, servicesRes, websiteRes, graphicsRes, packagesRes] = await Promise.allSettled([
    readData<FeaturedProject[]>("featured.json"),
    readData<ServiceItem[]>("services.json"),
    readData<WebsiteProject[]>("projects-website.json"),
    readData<GraphicsProject[]>("projects-graphics.json"),
    readData<PackagesData>("packages.json"),
  ]);

  const emptyPackages: PackagesData = {
    logo: [], combo: [], website: [], social: [],
    addon: { services: [], stationary: [], product: [] },
  };

  const featured = featuredRes.status === "fulfilled" ? featuredRes.value : [];
  const services = servicesRes.status === "fulfilled" ? servicesRes.value : [];
  const websiteProjects = websiteRes.status === "fulfilled" ? websiteRes.value : [];
  const graphicsProjects = graphicsRes.status === "fulfilled" ? graphicsRes.value : [];
  const packages = packagesRes.status === "fulfilled" ? packagesRes.value : emptyPackages;

  const packageCount =
    packages.logo.length +
    packages.combo.length +
    packages.website.length +
    packages.social.length +
    packages.addon.services.length +
    packages.addon.stationary.length +
    packages.addon.product.length;

  const stats = [
    { label: "Featured Projects", value: featured.length, href: "/admin/featured", accent: "#a855f7" },
    { label: "Website Projects", value: websiteProjects.length, href: "/admin/projects", accent: "#ec4899" },
    { label: "Graphics Projects", value: graphicsProjects.length, href: "/admin/projects", accent: "#f59e0b" },
    { label: "Services", value: services.length, href: "/admin/services", accent: "#10b981" },
    { label: "Packages & Add-ons", value: packageCount, href: "/admin/packages", accent: "#7c3aed" },
  ];

  const quickLinks = [
    { href: "/admin/featured", label: "Manage Featured", desc: "Home page scroll panels", icon: "✦" },
    { href: "/admin/projects", label: "Manage Portfolio", desc: "Website & graphics projects", icon: "⬛" },
    { href: "/admin/services", label: "Manage Services", desc: "Home page service cards", icon: "◉" },
    { href: "/admin/packages", label: "Manage Packages", desc: "Pricing & add-on services", icon: "◈" },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-white/40 mt-1">Overview of your site content</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {stats.map((stat) => (
              <a
                key={stat.label}
                href={stat.href}
                className="group p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all"
              >
                <p className="text-3xl font-extrabold text-white mb-1" style={{ color: stat.accent }}>
                  {stat.value}
                </p>
                <p className="text-xs text-white/40 leading-snug group-hover:text-white/60 transition-colors">
                  {stat.label}
                </p>
              </a>
            ))}
          </div>

          {/* Quick links */}
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {quickLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-[#7c3aed]/30 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/20 border border-[#7c3aed]/30 flex items-center justify-center text-sm text-[#a855f7] shrink-0 group-hover:bg-[#7c3aed]/30 transition-colors">
                  {link.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-[#a855f7] transition-colors">{link.label}</p>
                  <p className="text-xs text-white/40">{link.desc}</p>
                </div>
                <svg className="ml-auto text-white/20 group-hover:text-white/50 transition-colors" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ))}
          </div>

          {/* View site link */}
          <div className="mt-8 pt-8 border-t border-white/8">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              View live site ↗
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
