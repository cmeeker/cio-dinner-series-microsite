/** Marketo Engage Forms 2.0 config — Workato CIO Dinner Series. */

import { getMarketoHostname } from "@/lib/marketo-host";

export type MarketoClientConfig = {
  formId: number;
  munchkinId: string;
  /** Protocol-relative base passed to `loadForm`, e.g. `//mktg.workato.com` */
  loadFormBase: string;
  /** Absolute origin for loading `forms2.min.js` */
  scriptOrigin: string;
};

const MARKETO_FORM_ID = 8856;
const MARKETO_MUNCHKIN =
  process.env.NEXT_PUBLIC_MARKETO_MUNCHKIN_ID?.trim() || "741-DET-352";

export function getMarketoClientConfig(): MarketoClientConfig {
  const host = getMarketoHostname();
  return {
    formId:
      Number.parseInt(process.env.NEXT_PUBLIC_MARKETO_FORM_ID ?? "", 10) ||
      MARKETO_FORM_ID,
    munchkinId: MARKETO_MUNCHKIN,
    loadFormBase: `//${host}`,
    scriptOrigin: `https://${host}`,
  };
}
