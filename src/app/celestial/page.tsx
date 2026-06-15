"use client";

import React, { useState, useCallback } from "react";
import "@/app/celestial.css";
import { StarField, ShootingStar } from "@/components/celestial/StarField";
import { CelestialHero } from "@/components/celestial/CelestialHero";
import { CelestialSaveTheDate } from "@/components/celestial/CelestialSaveTheDate";
import { CelestialCountdown } from "@/components/celestial/CelestialCountdown";
import { CelestialBrideGroom } from "@/components/celestial/CelestialBrideGroom";
import { CelestialEvent } from "@/components/celestial/CelestialEvent";
import { CelestialJourney } from "@/components/celestial/CelestialJourney";
import { CelestialRSVP } from "@/components/celestial/CelestialRSVP";
import { CelestialWishes } from "@/components/celestial/CelestialWishes";
import { CelestialClosing } from "@/components/celestial/CelestialClosing";
import { CelestialNav } from "@/components/celestial/CelestialNav";
import { CelestialMusic } from "@/components/celestial/CelestialMusic";
import { CelestialSectionReveal } from "@/components/celestial/CelestialSectionReveal";

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
          <CelestialSaveTheDate />
          <CelestialSectionReveal><CelestialCountdown /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialBrideGroom /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialEvent /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialJourney /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialRSVP /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialWishes /></CelestialSectionReveal>
          <CelestialSectionReveal><CelestialClosing /></CelestialSectionReveal>
          <CelestialNav />
        </div>
      )}

      {/* MUSIC — always visible */}
      <CelestialMusic />
    </main>
  );
}
