import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseContactSettings } from "@/lib/validation";

export type ContactSettings = { mapsEmbedUrl: string };

const DEFAULT: ContactSettings = {
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.64624749428!2d72.4166!3d23.0204978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1681000000000!5m2!1sen!2sin",
};

export async function GET() {
  const data = await readDataOr<ContactSettings>("contact-settings.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const r = parseContactSettings(body);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  await writeData("contact-settings.json", r.value);
  return NextResponse.json(r.value);
}
