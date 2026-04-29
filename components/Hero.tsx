"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedStat({
  target,
  label,
  delay = 0,
}: {
  target: number;
  label: string;
  delay?: number;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const duration = 1200;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, target, delay]);

  return (
    <div
      ref={ref}
      className="px-8 py-4 text-center"
      style={{ borderRight: "1px solid var(--teal-line-dark)" }}
    >
      <span
        className="block text-[36px] leading-none font-light"
        style={{
          fontFamily: "var(--font-cormorant)",
          color: "var(--teal-mid)",
        }}
      >
        {value}
      </span>
      <span
        className="block mt-1.5 text-[10px] tracking-[0.16em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

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
          className="inline-flex items-center gap-4 mb-5 text-[11px] tracking-[0.28em] uppercase"
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
          className="text-[clamp(15px,1.8vw,19px)] font-light italic leading-relaxed mb-6"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-ter)",
          }}
        >
          An intimate gathering of enterprise leaders across
          <br className="hidden sm:block" />
          North America&apos;s most dynamic markets
        </p>

        {/* Stats strip */}
        <motion.div
          className="inline-flex overflow-hidden mb-5 rounded-lg"
          style={{ border: "1px solid var(--teal-line-dark)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <AnimatedStat target={70} label="Dinners" delay={120} />
          <AnimatedStat target={10} label="Markets" delay={200} />
          <div className="px-8 py-4 text-center">
            <span
              className="block text-[36px] leading-none font-light"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--teal-mid)",
              }}
            >
              9
            </span>
            <span
              className="block mt-1.5 text-[10px] tracking-[0.16em] uppercase"
              style={{ color: "var(--text-muted)" }}
            >
              Months
            </span>
          </div>
        </motion.div>

        {/* Theme pill */}
        <br />
        <motion.div
          className="inline-block mb-6 px-6 py-2.5 rounded-full text-[clamp(14px,1.6vw,18px)] italic font-normal"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--teal-mid)",
            border: "1px solid var(--teal-line)",
            background: "var(--teal-dim)",
            letterSpacing: "0.01em",
          }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.35 }}
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
