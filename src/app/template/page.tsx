"use client";

import React, { useState, useCallback, useEffect } from "react";
import { HeroSection } from "@/components/template/HeroSection";
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

type Phase = "checking" | "gate" | "opening" | "inside";

const STORAGE_KEY = "nauka-heritage-opened";

export default function TemplatePage() {
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
    setTimeout(() => setPhase("inside"), 1400);
  }, []);

  // Don't render gate or content until we know localStorage state
  if (phase === "checking") {
    return <main />;
  }

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
        <div id="countdown"><CountdownSection /></div>
        <div id="bismillah"><BismillahSection /></div>
        <div id="journey"><OurJourneySection /></div>
        <div id="mempelai"><BrideGroomSection /></div>
        <div id="acara"><EventSection /></div>
        <div id="rsvp"><RsvpSection /></div>
        <div id="ucapan"><WishesSection /></div>
        <div id="hadiah"><AmplopDigitalSection /></div>
        <div id="doa"><ClosingSection /></div>
      </div>

      {/* HERO GATE — only rendered when visible */}
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

      {/* Floating Navigation — only when inside */}
      {phase === "inside" && <FloatingNav />}
    </main>
  );
}
