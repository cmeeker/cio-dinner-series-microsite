# CIO Dinner Series microsite

Next.js (App Router) site for the Workato CIO Dinner Series.

**Production URL shape:** mounted at **`/cio-dinner`** on the main Workato site (e.g. `https://workato.com/cio-dinner` or `https://www.workato.com/cio-dinner`). That is the default **`basePath`**; local dev is [http://localhost:3000/cio-dinner](http://localhost:3000/cio-dinner).

## Local dev

```bash
npm install
npm run dev
```

## Environment

| Variable | Notes |
| -------- | ----- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Required for registration writes in prod |
| `NEXT_PUBLIC_SITE_URL` | Recommended: full app root, e.g. `https://workato.com/cio-dinner`, or origin-only `https://workato.com` (code appends `basePath`) |
| `NEXT_PUBLIC_BASE_PATH` | Optional. Default `/cio-dinner`. Set to **`""`** for a root-mounted preview (then update **`middleware.ts`** matchers to match — they are compile-time static strings). |
| `DEPLOY_TARGET` | Optional server env: `cloudflare` or `vercel` if URL auto-detection is wrong |

### Marketo Engage (form `8856`)

Same idea as a static embed (`forms2.min.js` → `MktoForms2.loadForm` → `vals` / `submit` / `onSuccess`).

| Variable | Notes |
| -------- | ----- |
| `NEXT_PUBLIC_MARKETO_FORM_ID` | Default **`8856`** (CIO Dinners). `/api/register` and client config both use this. |
| `NEXT_PUBLIC_MARKETO_MUNCHKIN_ID` | Default **`741-DET-352`**. |
| `NEXT_PUBLIC_MARKETO_BASE_URL` | Optional. Hostname only (no protocol). Default **`mktg.workato.com`** (same branded host as `workato.com` Forms2 embeds). Set to **`741-DET-352.mktoweb.com`** only if you need the raw Marketo host. |
| `NEXT_PUBLIC_MARKETO_NOTES_FIELD` | API name for the combined context block (city, month, message). Default **`personNote`** — change if your form uses another field. |
| `NEXT_PUBLIC_MARKETO_FIELD_MAP` | Optional JSON map to **rename outgoing keys**, e.g. `{"FirstName":"First_Name__c","personNote":"Program_Notes__c"}`. |

Registrations POST to **`/api/register`**, which forwards to Marketo (`save2`) using the same form id / munchkin / host as **`getMarketoClientConfig()`**.

Helpers: **`lib/marketo-config.ts`**, **`hooks/useMarketoForm.ts`**.

Canonical URL helpers live in **`lib/site-origin.ts`** (`getPublicAppUrl`, `getDeployRuntime`) and **`lib/base-path.ts`** (`getBasePath`, `withBasePath` for client `fetch`).

## Deploy

- **Vercel** — connect repo; set env vars. Use `NEXT_PUBLIC_SITE_URL` for the real public URL (including `/cio-dinner` if that is the path users see).
- **Cloudflare** — full Next needs [OpenNext on Cloudflare](https://developers.cloudflare.com/pages/how-to/deploy-a-nextjs-site/); prefer `NEXT_PUBLIC_SITE_URL` in prod.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
