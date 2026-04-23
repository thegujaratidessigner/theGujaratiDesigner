import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseHighlight } from "@/lib/validation";

export type Highlight = { id: string; label: string; value: string };

const DEFAULT: Highlight[] = [
  { id: "1", label: "Founded", value: "2018" },
  { id: "2", label: "Based in", value: "Ahmedabad" },
  { id: "3", label: "Serving", value: "Global" },
  { id: "4", label: "Founder", value: "Kunal Thacker" },
];

export async function GET() {
  const data = await readDataOr<Highlight[]>("about-highlights.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  if (body.length > 20) return NextResponse.json({ error: "Too many highlights (max 20)" }, { status: 400 });

  const items: Highlight[] = [];
  for (const item of body) {
    const r = parseHighlight(item);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
    items.push(r.value);
  }

  await writeData("about-highlights.json", items);
  return NextResponse.json(items);
}
