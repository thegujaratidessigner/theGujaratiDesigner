import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import { parseWebsiteProject, parseGraphicsProject } from "@/lib/validation";

type ProjectType = "website" | "graphics";

function filename(type: ProjectType) {
  return `projects-${type}.json`;
}

function isValidType(t: string): t is ProjectType {
  return t === "website" || t === "graphics";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
  }
  const projects = await readData<object[]>(filename(type));
  return NextResponse.json(projects);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  if (!isValidType(type)) {
    return NextResponse.json({ error: "Invalid project type" }, { status: 400 });
  }
  const body = await request.json().catch(() => null);
  const parsed = type === "website" ? parseWebsiteProject(body) : parseGraphicsProject(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const projects = await readData<object[]>(filename(type));
  const newProject = { ...parsed.value, id: generateId() };
  projects.push(newProject);
  await writeData(filename(type), projects);
  return NextResponse.json(newProject, { status: 201 });
}
