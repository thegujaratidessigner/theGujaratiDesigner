import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseFooterLinks } from "@/lib/validation";

export type FooterLink = { label: string; href: string };
export type FooterLinks = Record<string, FooterLink[]>;

const DEFAULT: FooterLinks = {
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
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export async function GET() {
  const data = await readDataOr<FooterLinks>("footer-links.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const r = parseFooterLinks(body);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  await writeData("footer-links.json", r.value);
  return NextResponse.json(r.value);
}
