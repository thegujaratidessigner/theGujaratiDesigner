"use client";

import { useState } from "react";
import type { Testimonial } from "@/app/api/testimonials/route";

const EMPTY: Omit<Testimonial, "id"> = { author: "", rating: 5, text: "", time: "", photoUrl: "" };

export default function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save(list: Testimonial[]) {
    setSaving(true);
    try {
      const res = await fetch("/api/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(list) });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems(list);
      flash("ok", "Saved");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item: Testimonial) { setEditingId(item.id); setAddingNew(false); setForm({ author: item.author, rating: item.rating, text: item.text, time: item.time, photoUrl: item.photoUrl }); }
  function startAdd() { setEditingId(null); setAddingNew(true); setForm(EMPTY); }
  function cancel() { setEditingId(null); setAddingNew(false); setForm(EMPTY); }

  async function submit() {
    if (!form.author || !form.text) return;
    if (addingNew) {
      await save([...items, { ...form, id: crypto.randomUUID() }]);
    } else {
      await save(items.map((i) => i.id === editingId ? { ...form, id: editingId! } : i));
    }
    cancel();
  }

  const showForm = editingId !== null || addingNew;

  return (
    <div className="space-y-6">
      {msg && <div className={`px-4 py-3 rounded-xl text-sm font-medium ${msg.type === "ok" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}>{msg.text}</div>}

      {!showForm && (
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors shadow-[0_0_20px_rgba(124,58,237,0.3)]">
          <span>+</span> Add Testimonial
        </button>
      )}

      {showForm && (
        <div className="rounded-2xl border border-[#7c3aed]/30 bg-white/3 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white">{addingNew ? "Add Testimonial" : "Edit Testimonial"}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Author name" value={form.author} onChange={(v) => setForm((f) => ({ ...f, author: v }))} placeholder="Mehul Shah" required />
            <Field label="Time description" value={form.time} onChange={(v) => setForm((f) => ({ ...f, time: v }))} placeholder="2 months ago" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Photo URL (optional)" value={form.photoUrl} onChange={(v) => setForm((f) => ({ ...f, photoUrl: v }))} placeholder="https://…" />
            <div>
              <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map((n) => (
                  <button key={n} onClick={() => setForm((f) => ({ ...f, rating: n }))} className={`w-10 h-10 rounded-xl border text-sm font-bold transition-all ${form.rating === n ? "bg-[#7c3aed]/20 border-[#7c3aed]/60 text-white" : "border-white/10 text-white/40 hover:text-white"}`}>{n}</button>
                ))}
              </div>
            </div>
          </div>
          <Field label="Review text" value={form.text} onChange={(v) => setForm((f) => ({ ...f, text: v }))} placeholder="They helped build my brand…" textarea required />
          <div className="flex gap-3 pt-2">
            <button onClick={submit} disabled={saving || !form.author || !form.text} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">
              {saving ? "Saving…" : addingNew ? "Add" : "Update"}
            </button>
            <button onClick={cancel} className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${editingId === item.id ? "border-[#7c3aed]/50 bg-[#7c3aed]/5" : "border-white/8 bg-white/3"}`}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-semibold text-white">{item.author}</p>
                <span className="text-xs text-yellow-400">{"★".repeat(item.rating)}</span>
                {item.time && <span className="text-xs text-white/30">{item.time}</span>}
              </div>
              <p className="text-xs text-white/40 line-clamp-2">{item.text}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(item)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors">Edit</button>
              <button onClick={() => save(items.filter((x) => x.id !== item.id))} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-white/30 text-center py-8">No testimonials yet.</p>}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; textarea?: boolean }) {
  const cls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none";
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">{label}{required && <span className="text-[#ec4899] ml-1">*</span>}</label>
      {textarea ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} /> : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}
