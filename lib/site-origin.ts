import { getBasePath } from "@/lib/base-path";

/**
 * Where this build/runtime is expected to be served from.
 * Used for canonical URLs (metadataBase, OG images).
 */
export type DeployRuntime = "cloudflare-pages" | "vercel" | "development" | "unknown";

/** Last-resort origin when host env vars are missing (historical preview host). */
const DEFAULT_PRODUCTION_ORIGIN = "https://cio-dinner-series-microsite.vercel.app";

/**
 * Detects Cloudflare Pages vs Vercel vs local dev.
 *
 * Optional **`DEPLOY_TARGET`** (server env): `cloudflare` | `vercel` forces that branch
 * when auto-detection is wrong (e.g. hybrid CI). Omit or any other value → auto.
 */
export function getDeployRuntime(): DeployRuntime {
  const override = process.env.DEPLOY_TARGET?.trim().toLowerCase();
  if (override === "cloudflare") return "cloudflare-pages";
  if (override === "vercel") return "vercel";

  if (process.env.NODE_ENV === "development") {
    return "development";
  }

  if (isCloudflareSignal()) {
    return "cloudflare-pages";
  }

  if (process.env.VERCEL === "1" || process.env.VERCEL_ENV) {
    return "vercel";
  }

  return "unknown";
}

function isCloudflareSignal(): boolean {
  return Boolean(
    process.env.CF_PAGES_URL?.trim() ||
      process.env.CF_PAGES_BRANCH_URL?.trim() ||
      process.env.CF_PAGES === "1"
  );
}

/**
 * Scheme + host only (no path). Prefer **`getPublicAppUrl()`** for metadata and OG URLs.
 */
export function getSiteOrigin(): string {
  const pub = getPublicAppUrl();
  try {
    return new URL(pub).origin;
  } catch {
    return pub;
  }
}

/**
 * Public base URL of this Next app, including **`getBasePath()`**
 * (e.g. `https://www.workato.com/cio-dinner`).
 *
 * 1. **`NEXT_PUBLIC_SITE_URL`** — if it includes a path, that is the app root; if origin-only,
 *    **`getBasePath()`** is appended.
 * 2. Otherwise auto-detected origin + **`getBasePath()`**.
 */
export function getPublicAppUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    try {
      const u = new URL(explicit);
      const path = u.pathname.replace(/\/$/, "");
      if (path && path !== "/") {
        return `${u.origin}${path}`;
      }
      return joinOriginAndBasePath(u.origin);
    } catch {
      return explicit.replace(/\/$/, "");
    }
  }

  return joinOriginAndBasePath(resolveAutoOrigin());
}

function joinOriginAndBasePath(origin: string): string {
  const bp = getBasePath();
  const o = origin.replace(/\/$/, "");
  if (!bp) return o;
  return `${o}${bp}`;
}

function resolveAutoOrigin(): string {
  const runtime = getDeployRuntime();

  if (runtime === "development") {
    return "http://localhost:3000";
  }

  if (runtime === "cloudflare-pages") {
    const cf =
      process.env.CF_PAGES_URL?.trim() ||
      process.env.CF_PAGES_BRANCH_URL?.trim();
    if (cf) return normalizeOrigin(cf);
    return normalizeOrigin(DEFAULT_PRODUCTION_ORIGIN);
  }

  if (runtime === "vercel") {
    const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    if (vercelProd) return normalizeOrigin(`https://${vercelProd}`);
    const vercelUrl = process.env.VERCEL_URL?.trim();
    if (vercelUrl) {
      return normalizeOrigin(
        vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`
      );
    }
    return normalizeOrigin(DEFAULT_PRODUCTION_ORIGIN);
  }

  const cfPages = process.env.CF_PAGES_URL?.trim();
  if (cfPages) return normalizeOrigin(cfPages);
  const cfBranch = process.env.CF_PAGES_BRANCH_URL?.trim();
  if (cfBranch) return normalizeOrigin(cfBranch);

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return normalizeOrigin(`https://${vercelProd}`);
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return normalizeOrigin(
      vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`
    );
  }

  return normalizeOrigin(DEFAULT_PRODUCTION_ORIGIN);
}

function normalizeOrigin(input: string): string {
  try {
    return new URL(input).origin;
  } catch {
    return input.replace(/\/$/, "");
  }
}
