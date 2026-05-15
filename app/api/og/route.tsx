import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

async function loadFonts() {
  const [light, italic] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/CormorantGaramond-Light.ttf")),
    readFile(join(process.cwd(), "public/fonts/CormorantGaramond-LightItalic.ttf")),
  ]);
  return [
    { name: "Cormorant", data: light,  weight: 300 as const, style: "normal"  as const },
    { name: "Cormorant", data: italic, weight: 300 as const, style: "italic"  as const },
  ];
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const city        = searchParams.get("city")        ?? "";
  const month       = searchParams.get("month")       ?? "";
  const date        = searchParams.get("date")        ?? ""; // e.g. "Monday, June 29"
  const venue       = searchParams.get("venue")       ?? "";
  const guestName   = searchParams.get("guest_name")  ?? "";
  const repName     = searchParams.get("rep_name")    ?? "";
  const referredBy  = searchParams.get("referred_by") ?? "";

  const isPersonalized = !!(guestName || repName || referredBy);
  const isEventPage    = !!(date || venue);
  const firstName      = guestName ? guestName.split(" ")[0] : "";

  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#111010",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          position: "relative",
          fontFamily: "Cormorant",
          padding: "64px 80px",
        }}
      >
        {/* Radial glow — top right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 70% 20%, rgba(103,234,221,0.07) 0%, transparent 65%)",
          }}
        />
        {/* Top accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(to right, #67EADD, transparent 60%)",
          }}
        />

        {isPersonalized ? (
          /* ── Personalized layout ── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              width: "100%",
            }}
          >
            <div
              style={{
                color: "rgba(103,234,221,0.65)",
                fontSize: 14,
                letterSpacing: "0.28em",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                marginBottom: 28,
              }}
            >
              {referredBy ? "A COLLEAGUE THOUGHT OF YOU" : "PERSONAL INVITATION"}
            </div>

            <div
              style={{
                color: "#67EADD",
                fontSize: firstName ? 80 : 72,
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.05,
                marginBottom: 20,
                fontFamily: "Cormorant",
              }}
            >
              {firstName ? `${firstName}, you're invited.` : "You're invited."}
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 28,
                fontStyle: "italic",
                fontFamily: "Cormorant",
                marginBottom: (repName || referredBy) ? 36 : 0,
              }}
            >
              {city}{date ? ` · ${date}` : month ? ` · ${month}` : ""}
            </div>

            {(repName || referredBy) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  border: "1px solid rgba(103,234,221,0.18)",
                  borderRadius: 8,
                  background: "rgba(103,234,221,0.04)",
                  color: "rgba(255,255,255,0.45)",
                  fontSize: 14,
                  letterSpacing: "0.05em",
                  fontFamily: "sans-serif",
                  alignSelf: "flex-start",
                }}
              >
                {referredBy ? "Referred by " : "Invited by "}
                <span style={{ color: "rgba(255,255,255,0.85)", marginLeft: 4 }}>
                  {referredBy || repName}
                </span>
              </div>
            )}
          </div>
        ) : (
          /* ── City / Event layout ── */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              width: "100%",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                color: "rgba(103,234,221,0.6)",
                fontSize: 13,
                letterSpacing: "0.3em",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              WORKATO CIO DINNER SERIES
            </div>

            {/* City name — large */}
            <div
              style={{
                color: "#FFFFFF",
                fontSize: isEventPage ? 90 : 104,
                fontWeight: 300,
                lineHeight: 0.95,
                letterSpacing: "0.01em",
                fontFamily: "Cormorant",
                marginBottom: 16,
              }}
            >
              {city}
            </div>

            {/* Date / month line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: venue ? 12 : 36,
              }}
            >
              <div
                style={{
                  color: "#67EADD",
                  fontSize: 30,
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontFamily: "Cormorant",
                }}
              >
                {date || month || "An evening with enterprise leaders"}
              </div>
            </div>

            {/* Venue line */}
            {venue && (
              <div
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 20,
                  fontStyle: "italic",
                  fontFamily: "Cormorant",
                  marginBottom: 36,
                }}
              >
                {venue}
              </div>
            )}

            {/* Invite pill */}
            <div
              style={{
                padding: "10px 24px",
                border: "1px solid rgba(103,234,221,0.18)",
                borderRadius: 100,
                color: "rgba(255,255,255,0.35)",
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontFamily: "sans-serif",
                alignSelf: "flex-start",
              }}
            >
              By invitation only
            </div>
          </div>
        )}

        {/* Workato wordmark — top right */}
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 80,
            color: "rgba(255,255,255,0.18)",
            fontSize: 13,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Workato
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  );
}
