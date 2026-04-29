import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Workato CIO Dinner Series — North America FY27";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(103,234,221,0.07) 0%, transparent 65%)",
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
          NORTH AMERICA · FY27
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <span
            style={{ color: "#FFFFFF", fontSize: 88, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.01em" }}
          >
            CIO
          </span>
          <span
            style={{ color: "#67EADD", fontSize: 88, fontWeight: 300, fontStyle: "italic", lineHeight: 1, letterSpacing: "-0.01em" }}
          >
            Dinner Series
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 21,
            fontStyle: "italic",
            marginBottom: 48,
            letterSpacing: "0.01em",
          }}
        >
          An intimate gathering of enterprise leaders across North America
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            border: "1px solid rgba(103,234,221,0.15)",
            borderRadius: 10,
            overflow: "hidden",
            marginBottom: 56,
          }}
        >
          {(
            [
              ["70", "DINNERS"],
              ["10", "MARKETS"],
              ["9", "MONTHS"],
            ] as [string, string][]
          ).map(([n, l], i, arr) => (
            <div
              key={l}
              style={{
                padding: "20px 48px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRight:
                  i < arr.length - 1 ? "1px solid rgba(103,234,221,0.12)" : "none",
              }}
            >
              <span style={{ color: "#67EADD", fontSize: 40, fontWeight: 300 }}>{n}</span>
              <span
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  marginTop: 6,
                }}
              >
                {l}
              </span>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "rgba(255,255,255,0.22)",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Workato · By invitation only
        </div>
      </div>
    ),
    { ...size }
  );
}
