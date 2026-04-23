import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createSessionToken, COOKIE_NAME } from "@/lib/auth";
import { hit, clientIp } from "@/lib/rateLimit";

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;
const FAIL_DELAY_MS = 250;

export async function POST(request: NextRequest) {
  const ip = clientIp(request.headers);
  if (!await hit(`login:${ip}`, MAX_ATTEMPTS, WINDOW_MS)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const { password } = body as { password?: string };

  const adminPassword = process.env.ADMIN_PASSWORD ?? "";
  const adminSecret = process.env.ADMIN_SECRET ?? "";

  if (!adminPassword || !adminSecret) {
    return NextResponse.json(
      { error: "Server not configured — set ADMIN_PASSWORD and ADMIN_SECRET in .env.local" },
      { status: 500 }
    );
  }

  if (!password || !checkPassword(password, adminPassword)) {
    await new Promise((r) => setTimeout(r, FAIL_DELAY_MS));
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await createSessionToken(adminSecret);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 h
  });

  return response;
}
