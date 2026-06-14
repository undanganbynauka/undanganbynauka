"use client";

import React, { useState, useCallback } from "react";
import { SacredHero } from "@/components/sacred/SacredHero";
import { CountdownSection } from "@/components/template/CountdownSection";
import { BismillahSection } from "@/components/template/BismillahSection";
import { BrideGroomSection } from "@/components/template/BrideGroomSection";
import { EventSection } from "@/components/template/EventSection";
import { OurJourneySection } from "@/components/template/OurJourneySection";
import { RsvpSection } from "@/components/template/RsvpSection";
import { WishesSection } from "@/components/template/WishesSection";
import { AmplopDigitalSection } from "@/components/template/AmplopDigitalSection";
import { ClosingSection } from "@/components/template/ClosingSection";
import { FloatingNav } from "@/components/template/FloatingNav";
import { SaveTheDateCard } from "@/components/template/SaveTheDateCard";
import { IntroSection } from "@/components/template/IntroSection";

type Phase = "gate" | "opening" | "inside";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleOpen = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, []);

  return (
    <main className="sacred-page">
      {/* HERO GATE — always rendered for smooth cross-fade */}
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
        <SacredHero onOpen={phase === "gate" ? handleOpen : undefined} />
      </div>

      {/* INSIDE CONTENT — fades in while cover fades out */}
      {phase !== "gate" && (
        <div
          style={{
            opacity: phase === "opening" ? 0 : 1,
            transition: "opacity 1.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s",
          }}
        >
          <CountdownSection />
          <SaveTheDateCard />
          <BismillahSection />
          <IntroSection />
          <BrideGroomSection />
          <EventSection />
          <OurJourneySection />
          <RsvpSection />
          <WishesSection />
          <AmplopDigitalSection />
          <ClosingSection />
          <FloatingNav />
        </div>
      )}
    </main>
  );
}
