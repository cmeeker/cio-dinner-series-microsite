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
      className="px-8 py-5 text-center"
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
    <section className="relative min-h-[92vh] flex items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 12% 50%, rgba(103,234,221,0.055) 0%, transparent 65%), radial-gradient(ellipse 45% 42% at 88% 50%, rgba(62,162,168,0.04) 0%, transparent 60%)",
        }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />

      <motion.div
        className="relative z-10 max-w-3xl w-full text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Pre-title */}
        <div
          className="inline-flex items-center gap-4 mb-8 text-[11px] tracking-[0.28em] uppercase"
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
          className="text-[clamp(52px,8vw,88px)] font-light leading-[1.02] tracking-[-0.01em] mb-3"
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
          className="text-[clamp(16px,2vw,21px)] font-light italic leading-relaxed mb-10"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-ter)",
          }}
        >
          An intimate gathering of enterprise leaders across
          <br className="hidden sm:block" />
          North America&apos;s most dynamic markets
        </p>

        {/* Theme pill */}
        <motion.div
          className="inline-block mb-8 px-6 py-3 rounded-full text-[clamp(15px,1.8vw,20px)] italic font-normal"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--teal-mid)",
            border: "1px solid var(--teal-line)",
            background: "var(--teal-dim)",
            letterSpacing: "0.01em",
          }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          Claw back your control.
        </motion.div>

        {/* Stats strip */}
        <motion.div
          className="inline-flex overflow-hidden mb-8 rounded-lg"
          style={{ border: "1px solid var(--teal-line-dark)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <AnimatedStat target={70} label="Dinners" delay={600} />
          <AnimatedStat target={10} label="Markets" delay={750} />
          <div className="px-8 py-5 text-center">
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

        {/* Period */}
        <p
          className="text-[12px] tracking-[0.14em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          May 2026 — January 2027
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.16em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Explore
        </span>
        <div
          className="w-px h-9 origin-top animate-[caretPulse_2.2s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(to bottom, var(--teal-mid), transparent)",
          }}
        />
      </div>
    </section>
  );
}
