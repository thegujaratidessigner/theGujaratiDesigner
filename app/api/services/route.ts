import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";

type Service = { id: string } & Record<string, unknown>;

export async function GET() {
  const services = await readData<Service[]>("services.json");
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const services = await readData<Service[]>("services.json");
  const newService = { ...body, id: generateId() };
  services.push(newService);
  await writeData("services.json", services);
  return NextResponse.json(newService, { status: 201 });
}
