import { redirect } from "next/navigation";

// The legacy /start-project route now permanently redirects to /start
// (the live Start Project Builder). Any old bookmarks or external links
// continue to work. The query string is forwarded so ?agent= still routes.
export default async function StartProjectPage({
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
  redirect(qs ? `/start?${qs}` : "/start");
}
