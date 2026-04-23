import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseFaqItem } from "@/lib/validation";

export type FaqItem = { id: string; q: string; a: string };

const DEFAULT: FaqItem[] = [
  { id: "1", q: "What services does The Gujarati Designer offer?", a: "We offer logo design, graphic design, website design & development, video creation & editing, social media marketing, branding packages, and festival poster design — all under one roof." },
  { id: "2", q: "Is The Gujarati Designer only a logo design company?", a: "No. While logo design is one of our core offerings, we are a full-service creative studio. We handle everything from brand strategy and identity to website development and digital marketing." },
  { id: "3", q: "Do you provide website design and development services?", a: "Yes. We design and develop SEO-optimised, mobile-responsive, high-performance websites that improve online visibility and generate real business leads." },
  { id: "4", q: "Do you offer Social Media Marketing (SMM) services?", a: "Absolutely. We create scroll-stopping visuals, engaging content strategies, and data-driven social media campaigns to grow your brand globally." },
  { id: "5", q: "How does your design and branding process work?", a: "Our process starts with discovery — understanding your business, audience, and goals. Then we move through strategy, design concepts, revisions, and final delivery with full brand guidelines." },
  { id: "6", q: "Who founded The Gujarati Designer?", a: "The Gujarati Designer was founded by Kunal Thacker on 9th February 2018 in Ahmedabad, India." },
];

export async function GET() {
  const data = await readDataOr<FaqItem[]>("faq.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  if (body.length > 50) return NextResponse.json({ error: "Too many FAQ items (max 50)" }, { status: 400 });

  const items: FaqItem[] = [];
  for (const item of body) {
    const r = parseFaqItem(item);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
    items.push(r.value);
  }

  await writeData("faq.json", items);
  return NextResponse.json(items);
}
