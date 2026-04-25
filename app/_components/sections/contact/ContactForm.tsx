"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\-\+\(\)]{7,20}$/;

type FormState = { name: string; email: string; phone: string; subject: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "loading" | "success" | "error";

const EMPTY: FormState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [apiError, setApiError] = useState("");

  const set = useCallback(<K extends keyof FormState>(field: K, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }, []);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) e.email = "Enter a valid email address.";
    if (form.phone.trim() && !PHONE_RE.test(form.phone)) e.phone = "Enter a valid phone number.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    setApiError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send.");
      setStatus("success");
      setForm(EMPTY);
    } catch (err: unknown) {
      setStatus("error");
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const inputCls = (field: keyof FormState) =>
    `w-full px-5 py-4 rounded-2xl bg-[var(--card-bg)] border text-foreground placeholder:text-muted text-sm focus:outline-none transition-all duration-200 ${
      errors[field]
        ? "border-red-400/60 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
        : "border-[var(--border-color)] focus:border-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20"
    }`;

  return (
    <section ref={ref} className="py-12 md:py-24 px-4 sm:px-6 bg-background relative overflow-hidden">
      <div
        aria-hidden
        className="absolute right-0 bottom-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", filter: "blur(80px)", opacity: 0.08 }}
      />

      <div className="max-w-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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

            {status === "success" ? (
              <div className="rounded-2xl border border-[#10b981]/30 bg-[#10b981]/10 p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-foreground font-bold text-xl mb-2">Message Sent!</p>
                <p className="text-muted text-sm">We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm text-[#a855f7] hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Field error={errors.name}>
                  <input
                    type="text"
                    placeholder="Name *"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls("name")}
                  />
                </Field>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field error={errors.email}>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputCls("email")}
                    />
                  </Field>
                  <Field error={errors.phone}>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputCls("phone")}
                    />
                  </Field>
                </div>

                <Field error={errors.subject}>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                    className={inputCls("subject")}
                  />
                </Field>

                <Field error={errors.message}>
                  <textarea
                    placeholder="Message *"
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className={`${inputCls("message")} resize-none`}
                  />
                </Field>

                {status === "error" && (
                  <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-5 py-3 text-red-400 text-sm">
                    {apiError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 rounded-2xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_30px_rgba(124,58,237,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Sending…
                    </span>
                  ) : "Send Message →"}
                </button>
              </form>
            )}
          </motion.div>
      </div>
    </section>
  );
}

function Field({ children, error }: { children: React.ReactNode; error?: string }) {
  return (
    <div>
      {children}
      {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
    </div>
  );
}
