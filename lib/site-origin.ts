/**
 * Resolves the public root URL of this app for use in metadata (metadataBase, OG images).
 *
 * Priority:
 * 1. `SITE_URL` env var (server-only) — set this in Cloudflare/production to
 *    `https://cio-dinner.workato.com`
 * 2. Auto-detected from Vercel / Cloudflare platform env vars
 * 3. Falls back to the Vercel preview URL
 */

const DEFAULT_ORIGIN = "https://cio-dinner-series-microsite.vercel.app";

export function getPublicAppUrl(): string {
  // Explicit override — production subdomain
  const explicit = process.env.SITE_URL?.trim();
  if (explicit) {
    try {
      return new URL(explicit).origin;
    } catch {
      return explicit.replace(/\/$/, "");
    }
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Cloudflare Pages
  const cf = process.env.CF_PAGES_URL?.trim() || process.env.CF_PAGES_BRANCH_URL?.trim();
  if (cf) return normalizeOrigin(cf);

  // Vercel
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProd) return normalizeOrigin(`https://${vercelProd}`);
  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return normalizeOrigin(vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`);

  return DEFAULT_ORIGIN;
}

export function getSiteOrigin(): string {
  return getPublicAppUrl();
}

function normalizeOrigin(input: string): string {
  try {
    return new URL(input).origin;
  } catch {
    return input.replace(/\/$/, "");
  }
}
