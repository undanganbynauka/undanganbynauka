"use client";

import React, { useState, useCallback, useEffect } from "react";
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

type Phase = "checking" | "gate" | "opening" | "inside";

const STORAGE_KEY = "nauka-celestial-opened";

export default function CelestialPage() {
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setPhase("inside");
    } else {
      setPhase("gate");
    }
  }, []);

  const handleOpen = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "true");
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, []);

  // Don't render anything until we know localStorage state
  if (phase === "checking") {
    return <main className="celestial-page"><StarField /><ShootingStar /></main>;
  }

  return (
    <main className="celestial-page">
      <StarField />
      <ShootingStar />

      {/* HERO GATE — only rendered when phase is gate or opening */}
      {(phase === "gate" || phase === "opening") && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            pointerEvents: phase === "gate" ? "auto" : "none",
            opacity: phase === "gate" ? 1 : 0,
            transition: "opacity 2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <CelestialHero onOpen={phase === "gate" ? handleOpen : undefined} />
        </div>
      )}

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

      {/* MUSIC — always visible when not checking */}
      <CelestialMusic />
    </main>
  );
}
