"use client";

import React, { useState, useCallback } from "react";
import { HeroSection } from "@/components/template/HeroSection";
import { ChooseYourJourney } from "@/components/template/ChooseYourJourney";
import { BismillahSection } from "@/components/template/BismillahSection";

type Phase = "gate" | "opening" | "inside";

export default function TemplatePage() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleOpen = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 1400);
  }, []);

  const isGateVisible = phase === "gate" || phase === "opening";

  return (
    <main>
      {/* Content — starts fading in during "opening" phase for cross-fade */}
      <div
        style={{
          opacity: phase === "gate" ? 0 : 1,
          transition: "opacity 1.2s ease",
        }}
      >
        <ChooseYourJourney visible={phase !== "gate"} />
        <BismillahSection />
      </div>

      {/* HERO GATE — smooth fade out */}
      {isGateVisible && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            opacity: phase === "opening" ? 0 : 1,
            transition: phase === "opening" ? "opacity 1.4s ease" : "none",
          }}
        >
          <HeroSection onOpen={handleOpen} />
        </div>
      )}
    </main>
  );
}
