"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useMarketoForm } from "@/hooks/useMarketoForm";

const RegisterModal = dynamic(() => import("./RegisterModal"), { ssr: false });

interface CityPageClientProps {
  cityKey: string;
  cityName: string;
  eventMonth: string;
  eventDate?: string;
  eventId?: number;
  prefill?: { name?: string; email?: string; company?: string };
  isPersonalized?: boolean;
}

const isMarketoEl = (el: Element): boolean => {
  if (el.tagName === "LINK") {
    const href = (el as HTMLLinkElement).href || "";
    return href.includes("mkto") || href.includes("marketo") || href.includes("mktoweb");
  }
  if (el.tagName === "STYLE") {
    const text = (el as HTMLStyleElement).textContent || "";
    return (
      text.includes("mktoForm") || text.includes(".mkto") ||
      text.includes("mktoModal") || text.includes("mktoButton") ||
      text.includes("mktoAsterix") || text.includes("mktoOffset") ||
      text.includes("mktoGutter") || text.includes("mktoFieldWrap")
    );
  }
  return false;
};

export default function CityPageClient({
  cityKey,
  cityName,
  eventMonth,
  eventDate,
  eventId,
  prefill,
  isPersonalized,
}: CityPageClientProps) {
  const [showModal, setShowModal] = useState(false);

  // Initialize Marketo on page mount — not on modal open — so the form is
  // ready before the user finishes filling it out.
  const { marketoEnabled, marketoReady, marketoInitError, submitToMarketo } = useMarketoForm();

  // Start watching for Marketo style injection as soon as this page mounts,
  // not just when the modal opens.
  useEffect(() => {
    const killMarketoStyles = () => {
      document.querySelectorAll("style, link[rel='stylesheet']").forEach((el) => {
        if (isMarketoEl(el)) el.remove();
      });
      document.querySelectorAll<HTMLElement>(".mktoForm, form[id*='mkto']").forEach((el) => {
        el.style.cssText =
          "display:none!important;position:absolute!important;" +
          "width:0!important;height:0!important;overflow:hidden!important;";
      });
    };
    killMarketoStyles();
    const observer = new MutationObserver(killMarketoStyles);
    observer.observe(document.head, { childList: true, subtree: true });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        id="city-register-btn"
        onClick={() => setShowModal(true)}
        className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-[14px] font-medium tracking-wide transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(103,234,221,0.25)] active:scale-[0.98] cursor-pointer"
        style={{
          background: "var(--teal)",
          color: "#111010",
        }}
      >
        {(prefill?.name || isPersonalized) ? "Accept invitation →" : "Reserve your seat →"}
      </button>

      {showModal && (
        <RegisterModal
          cityKey={cityKey}
          cityName={cityName}
          eventMonth={eventMonth}
          eventDate={eventDate}
          eventId={eventId}
          prefill={prefill}
          isPersonalized={isPersonalized}
          onClose={() => setShowModal(false)}
          marketoEnabled={marketoEnabled}
          marketoReady={marketoReady}
          marketoInitError={marketoInitError}
          submitToMarketo={submitToMarketo}
        />
      )}
    </>
  );
}
