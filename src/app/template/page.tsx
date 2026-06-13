"use client";

import React, { useState, useCallback } from "react";
import { HeroSection } from "@/components/template/HeroSection";
import { ChooseYourJourney } from "@/components/template/ChooseYourJourney";

type Phase = "gate" | "opening" | "inside";

export default function TemplatePage() {
  const [phase, setPhase] = useState<Phase>("gate");

  const handleOpen = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 1600);
  }, []);

  const isGateVisible = phase === "gate" || phase === "opening";

  return (
    <main>
      {/* Content — visible after gate opens */}
      <div
        style={{
          opacity: phase === "inside" ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <ChooseYourJourney visible={phase === "inside"} />

        {/* Placeholder sections for navigation targets */}
        <section
          id="wedding-details"
          style={{
            minHeight: "100vh",
            background: "#F8F4EE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.25rem",
              color: "#7D6E63",
              opacity: 0.5,
            }}
          >
            Wedding Details
          </p>
        </section>

        <section
          id="our-story"
          style={{
            minHeight: "100vh",
            background: "#F8F4EE",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.25rem",
              color: "#7D6E63",
              opacity: 0.5,
            }}
          >
            Our Story
          </p>
        </section>
      </div>

      {/* HERO GATE — covers everything until opened */}
      {isGateVisible && (
        <div
          className={phase === "opening" ? "animate-gate-open" : ""}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
          }}
        >
          <HeroSection onOpen={handleOpen} />
        </div>
      )}
    </main>
  );
}
