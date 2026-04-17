import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export async function GET() {
  const featured = await readData<object[]>("featured.json");
  return NextResponse.json(featured);
}

/** Replace the entire featured list (PUT /api/featured with full array). */
export async function PUT(request: NextRequest) {
  const body = await request.json();
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  }
  await writeData("featured.json", body);
  return NextResponse.json(body);
}
