import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseCta } from "@/lib/validation";

export type CtaSettings = { headline: string; subtext: string; buttonText: string; buttonHref: string };

const DEFAULT: CtaSettings = {
  headline: "Ready to Build a Brand That Converts?",
  subtext: "Let's create something extraordinary together. Get a free consultation and see how we can transform your brand.",
  buttonText: "Start Your Project",
  buttonHref: "/contact-us",
};

export async function GET() {
  const data = await readDataOr<CtaSettings>("cta.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const r = parseCta(body);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  await writeData("cta.json", r.value);
  return NextResponse.json(r.value);
}
