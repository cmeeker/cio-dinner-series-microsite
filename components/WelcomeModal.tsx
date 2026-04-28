"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WorkatoLogo from "./WorkatoLogo";

interface WelcomeModalProps {
  guestName?: string;
  guestCompany?: string;
  repName?: string;
  referredBy?: string;
  referredByCompany?: string;
  cityName: string;
  eventMonth: string;
}

export default function WelcomeModal({
  guestName,
  guestCompany,
  repName,
  referredBy,
  referredByCompany,
  cityName,
  eventMonth,
}: WelcomeModalProps) {
  const [visible, setVisible] = useState(false);
  const firstName = guestName?.split(" ")[0];
  const isReferral = !!referredBy && !repName;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          onClick={() => setVisible(false)}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ background: "rgba(17,16,16,0.92)", backdropFilter: "blur(12px)" }}
          />

          {/* Card */}
          <motion.div
            className="relative z-10 w-full max-w-md text-center"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow */}
            <div
              className="absolute -inset-12 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(103,234,221,0.07) 0%, transparent 70%)",
              }}
            />

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "var(--card)",
                border: "1px solid rgba(103,234,221,0.18)",
              }}
            >
              {/* Top line */}
              <div
                className="h-[2px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--teal), transparent)",
                }}
              />

              <div className="px-10 py-12">
                <WorkatoLogo className="w-10 h-10 mx-auto mb-8" />

                <p
                  className="text-[10px] tracking-[0.28em] uppercase mb-4"
                  style={{ color: "var(--teal)" }}
                >
                  {isReferral ? "A colleague thought of you" : "Personal Invitation"}
                </p>

                <h2
                  className="text-[clamp(36px,6vw,52px)] font-light leading-tight mb-2"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {firstName ? (
                    <>
                      Welcome,
                      <br />
                      <em className="italic" style={{ color: "var(--teal-mid)" }}>
                        {firstName}.
                      </em>
                    </>
                  ) : (
                    <em className="italic" style={{ color: "var(--teal-mid)" }}>
                      You&apos;re invited.
                    </em>
                  )}
                </h2>

                {guestCompany && (
                  <p
                    className="text-[13px] mb-6"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {guestCompany}
                  </p>
                )}

                <p
                  className="text-[15px] leading-relaxed mb-6"
                  style={{
                    color: "var(--text-ter)",
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "18px",
                  }}
                >
                  {isReferral
                    ? "Someone in your network shared this dinner for enterprise leaders in"
                    : "You've been invited to an intimate dinner with enterprise leaders in"}{" "}
                  <span style={{ color: "var(--text-sec)" }}>{cityName}</span>{" "}
                  this{" "}
                  <span style={{ color: "var(--text-sec)" }}>{eventMonth}</span>.
                </p>

                {(repName || referredBy) && (
                  <div
                    className="rounded-lg px-4 py-3 mb-8 text-[12px]"
                    style={{
                      background: "var(--teal-dim)",
                      border: "1px solid var(--teal-line-dark)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {isReferral ? "Referred by" : "Invited by"}{" "}
                    <span style={{ color: "var(--text-ter)" }}>
                      {isReferral ? referredBy : repName}
                    </span>
                    {isReferral && referredByCompany && (
                      <span style={{ color: "var(--text-muted)" }}>
                        {" "}· {referredByCompany}
                      </span>
                    )}
                  </div>
                )}

                <button
                  onClick={() => setVisible(false)}
                  className="w-full py-4 rounded-xl text-[14px] font-medium tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98] mb-4"
                  style={{ background: "var(--teal)", color: "#111010" }}
                >
                  View Your Invitation →
                </button>

                <button
                  onClick={() => setVisible(false)}
                  className="text-[11px] tracking-[0.1em] uppercase transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
