"use client";

import { useRef, useState } from "react";
import type { FeaturedProject } from "../../_components/sections/Portfolio";

const EMPTY: Omit<FeaturedProject, "id"> = {
  category: "",
  title: "",
  description: "",
  image: "",
  accent: "#a855f7",
  gradient: "from-[#7c3aed] to-[#4c1d95]",
};

export default function FeaturedManager({ initialFeatured }: { initialFeatured: FeaturedProject[] }) {
  const [featured, setFeatured] = useState<FeaturedProject[]>(initialFeatured);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState<Omit<FeaturedProject, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  }

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "featured");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setForm((f) => ({ ...f, image: json.url }));
      flash("ok", "Image uploaded");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function save(list: FeaturedProject[]) {
    setSaving(true);
    try {
      const res = await fetch("/api/featured", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(list),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setFeatured(list);
      flash("ok", "Saved successfully");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(p: FeaturedProject) {
    setEditingId(p.id);
    setAddingNew(false);
    setForm({ category: p.category, title: p.title, description: p.description, image: p.image, accent: p.accent, gradient: p.gradient });
  }

  function startAdd() {
    setEditingId(null);
    setAddingNew(true);
    setForm(EMPTY);
  }

  function cancelForm() {
    setEditingId(null);
    setAddingNew(false);
    setForm(EMPTY);
  }

  async function submitForm() {
    if (!form.title || !form.category || !form.image) return;
    if (addingNew) {
      const newItem: FeaturedProject = { ...form, id: crypto.randomUUID() };
      await save([...featured, newItem]);
      cancelForm();
    } else if (editingId) {
      const updated = featured.map((p) => p.id === editingId ? { ...form, id: editingId } : p);
      await save(updated);
      cancelForm();
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Remove this featured project?")) return;
    await save(featured.filter((p) => p.id !== id));
  }

  function moveItem(idx: number, dir: -1 | 1) {
    const list = [...featured];
    const swapIdx = idx + dir;
    if (swapIdx < 0 || swapIdx >= list.length) return;
    [list[idx], list[swapIdx]] = [list[swapIdx], list[idx]];
    save(list);
  }

  const showForm = editingId !== null || addingNew;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {msg && (
        <div className={`px-4 py-3 rounded-xl text-sm font-medium ${msg.type === "ok" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}>
          {msg.text}
        </div>
      )}

      {/* Add button */}
      {!showForm && (
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors shadow-[0_0_20px_rgba(124,58,237,0.3)]"
        >
          <span>+</span> Add Featured Project
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="rounded-2xl border border-[#7c3aed]/30 bg-white/3 p-6 space-y-4">
          <h2 className="text-sm font-bold text-white">{addingNew ? "Add Featured Project" : "Edit Featured Project"}</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} placeholder="e.g. Krishna Dryfruit" required />
            <Field label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} placeholder="e.g. Brand Identity" required />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Short description shown below the title" textarea />
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
              Image path <span className="text-[#ec4899] ml-1">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="/portfolio/graphics/brand-identity-1.png"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 hover:text-white disabled:opacity-40 transition-all whitespace-nowrap"
              >
                {uploading ? "Uploading…" : "Upload"}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }}
              />
            </div>
            {form.image && form.image.startsWith("http") && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="preview" className="mt-2 h-20 w-auto rounded-lg object-cover opacity-80" />
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Accent colour" value={form.accent} onChange={(v) => setForm((f) => ({ ...f, accent: v }))} placeholder="#a855f7" />
            <Field label="Gradient classes" value={form.gradient} onChange={(v) => setForm((f) => ({ ...f, gradient: v }))} placeholder="from-[#7c3aed] to-[#4c1d95]" />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={submitForm}
              disabled={saving || !form.title || !form.category || !form.image}
              className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors"
            >
              {saving ? "Saving…" : addingNew ? "Add" : "Update"}
            </button>
            <button onClick={cancelForm} className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {featured.map((p, i) => (
          <div
            key={p.id}
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${editingId === p.id ? "border-[#7c3aed]/50 bg-[#7c3aed]/5" : "border-white/8 bg-white/3"}`}
          >
            {/* Reorder */}
            <div className="flex flex-col gap-1">
              <button onClick={() => moveItem(i, -1)} disabled={i === 0} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/30 disabled:opacity-20 transition-colors">
                ↑
              </button>
              <button onClick={() => moveItem(i, 1)} disabled={i === featured.length - 1} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/30 disabled:opacity-20 transition-colors">
                ↓
              </button>
            </div>

            {/* Color dot */}
            <div className="w-3 h-3 rounded-full shrink-0" style={{ background: p.accent }} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{p.title}</p>
              <p className="text-xs text-white/40 truncate">{p.category} · {p.image}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => startEdit(p)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(p.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {featured.length === 0 && (
          <p className="text-sm text-white/30 text-center py-8">No featured projects yet. Add one above.</p>
        )}
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, required, textarea,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; textarea?: boolean;
}) {
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
