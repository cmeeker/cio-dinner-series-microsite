/**
 * Path prefix where the app is mounted (e.g. `www.workato.com/cio-dinner`).
 * Must stay in sync with `next.config.ts` `basePath` and `middleware.ts` matchers.
 *
 * Set `NEXT_PUBLIC_BASE_PATH=""` to serve from site root (e.g. standalone preview).
 * Omit env → default `/cio-dinner`.
 */
export function getBasePath(): string {
  if (process.env.NEXT_PUBLIC_BASE_PATH === "") return "";
  const t = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/cio-dinner").trim();
  if (t === "" || t === "/") return "";
  return t.startsWith("/") ? t : `/${t}`;
}

/** Prefix a root-relative route for `fetch()` (Next `<Link>` handles `basePath` itself). */
export function withBasePath(path: string): string {
  const bp = getBasePath();
  const p = path.startsWith("/") ? path : `/${path}`;
  return bp ? `${bp}${p}` : p;
}
