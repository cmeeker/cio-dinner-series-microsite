import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Workato CIO Dinner Series — North America FY27";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [lightFont, italicFont] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/CormorantGaramond-Light.ttf")),
    readFile(join(process.cwd(), "public/fonts/CormorantGaramond-LightItalic.ttf")),
  ]);

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
          fontFamily: "Cormorant",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 55% at 50% 45%, rgba(103,234,221,0.07) 0%, transparent 65%)",
          }}
        />
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(to right, transparent, #67EADD, transparent)",
          }}
        />
        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(103,234,221,0.25), transparent)",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            color: "rgba(103,234,221,0.6)",
            fontSize: 13,
            letterSpacing: "0.32em",
            fontFamily: "sans-serif",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          NORTH AMERICA · FY27
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 24,
            gap: 0,
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: 112,
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              fontFamily: "Cormorant",
            }}
          >
            CIO
          </span>
          <span
            style={{
              color: "#67EADD",
              fontSize: 96,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1,
              letterSpacing: "0.01em",
              fontFamily: "Cormorant",
            }}
          >
            Dinner Series
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 48,
            height: 1,
            background: "rgba(103,234,221,0.3)",
            marginBottom: 24,
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 20,
            fontStyle: "italic",
            letterSpacing: "0.02em",
            marginBottom: 52,
            fontFamily: "Cormorant",
          }}
        >
          An intimate gathering of enterprise leaders across North America
        </div>

        {/* Season pill */}
        <div
          style={{
            padding: "10px 28px",
            border: "1px solid rgba(103,234,221,0.18)",
            borderRadius: 100,
            color: "rgba(255,255,255,0.4)",
            fontSize: 13,
            letterSpacing: "0.1em",
            fontFamily: "sans-serif",
            textTransform: "uppercase",
          }}
        >
          May 2026 — January 2027
        </div>

        {/* Wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            color: "rgba(255,255,255,0.2)",
            fontSize: 12,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Workato · By invitation only
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: lightFont, weight: 300, style: "normal" },
        { name: "Cormorant", data: italicFont, weight: 300, style: "italic" },
      ],
    }
  );
}
