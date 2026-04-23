import { NextRequest, NextResponse } from "next/server";
import { readDataOr, writeData } from "@/lib/db";
import { parseFounder } from "@/lib/validation";

export type FounderData = { name: string; role: string; bio: string[]; skills: string[] };

const DEFAULT: FounderData = {
  name: "Kunal Thacker",
  role: "Founder & Director",
  bio: [
    "Kunal Thacker is the Founder & Director of The Gujarati Designer, a globally serving creative design studio based in Ahmedabad. With a strong vision for building powerful brands and years of hands-on industry experience, he leads the studio with a focus on quality, strategy, and creative excellence.",
    "Under his leadership, The Gujarati Designer has grown into a trusted name for branding, logo design, graphic design, website development, and digital creative solutions. His approach is deeply rooted in understanding the client's business goals and crafting designs that deliver real, measurable results.",
  ],
  skills: ["Brand Strategy", "Logo Design", "Visual Identity", "Website Design", "Digital Marketing", "Creative Direction"],
};

export async function GET() {
  const data = await readDataOr<FounderData>("founder.json", DEFAULT);
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const r = parseFounder(body);
  if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
  await writeData("founder.json", r.value);
  return NextResponse.json(r.value);
}
