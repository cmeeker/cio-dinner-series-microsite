"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { City } from "@/data/events";

interface CityCardProps {
  city: City;
  index?: number;
}

export default function CityCard({ city, index = 0 }: CityCardProps) {
  const first = city.events[0];
  const last = city.events[city.events.length - 1];
  const n = city.events.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/city/${city.key}`}
        className="group relative flex flex-col p-5 rounded-xl overflow-hidden transition-all duration-300 h-full"
        style={{
          background: "var(--card)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(103,234,221,0.07) 0%, transparent 70%)",
          }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(to right, transparent, var(--teal), transparent)",
          }}
        />

        <div className="relative z-10 flex items-start justify-between mb-4">
          <div>
            <h3
              className="text-[15px] font-medium leading-tight mb-1 transition-colors duration-200"
              style={{ color: "var(--text)" }}
            >
              {city.city}
            </h3>
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {city.state}
              {city.country === "CA" ? " · Canada" : ""}
            </p>
          </div>
          <span
            className="text-[11px] font-medium px-2.5 py-1 rounded-md shrink-0 ml-2"
            style={{
              background: "var(--teal-dim)",
              color: "var(--teal)",
              border: "1px solid var(--teal-line-dark)",
            }}
          >
            {n} event{n > 1 ? "s" : ""}
          </span>
        </div>

        <div
          className="relative z-10 text-[11px] mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          {first.month} – {last.month}
        </div>

        <div
          className="relative z-10 text-[12px] italic leading-snug mb-4 flex-1"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-ter)",
            fontSize: "15px",
          }}
        >
          Claw back your control.
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex gap-1">
            {city.events.slice(0, 5).map((e) => (
              <div
                key={e.id}
                className="w-1 h-1 rounded-full"
                style={{ background: "var(--teal-mid)", opacity: 0.6 }}
              />
            ))}
            {n > 5 && (
              <div
                className="w-1 h-1 rounded-full"
                style={{ background: "var(--text-muted)" }}
              />
            )}
          </div>
          <span
            className="text-[18px] transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: "var(--teal)" }}
          >
            →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
