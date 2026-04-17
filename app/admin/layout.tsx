import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin – The Gujarati Designer",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {children}
    </div>
  );
}
