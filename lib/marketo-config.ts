/**
 * Marketo Engage Forms 2.0 — same pattern as a static waitlist embed
 * (script + `MktoForms2.loadForm` + `vals` / `submit` / `onSuccess`).
 *
 * Set **`NEXT_PUBLIC_MARKETO_FORM_ID`** (e.g. `8856`) to enable client-side submit.
 * Optional: `NEXT_PUBLIC_MARKETO_MUNCHKIN_ID`, `NEXT_PUBLIC_MARKETO_BASE_URL` (hostname only).
 */

export type MarketoClientConfig = {
  formId: number;
  munchkinId: string;
  /** Protocol-relative base passed to `loadForm`, e.g. `//741-DET-352.mktoweb.com` */
  loadFormBase: string;
  /** Absolute origin for loading `forms2.min.js` */
  scriptOrigin: string;
};

export function getMarketoClientConfig(): MarketoClientConfig | null {
  const raw = process.env.NEXT_PUBLIC_MARKETO_FORM_ID?.trim();
  if (!raw) return null;
  const formId = parseInt(raw, 10);
  if (Number.isNaN(formId) || formId < 1) return null;

  const munchkinId =
    process.env.NEXT_PUBLIC_MARKETO_MUNCHKIN_ID?.trim() || "741-DET-352";

  const host =
    process.env.NEXT_PUBLIC_MARKETO_BASE_URL?.trim().replace(/^https?:\/\//, "") ||
    `${munchkinId}.mktoweb.com`;

  return {
    formId,
    munchkinId,
    loadFormBase: `//${host}`,
    scriptOrigin: `https://${host}`,
  };
}
