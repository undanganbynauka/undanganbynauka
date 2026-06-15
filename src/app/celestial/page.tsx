"use client";

import React, { useState, useCallback } from "react";
import "@/app/celestial.css";
import { StarField, ShootingStar } from "@/components/celestial/StarField";
import { CelestialHero } from "@/components/celestial/CelestialHero";
import { CelestialCountdown } from "@/components/celestial/CelestialCountdown";
import { CelestialIntro } from "@/components/celestial/CelestialIntro";
import { CelestialBrideGroom } from "@/components/celestial/CelestialBrideGroom";
import { CelestialEvent } from "@/components/celestial/CelestialEvent";
import { CelestialJourney } from "@/components/celestial/CelestialJourney";
import { CelestialRSVP } from "@/components/celestial/CelestialRSVP";
import { CelestialWishes } from "@/components/celestial/CelestialWishes";
import { CelestialAmplopDigital } from "@/components/celestial/CelestialAmplopDigital";
import { CelestialClosing } from "@/components/celestial/CelestialClosing";
import { CelestialNav } from "@/components/celestial/CelestialNav";

type Phase = "gate" | "opening" | "inside";

export default function CelestialPage() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleOpen = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, []);

  return (
    <main className="celestial-page">
      <StarField />
      <ShootingStar />

      {/* HERO GATE */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: phase === "gate" ? "auto" : "none",
          opacity: phase === "gate" ? 1 : phase === "opening" ? 0 : 0,
          transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <CelestialHero onOpen={phase === "gate" ? handleOpen : undefined} />
      </div>

      {/* INSIDE CONTENT */}
      {phase !== "gate" && (
        <div
          style={{
            opacity: phase === "opening" ? 0 : 1,
            transition: "opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
          }}
        >
          <CelestialCountdown />
          <CelestialIntro />
          <CelestialBrideGroom />
          <CelestialEvent />
          <CelestialJourney />
          <CelestialRSVP />
          <CelestialWishes />
          <CelestialAmplopDigital />
          <CelestialClosing />
          <CelestialNav />
        </div>
      )}
    </main>
  );
}
