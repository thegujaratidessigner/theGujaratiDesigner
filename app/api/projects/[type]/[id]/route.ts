import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
import { parseWebsiteProject, parseGraphicsProject } from "@/lib/validation";

type ProjectType = "website" | "graphics";
type Project = { id: string } & Record<string, unknown>;

function filename(type: ProjectType) {
  return `projects-${type}.json`;
}

function isValidType(t: string): t is ProjectType {
  return t === "website" || t === "graphics";
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await params;
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
  }
  const body = await request.json().catch(() => null);
  const parsed = type === "website" ? parseWebsiteProject(body) : parseGraphicsProject(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const projects = await readData<Project[]>(filename(type));
  const idx = projects.findIndex((p) => p.id === id);
  if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
  projects[idx] = { ...parsed.value, id };
  await writeData(filename(type), projects);
  return NextResponse.json(projects[idx]);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  const { type, id } = await params;
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
  }
  const projects = await readData<Project[]>(filename(type));
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await writeData(filename(type), filtered);
  return NextResponse.json({ ok: true });
}
