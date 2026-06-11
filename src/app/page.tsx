"use client";

import React, { useState, useCallback } from "react";
import { NaukaHero } from "@/components/nauka/NaukaHero";
import { KenapaNauka } from "@/components/nauka/KenapaNauka";
import { PilihJalur } from "@/components/nauka/PilihJalur";

type Phase = "gate" | "opening" | "inside";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleEnter = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 1600);
  }, []);

  const isGateVisible = phase === "gate" || phase === "opening";

  return (
    <main className="nauka-page-bg relative min-h-screen">
      {/* Paper grain overlay for entire page */}
      <div className="nauka-page-grain pointer-events-none fixed inset-0 z-0" />

      {/* Floating ambient shapes for entire page */}
      <div className="nauka-blob-1 animate-nauka-float-slow fixed -top-20 -right-20 z-0" />
      <div className="nauka-blob-2 animate-nauka-float-slow fixed -bottom-20 -left-20 z-0" />
      <div className="nauka-blob-3 animate-nauka-float fixed top-1/3 right-1/4 z-0" />

      {/* KENAPA NAUKA — Revealed when gate opens */}
      <div className="relative z-10 min-h-screen">
        <KenapaNauka visible={phase === "inside"} />
      </div>

      {/* Section divider ornament */}
      <div className="nauka-section-divider relative z-10">
        <span className="h-px w-10 bg-nauka-gold/10 md:w-14" />
        <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/15" />
        <span className="h-px w-10 bg-nauka-gold/10 md:w-14" />
      </div>

      {/* PILIH JALUR — Next section */}
      <div className="relative z-10 min-h-screen">
        <PilihJalur />
      </div>

      {/* HERO — The Gate */}
      {isGateVisible && (
        <div
          className={`fixed inset-0 z-50 ${
            phase === "opening" ? "animate-gate-open" : ""
          }`}
        >
          <NaukaHero onEnter={handleEnter} />
        </div>
      )}
    </main>
  );
}
