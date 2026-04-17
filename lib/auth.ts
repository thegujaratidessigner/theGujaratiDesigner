// Uses the Web Crypto API — compatible with both Edge Runtime (middleware)
// and Node.js runtime (API route handlers).

export const COOKIE_NAME = "tgd_admin";
const SESSION_MS = 24 * 60 * 60 * 1000; // 24 hours

/** HMAC-SHA256 sign a string, returns hex digest. */
async function hmacSign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Create a signed session token valid for 24 h. */
export async function createSessionToken(secret: string): Promise<string> {
  const exp = Date.now() + SESSION_MS;
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const sig = await hmacSign(payload, secret);
  return `${payload}.${sig}`;
}

/** Verify a session token — returns true if valid and not expired. */
export async function verifySessionToken(
  token: string,
  secret: string
): Promise<boolean> {
  try {
    const dot = token.lastIndexOf(".");
    if (dot < 0) return false;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expectedSig = await hmacSign(payload, secret);
    if (sig !== expectedSig) return false;
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

/** Constant-time password check using fixed 128-byte buffers. */
export function checkPassword(submitted: string, correct: string): boolean {
  const a = Buffer.alloc(128);
  const b = Buffer.alloc(128);
  a.write(submitted, 0, "utf-8");
  b.write(correct, 0, "utf-8");
  // Also check exact equality to prevent length-skipping attacks
  return (
    require("crypto").timingSafeEqual(a, b) && submitted === correct
  );
}
