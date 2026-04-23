import { NextRequest, NextResponse } from "next/server";
import { readData, writeData, generateId } from "@/lib/db";
import { parsePackage } from "@/lib/validation";

type PackageItem = { id: string } & Record<string, unknown>;
type AddonSection = { services: PackageItem[]; stationary: PackageItem[]; product: PackageItem[] };
type PackagesFile = {
  logo: PackageItem[];
  combo: PackageItem[];
  website: PackageItem[];
  social: PackageItem[];
  addon: AddonSection;
};

const VALID_CATEGORIES = ["logo", "combo", "website", "social"] as const;
const ADDON_SECTIONS = ["services", "stationary", "product"] as const;

type MainCategory = (typeof VALID_CATEGORIES)[number];
type AddonSectionKey = (typeof ADDON_SECTIONS)[number];

function isMain(c: string): c is MainCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(c);
}

function isAddonSection(c: string): c is AddonSectionKey {
  return (ADDON_SECTIONS as readonly string[]).includes(c);
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const packages = await readData<PackagesFile>("packages.json");

  if (category === "addon") {
    return NextResponse.json(packages.addon);
  }

  if (isMain(category)) {
    return NextResponse.json(packages[category]);
  }

  // addon sub-section: /api/packages/addon-services etc handled by [id] route
  return NextResponse.json({ error: "Invalid category" }, { status: 400 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  const rawBody = (await request.json().catch(() => null)) as
    | ({ section?: string } & Record<string, unknown>)
    | null;
  if (!rawBody) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const { section, ...body } = rawBody;
  const parsed = parsePackage(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const packages = await readData<PackagesFile>("packages.json");

  if (isMain(category)) {
    const newPkg = { ...parsed.value, id: generateId() } as PackageItem;
    packages[category].push(newPkg);
    await writeData("packages.json", packages);
    return NextResponse.json(newPkg, { status: 201 });
  }

  if (category === "addon" && section && isAddonSection(section)) {
    const newItem = { ...parsed.value, id: generateId() } as PackageItem;
    packages.addon[section].push(newItem);
    await writeData("packages.json", packages);
    return NextResponse.json(newItem, { status: 201 });
  }

  return NextResponse.json({ error: "Invalid category" }, { status: 400 });
}
