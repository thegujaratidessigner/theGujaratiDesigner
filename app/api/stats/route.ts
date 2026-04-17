import { NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

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
  const stats = (await req.json()) as StatItem[];
  await writeData("stats.json", stats);
  return NextResponse.json({ ok: true });
}
