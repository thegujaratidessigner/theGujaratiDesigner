import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { parseFeatured } from "@/lib/validation";

export async function GET() {
  const featured = await readData<object[]>("featured.json");
  return NextResponse.json(featured);
}

/** Replace the entire featured list (PUT /api/featured with full array). */
export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  }
  if (body.length > 50) {
    return NextResponse.json({ error: "Too many featured items" }, { status: 400 });
  }

  const validated = [];
  for (const [i, item] of body.entries()) {
    const parsed = parseFeatured(item);
    if (!parsed.ok) {
      return NextResponse.json({ error: `Item ${i + 1}: ${parsed.error}` }, { status: 400 });
    }
    validated.push(parsed.value);
  }

  await writeData("featured.json", validated);
  return NextResponse.json(validated);
}
