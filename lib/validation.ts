// Input validators for admin-submitted CMS data.
// Goal: block stored-XSS vectors (javascript: URIs, HTML/CSS break-out chars)
// without disrupting the free-text admin UI.

const MAX_SHORT = 200;   // titles, categories, ids
const MAX_LONG = 2000;   // descriptions
const MAX_CLASS = 300;   // Tailwind class strings
const MAX_URL = 500;

/** Reject strings that could break out of attribute/CSS context. */
const UNSAFE_CHARS = /[<>"`{}\\]|\$\{|\/\*|\*\/|javascript:|vbscript:|data:/i;

/** Allow http/https absolute URLs, mailto, or site-relative paths starting with /. */
export function isSafeHref(v: unknown): v is string {
  if (typeof v !== "string" || v.length === 0 || v.length > MAX_URL) return false;
  if (/[\s<>"`\\]/.test(v)) return false;
  if (v.startsWith("/") && !v.startsWith("//")) return true;
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:" || u.protocol === "mailto:";
  } catch {
    return false;
  }
}

/** Match #rgb, #rgba, #rrggbb, #rrggbbaa. */
export function isHex(v: unknown): v is string {
  return typeof v === "string" && /^#[0-9a-fA-F]{3,8}$/.test(v) && [4, 5, 7, 9].includes(v.length);
}

/** Return a validated hex or the fallback. */
export function safeHex(v: unknown, fallback: string): string {
  return isHex(v) ? v : fallback;
}

/** Accept a Tailwind class string that contains no break-out chars. */
export function isSafeClass(v: unknown): v is string {
  return typeof v === "string" && v.length > 0 && v.length <= MAX_CLASS && !UNSAFE_CHARS.test(v);
}

/** Image path — site-relative (/portfolio/...) or an https URL. No javascript:/data:. */
export function isSafeImagePath(v: unknown): v is string {
  if (typeof v !== "string" || v.length === 0 || v.length > MAX_URL) return false;
  if (/[\s<>"`\\]/.test(v)) return false;
  if (v.startsWith("/") && !v.startsWith("//")) return true;
  try {
    return new URL(v).protocol === "https:";
  } catch {
    return false;
  }
}

/** Coerce to trimmed string bounded by max length. Returns empty string if not a string. */
export function str(v: unknown, max: number = MAX_SHORT): string {
  if (typeof v !== "string") return "";
  const trimmed = v.trim();
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

/** Coerce to safe string — rejects break-out chars, otherwise returns empty. */
export function safeStr(v: unknown, max: number = MAX_SHORT): string {
  const s = str(v, max);
  return UNSAFE_CHARS.test(s) ? "" : s;
}

/** Coerce to array of safe strings. */
export function safeStrArray(v: unknown, maxItems: number = 20): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .slice(0, maxItems)
    .map((item) => safeStr(item, MAX_SHORT))
    .filter(Boolean);
}

/** Number coercion with bounds. */
export function num(v: unknown, min: number, max: number): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return Math.trunc(n);
}

// ─── Per-resource parsers ────────────────────────────────────────────────────
// Each returns { ok, value } or { ok: false, error }.

export type ParseResult<T> = { ok: true; value: T } | { ok: false; error: string };

function bad(msg: string): ParseResult<never> {
  return { ok: false, error: msg };
}

export function parseWebsiteProject(body: unknown): ParseResult<{
  title: string;
  category: string;
  tags: string[];
  gradient: string;
  description: string;
  url: string;
  href: string;
}> {
  if (!body || typeof body !== "object") return bad("Invalid body");
  const b = body as Record<string, unknown>;

  const title = safeStr(b.title);
  if (!title) return bad("Title is required and must not contain unsafe characters");

  const href = str(b.href, MAX_URL);
  if (href && !isSafeHref(href)) return bad("Invalid href — must be http(s), mailto, or a site-relative path");

  const gradient = b.gradient == null || b.gradient === "" ? "" : (isSafeClass(b.gradient) ? (b.gradient as string) : null);
  if (gradient === null) return bad("Invalid gradient class string");

  return {
    ok: true,
    value: {
      title,
      category: safeStr(b.category),
      tags: safeStrArray(b.tags),
      gradient,
      description: safeStr(b.description, MAX_LONG),
      url: safeStr(b.url, MAX_URL),
      href,
    },
  };
}

export function parseGraphicsProject(body: unknown): ParseResult<{
  title: string;
  category: string;
  description: string;
  image: string;
  count: string;
  bg: string;
}> {
  if (!body || typeof body !== "object") return bad("Invalid body");
  const b = body as Record<string, unknown>;

  const title = safeStr(b.title);
  if (!title) return bad("Title is required");

  const image = str(b.image, MAX_URL);
  if (image && !isSafeImagePath(image)) return bad("Invalid image path");

  const bg = b.bg == null || b.bg === "" ? "" : (isSafeClass(b.bg) ? (b.bg as string) : null);
  if (bg === null) return bad("Invalid background class string");

  return {
    ok: true,
    value: {
      title,
      category: safeStr(b.category),
      description: safeStr(b.description, MAX_LONG),
      image,
      count: safeStr(b.count),
      bg,
    },
  };
}

export function parseService(body: unknown): ParseResult<{
  number: string;
  iconType: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
  accent: string;
  link: string;
}> {
  if (!body || typeof body !== "object") return bad("Invalid body");
  const b = body as Record<string, unknown>;

  const title = safeStr(b.title);
  if (!title) return bad("Title is required");

  const color = b.color == null || b.color === "" ? "" : (isSafeClass(b.color) ? (b.color as string) : null);
  if (color === null) return bad("Invalid color class string");

  const accent = b.accent == null || b.accent === "" ? "#a855f7" : (isHex(b.accent) ? (b.accent as string) : null);
  if (accent === null) return bad("Accent must be a hex colour like #a855f7");

  const rawLink = b.link == null || b.link === "" ? "" : str(b.link as string, MAX_URL);
  if (rawLink && !isSafeHref(rawLink)) return bad("Invalid link — must be http(s), mailto, or a site-relative path");

  return {
    ok: true,
    value: {
      number: safeStr(b.number),
      iconType: safeStr(b.iconType),
      title,
      description: safeStr(b.description, MAX_LONG),
      tags: safeStrArray(b.tags),
      color,
      accent,
      link: rawLink,
    },
  };
}

export function parseFeatured(body: unknown): ParseResult<{
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  gradient: string;
}> {
  if (!body || typeof body !== "object") return bad("Invalid featured item");
  const b = body as Record<string, unknown>;

  const title = safeStr(b.title);
  if (!title) return bad("Featured title is required");

  const image = str(b.image, MAX_URL);
  if (image && !isSafeImagePath(image)) return bad("Invalid featured image path");

  const accent = b.accent == null || b.accent === "" ? "#a855f7" : (isHex(b.accent) ? (b.accent as string) : null);
  if (accent === null) return bad("Featured accent must be a hex colour");

  const gradient = b.gradient == null || b.gradient === "" ? "" : (isSafeClass(b.gradient) ? (b.gradient as string) : null);
  if (gradient === null) return bad("Invalid featured gradient class string");

  return {
    ok: true,
    value: {
      id: safeStr(b.id),
      category: safeStr(b.category),
      title,
      description: safeStr(b.description, MAX_LONG),
      image,
      accent,
      gradient,
    },
  };
}

export function parseStat(body: unknown): ParseResult<{ target: number; suffix: string; label: string }> {
  if (!body || typeof body !== "object") return bad("Invalid stat");
  const b = body as Record<string, unknown>;

  const target = num(b.target, 0, 1_000_000);
  if (target === null) return bad("Stat target must be a number 0–1,000,000");

  const label = safeStr(b.label);
  if (!label) return bad("Stat label is required");

  return { ok: true, value: { target, suffix: safeStr(b.suffix, 10), label } };
}

/** Google Maps embed URL — must be https from google.com/maps. */
export function isSafeMapsUrl(v: unknown): v is string {
  if (typeof v !== "string" || v.length === 0 || v.length > MAX_URL * 4) return false;
  try {
    const u = new URL(v);
    return (
      u.protocol === "https:" &&
      (u.hostname === "www.google.com" || u.hostname === "maps.google.com" || u.hostname === "maps.googleapis.com") &&
      u.pathname.startsWith("/maps")
    );
  } catch {
    return false;
  }
}

export function parseFaqItem(body: unknown): ParseResult<{ id: string; q: string; a: string }> {
  if (!body || typeof body !== "object") return bad("Invalid FAQ item");
  const b = body as Record<string, unknown>;
  const q = safeStr(b.q, MAX_LONG);
  if (!q) return bad("Question is required");
  const a = safeStr(b.a, MAX_LONG);
  if (!a) return bad("Answer is required");
  return { ok: true, value: { id: safeStr(b.id), q, a } };
}

export function parseTestimonial(body: unknown): ParseResult<{
  id: string; author: string; rating: number; text: string; time: string; photoUrl: string;
}> {
  if (!body || typeof body !== "object") return bad("Invalid testimonial");
  const b = body as Record<string, unknown>;
  const author = safeStr(b.author);
  if (!author) return bad("Author is required");
  const rating = num(b.rating, 1, 5);
  if (rating === null) return bad("Rating must be 1–5");
  const text = safeStr(b.text, MAX_LONG);
  if (!text) return bad("Text is required");
  const photoUrl = str(b.photoUrl, MAX_URL);
  if (photoUrl && !isSafeImagePath(photoUrl)) return bad("Invalid photo URL");
  return { ok: true, value: { id: safeStr(b.id), author, rating, text, time: safeStr(b.time), photoUrl } };
}

export function parseFounder(body: unknown): ParseResult<{
  name: string; role: string; bio: string[]; skills: string[];
}> {
  if (!body || typeof body !== "object") return bad("Invalid founder data");
  const b = body as Record<string, unknown>;
  const name = safeStr(b.name);
  if (!name) return bad("Name is required");
  return {
    ok: true,
    value: {
      name,
      role: safeStr(b.role),
      bio: safeStrArray(b.bio, 10),
      skills: safeStrArray(b.skills, 20),
    },
  };
}

export function parseCta(body: unknown): ParseResult<{
  headline: string; subtext: string; buttonText: string; buttonHref: string;
}> {
  if (!body || typeof body !== "object") return bad("Invalid CTA");
  const b = body as Record<string, unknown>;
  const headline = safeStr(b.headline);
  if (!headline) return bad("Headline is required");
  const buttonHref = str(b.buttonHref, MAX_URL);
  if (buttonHref && !isSafeHref(buttonHref)) return bad("Invalid button href");
  return {
    ok: true,
    value: {
      headline,
      subtext: safeStr(b.subtext, MAX_LONG),
      buttonText: safeStr(b.buttonText),
      buttonHref,
    },
  };
}

export function parseHeroSettings(body: unknown): ParseResult<{ rotatingWords: string[]; headlineLine1: string; headlineLine2: string }> {
  if (!body || typeof body !== "object") return bad("Invalid hero settings");
  const b = body as Record<string, unknown>;
  const words = safeStrArray(b.rotatingWords, 10);
  if (words.length === 0) return bad("At least one rotating word is required");
  return {
    ok: true,
    value: {
      rotatingWords: words,
      headlineLine1: safeStr(b.headlineLine1 as unknown),
      headlineLine2: safeStr(b.headlineLine2 as unknown),
    },
  };
}

export function parseContactSettings(body: unknown): ParseResult<{ mapsEmbedUrl: string }> {
  if (!body || typeof body !== "object") return bad("Invalid contact settings");
  const b = body as Record<string, unknown>;
  if (!isSafeMapsUrl(b.mapsEmbedUrl)) return bad("mapsEmbedUrl must be a valid Google Maps embed URL (https://www.google.com/maps/...)");
  return { ok: true, value: { mapsEmbedUrl: b.mapsEmbedUrl as string } };
}

export function parseFooterLinks(body: unknown): ParseResult<Record<string, { label: string; href: string }[]>> {
  if (!body || typeof body !== "object" || Array.isArray(body)) return bad("Invalid footer links");
  const b = body as Record<string, unknown>;
  const out: Record<string, { label: string; href: string }[]> = {};
  for (const [cat, links] of Object.entries(b)) {
    const safeCategory = safeStr(cat);
    if (!safeCategory) return bad(`Invalid category name: "${cat}"`);
    if (!Array.isArray(links)) return bad(`Links for "${cat}" must be an array`);
    if (links.length > 20) return bad(`Too many links in "${cat}" (max 20)`);
    const parsedLinks: { label: string; href: string }[] = [];
    for (const link of links) {
      if (!link || typeof link !== "object") return bad("Invalid link entry");
      const l = link as Record<string, unknown>;
      const label = safeStr(l.label);
      if (!label) return bad("Link label is required");
      const href = str(l.href, MAX_URL);
      if (href && !isSafeHref(href)) return bad(`Invalid href for link "${label}"`);
      parsedLinks.push({ label, href });
    }
    out[safeCategory] = parsedLinks;
  }
  return { ok: true, value: out };
}

export function parseHighlight(body: unknown): ParseResult<{ id: string; label: string; value: string }> {
  if (!body || typeof body !== "object") return bad("Invalid highlight");
  const b = body as Record<string, unknown>;
  const label = safeStr(b.label);
  if (!label) return bad("Label is required");
  return { ok: true, value: { id: safeStr(b.id), label, value: safeStr(b.value) } };
}

export function parseValueItem(body: unknown): ParseResult<{
  id: string; icon: string; title: string; description: string; accent: string;
}> {
  if (!body || typeof body !== "object") return bad("Invalid value item");
  const b = body as Record<string, unknown>;
  const title = safeStr(b.title);
  if (!title) return bad("Title is required");
  const accent = b.accent == null || b.accent === "" ? "#a855f7" : (isHex(b.accent) ? (b.accent as string) : null);
  if (accent === null) return bad("Accent must be a hex colour like #a855f7");
  return {
    ok: true,
    value: {
      id: safeStr(b.id),
      icon: safeStr(b.icon),
      title,
      description: safeStr(b.description, MAX_LONG),
      accent,
    },
  };
}

export function parsePackage(body: unknown): ParseResult<Record<string, unknown>> {
  if (!body || typeof body !== "object") return bad("Invalid package");
  const b = body as Record<string, unknown>;

  // Packages have varying shapes across categories (logo/combo/website/social/addon sub-sections).
  // We enforce a safe-string pass on every text field and cap overall size.
  const out: Record<string, unknown> = {};
  let size = 0;
  for (const [k, v] of Object.entries(b)) {
    if (k === "section") continue; // routed via URL, not stored
    if (typeof v === "string") {
      const s = safeStr(v, MAX_LONG);
      if (v.length > 0 && s.length === 0 && UNSAFE_CHARS.test(v)) return bad(`Invalid characters in "${k}"`);
      out[k] = s;
      size += s.length;
    } else if (Array.isArray(v)) {
      out[k] = safeStrArray(v, 50);
    } else if (typeof v === "number" && Number.isFinite(v)) {
      out[k] = v;
    } else if (typeof v === "boolean") {
      out[k] = v;
    } else if (v == null) {
      // skip
    } else {
      return bad(`Unsupported type on field "${k}"`);
    }
    if (size > 20_000) return bad("Package payload too large");
  }
  if (!out.title && !out.name) return bad("Package must have a title or name");
  return { ok: true, value: out };
}
