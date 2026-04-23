import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  const { category, id } = await params;
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
    const arr = packages[category];
    const idx = arr.findIndex((p) => p.id === id);
    if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    arr[idx] = { ...parsed.value, id } as PackageItem;
    await writeData("packages.json", packages);
    return NextResponse.json(arr[idx]);
  }

  if (category === "addon" && section && isAddonSection(section)) {
    const arr = packages.addon[section];
    const idx = arr.findIndex((p) => p.id === id);
    if (idx < 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
    arr[idx] = { ...parsed.value, id } as PackageItem;
    await writeData("packages.json", packages);
    return NextResponse.json(arr[idx]);
  }

  return NextResponse.json({ error: "Invalid category" }, { status: 400 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ category: string; id: string }> }
) {
  const { category, id } = await params;
  const url = new URL(request.url);
  const section = url.searchParams.get("section") ?? "";
  const packages = await readData<PackagesFile>("packages.json");

  if (isMain(category)) {
    const filtered = packages[category].filter((p) => p.id !== id);
    if (filtered.length === packages[category].length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    packages[category] = filtered;
    await writeData("packages.json", packages);
    return NextResponse.json({ ok: true });
  }

  if (category === "addon" && isAddonSection(section)) {
    const arr = packages.addon[section];
    const filtered = arr.filter((p) => p.id !== id);
    if (filtered.length === arr.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    packages.addon[section] = filtered;
    await writeData("packages.json", packages);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Invalid category" }, { status: 400 });
}
