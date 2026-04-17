import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, COOKIE_NAME } from "./lib/auth";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";

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
    !pathname.startsWith("/api/auth/") &&
    ["POST", "PUT", "DELETE", "PATCH"].includes(reqMethod)
  ) {
    const token = request.cookies.get(COOKIE_NAME)?.value ?? "";
    const valid = ADMIN_SECRET ? await verifySessionToken(token, ADMIN_SECRET) : false;
    if (!valid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
