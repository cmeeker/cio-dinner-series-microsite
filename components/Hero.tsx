"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center px-6 pt-24 pb-10 overflow-hidden">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 12% 50%, rgba(103,234,221,0.055) 0%, transparent 65%), radial-gradient(ellipse 45% 42% at 88% 50%, rgba(62,162,168,0.04) 0%, transparent 60%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Pre-title */}
        <div
          className="inline-flex items-center gap-4 mb-5 text-[14px] tracking-[0.28em] uppercase"
          style={{ color: "var(--teal)" }}
        >
          <span
            className="block w-10 h-px"
            style={{
              background: "linear-gradient(to right, transparent, var(--teal))",
            }}
          />
          North America · FY27
          <span
            className="block w-10 h-px"
            style={{
              background: "linear-gradient(to left, transparent, var(--teal))",
            }}
          />
        </div>

        {/* Main title */}
        <h1
          className="text-[clamp(44px,7vw,78px)] font-light leading-[1.02] tracking-[-0.01em] mb-2"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          CIO
          <br />
          <em className="italic" style={{ color: "var(--teal-mid)" }}>
            Dinner Series
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="font-light italic leading-relaxed mb-7"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-ter)",
            fontSize: "clamp(19px,2.4vw,26px)",
          }}
        >
          An intimate gathering of enterprise leaders across
          <br className="hidden sm:block" />
          North America&apos;s most dynamic markets
        </p>

        {/* Theme pill */}
        <motion.div
          className="inline-block mb-6 px-6 py-2.5 rounded-full italic font-normal"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(15px,1.8vw,20px)",
            color: "var(--teal-mid)",
            border: "1px solid var(--teal-line)",
            background: "var(--teal-dim)",
            letterSpacing: "0.01em",
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          Claw back your control.
        </motion.div>

        {/* Period */}
        <p
          className="text-[12px] tracking-[0.14em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          May 2026 — January 2027
        </p>
      </motion.div>
    </section>
  );
}
