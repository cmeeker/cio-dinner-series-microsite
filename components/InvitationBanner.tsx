"use client";

import { motion } from "framer-motion";
import WorkatoLogo from "./WorkatoLogo";

export interface PersonalizationParams {
  guestName?: string;
  guestCompany?: string;
  repName?: string;
  repCompany?: string;
}

interface InvitationBannerProps extends PersonalizationParams {
  cityName: string;
  eventMonth: string;
}

export default function InvitationBanner({
  guestName,
  guestCompany,
  repName,
  repCompany,
  cityName,
  eventMonth,
}: InvitationBannerProps) {
  const firstName = guestName?.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl mb-10"
      style={{
        background:
          "linear-gradient(135deg, rgba(103,234,221,0.08) 0%, rgba(62,162,168,0.05) 100%)",
        border: "1px solid var(--teal-line)",
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(103,234,221,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-7 py-6 flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Icon */}
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: "rgba(103,234,221,0.12)",
            border: "1px solid var(--teal-line)",
          }}
        >
          <WorkatoLogo className="w-7 h-7" />
        </div>

        {/* Copy */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[11px] tracking-[0.18em] uppercase mb-1"
            style={{ color: "var(--teal)" }}
          >
            Personal invitation
          </p>
          <p className="text-[15px] leading-snug" style={{ color: "var(--text-sec)" }}>
            {firstName ? (
              <>
                <span className="font-medium" style={{ color: "var(--text)" }}>
                  {guestName}
                  {guestCompany ? ` of ${guestCompany}` : ""}
                </span>
                {" — you've been personally invited to the "}
                <span style={{ color: "var(--teal-mid)" }}>
                  {cityName} CIO Dinner
                </span>
                {" in "}
                <span style={{ color: "var(--teal-mid)" }}>{eventMonth}</span>.
              </>
            ) : (
              <>
                {"You've been personally invited to the "}
                <span style={{ color: "var(--teal-mid)" }}>
                  {cityName} CIO Dinner
                </span>
                {" in "}
                <span style={{ color: "var(--teal-mid)" }}>{eventMonth}</span>.
              </>
            )}
          </p>
          {repName && (
            <p className="text-[12px] mt-1.5" style={{ color: "var(--text-muted)" }}>
              Invited by{" "}
              <span style={{ color: "var(--text-ter)" }}>
                {repName}
                {repCompany ? `, ${repCompany}` : ""}
              </span>
            </p>
          )}
        </div>

        {/* Badge */}
        <div
          className="shrink-0 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] tracking-[0.1em] uppercase"
          style={{
            background: "var(--teal-dim)",
            border: "1px solid var(--teal-line-dark)",
            color: "var(--teal)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--teal)" }}
          />
          By invitation only
        </div>
      </div>
    </motion.div>
  );
}
