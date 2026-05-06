import { redirect } from "next/navigation";

// The Start Project Builder is a Vite SPA hosted at /public/start/.
// This minimal route exists only to redirect /start -> /start/index.html
// so users (and the "Back to Website" link from the SPA) get a clean URL.
export default function StartPage() {
  redirect("/start/index.html");
}
