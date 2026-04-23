import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import { parseService } from "@/lib/validation";

type Service = { id: string } & Record<string, unknown>;

export async function GET() {
  const services = await readData<Service[]>("services.json");
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = parseService(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const services = await readData<Service[]>("services.json");
  const newService = { ...parsed.value, id: generateId() };
  services.push(newService);
  await writeData("services.json", services);
  return NextResponse.json(newService, { status: 201 });
}
