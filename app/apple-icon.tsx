import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111010",
          borderRadius: 40,
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 34 34"
          fill="none"
        >
          <polygon
            points="17,2 31,9.5 31,24.5 17,32 3,24.5 3,9.5"
            fill="#67EADD"
          />
          <polygon
            points="17,7 27,12.5 27,23.5 17,29 7,23.5 7,12.5"
            fill="#111010"
          />
          <circle cx="17" cy="18" r="3.5" fill="#67EADD" />
          <circle cx="11" cy="14" r="2" fill="#3EA2A8" />
          <circle cx="23" cy="14" r="2" fill="#3EA2A8" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
