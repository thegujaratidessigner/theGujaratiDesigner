import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseHeroSettings } from "@/lib/validation";

export type HeroSettings = { rotatingWords: string[] };

const DEFAULT: HeroSettings = { rotatingWords: ["Convert", "Inspire", "Dominate", "Captivate"] };

export async function GET() {
  const data = await readDataOr<HeroSettings>("hero-settings.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const r = parseHeroSettings(body);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  await writeData("hero-settings.json", r.value);
  return NextResponse.json(r.value);
}
