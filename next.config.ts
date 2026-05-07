import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;

// Enables Cloudflare bindings (KV, R2, D1, etc.) during `next dev` only.
// Skipped on Vercel and CI where CF bindings are not available.
if (process.env.VERCEL !== "1" && process.env.CI !== "1") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");
  initOpenNextCloudflareForDev();
}
