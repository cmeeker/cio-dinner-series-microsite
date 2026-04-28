"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RegisterModalProps {
  cityKey: string;
  cityName: string;
  eventMonth: string;
  prefill?: { name?: string; company?: string };
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  message: string;
}

type Step = 1 | 2;

export default function RegisterModal({
  cityKey,
  cityName,
  eventMonth,
  prefill,
  onClose,
}: RegisterModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const prefillFirst = prefill?.name?.split(" ")[0] ?? "";
  const prefillLast  = prefill?.name?.split(" ").slice(1).join(" ") ?? "";

  const [form, setForm] = useState<FormData>({
    firstName: prefillFirst,
    lastName:  prefillLast,
    email: "",
    company: prefill?.company ?? "",
    title: "",
    message: "",
  });

  const update = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const canProceed1 = form.firstName.trim() && form.lastName.trim() && form.email.includes("@");
  const canProceed2 = form.company.trim() && form.title.trim();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cityKey,
          eventMonth,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-lg text-[14px] outline-none transition-all duration-200
    placeholder:opacity-40 bg-[var(--surface)] border border-[rgba(255,255,255,0.08)]
    focus:border-[var(--teal-line)] focus:bg-[rgba(103,234,221,0.03)]
    text-[var(--text)]
  `;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(17,16,16,0.85)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden"
          style={{
            background: "var(--card)",
            border: "1px solid var(--teal-line-dark)",
          }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top accent */}
          <div
            className="h-[2px] w-full"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--teal), transparent)",
            }}
          />

          <div className="px-7 pt-6 pb-8">
            {submitted ? (
              <motion.div
                className="py-8"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center mb-8">
                  <h2
                    className="text-[28px] font-light mb-3"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--teal)" }}
                  >
                    Request received.
                  </h2>
                  <p className="text-[14px] leading-relaxed" style={{ color: "var(--text-ter)" }}>
                    Thank you, {form.firstName}. We&apos;ll be in touch with details about the{" "}
                    <span style={{ color: "var(--text-sec)" }}>{cityName}</span> dinner in{" "}
                    <span style={{ color: "var(--text-sec)" }}>{eventMonth}</span>.
                  </p>
                </div>

                {/* Share with a colleague */}
                <div
                  className="rounded-xl p-5 mb-6"
                  style={{ background: "var(--teal-dim)", border: "1px solid var(--teal-line-dark)" }}
                >
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase mb-1"
                    style={{ color: "var(--teal)" }}
                  >
                    Know someone who should join?
                  </p>
                  <p className="text-[13px] mb-4" style={{ color: "var(--text-ter)" }}>
                    Share this dinner with a colleague — they&apos;ll see you referred them when they open the link.
                  </p>
                  <button
                    onClick={() => {
                      const base = `${window.location.origin}/city/${cityKey}`;
                      const params = new URLSearchParams({
                        referred_by: `${form.firstName} ${form.lastName}`.trim(),
                        ...(form.company ? { referred_by_company: form.company } : {}),
                      });
                      navigator.clipboard.writeText(`${base}?${params.toString()}`).then(() => {
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2500);
                      });
                    }}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 active:scale-[0.98]"
                    style={{ background: copied ? "rgba(103,234,221,0.15)" : "var(--teal)", color: copied ? "var(--teal)" : "#111010", border: copied ? "1px solid var(--teal-line)" : "1px solid transparent" }}
                  >
                    {copied ? (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7l3.5 3.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Link copied!
                      </>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <rect x="1" y="4" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                          <path d="M5 1h7a1 1 0 0 1 1 1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                        Copy invitation link
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={onClose}
                    className="text-[12px] tracking-[0.1em] uppercase transition-colors duration-200"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-start justify-between mb-7">
                  <div>
                    <p
                      className="text-[10px] tracking-[0.22em] uppercase mb-2"
                      style={{ color: "var(--teal)" }}
                    >
                      {prefill?.name ? "Accept your invitation" : "Request an invitation"}
                    </p>
                    <h2
                      className="text-[22px] font-light leading-tight"
                      style={{ fontFamily: "var(--font-cormorant)", color: "var(--text)" }}
                    >
                      {cityName} · {eventMonth}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-[18px] leading-none transition-colors duration-200 mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    ×
                  </button>
                </div>

                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-7">
                  {([1, 2] as Step[]).map((s) => (
                    <div
                      key={s}
                      className="h-[2px] flex-1 rounded-full transition-all duration-300"
                      style={{
                        background:
                          s <= step ? "var(--teal-mid)" : "var(--teal-line-dark)",
                      }}
                    />
                  ))}
                </div>

                {/* Steps */}
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-4"
                    >
                      <p
                        className="text-[12px] uppercase tracking-[0.12em] mb-4"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Your details
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          className={inputClass}
                          placeholder="First name"
                          value={form.firstName}
                          onChange={update("firstName")}
                        />
                        <input
                          className={inputClass}
                          placeholder="Last name"
                          value={form.lastName}
                          onChange={update("lastName")}
                        />
                      </div>
                      <input
                        className={inputClass}
                        type="email"
                        placeholder="Work email"
                        value={form.email}
                        onChange={update("email")}
                      />
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.22 }}
                      className="space-y-4"
                    >
                      <p
                        className="text-[12px] uppercase tracking-[0.12em] mb-4"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Your organization
                      </p>
                      <input
                        className={inputClass}
                        placeholder="Company"
                        value={form.company}
                        onChange={update("company")}
                      />
                      <input
                        className={inputClass}
                        placeholder="Title / Role"
                        value={form.title}
                        onChange={update("title")}
                      />
                    </motion.div>
                  )}

                </AnimatePresence>

                {error && (
                  <p className="mt-4 text-[12px]" style={{ color: "#FF6B6B" }}>
                    {error}
                  </p>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center mt-7">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(1)}
                      className="text-[13px] transition-colors duration-200"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < 2 ? (
                    <button
                      onClick={() => setStep(2)}
                      disabled={!canProceed1}
                      className="px-7 py-3 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 disabled:opacity-40"
                      style={{ background: "var(--teal)", color: "#111010" }}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !canProceed2}
                      className="px-7 py-3 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 disabled:opacity-60"
                      style={{ background: "var(--teal)", color: "#111010" }}
                    >
                      {loading ? "Sending…" : "Submit Request"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
