"use client";

import React, { useState, useCallback } from "react";
import { NaukaHero } from "@/components/nauka/NaukaHero";
import { KenapaNauka } from "@/components/nauka/KenapaNauka";

type Phase = "gate" | "opening" | "inside";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleEnter = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 1600);
  }, []);

  const isGateVisible = phase === "gate" || phase === "opening";

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* KENAPA NAUKA — Already in place, just hidden behind the gate */}
      <div className="nauka-canvas min-h-screen">
        <KenapaNauka visible={phase === "inside"} />
      </div>

      {/* HERO — The Gate */}
      {isGateVisible && (
        <div
          className={`absolute inset-0 z-20 ${
            phase === "opening" ? "animate-gate-open" : ""
          }`}
        >
          <NaukaHero onEnter={handleEnter} />
        </div>
      )}
    </main>
  );
}
