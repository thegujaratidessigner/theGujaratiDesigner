"use client";

import { useState } from "react";
import type { FounderData } from "@/app/api/founder/route";
import type { Highlight } from "@/app/api/about-highlights/route";
import type { ValueItem } from "@/app/api/about-values/route";

const ICON_OPTIONS = ["star", "check", "globe", "users", "heart", "lightning", "shield", "trophy"];

// ── Founder ──────────────────────────────────────────────────────────────────

function FounderEditor({ initial }: { initial: FounderData }) {
  const [form, setForm] = useState<FounderData>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/founder", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error);
      flash("ok", "Saved");
    } catch (e: unknown) { flash("err", e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
      <h2 className="text-sm font-bold text-white">Founder Profile</h2>
      {msg && <Toast msg={msg} />}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
        <Field label="Role / Title" value={form.role} onChange={(v) => setForm((f) => ({ ...f, role: v }))} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Bio Paragraphs</label>
        {form.bio.map((para, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <textarea rows={3} value={para} onChange={(e) => { const b = [...form.bio]; b[i] = e.target.value; setForm((f) => ({ ...f, bio: b })); }} className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none" />
            <button onClick={() => setForm((f) => ({ ...f, bio: f.bio.filter((_, j) => j !== i) }))} className="px-3 rounded-xl border border-red-500/20 text-red-400/70 hover:text-red-400 text-xs">✕</button>
          </div>
        ))}
        <button onClick={() => setForm((f) => ({ ...f, bio: [...f.bio, ""] }))} className="text-xs text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">+ Add paragraph</button>
      </div>
      <div>
        <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Skills / Tags (one per line)</label>
        <textarea rows={4} value={form.skills.join("\n")} onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) }))} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none" placeholder={"Brand Strategy\nLogo Design\nVisual Identity"} />
      </div>
      <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">{saving ? "Saving…" : "Save Founder"}</button>
    </div>
  );
}

// ── Highlights ────────────────────────────────────────────────────────────────

function HighlightsEditor({ initial }: { initial: Highlight[] }) {
  const [items, setItems] = useState<Highlight[]>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save(list: Highlight[]) {
    setSaving(true);
    try {
      const res = await fetch("/api/about-highlights", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(list) });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems(list);
      flash("ok", "Saved");
    } catch (e: unknown) { flash("err", e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  function update(id: string, field: keyof Highlight, value: string) {
    setItems((prev) => prev.map((h) => h.id === id ? { ...h, [field]: value } : h));
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
      <h2 className="text-sm font-bold text-white">About Highlights</h2>
      <p className="text-xs text-white/40">Shown as stat cards in the About section on the home page.</p>
      {msg && <Toast msg={msg} />}
      <div className="space-y-2">
        {items.map((h) => (
          <div key={h.id} className="flex gap-3 items-center">
            <input value={h.label} onChange={(e) => update(h.id, "label", e.target.value)} placeholder="Label" className="w-36 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
            <input value={h.value} onChange={(e) => update(h.id, "value", e.target.value)} placeholder="Value" className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
            <button onClick={() => setItems((prev) => prev.filter((x) => x.id !== h.id))} className="px-3 py-2 rounded-xl border border-red-500/20 text-red-400/70 hover:text-red-400 text-xs transition-colors">✕</button>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={() => setItems((prev) => [...prev, { id: crypto.randomUUID(), label: "", value: "" }])} className="text-xs text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">+ Add highlight</button>
        <button onClick={() => save(items)} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">{saving ? "Saving…" : "Save Highlights"}</button>
      </div>
    </div>
  );
}

// ── Values ────────────────────────────────────────────────────────────────────

function ValuesEditor({ initial }: { initial: ValueItem[] }) {
  const [items, setItems] = useState<ValueItem[]>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save(list: ValueItem[]) {
    setSaving(true);
    try {
      const res = await fetch("/api/about-values", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(list) });
      if (!res.ok) throw new Error((await res.json()).error);
      setItems(list);
      flash("ok", "Saved");
    } catch (e: unknown) { flash("err", e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  function update(id: string, field: keyof ValueItem, value: string) {
    setItems((prev) => prev.map((v) => v.id === id ? { ...v, [field]: value } : v));
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
      <h2 className="text-sm font-bold text-white">About Values</h2>
      {msg && <Toast msg={msg} />}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border border-white/8 space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input value={item.title} onChange={(e) => update(item.id, "title", e.target.value)} placeholder="Title" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
                  <input value={item.accent} onChange={(e) => update(item.id, "accent", e.target.value)} placeholder="#a855f7" className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
                </div>
                <textarea rows={2} value={item.description} onChange={(e) => update(item.id, "description", e.target.value)} placeholder="Description" className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none" />
                <div className="flex flex-wrap gap-1.5">
                  {ICON_OPTIONS.map((icon) => (
                    <button key={icon} onClick={() => update(item.id, "icon", icon)} className={`px-2.5 py-1 rounded-lg text-xs border transition-all ${item.icon === icon ? "border-[#7c3aed]/60 bg-[#7c3aed]/20 text-white" : "border-white/10 text-white/40 hover:text-white"}`}>{icon}</button>
                  ))}
                </div>
              </div>
              <button onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))} className="px-3 self-start rounded-xl border border-red-500/20 text-red-400/70 hover:text-red-400 text-xs transition-colors">✕</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button onClick={() => setItems((prev) => [...prev, { id: crypto.randomUUID(), icon: "star", title: "", description: "", accent: "#a855f7" }])} className="text-xs text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">+ Add value</button>
        <button onClick={() => save(items)} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">{saving ? "Saving…" : "Save Values"}</button>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function AboutContentManager({ founder, highlights, values }: { founder: FounderData; highlights: Highlight[]; values: ValueItem[] }) {
  return (
    <div className="space-y-8">
      <FounderEditor initial={founder} />
      <HighlightsEditor initial={highlights} />
      <ValuesEditor initial={values} />
    </div>
  );
}

function Toast({ msg }: { msg: { type: "ok" | "err"; text: string } }) {
  return <div className={`px-4 py-3 rounded-xl text-sm font-medium ${msg.type === "ok" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}>{msg.text}</div>;
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
    </div>
  );
}
