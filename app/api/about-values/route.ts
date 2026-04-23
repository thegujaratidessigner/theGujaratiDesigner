import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseValueItem } from "@/lib/validation";

export type ValueItem = { id: string; icon: string; title: string; description: string; accent: string };

const DEFAULT: ValueItem[] = [
  { id: "1", icon: "star", title: "Creative Excellence", description: "Every design we produce is crafted with precision, passion, and a relentless pursuit of quality.", accent: "#a855f7" },
  { id: "2", icon: "check", title: "Results-Driven", description: "We believe design is a business tool. Every project is measured by the real impact it creates.", accent: "#ec4899" },
  { id: "3", icon: "globe", title: "Global Perspective", description: "Based in Ahmedabad, we serve clients worldwide — understanding diverse markets and audiences.", accent: "#f59e0b" },
  { id: "4", icon: "users", title: "Client-First", description: "Long-term partnerships built on trust, transparency, and a genuine commitment to your growth.", accent: "#10b981" },
];

export async function GET() {
  const data = await readDataOr<ValueItem[]>("about-values.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body)) return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  if (body.length > 20) return NextResponse.json({ error: "Too many values (max 20)" }, { status: 400 });

  const items: ValueItem[] = [];
  for (const item of body) {
    const r = parseValueItem(item);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
    items.push(r.value);
  }

  await writeData("about-values.json", items);
  return NextResponse.json(items);
}
