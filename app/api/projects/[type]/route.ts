import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";

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
  const body = await request.json();
  const projects = await readData<object[]>(filename(type));
  const newProject = { ...body, id: generateId() };
  projects.push(newProject);
  await writeData(filename(type), projects);
  return NextResponse.json(newProject, { status: 201 });
}
