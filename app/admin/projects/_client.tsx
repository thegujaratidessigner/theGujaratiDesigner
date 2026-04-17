"use client";

import { useState } from "react";
import type { WebsiteProject } from "../../_components/sections/portfolio/WebsitePortfolio";
import type { GraphicsProject } from "../../_components/sections/portfolio/GraphicsPortfolio";

/* ─── Shared helpers ────────────────────────────────────────────────────── */

function Field({ label, value, onChange, placeholder, required, textarea }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; textarea?: boolean;
}) {
  const cls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none";
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        {label}{required && <span className="text-[#ec4899] ml-1">*</span>}
      </label>
      {textarea
        ? <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
        : <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}

function Toast({ msg }: { msg: { type: "ok" | "err"; text: string } | null }) {
  if (!msg) return null;
  return (
    <div className={`px-4 py-3 rounded-xl text-sm font-medium ${msg.type === "ok" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}`}>
      {msg.text}
    </div>
  );
}

/* ─── Website projects manager ──────────────────────────────────────────── */

const W_EMPTY: Omit<WebsiteProject, "id"> = {
  title: "", category: "", tags: [], gradient: "", description: "", url: "", href: "",
};

function WebsiteManager({ initial }: { initial: WebsiteProject[] }) {
  const [projects, setProjects] = useState<WebsiteProject[]>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState<Omit<WebsiteProject, "id">>(W_EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  }

  function startEdit(p: WebsiteProject) {
    setEditingId(p.id); setAddingNew(false);
    setForm({ title: p.title, category: p.category, tags: p.tags, gradient: p.gradient, description: p.description, url: p.url, href: p.href });
    setTagsInput(p.tags.join(", "));
  }

  function startAdd() { setEditingId(null); setAddingNew(true); setForm(W_EMPTY); setTagsInput(""); }
  function cancel() { setEditingId(null); setAddingNew(false); setForm(W_EMPTY); setTagsInput(""); }

  async function submit() {
    const data = { ...form, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    setSaving(true);
    try {
      if (addingNew) {
        const res = await fetch("/api/projects/website", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error((await res.json()).error);
        const created: WebsiteProject = await res.json();
        setProjects((prev) => [...prev, created]);
        flash("ok", "Project added");
      } else {
        const res = await fetch(`/api/projects/website/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error((await res.json()).error);
        const updated: WebsiteProject = await res.json();
        setProjects((prev) => prev.map((p) => p.id === editingId ? updated : p));
        flash("ok", "Project updated");
      }
      cancel();
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally { setSaving(false); }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/website/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      flash("ok", "Project deleted");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Delete failed");
    } finally { setSaving(false); }
  }

  const showForm = editingId !== null || addingNew;

  return (
    <div className="space-y-5">
      <Toast msg={msg} />

      {!showForm && (
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ec4899] text-white text-sm font-semibold hover:bg-[#db2777] transition-colors">
          + Add Website Project
        </button>
      )}

      {showForm && (
        <div className="rounded-2xl border border-[#ec4899]/30 bg-white/3 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">{addingNew ? "Add Website Project" : "Edit Website Project"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required placeholder="e.g. Avniri" />
            <Field label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} placeholder="E-Commerce, Business, Real Estate…" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Tags (comma-separated)" value={tagsInput} onChange={setTagsInput} placeholder="E-Commerce, Fashion" />
            <Field label="Gradient classes" value={form.gradient} onChange={(v) => setForm((f) => ({ ...f, gradient: v }))} placeholder="from-[#db2777] via-[#ec4899] to-[#a855f7]" />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Short description" textarea />
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="URL (display)" value={form.url} onChange={(v) => setForm((f) => ({ ...f, url: v }))} placeholder="avniri.in" />
            <Field label="Full href" value={form.href} onChange={(v) => setForm((f) => ({ ...f, href: v }))} placeholder="https://www.avniri.in" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={submit} disabled={saving || !form.title} className="px-5 py-2.5 rounded-xl bg-[#ec4899] text-white text-sm font-semibold hover:bg-[#db2777] disabled:opacity-40 transition-colors">
              {saving ? "Saving…" : addingNew ? "Add" : "Update"}
            </button>
            <button onClick={cancel} className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${editingId === p.id ? "border-[#ec4899]/50 bg-[#ec4899]/5" : "border-white/8 bg-white/3"}`}>
            <div className={`w-8 h-8 rounded-lg shrink-0 bg-gradient-to-br ${p.gradient || "from-gray-700 to-gray-900"}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{p.title}</p>
              <p className="text-xs text-white/40 truncate">{p.category} · {p.url}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors">Edit</button>
              <button onClick={() => deleteProject(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm text-white/30 text-center py-8">No projects yet.</p>}
      </div>
    </div>
  );
}

/* ─── Graphics projects manager ─────────────────────────────────────────── */

const G_EMPTY: Omit<GraphicsProject, "id"> = {
  title: "", category: "", description: "", image: "", count: "", bg: "bg-[#1a1a2e]",
};

function GraphicsManager({ initial }: { initial: GraphicsProject[] }) {
  const [projects, setProjects] = useState<GraphicsProject[]>(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState<Omit<GraphicsProject, "id">>(G_EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text }); setTimeout(() => setMsg(null), 3500);
  }

  function startEdit(p: GraphicsProject) {
    setEditingId(p.id); setAddingNew(false);
    setForm({ title: p.title, category: p.category, description: p.description, image: p.image, count: p.count, bg: p.bg });
  }

  function startAdd() { setEditingId(null); setAddingNew(true); setForm(G_EMPTY); }
  function cancel() { setEditingId(null); setAddingNew(false); setForm(G_EMPTY); }

  async function submit() {
    setSaving(true);
    try {
      if (addingNew) {
        const res = await fetch("/api/projects/graphics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        if (!res.ok) throw new Error((await res.json()).error);
        const created: GraphicsProject = await res.json();
        setProjects((prev) => [...prev, created]);
        flash("ok", "Project added");
      } else {
        const res = await fetch(`/api/projects/graphics/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
        if (!res.ok) throw new Error((await res.json()).error);
        const updated: GraphicsProject = await res.json();
        setProjects((prev) => prev.map((p) => p.id === editingId ? updated : p));
        flash("ok", "Project updated");
      }
      cancel();
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally { setSaving(false); }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/graphics/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      flash("ok", "Project deleted");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Delete failed");
    } finally { setSaving(false); }
  }

  const showForm = editingId !== null || addingNew;

  return (
    <div className="space-y-5">
      <Toast msg={msg} />

      {!showForm && (
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] transition-colors">
          + Add Graphics Project
        </button>
      )}

      {showForm && (
        <div className="rounded-2xl border border-[#7c3aed]/30 bg-white/3 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white">{addingNew ? "Add Graphics Project" : "Edit Graphics Project"}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Title" value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} required placeholder="e.g. Logo Design Collection" />
            <Field label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} placeholder="Logo Design, Brand Identity…" />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Short description of what's in this sheet" textarea />
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Image path" value={form.image} onChange={(v) => setForm((f) => ({ ...f, image: v }))} placeholder="/portfolio/graphics/logo-design.png" />
            <Field label="Count label" value={form.count} onChange={(v) => setForm((f) => ({ ...f, count: v }))} placeholder="15+ Logos" />
            <Field label="Background class" value={form.bg} onChange={(v) => setForm((f) => ({ ...f, bg: v }))} placeholder="bg-[#1a1a2e]" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={submit} disabled={saving || !form.title} className="px-5 py-2.5 rounded-xl bg-[#7c3aed] text-white text-sm font-semibold hover:bg-[#6d28d9] disabled:opacity-40 transition-colors">
              {saving ? "Saving…" : addingNew ? "Add" : "Update"}
            </button>
            <button onClick={cancel} className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {projects.map((p) => (
          <div key={p.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${editingId === p.id ? "border-[#7c3aed]/50 bg-[#7c3aed]/5" : "border-white/8 bg-white/3"}`}>
            <div className={`w-8 h-8 rounded-lg shrink-0 ${p.bg}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{p.title}</p>
              <p className="text-xs text-white/40 truncate">{p.category} · {p.count}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors">Edit</button>
              <button onClick={() => deleteProject(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {projects.length === 0 && <p className="text-sm text-white/30 text-center py-8">No projects yet.</p>}
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */

export default function ProjectsManager({
  initialWebsite, initialGraphics,
}: { initialWebsite: WebsiteProject[]; initialGraphics: GraphicsProject[] }) {
  const [tab, setTab] = useState<"website" | "graphics">("website");

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex gap-2">
        {(["website", "graphics"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
              tab === t
                ? t === "website" ? "bg-[#ec4899] text-white" : "bg-[#7c3aed] text-white"
                : "border border-white/10 text-white/50 hover:text-white hover:border-white/20"
            }`}
          >
            {t === "website" ? "Website Projects" : "Graphics Projects"}
          </button>
        ))}
      </div>

      {tab === "website" ? (
        <WebsiteManager initial={initialWebsite} />
      ) : (
        <GraphicsManager initial={initialGraphics} />
      )}
    </div>
  );
}
