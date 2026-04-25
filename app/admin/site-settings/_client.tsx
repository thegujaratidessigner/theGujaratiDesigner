"use client";

import { useState } from "react";
import type { HeroSettings } from "@/app/api/hero-settings/route";
import type { CtaSettings } from "@/app/api/cta/route";
import type { ContactSettings } from "@/app/api/contact-settings/route";
import type { FooterLinks } from "@/app/api/footer-links/route";

function Toast({ msg }: { msg: { type: "ok" | "err"; text: string } }) {
  return <div className={`px-4 py-3 rounded-xl text-sm font-medium ${msg.type === "ok" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}>{msg.text}</div>;
}

function Field({ label, value, onChange, placeholder, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; textarea?: boolean }) {
  const cls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none";
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">{label}</label>
      {textarea ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} /> : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroEditor({ initial }: { initial: HeroSettings }) {
  const [form, setForm] = useState<HeroSettings>({
    ...initial,
    headlineLine1: initial.headlineLine1 ?? "We Design Brands",
    headlineLine2: initial.headlineLine2 ?? "That",
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/hero-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error);
      flash("ok", "Saved");
    } catch (e: unknown) { flash("err", e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
      <h2 className="text-sm font-bold text-white">Hero</h2>
      {msg && <Toast msg={msg} />}
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Headline Line 1" value={form.headlineLine1 ?? ""} onChange={(v) => setForm((f) => ({ ...f, headlineLine1: v }))} placeholder="We Design Brands" />
        <Field label="Headline Line 2" value={form.headlineLine2 ?? ""} onChange={(v) => setForm((f) => ({ ...f, headlineLine2: v }))} placeholder="That" />
      </div>
      <p className="text-xs text-white/40">Rotating words — cycle after "Line 2". One per line.</p>
      <textarea
        rows={5}
        value={form.rotatingWords.join("\n")}
        onChange={(e) => setForm({ rotatingWords: e.target.value.split("\n").map((w) => w.trim()).filter(Boolean) })}
        placeholder={"Convert\nInspire\nDominate\nCaptivate"}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none"
      />
      <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">{saving ? "Saving…" : "Save"}</button>
    </div>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function CtaEditor({ initial }: { initial: CtaSettings }) {
  const [form, setForm] = useState<CtaSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/cta", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error);
      flash("ok", "Saved");
    } catch (e: unknown) { flash("err", e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
      <h2 className="text-sm font-bold text-white">CTA Banner</h2>
      {msg && <Toast msg={msg} />}
      <Field label="Headline" value={form.headline} onChange={(v) => setForm((f) => ({ ...f, headline: v }))} placeholder="Ready to Build a Brand That Converts?" />
      <Field label="Subtext" value={form.subtext} onChange={(v) => setForm((f) => ({ ...f, subtext: v }))} placeholder="Let's create something extraordinary…" textarea />
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Button text" value={form.buttonText} onChange={(v) => setForm((f) => ({ ...f, buttonText: v }))} placeholder="Start Your Project" />
        <Field label="Button link" value={form.buttonHref} onChange={(v) => setForm((f) => ({ ...f, buttonHref: v }))} placeholder="/contact-us" />
      </div>
      <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">{saving ? "Saving…" : "Save"}</button>
    </div>
  );
}

// ── Contact / Map ─────────────────────────────────────────────────────────────

function ContactEditor({ initial }: { initial: ContactSettings }) {
  const [form, setForm] = useState<ContactSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/contact-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error((await res.json()).error);
      flash("ok", "Saved");
    } catch (e: unknown) { flash("err", e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-4">
      <h2 className="text-sm font-bold text-white">Contact Map</h2>
      <p className="text-xs text-white/40">Paste the Google Maps embed URL from Maps → Share → Embed a map → copy the src URL.</p>
      {msg && <Toast msg={msg} />}
      <Field label="Google Maps embed URL" value={form.mapsEmbedUrl} onChange={(v) => setForm({ mapsEmbedUrl: v })} placeholder="https://www.google.com/maps/embed?pb=…" textarea />
      <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">{saving ? "Saving…" : "Save"}</button>
    </div>
  );
}

// ── Footer Links ──────────────────────────────────────────────────────────────

function FooterEditor({ initial }: { initial: FooterLinks }) {
  const [links, setLinks] = useState<FooterLinks>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000); }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/footer-links", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(links) });
      if (!res.ok) throw new Error((await res.json()).error);
      flash("ok", "Saved");
    } catch (e: unknown) { flash("err", e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  function updateLink(section: string, idx: number, field: "label" | "href", value: string) {
    setLinks((prev) => ({ ...prev, [section]: prev[section].map((l, i) => i === idx ? { ...l, [field]: value } : l) }));
  }

  function addLink(section: string) {
    setLinks((prev) => ({ ...prev, [section]: [...prev[section], { label: "", href: "" }] }));
  }

  function removeLink(section: string, idx: number) {
    setLinks((prev) => ({ ...prev, [section]: prev[section].filter((_, i) => i !== idx) }));
  }

  function addSection() {
    const name = prompt("Section name (e.g. Follow Us):");
    if (name && !links[name]) setLinks((prev) => ({ ...prev, [name]: [] }));
  }

  function removeSection(section: string) {
    setLinks((prev) => { const n = { ...prev }; delete n[section]; return n; });
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-6 space-y-6">
      <h2 className="text-sm font-bold text-white">Footer Links</h2>
      {msg && <Toast msg={msg} />}
      {Object.entries(links).map(([section, items]) => (
        <div key={section} className="space-y-2">
          <div className="flex items-center gap-2">
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{section}</p>
            <button onClick={() => removeSection(section)} className="text-[10px] text-red-400/50 hover:text-red-400 transition-colors">remove section</button>
          </div>
          {items.map((link, idx) => (
            <div key={idx} className="flex gap-2">
              <input value={link.label} onChange={(e) => updateLink(section, idx, "label", e.target.value)} placeholder="Label" className="w-40 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
              <input value={link.href} onChange={(e) => updateLink(section, idx, "href", e.target.value)} placeholder="/page or #anchor" className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
              <button onClick={() => removeLink(section, idx)} className="px-3 py-2 rounded-xl border border-red-500/20 text-red-400/70 hover:text-red-400 text-xs transition-colors">✕</button>
            </div>
          ))}
          <button onClick={() => addLink(section)} className="text-xs text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">+ Add link</button>
        </div>
      ))}
      <div className="flex gap-3 pt-2 border-t border-white/8">
        <button onClick={addSection} className="text-xs text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors">+ Add section</button>
        <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">{saving ? "Saving…" : "Save Footer"}</button>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function SiteSettingsManager({ hero, cta, contact, footerLinks }: { hero: HeroSettings; cta: CtaSettings; contact: ContactSettings; footerLinks: FooterLinks }) {
  return (
    <div className="space-y-8">
      <HeroEditor initial={hero} />
      <CtaEditor initial={cta} />
      <ContactEditor initial={contact} />
      <FooterEditor initial={footerLinks} />
    </div>
  );
}
