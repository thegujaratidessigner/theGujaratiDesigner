"use client";

import { useState } from "react";
import type { ServiceItem, ServiceIconType } from "../../_components/sections/Services";
import { ServiceIcon } from "../../_components/sections/Services";

const ICON_TYPES: ServiceIconType[] = ["design", "web", "video", "social", "photo", "print", "brand", "marketing"];

const EMPTY: Omit<ServiceItem, "id"> = {
  number: "01",
  iconType: "design",
  title: "",
  description: "",
  tags: [],
  color: "from-[#7c3aed]/20 to-transparent",
  accent: "#a855f7",
  link: "",
};

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function ServicesManager({ initialServices }: { initialServices: ServiceItem[] }) {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState<Omit<ServiceItem, "id">>(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  }

  function startEdit(s: ServiceItem) {
    setEditingId(s.id);
    setAddingNew(false);
    setForm({ number: s.number, iconType: s.iconType, title: s.title, description: s.description, tags: s.tags, color: s.color, accent: s.accent, link: s.link ?? "" });
    setTagsInput(s.tags.join(", "));
  }

  function startAdd() {
    setEditingId(null);
    setAddingNew(true);
    // Auto-number
    const nextNum = (services.length + 1).toString().padStart(2, "0");
    setForm({ ...EMPTY, number: nextNum });
    setTagsInput("");
  }

  function cancelForm() {
    setEditingId(null);
    setAddingNew(false);
    setForm(EMPTY);
    setTagsInput("");
  }

  function parseTags(raw: string): string[] {
    return raw.split(",").map((t) => t.trim()).filter(Boolean);
  }

  async function submitForm() {
    const data = { ...form, tags: parseTags(tagsInput) };
    setSaving(true);
    try {
      let res: Response;
      if (addingNew) {
        res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        const created: ServiceItem = await res.json();
        setServices((prev) => [...prev, created]);
        flash("ok", "Service added");
      } else {
        res = await fetch(`/api/services/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        const updated: ServiceItem = await res.json();
        setServices((prev) => prev.map((s) => s.id === editingId ? updated : s));
        flash("ok", "Service updated");
      }
      cancelForm();
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Delete this service?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      setServices((prev) => prev.filter((s) => s.id !== id));
      flash("ok", "Service deleted");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  const showForm = editingId !== null || addingNew;

  return (
    <div className="space-y-6">
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${msg.type === "ok" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}>
          {msg.text}
        </div>
      )}

      {!showForm && (
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors shadow-[0_0_20px_rgba(124,58,237,0.3)]">
          <span>+</span> Add Service
        </button>
      )}

      {showForm && (
        <div className="rounded-2xl border border-[#7c3aed]/30 bg-white/3 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white">{addingNew ? "Add Service" : "Edit Service"}</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Number" value={form.number} onChange={(v) => setForm((f) => ({ ...f, number: v }))} placeholder="01" />
            <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="Logo Design & Graphic Design" required />
            <Field label="Accent colour" value={form.accent} onChange={(v) => setForm((f) => ({ ...f, accent: v }))} placeholder="#a855f7" />
          </div>

          <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Short description of this service" textarea />
          <Field label="Tags (comma-separated)" value={tagsInput} onChange={setTagsInput} placeholder="Logo Design, Brand Identity, Typography" />
          <Field label="Link (URL or path — leave blank for no click)" value={form.link ?? ""} onChange={(v) => setForm((f) => ({ ...f, link: v }))} placeholder="/services#logo or https://drive.google.com/..." />
          <Field label="Hover gradient classes" value={form.color} onChange={(v) => setForm((f) => ({ ...f, color: v }))} placeholder="from-[#7c3aed]/20 to-transparent" />

          {/* Icon picker */}
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICON_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setForm((f) => ({ ...f, iconType: type }))}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                    form.iconType === type
                      ? "border-[#7c3aed]/60 bg-[#7c3aed]/20 text-white"
                      : "border-white/10 text-white/40 hover:text-white hover:border-white/20"
                  }`}
                >
                  <span className="text-current" style={{ color: form.iconType === type ? form.accent : undefined }}>
                    <ServiceIcon type={type} />
                  </span>
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={submitForm} disabled={saving || !form.title} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">
              {saving ? "Saving…" : addingNew ? "Add" : "Update"}
            </button>
            <button onClick={cancelForm} className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((s) => (
          <div
            key={s.id}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${editingId === s.id ? "border-[#7c3aed]/50 bg-[#7c3aed]/5" : "border-white/8 bg-white/3"}`}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${s.accent}15`, border: `1px solid ${s.accent}30`, color: s.accent }}>
              <ServiceIcon type={s.iconType} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30 font-mono">{s.number}</span>
                <p className="text-sm font-semibold text-white truncate">{s.title}</p>
              </div>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/8">{tag}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(s)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors">
                Edit
              </button>
              <button onClick={() => deleteService(s.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 transition-colors">
                Delete
              </button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <p className="text-sm text-white/30 text-center py-8">No services yet. Add one above.</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required, textarea }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; textarea?: boolean }) {
  const cls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none";
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        {label}{required && <span className="text-[#ec4899] ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
