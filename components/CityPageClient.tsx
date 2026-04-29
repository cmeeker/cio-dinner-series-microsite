"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const RegisterModal = dynamic(() => import("./RegisterModal"), { ssr: false });

interface CityPageClientProps {
  cityKey: string;
  cityName: string;
  eventMonth: string;
  prefill?: { name?: string; company?: string };
}

export default function CityPageClient({
  cityKey,
  cityName,
  eventMonth,
  prefill,
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
        {prefill?.name ? "Accept invitation →" : "Reserve your seat →"}
      </button>

      {showModal && (
        <RegisterModal
          cityKey={cityKey}
          cityName={cityName}
          eventMonth={eventMonth}
          prefill={prefill}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
