/** Marketo Engage Forms 2.0 config — Workato CIO Dinner Series. */

export type MarketoClientConfig = {
  formId: number;
  munchkinId: string;
  /** Protocol-relative base passed to `loadForm`, e.g. `//741-DET-352.mktoweb.com` */
  loadFormBase: string;
  /** Absolute origin for loading `forms2.min.js` */
  scriptOrigin: string;
};

const MARKETO_FORM_ID   = 8856;
const MARKETO_MUNCHKIN  = "741-DET-352";
const MARKETO_HOST      = `${MARKETO_MUNCHKIN}.mktoweb.com`;

export function getMarketoClientConfig(): MarketoClientConfig {
  return {
    formId:       MARKETO_FORM_ID,
    munchkinId:   MARKETO_MUNCHKIN,
    loadFormBase: `//${MARKETO_HOST}`,
    scriptOrigin: `https://${MARKETO_HOST}`,
  };
}
