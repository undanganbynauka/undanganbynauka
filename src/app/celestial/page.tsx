"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function CelestialContent() {
  const [phase, setPhase] = React.useState<Phase>("checking");
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  React.useEffect(() => {
    if (isPreview) {
      setPhase("gate");
    } else if (localStorage.getItem(STORAGE_KEY) === "true") {
      setPhase("inside");
    } else {
      setPhase("gate");
    }
  }, [isPreview]);

  const handleOpen = React.useCallback(() => {
    if (!isPreview) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, [isPreview]);

  if (phase === "checking") {
    return (
      <main className="celestial-page">
        <StarField />
        <ShootingStar />
      </main>
    );
  }

  return (
    <main className="celestial-page">
      <StarField />
      <ShootingStar />

      {(phase === "gate" || phase === "opening") && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          pointerEvents: phase === "gate" ? "auto" : "none",
          opacity: phase === "gate" ? 1 : 0,
          transition: "opacity 2s ease",
        }}>
          <CelestialHero onOpen={phase === "gate" ? handleOpen : undefined} />
        </div>
      )}

      {phase !== "gate" && (
        <div style={{
          opacity: phase === "opening" ? 0 : 1,
          transition: "opacity 1.8s ease 0.6s",
        }}>
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

      <CelestialMusic />
    </main>
  );
}

export default function CelestialPage() {
  return (
    <Suspense fallback={
      <main className="celestial-page">
        <StarField />
        <ShootingStar />
      </main>
    }>
      <CelestialContent />
    </Suspense>
  );
}
