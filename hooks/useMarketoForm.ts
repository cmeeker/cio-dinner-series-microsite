"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MktoForm } from "@/types/marketo-forms2";
import { getMarketoClientConfig } from "@/lib/marketo-config";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.async = true;
    s.src = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(s);
  });
}

function waitForMktoForms2(timeoutMs: number): Promise<NonNullable<Window["MktoForms2"]>> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      if (window.MktoForms2?.loadForm) {
        resolve(window.MktoForms2);
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error("MktoForms2 did not become available in time."));
        return;
      }
      requestAnimationFrame(tick);
    };
    tick();
  });
}

export type MarketoRegistrationPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  message: string;
  cityKey: string;
  eventMonth: string;
  /** ISO date slug, e.g. "2026-06-09" — passed as a hidden Marketo field */
  eventDate?: string;
  /** Internal event ID — passed as a hidden Marketo field for dedup/reporting */
  eventId?: number;
};

/**
 * Marketo `vals` keys — match Design Studio form **API Name** for form `8856`.
 * Override any key via **`NEXT_PUBLIC_MARKETO_FIELD_MAP`** JSON, e.g.
 * `{"Email":"Email_Address__c","personNote":"Program_Notes__c"}`.
 */
function buildMarketoVals(p: MarketoRegistrationPayload): Record<string, string> {
  const defaults: Record<string, string> = {
    FirstName: p.firstName.trim(),
    LastName: p.lastName.trim(),
    Email: p.email.trim(),
    Company: p.company.trim(),
  };
  if (p.title.trim()) defaults.Title = p.title.trim();

  const notesKey =
    process.env.NEXT_PUBLIC_MARKETO_NOTES_FIELD?.trim() || "personNote";
  const notesBody = [
    `CIO Dinner — ${p.cityKey}`,
    `Month: ${p.eventMonth}`,
    p.eventDate ? `Date: ${p.eventDate}` : null,
    p.message.trim() || null,
  ]
    .filter(Boolean)
    .join("\n");
  if (notesBody) defaults[notesKey] = notesBody;

  // Hidden tracking fields — confirm API names in Marketo Design Studio for form 8856
  const eventDateField =
    process.env.NEXT_PUBLIC_MARKETO_EVENT_DATE_FIELD?.trim() || "CIO_Event_Date__c";
  const eventIdField =
    process.env.NEXT_PUBLIC_MARKETO_EVENT_ID_FIELD?.trim() || "CIO_Event_ID__c";
  if (p.eventDate) defaults[eventDateField] = p.eventDate;
  if (p.eventId) defaults[eventIdField] = String(p.eventId);

  const raw = process.env.NEXT_PUBLIC_MARKETO_FIELD_MAP?.trim();
  if (!raw) return defaults;
  try {
    const rename = JSON.parse(raw) as Record<string, string>;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(defaults)) {
      out[rename[k] ?? k] = v;
    }
    return out;
  } catch {
    return defaults;
  }
}

type Pending = { resolve: () => void; reject: (e: Error) => void };

export function useMarketoForm() {
  const config = getMarketoClientConfig();
  const formRef = useRef<MktoForm | null>(null);
  const pendingRef = useRef<Pending | null>(null);
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const initOnce = useRef(false);

  useEffect(() => {
    if (!config || initOnce.current) return;
    initOnce.current = true;

    let cancelled = false;

    // If loadForm callback never fires (domain not allowlisted, blocked, etc.)
    // treat Marketo as unavailable after 8 s so we can fall back to the API route.
    const loadFormTimeout = window.setTimeout(() => {
      if (!cancelled && !formRef.current) {
        setInitError("marketo_unavailable");
      }
    }, 8000);

    (async () => {
      try {
        await loadScript(`${config.scriptOrigin}/js/forms2/js/forms2.min.js`);
        const mkto = await waitForMktoForms2(8000);
        if (cancelled) return;
        mkto.loadForm(config.loadFormBase, config.munchkinId, config.formId, (form) => {
          if (cancelled) return;
          window.clearTimeout(loadFormTimeout);
          form.onSuccess(() => {
            const pending = pendingRef.current;
            if (pending) {
              pending.resolve();
              pendingRef.current = null;
            }
            return false;
          });
          formRef.current = form;
          setReady(true);
        });
      } catch (e) {
        if (!cancelled) {
          window.clearTimeout(loadFormTimeout);
          setInitError("marketo_unavailable");
        }
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(loadFormTimeout);
    };
  }, [config]);

  const submitToMarketo = useCallback(
    async (payload: MarketoRegistrationPayload) => {
      if (!config) {
        throw new Error("Marketo is not configured.");
      }
      if (initError) {
        throw new Error(initError);
      }
      if (!ready || !formRef.current) {
        throw new Error("Marketo form is still loading. Try again in a moment.");
      }

      const form = formRef.current;
      const vals = buildMarketoVals(payload);

      await new Promise<void>((resolve, reject) => {
        const t = window.setTimeout(() => {
          if (pendingRef.current) {
            pendingRef.current.reject(new Error("Marketo submit timed out."));
            pendingRef.current = null;
          }
        }, 6000);

        pendingRef.current = {
          resolve: () => {
            window.clearTimeout(t);
            resolve();
          },
          reject: (e) => {
            window.clearTimeout(t);
            reject(e);
          },
        };

        try {
          form.vals(vals);
          form.submit();
        } catch (e) {
          pendingRef.current = null;
          window.clearTimeout(t);
          reject(e instanceof Error ? e : new Error("Marketo submit failed."));
        }
      });
    },
    [config, initError, ready]
  );

  return {
    marketoEnabled: !!config,
    marketoReady: ready,
    marketoInitError: initError,
    submitToMarketo,
  };
}
