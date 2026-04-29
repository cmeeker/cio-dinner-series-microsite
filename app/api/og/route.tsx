import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const city       = searchParams.get("city") ?? "";
  const month      = searchParams.get("month") ?? "";
  const guestName  = searchParams.get("guest_name") ?? "";
  const repName    = searchParams.get("rep_name") ?? "";
  const referredBy = searchParams.get("referred_by") ?? "";

  const isPersonalized = !!(guestName || repName || referredBy);
  const firstName = guestName ? guestName.split(" ")[0] : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#111010",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 55% at 50% 45%, rgba(103,234,221,0.08) 0%, transparent 65%)",
          }}
        />
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(to right, transparent, #67EADD, transparent)",
          }}
        />

        {isPersonalized ? (
          /* ── Personalized layout ── */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Label */}
            <div
              style={{
                color: "#67EADD",
                fontSize: 13,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 32,
              }}
            >
              {referredBy ? "A COLLEAGUE THOUGHT OF YOU" : "PERSONAL INVITATION"}
            </div>

            {/* Headline */}
            <div
              style={{
                color: "#67EADD",
                fontSize: firstName ? 74 : 66,
                fontWeight: 300,
                lineHeight: 1.1,
                textAlign: "center",
                marginBottom: 20,
                fontStyle: "italic",
              }}
            >
              {firstName ? `${firstName}, you're invited.` : "You're invited."}
            </div>

            {/* City + month */}
            {city && (
              <div
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 24,
                  fontStyle: "italic",
                  marginBottom: 40,
                }}
              >
                {city}{month ? ` · ${month}` : ""}
              </div>
            )}

            {/* Attribution pill */}
            {(repName || referredBy) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 28px",
                  border: "1px solid rgba(103,234,221,0.2)",
                  borderRadius: 8,
                  background: "rgba(103,234,221,0.05)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 14,
                  letterSpacing: "0.05em",
                }}
              >
                {referredBy ? "Referred by" : "Invited by"}{" "}
                <span style={{ color: "rgba(255,255,255,0.85)" }}>
                  {referredBy || repName}
                </span>
              </div>
            )}
          </div>
        ) : (
          /* ── City layout ── */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Eyebrow */}
            <div
              style={{
                color: "#67EADD",
                fontSize: 13,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              WORKATO CIO DINNER SERIES
            </div>

            {/* City name */}
            <div
              style={{
                color: "#FFFFFF",
                fontSize: 80,
                fontWeight: 300,
                lineHeight: 1,
                letterSpacing: "-0.01em",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {city}
            </div>

            {/* Italic sub */}
            <div
              style={{
                color: "#67EADD",
                fontSize: 28,
                fontStyle: "italic",
                fontWeight: 300,
                marginBottom: 48,
              }}
            >
              {month ? `${month}` : "An evening with enterprise leaders"}
            </div>

            {/* Pill */}
            <div
              style={{
                padding: "12px 32px",
                border: "1px solid rgba(103,234,221,0.2)",
                borderRadius: 100,
                color: "rgba(255,255,255,0.45)",
                fontSize: 14,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              By invitation only
            </div>
          </div>
        )}

        {/* Bottom wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "rgba(255,255,255,0.2)",
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Workato
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
