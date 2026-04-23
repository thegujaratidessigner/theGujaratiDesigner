import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { parseService } from "@/lib/validation";

type Service = { id: string } & Record<string, unknown>;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = parseService(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const services = await readData<Service[]>("services.json");
  const idx = services.findIndex((s) => s.id === id);
  if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  services[idx] = { ...parsed.value, id };
  await writeData("services.json", services);
  return NextResponse.json(services[idx]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const services = await readData<Service[]>("services.json");
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeData("services.json", filtered);
  return NextResponse.json({ ok: true });
}
