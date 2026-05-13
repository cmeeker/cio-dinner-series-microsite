"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { City } from "@/data/events";
import { isEventPast, formatEventDateCompact } from "@/lib/event-utils";

interface CityCardProps {
  city: City;
  index?: number;
  active?: boolean;
}

export default function CityCard({ city, index = 0, active = false }: CityCardProps) {
  const n = city.events.length;
  const upcoming = city.events.find((e) => !isEventPast(e));
  const allPast = !upcoming;

  // Date span label
  const first = city.events[0];
  const last = city.events[city.events.length - 1];
  const spanLabel = `${first.month.split(" ")[0].slice(0, 3)} – ${last.month.split(" ")[0].slice(0, 3)} ${last.month.split(" ")[1]}`;

  // Next event label
  let nextLabel = "";
  if (upcoming) {
    if (upcoming.date && upcoming.dateConfirmed) {
      nextLabel = formatEventDateCompact(upcoming.date); // "Jun 9"
    } else {
      nextLabel = upcoming.month; // "August 2026"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Link
        href={`/${city.key}`}
        className="group relative flex flex-col rounded-xl overflow-hidden h-full transition-all duration-300"
        style={{
          background: active ? "rgba(103,234,221,0.06)" : "var(--card)",
          border: active
            ? "1px solid rgba(103,234,221,0.30)"
            : "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Hover top glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(103,234,221,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Hover border brighten */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 1px rgba(103,234,221,0.22)" }}
        />

        {/* Card body */}
        <div className="relative z-10 flex flex-col h-full p-5">

          {/* Header row: city + count badge */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3
                className="font-semibold leading-tight transition-colors duration-200 group-hover:text-[var(--teal)]"
                style={{ color: active ? "var(--teal)" : "var(--text)", fontSize: "19px" }}
              >
                {city.city}
              </h3>
              <p className="mt-0.5" style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                {city.state}{city.country === "CA" ? " · Canada" : ""}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0 mt-0.5">
              {active && (
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md tabular-nums"
                  style={{
                    background: "rgba(103,234,221,0.15)",
                    color: "var(--teal)",
                    border: "1px solid rgba(103,234,221,0.35)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Current
                </span>
              )}
              <span
                className="text-[11px] font-medium px-2 py-0.5 rounded-md tabular-nums"
                style={{
                  background: "rgba(103,234,221,0.10)",
                  color: "var(--teal)",
                  border: "1px solid rgba(103,234,221,0.20)",
                }}
              >
                {n} {n === 1 ? "event" : "events"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-3" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />

          {/* Next event callout */}
          <div className="flex-1 mb-4">
            {allPast ? (
              <p style={{ color: "var(--text-ter)", fontSize: "12px" }}>
                All events completed
              </p>
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] tracking-[0.14em] uppercase font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Next
                </span>
                <span
                  className="text-[13px] font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {nextLabel}
                </span>
              </div>
            )}
          </div>

          {/* Footer: date span + arrow */}
          <div className="flex items-center justify-between">
            <span style={{ color: "var(--text-ter)", fontSize: "12px" }}>
              {spanLabel}
            </span>
            <span
              className="text-[13px] font-medium transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--teal)]"
              style={{ color: "var(--text-muted)" }}
            >
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
