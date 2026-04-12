"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up to backend / email service
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section ref={ref} className="py-24 px-6 bg-background relative overflow-hidden">
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-[400px] h-[400px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border-color)] aspect-[3/4] max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed]/30 via-[#4c1d95]/20 to-[#ec4899]/20" />
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center text-white text-4xl font-extrabold" style={{ fontFamily: "var(--font-syne)" }}>
                  KT
                </div>
                <p className="text-foreground font-bold text-xl" style={{ fontFamily: "var(--font-syne)" }}>Kunal Thacker</p>
                <p className="text-muted text-sm">Founder &amp; Director</p>
                <p className="text-muted text-xs mt-1">The Gujarati Designer</p>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -inset-3 rounded-3xl border border-[#7c3aed]/10 pointer-events-none max-w-md" />
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 text-[#a855f7] text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
              Contact Us
            </div>

            <h2
              className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-8"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Get Into{" "}
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Touch
              </span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
                />
              </div>
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
                />
              </div>
              {/* Subject */}
              <div>
                <input
                  type="text"
                  placeholder="Your Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-colors"
                />
              </div>
              {/* Message */}
              <div>
                <textarea
                  placeholder="Message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-[#7c3aed]/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(124,58,237,0.35)]"
              >
                {sent ? "Message Sent ✓" : "GET IT NOW →"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
