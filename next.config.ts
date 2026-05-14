import type { NextConfig } from "next";

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options",    value: "nosniff" },
  { key: "X-Frame-Options",           value: "SAMEORIGIN" },
  { key: "X-XSS-Protection",          value: "1; mode=block" },
  { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Paths that must never be redirected to /cio-dinner/*
const SKIP_REDIRECT = new Set(["_next", "api", "cio-dinner", "apple-icon.png", "icon.png", "favicon.ico", "opengraph-image", "robots.txt"]);

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },

  async rewrites() {
    return [
      // Serve /cio-dinner/* using the existing route handlers at /*
      { source: "/cio-dinner/:path*", destination: "/:path*" },
    ];
  },

  async redirects() {
    // Regex: any single path segment that isn't a reserved/static path
    const skipPattern = [...SKIP_REDIRECT].join("|");
    return [
      // City pages: /boston → /cio-dinner/boston
      {
        source: `/:slug((?!${skipPattern})[^/.][^/]*)`,
        destination: "/cio-dinner/:slug",
        permanent: true,
      },
      // Event pages: /boston/2026-06-29 → /cio-dinner/boston/2026-06-29
      {
        source: `/:slug((?!${skipPattern})[^/.][^/]*)/:date`,
        destination: "/cio-dinner/:slug/:date",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// Enables Cloudflare bindings (KV, R2, D1, etc.) during `next dev` only.
// Skipped on Vercel and CI where CF bindings are not available.
if (process.env.VERCEL !== "1" && process.env.CI !== "1") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}
