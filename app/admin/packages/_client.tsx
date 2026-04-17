"use client";

import { useState } from "react";
import type { PackageItem, AddonServiceItem, PackagesData } from "../../_components/sections/services/ServicesPricing";

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function Field({ label, value, onChange, placeholder, required, type = "text" }: {
  label: string; value: string | number; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">
        {label}{required && <span className="text-[#ec4899] ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all"
      />
    </div>
  );
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!value)}
        className={`w-10 h-5 rounded-full relative transition-colors ${value ? "bg-[#7c3aed]" : "bg-white/10"}`}
      >
        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? "translate-x-5" : "translate-x-0.5"}`} />
      </div>
      <span className="text-xs text-white/50">{label}</span>
    </label>
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

/* ─── Package form defaults ─────────────────────────────────────────────── */

const PKG_EMPTY: Omit<PackageItem, "id"> = {
  name: "", price: 0, description: "", features: [], popular: false, featured: false,
  accent: "#a855f7", startingFrom: false, duration: "",
};

/* ─── Main packages tab (logo/combo/website/social) ─────────────────────── */

type MainCategory = "logo" | "combo" | "website" | "social";
const MAIN_TABS: { id: MainCategory; label: string; accent: string }[] = [
  { id: "logo", label: "Logo Design", accent: "#a855f7" },
  { id: "combo", label: "Combo Packages", accent: "#f59e0b" },
  { id: "website", label: "Website Design", accent: "#ec4899" },
  { id: "social", label: "Social Media", accent: "#10b981" },
];

function PackageList({
  category, packages, onUpdated, accent,
}: {
  category: MainCategory;
  packages: PackageItem[];
  onUpdated: (updated: PackageItem[]) => void;
  accent: string;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [form, setForm] = useState<Omit<PackageItem, "id">>(PKG_EMPTY);
  const [featuresInput, setFeaturesInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text }); setTimeout(() => setMsg(null), 3500);
  }

  function startEdit(p: PackageItem) {
    setEditingId(p.id); setAddingNew(false);
    setForm({ name: p.name, price: p.price, description: p.description, features: p.features, popular: p.popular, featured: p.featured, accent: p.accent, startingFrom: p.startingFrom, duration: p.duration });
    setFeaturesInput(p.features.join("\n"));
  }

  function startAdd() { setEditingId(null); setAddingNew(true); setForm({ ...PKG_EMPTY, accent }); setFeaturesInput(""); }
  function cancel() { setEditingId(null); setAddingNew(false); setForm(PKG_EMPTY); setFeaturesInput(""); }

  async function submit() {
    const data = { ...form, features: featuresInput.split("\n").map((f) => f.trim()).filter(Boolean) };
    setSaving(true);
    try {
      if (addingNew) {
        const res = await fetch(`/api/packages/${category}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error((await res.json()).error);
        const created: PackageItem = await res.json();
        onUpdated([...packages, created]);
        flash("ok", "Package added");
      } else {
        const res = await fetch(`/api/packages/${category}/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error((await res.json()).error);
        const updated: PackageItem = await res.json();
        onUpdated(packages.map((p) => p.id === editingId ? updated : p));
        flash("ok", "Package updated");
      }
      cancel();
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally { setSaving(false); }
  }

  async function deletePackage(id: string) {
    if (!confirm("Delete this package?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/packages/${category}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      onUpdated(packages.filter((p) => p.id !== id));
      flash("ok", "Package deleted");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Delete failed");
    } finally { setSaving(false); }
  }

  const showForm = editingId !== null || addingNew;

  return (
    <div className="space-y-5">
      <Toast msg={msg} />

      {!showForm && (
        <button onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors" style={{ background: accent }}>
          + Add Package
        </button>
      )}

      {showForm && (
        <div className="rounded-2xl border bg-white/3 p-6 space-y-4" style={{ borderColor: `${accent}40` }}>
          <h3 className="text-sm font-bold text-white">{addingNew ? "Add Package" : "Edit Package"}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required placeholder="e.g. Standard" />
            <Field label="Price (₹)" value={form.price ?? ""} onChange={(v) => setForm((f) => ({ ...f, price: v === "" ? null : Number(v) }))} placeholder="499" type="number" />
            <Field label="Duration" value={form.duration} onChange={(v) => setForm((f) => ({ ...f, duration: v }))} placeholder="/ month (leave blank if none)" />
          </div>
          <Field label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} placeholder="Short tagline for this package" />
          <div>
            <label className="block text-xs font-semibold text-white/40 uppercase tracking-widest mb-2">Features (one per line)</label>
            <textarea
              rows={5}
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder={"3 unique logo concepts\n1 revision round\nPNG & JPG files"}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-all resize-none"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Accent colour" value={form.accent} onChange={(v) => setForm((f) => ({ ...f, accent: v }))} placeholder="#a855f7" />
          </div>
          <div className="flex flex-wrap gap-6">
            <Toggle label="Popular" value={form.popular} onChange={(v) => setForm((f) => ({ ...f, popular: v }))} />
            <Toggle label="Best Value (featured)" value={form.featured} onChange={(v) => setForm((f) => ({ ...f, featured: v }))} />
            <Toggle label="Starting from" value={form.startingFrom} onChange={(v) => setForm((f) => ({ ...f, startingFrom: v }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={submit} disabled={saving || !form.name} className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-40 transition-colors" style={{ background: accent }}>
              {saving ? "Saving…" : addingNew ? "Add" : "Update"}
            </button>
            <button onClick={cancel} className="px-5 py-2.5 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {packages.map((p) => (
          <div key={p.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${editingId === p.id ? "bg-white/5" : "border-white/8 bg-white/3"}`} style={editingId === p.id ? { borderColor: `${accent}50` } : {}}>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-white">{p.name}</p>
                {p.popular && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#7c3aed]/20 text-[#a855f7] border border-[#7c3aed]/30">Popular</span>}
                {p.featured && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ec4899]/20 text-[#ec4899] border border-[#ec4899]/30">Best Value</span>}
              </div>
              <p className="text-xs mt-0.5" style={{ color: p.accent }}>
                {p.price != null ? `₹${p.price.toLocaleString("en-IN")}` : "Contact for pricing"}
                {p.startingFrom ? " (starting from)" : ""}
                {p.duration ? ` ${p.duration}` : ""}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-colors">Edit</button>
              <button onClick={() => deletePackage(p.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400/70 hover:text-red-400 hover:border-red-500/40 transition-colors">Delete</button>
            </div>
          </div>
        ))}
        {packages.length === 0 && <p className="text-sm text-white/30 text-center py-8">No packages yet.</p>}
      </div>
    </div>
  );
}

/* ─── Add-on table manager ──────────────────────────────────────────────── */

type AddonSectionKey = "services" | "stationary" | "product";

const ADDON_SECTIONS: { id: AddonSectionKey; label: string; accent: string }[] = [
  { id: "services", label: "Marketing & Creative", accent: "#a855f7" },
  { id: "stationary", label: "Stationery Designs", accent: "#ec4899" },
  { id: "product", label: "Product & Packaging", accent: "#f59e0b" },
];

function AddonManager({
  section, items, onUpdated, accent,
}: {
  section: AddonSectionKey;
  items: AddonServiceItem[];
  onUpdated: (items: AddonServiceItem[]) => void;
  accent: string;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text }); setTimeout(() => setMsg(null), 3500);
  }

  function startEdit(item: AddonServiceItem) {
    setEditingId(item.id); setAddingNew(false);
    setName(item.name); setPrice(item.price != null ? String(item.price) : ""); setUnit(item.unit);
  }

  function startAdd() { setEditingId(null); setAddingNew(true); setName(""); setPrice(""); setUnit(""); }
  function cancel() { setEditingId(null); setAddingNew(false); setName(""); setPrice(""); setUnit(""); }

  async function submit() {
    const data = { name, price: price === "" ? null : Number(price), unit, section };
    setSaving(true);
    try {
      if (addingNew) {
        const res = await fetch("/api/packages/addon", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error((await res.json()).error);
        onUpdated([...items, await res.json()]);
        flash("ok", "Item added");
      } else {
        const res = await fetch(`/api/packages/addon/${editingId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (!res.ok) throw new Error((await res.json()).error);
        const updated: AddonServiceItem = await res.json();
        onUpdated(items.map((i) => i.id === editingId ? updated : i));
        flash("ok", "Item updated");
      }
      cancel();
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Save failed");
    } finally { setSaving(false); }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/packages/addon/${id}?section=${section}`, { method: "DELETE" });
      if (!res.ok) throw new Error((await res.json()).error);
      onUpdated(items.filter((i) => i.id !== id));
      flash("ok", "Item deleted");
    } catch (e: unknown) {
      flash("err", e instanceof Error ? e.message : "Delete failed");
    } finally { setSaving(false); }
  }

  const showForm = editingId !== null || addingNew;

  return (
    <div className="rounded-2xl border border-white/8 bg-white/2 overflow-hidden">
      <div className="px-5 py-4 border-b border-white/8 flex items-center justify-between" style={{ background: `${accent}08` }}>
        <h3 className="text-sm font-bold" style={{ color: accent }}>{ADDON_SECTIONS.find((s) => s.id === section)?.label}</h3>
        {!showForm && (
          <button onClick={startAdd} className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white transition-colors" style={{ background: `${accent}30`, border: `1px solid ${accent}40` }}>
            + Add
          </button>
        )}
      </div>

      <Toast msg={msg} />

      {showForm && (
        <div className="px-5 py-4 border-b border-white/8 space-y-3 bg-white/3">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1.5">Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Service name" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1.5">Price (₹)</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="499" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1.5">Unit</label>
              <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="/ page" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#7c3aed]/60 transition-all" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={submit} disabled={saving || !name} className="px-4 py-2 rounded-lg text-xs font-semibold text-white disabled:opacity-40 transition-colors" style={{ background: accent }}>
              {saving ? "Saving…" : addingNew ? "Add" : "Update"}
            </button>
            <button onClick={cancel} className="px-4 py-2 rounded-lg text-xs border border-white/10 text-white/50 hover:text-white transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="divide-y divide-white/5">
        {items.map((item) => (
          <div key={item.id} className={`flex items-center justify-between px-5 py-3 group hover:bg-white/3 transition-colors ${editingId === item.id ? "bg-white/5" : ""}`}>
            <span className="text-sm text-white">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold" style={{ color: accent }}>
                {item.price != null ? `₹${item.price.toLocaleString("en-IN")}` : "Contact"}
                {item.unit ? <span className="text-xs text-white/30 ml-1">{item.unit}</span> : null}
              </span>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(item)} className="px-2 py-1 rounded-md text-[10px] border border-white/10 text-white/50 hover:text-white transition-colors">Edit</button>
                <button onClick={() => deleteItem(item.id)} className="px-2 py-1 rounded-md text-[10px] border border-red-500/20 text-red-400/60 hover:text-red-400 transition-colors">Del</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-white/20 text-center py-4">No items yet.</p>}
      </div>
    </div>
  );
}

/* ─── Root component ────────────────────────────────────────────────────── */

export default function PackagesManager({ initialPackages }: { initialPackages: PackagesData }) {
  const [tab, setTab] = useState<"main" | "addon">("main");
  const [activeMain, setActiveMain] = useState<MainCategory>("logo");
  const [packages, setPackages] = useState<PackagesData>(initialPackages);

  function updateMain(cat: MainCategory, updated: PackageItem[]) {
    setPackages((prev) => ({ ...prev, [cat]: updated }));
  }

  function updateAddon(section: AddonSectionKey, updated: AddonServiceItem[]) {
    setPackages((prev) => ({ ...prev, addon: { ...prev.addon, [section]: updated } }));
  }

  return (
    <div className="space-y-6">
      {/* Top tabs: Main / Add-on */}
      <div className="flex gap-2 border-b border-white/8 pb-4">
        <button onClick={() => setTab("main")} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "main" ? "bg-[#7c3aed] text-white" : "border border-white/10 text-white/50 hover:text-white"}`}>
          Main Packages
        </button>
        <button onClick={() => setTab("addon")} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "addon" ? "bg-[#7c3aed] text-white" : "border border-white/10 text-white/50 hover:text-white"}`}>
          Add-on Services
        </button>
      </div>

      {tab === "main" && (
        <>
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {MAIN_TABS.map(({ id, label, accent }) => (
              <button
                key={id}
                onClick={() => setActiveMain(id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeMain === id ? "text-white" : "border border-white/10 text-white/50 hover:text-white"}`}
                style={activeMain === id ? { background: accent } : {}}
              >
                {label}
              </button>
            ))}
          </div>

          <PackageList
            key={activeMain}
            category={activeMain}
            packages={packages[activeMain]}
            accent={MAIN_TABS.find((t) => t.id === activeMain)!.accent}
            onUpdated={(updated) => updateMain(activeMain, updated)}
          />
        </>
      )}

      {tab === "addon" && (
        <div className="space-y-6">
          {ADDON_SECTIONS.map(({ id, accent }) => (
            <AddonManager
              key={id}
              section={id}
              items={packages.addon[id]}
              accent={accent}
              onUpdated={(updated) => updateAddon(id, updated)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
