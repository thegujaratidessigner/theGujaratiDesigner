import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { parseStat } from "@/lib/validation";

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export async function GET() {
  const stats = await readData<StatItem[]>("stats.json");
  return NextResponse.json(stats);
}

export async function PUT(req: Request) {
  const body = await req.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  }
  if (body.length > 12) {
    return NextResponse.json({ error: "Too many stats" }, { status: 400 });
  }

  const validated: StatItem[] = [];
  for (const [i, item] of body.entries()) {
    const parsed = parseStat(item);
    if (!parsed.ok) {
      return NextResponse.json({ error: `Stat ${i + 1}: ${parsed.error}` }, { status: 400 });
    }
    validated.push(parsed.value);
  }

  await writeData("stats.json", validated);
  return NextResponse.json({ ok: true });
}
