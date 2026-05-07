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
        href={`/${city.key}`}
        className="group relative flex flex-col p-6 rounded-xl overflow-hidden transition-all duration-300 h-full"
        style={{
          background: "var(--surface)",
          border: "1px solid rgba(103,234,221,0.12)",
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(103,234,221,0.10) 0%, transparent 70%)",
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

        <div className="relative z-10 flex items-start justify-between mb-5">
          <div>
            <h3
              className="text-[17px] font-medium leading-tight mb-1 transition-colors duration-200 group-hover:text-[var(--teal)]"
              style={{ color: "var(--text)" }}
            >
              {city.city}
            </h3>
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              {city.state}
              {city.country === "CA" ? " · Canada" : ""}
            </p>
          </div>
          <span
            className="text-[12px] font-medium px-2.5 py-1 rounded-md shrink-0 ml-2"
            style={{
              background: "rgba(103,234,221,0.12)",
              color: "var(--teal)",
              border: "1px solid rgba(103,234,221,0.25)",
            }}
          >
            {n}×
          </span>
        </div>

        <div
          className="relative z-10 text-[12px] mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {first.month} – {last.month}
        </div>

        <div
          className="relative z-10 italic leading-snug mb-5 flex-1"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--text-ter)",
            fontSize: "17px",
          }}
        >
          Claw back your control.
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex gap-1.5">
            {city.events.slice(0, 5).map((e) => (
              <div
                key={e.id}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--teal-mid)", opacity: 0.7 }}
              />
            ))}
            {n > 5 && (
              <div
                className="w-1.5 h-1.5 rounded-full"
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
