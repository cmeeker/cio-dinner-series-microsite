import type { NextConfig } from "next";
import { getBasePath } from "./lib/base-path";

const basePath = getBasePath();

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
