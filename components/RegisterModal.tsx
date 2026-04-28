"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkatoLogo from "./WorkatoLogo";

interface RegisterModalProps {
  cityKey: string;
  cityName: string;
  eventMonth: string;
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

type Step = 1 | 2 | 3;

export default function RegisterModal({
  cityKey,
  cityName,
  eventMonth,
  onClose,
}: RegisterModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
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
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <WorkatoLogo className="w-12 h-12 mx-auto mb-5" />
                <h2
                  className="text-[28px] font-light mb-3"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--teal)" }}
                >
                  Request received.
                </h2>
                <p className="text-[14px] leading-relaxed mb-6" style={{ color: "var(--text-ter)" }}>
                  Thank you, {form.firstName}. We&apos;ll be in touch with details about the{" "}
                  <span style={{ color: "var(--text-sec)" }}>{cityName}</span> dinner in{" "}
                  <span style={{ color: "var(--text-sec)" }}>{eventMonth}</span>.
                </p>
                <button
                  onClick={onClose}
                  className="text-[12px] tracking-[0.1em] uppercase transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                >
                  Close
                </button>
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
                      Request an invitation
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
                  {([1, 2, 3] as Step[]).map((s) => (
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

                  {step === 3 && (
                    <motion.div
                      key="step3"
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
                        Anything to share?
                      </p>
                      <textarea
                        className={`${inputClass} resize-none`}
                        placeholder="Optional note — topics you'd like to discuss, dietary restrictions, etc."
                        rows={4}
                        value={form.message}
                        onChange={update("message")}
                      />
                      <div
                        className="rounded-lg p-4 text-[12px] leading-relaxed"
                        style={{
                          background: "var(--teal-dim)",
                          border: "1px solid var(--teal-line-dark)",
                          color: "var(--text-ter)",
                        }}
                      >
                        <strong style={{ color: "var(--text-sec)" }}>
                          {form.firstName} {form.lastName}
                        </strong>{" "}
                        · {form.title}, {form.company}
                        <br />
                        <span style={{ color: "var(--text-muted)" }}>{form.email}</span>
                      </div>
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
                      onClick={() => setStep((s) => (s - 1) as Step)}
                      className="text-[13px] transition-colors duration-200"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < 3 ? (
                    <button
                      onClick={() => setStep((s) => (s + 1) as Step)}
                      disabled={step === 1 ? !canProceed1 : !canProceed2}
                      className="px-7 py-3 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 disabled:opacity-40"
                      style={{
                        background: "var(--teal)",
                        color: "#111010",
                      }}
                    >
                      Continue →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="px-7 py-3 rounded-lg text-[13px] font-medium tracking-wide transition-all duration-200 disabled:opacity-60"
                      style={{
                        background: "var(--teal)",
                        color: "#111010",
                      }}
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
