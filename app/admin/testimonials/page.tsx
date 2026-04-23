import AdminNav from "../_components/AdminNav";
import { readDataOr } from "@/lib/db";
import type { Testimonial } from "@/app/api/testimonials/route";
import TestimonialsManager from "./_client";

export default async function TestimonialsPage() {
  const items = await readDataOr<Testimonial[]>("testimonials.json", []);
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Testimonials</h1>
            <p className="text-sm text-white/40 mt-1">Manage client testimonials. These show as fallback when Google reviews are unavailable.</p>
          </div>
          <TestimonialsManager initial={items} />
        </div>
      </main>
    </div>
  );
}
