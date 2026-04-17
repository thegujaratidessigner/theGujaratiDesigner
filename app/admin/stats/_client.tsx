"use client";

import { useState } from "react";
import type { StatItem } from "@/app/api/stats/route";

export default function StatsManager({ initialStats }: { initialStats: StatItem[] }) {
  const [stats, setStats] = useState<StatItem[]>(initialStats);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  function flash(type: "ok" | "err", text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  }

  function update(index: number, field: keyof StatItem, value: string | number) {
    setStats((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: field === "target" ? Number(value) : value } : s))
    );
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });
      if (!res.ok) throw new Error();
      flash("ok", "Stats saved successfully.");
    } catch {
      flash("err", "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {msg && (
        <div
          className={`px-4 py-3 rounded-xl text-sm font-medium ${
            msg.type === "ok"
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/15 text-red-400 border border-red-500/20"
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="grid gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white/3 border border-white/8 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => update(i, "label", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Number</label>
                <input
                  type="number"
                  value={stat.target}
                  min={0}
                  onChange={(e) => update(i, "target", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">Suffix</label>
                <input
                  type="text"
                  value={stat.suffix}
                  onChange={(e) => update(i, "suffix", e.target.value)}
                  placeholder="e.g. + or %"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
                />
              </div>
            </div>

            {/* Preview */}
            <div className="text-center min-w-[70px]">
              <p className="text-2xl font-bold text-white">
                {stat.target}{stat.suffix}
              </p>
              <p className="text-[11px] text-white/30 mt-0.5">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
