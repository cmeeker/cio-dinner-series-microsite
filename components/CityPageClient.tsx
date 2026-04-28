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
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-[14px] font-medium tracking-wide transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        style={{
          background: "var(--teal)",
          color: "#111010",
        }}
      >
        {prefill?.name ? `Accept invitation →` : "Request an invitation →"}
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
