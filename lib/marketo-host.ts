/**
 * Marketo hostname for Forms 2.0 + leadCapture/save2.
 *
 * Workato's main site uses `//mktg.workato.com` as the `loadForm` base (see
 * `website/components/SimpleMarketoForm.vue`). Same munchkin + form work there;
 * the branded host avoids domain / bot blocks that hit `*.mktoweb.com` from
 * server-side or non-allowlisted origins.
 *
 * Override with `NEXT_PUBLIC_MARKETO_BASE_URL` (hostname only, e.g.
 * `741-DET-352.mktoweb.com`) if needed.
 */
export function getMarketoHostname(): string {
  const raw = process.env.NEXT_PUBLIC_MARKETO_BASE_URL?.trim();
  if (raw) {
    return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
  return "mktg.workato.com";
}
