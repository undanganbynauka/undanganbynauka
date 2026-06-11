"use client";

import React, { useState, useCallback } from "react";
import { NaukaHero } from "@/components/nauka/NaukaHero";
import { KenapaNauka } from "@/components/nauka/KenapaNauka";

type Phase = "gate" | "entering" | "inside";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleEnter = useCallback(() => {
    setPhase("entering");
    // After the door transition completes, switch to "inside"
    setTimeout(() => setPhase("inside"), 1200);
  }, []);

  return (
    <main className="nauka-canvas relative min-h-screen overflow-hidden">
      {/* HERO — The Gate */}
      <div
        className={`absolute inset-0 z-20 transition-all duration-[1200ms] ease-in-out ${
          phase === "gate"
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <NaukaHero onEnter={handleEnter} />
      </div>

      {/* KENAPA NAUKA — The Inside */}
      <div
        className={`min-h-screen transition-all duration-[1200ms] ease-in-out ${
          phase === "inside"
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
      >
        <KenapaNauka />
      </div>
    </main>
  );
}
