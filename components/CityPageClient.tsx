"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

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
        />
      )}
    </>
  );
}
