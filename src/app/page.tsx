"use client";

import React, { useState, useCallback } from "react";
import { HeritageHero } from "@/components/template/HeritageHero";
import { HeritageAyat } from "@/components/template/HeritageAyat";
import { HeritageCountdown } from "@/components/template/HeritageCountdown";
import { HeritageEventDetails } from "@/components/template/HeritageEventDetails";
import { HeritageFooter } from "@/components/template/HeritageFooter";

type Phase = "gate" | "opening" | "inside";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleOpen = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 1600);
  }, []);

  const isGateVisible = phase === "gate" || phase === "opening";

  return (
    <main className="heritage-page">
      {/* Content — visible after gate opens */}
      <div
        style={{
          opacity: phase === "inside" ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <HeritageAyat />
        <HeritageCountdown targetDate="2026-08-20T08:00:00" />
        <HeritageEventDetails />
        <HeritageFooter />
      </div>

      {/* HERO GATE — covers everything until opened */}
      {isGateVisible && (
        <div
          className={`fixed inset-0 z-50 ${
            phase === "opening" ? "animate-gate-open" : ""
          }`}
        >
          <HeritageHero
            bride="Nadia"
            groom="Rizky"
            parentBride="Putri dari Bapak Ahmad & Ibu Fatimah"
            parentGroom="Putra dari Bapak Mahmud & Ibu Aisyah"
            onOpen={handleOpen}
          />
        </div>
      )}
    </main>
  );
}
