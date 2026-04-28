"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CityCard from "./CityCard";
import { CITIES, REGIONS } from "@/data/events";

export default function RegionAccordion() {
  const [open, setOpen] = useState<string>(Object.keys(REGIONS)[0]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid var(--teal-line-dark)" }}
      >
        {Object.entries(REGIONS).map(([region, keys], idx) => {
          const validKeys = keys.filter((k) => CITIES[k]);
          if (!validKeys.length) return null;
          const totalEvents = validKeys.reduce(
            (sum, k) => sum + CITIES[k].events.length,
            0
          );
          const isOpen = open === region;

          return (
            <div
              key={region}
              style={{
                borderBottom:
                  idx < Object.keys(REGIONS).length - 1
                    ? "1px solid var(--teal-line-dark)"
                    : "none",
              }}
            >
              {/* Region header */}
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-200"
                style={{
                  background: isOpen ? "rgba(103,234,221,0.04)" : "var(--bg2)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isOpen)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "#1c1b1b";
                }}
                onMouseLeave={(e) => {
                  if (!isOpen)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--bg2)";
                }}
                onClick={() => setOpen(isOpen ? "" : region)}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase"
                    style={{ color: "var(--teal)" }}
                  >
                    {region}
                  </span>
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {validKeys.length} cit{validKeys.length > 1 ? "ies" : "y"}{" "}
                    · {totalEvents} event{totalEvents > 1 ? "s" : ""}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[16px]"
                  style={{ color: "var(--teal)" }}
                >
                  ›
                </motion.span>
              </button>

              {/* Region body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5">
                      <div
                        className="grid gap-4"
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(240px, 1fr))",
                        }}
                      >
                        {validKeys.map((key, i) => (
                          <CityCard
                            key={key}
                            city={CITIES[key]}
                            index={i}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
