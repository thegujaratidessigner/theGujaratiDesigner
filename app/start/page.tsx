import { redirect } from "next/navigation";

// The Start Project Builder is a Vite SPA hosted at /public/start/.
// This minimal route exists only to redirect /start -> /start/index.html.
// We MUST forward the original query string (e.g. ?agent=team1) so the SPA
// can read it client-side; otherwise WhatsApp agent routing breaks.
export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(sp)) {
    if (typeof v === "string") usp.set(k, v);
    else if (Array.isArray(v)) v.forEach((x) => usp.append(k, x));
  }
  const qs = usp.toString();
  redirect(qs ? `/start/index.html?${qs}` : "/start/index.html");
}
