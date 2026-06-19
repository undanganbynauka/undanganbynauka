"use client";

import React, { Suspense, useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SoundToggle } from "@/components/mood/SoundToggle";
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

type Phase = "checking" | "gate" | "opening" | "inside";

const STORAGE_KEY = "nauka-sacred-opened";

function SacredContent() {
  const [phase, setPhase] = useState<Phase>("gate");
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "true";

  useEffect(() => {
    if (isPreview) {
      // Preview mode: selalu mulai dari gate, abaikan localStorage
      setPhase("gate");
    } else if (localStorage.getItem(STORAGE_KEY) === "true") {
      setPhase("inside");
    } else {
      setPhase("gate");
    }
  }, [isPreview]);

  const handleOpen = useCallback(() => {
    if (!isPreview) {
      localStorage.setItem(STORAGE_KEY, "true");
    }
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 2200);
  }, [isPreview]);

  // Don't render gate or content until we know localStorage state
  if (phase === "checking") {
    return <main className="sacred-page" />;
  }

  return (
    <main className="sacred-page">
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
          <SacredHero onOpen={phase === "gate" ? handleOpen : undefined} />
        </div>
      )}

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
          <SoundToggle />
        </div>
      )}
    </main>
  );
}

export default function SacredPage() {
  return (
    <Suspense fallback={<main className="sacred-page" />}>
      <SacredContent />
    </Suspense>
  );
}
