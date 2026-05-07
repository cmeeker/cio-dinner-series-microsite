/**
 * Path prefix where the app is mounted (e.g. `www.workato.com/cio-dinner`).
 * Must stay in sync with `next.config.ts` `basePath` and `middleware.ts` matchers.
 *
 * Omit env (or set to `""`) → no basePath; app is served from root (Vercel preview, dev).
 * Set `NEXT_PUBLIC_BASE_PATH=/cio-dinner` in production (Cloudflare → Workato proxy).
 */
export function getBasePath(): string {
  const t = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim();
  if (t === "" || t === "/") return "";
  return t.startsWith("/") ? t : `/${t}`;
}

/** Prefix a root-relative route for `fetch()` (Next `<Link>` handles `basePath` itself). */
export function withBasePath(path: string): string {
  const bp = getBasePath();
  const p = path.startsWith("/") ? path : `/${path}`;
  return bp ? `${bp}${p}` : p;
}
