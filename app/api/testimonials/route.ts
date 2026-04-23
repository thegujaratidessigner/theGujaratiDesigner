import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseTestimonial } from "@/lib/validation";

export type Testimonial = { id: string; author: string; rating: number; text: string; time: string; photoUrl: string };

const DEFAULT: Testimonial[] = [
  { id: "1", author: "Mehul Shah", rating: 5, time: "", photoUrl: "", text: "The Gujarati Designer helped build my brand from scratch. Their team understood my vision and created a unique brand identity and website that perfectly fits my business. Highly recommended!" },
  { id: "2", author: "Viral Desai", rating: 5, time: "", photoUrl: "", text: "The Gujarati Designer is not just a logo designer — they are a complete branding and digital marketing solution provider. Their strategy-driven approach makes a real difference." },
  { id: "3", author: "Rina Patel", rating: 5, time: "", photoUrl: "", text: "Their website design and UI/UX skills are excellent. The website they developed for us is modern, responsive, and optimised for SEO and conversions." },
];

export async function GET() {
  const data = await readDataOr<Testimonial[]>("testimonials.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  if (body.length > 50) return NextResponse.json({ error: "Too many testimonials (max 50)" }, { status: 400 });

  const items: Testimonial[] = [];
  for (const item of body) {
    const r = parseTestimonial(item);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
    items.push(r.value);
  }

  await writeData("testimonials.json", items);
  return NextResponse.json(items);
}
