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
    <main className="relative">
      {/* KENAPA NAUKA — Revealed when gate opens */}
      <div className="nauka-canvas min-h-screen">
        <KenapaNauka visible={phase === "inside"} />
      </div>

      {/* PILIH JALUR — Next section */}
      <PilihJalur />

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
