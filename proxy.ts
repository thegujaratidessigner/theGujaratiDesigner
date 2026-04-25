import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "./lib/auth";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";
const MUTATION_METHODS = ["POST", "PUT", "DELETE", "PATCH"];

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  // No Origin header = server-to-server or same-origin form — allow
  if (!origin) return true;
  return origin === request.nextUrl.origin;
}

function buildCsp(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    // nonce + strict-dynamic replaces unsafe-inline for scripts
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    // Tailwind inline styles cannot be avoided without a full CSS extraction step
    "style-src 'self' 'unsafe-inline'",
    // Images: local, Supabase Storage, WordPress mShots, data URIs
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}`,
    "media-src 'self'",
    "object-src 'none'",
    "frame-src https://www.google.com https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const reqMethod = request.method;

  // ── Protect /admin pages (except login) ─────────────────────────────────
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
    const valid = ADMIN_SECRET ? await verifySessionToken(token, ADMIN_SECRET) : false;
    if (!valid) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Protect mutation API routes (POST / PUT / DELETE / PATCH) ───────────
  if (
    pathname.startsWith("/api/") &&
    pathname !== "/api/auth/login" &&
    MUTATION_METHODS.includes(reqMethod)
  ) {
    // CSRF: reject cross-origin mutation requests
    if (!isSameOrigin(request)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Auth check: skip for /api/auth/* and public endpoints (contact form)
    if (!pathname.startsWith("/api/auth/") && pathname !== "/api/contact") {
      const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
      const valid = ADMIN_SECRET ? await verifySessionToken(token, ADMIN_SECRET) : false;
      if (!valid) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
  }

  // ── Attach per-request nonce for CSP ────────────────────────────────────
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV !== "production";
  const csp = buildCsp(nonce, isDev);

  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers: reqHeaders } });
  response.headers.set("content-security-policy", csp);
  return response;
}

export const config = {
  matcher: [
    // Run on all routes except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
