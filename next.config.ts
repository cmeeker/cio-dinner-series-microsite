import type { NextConfig } from "next";
import { getBasePath } from "./lib/base-path";

const basePath = getBasePath();

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;

// Enables Cloudflare bindings (KV, R2, D1, etc.) during `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
