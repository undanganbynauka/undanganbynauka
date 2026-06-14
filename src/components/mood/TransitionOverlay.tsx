"use client";

import React from "react";
import { useMoodEngine } from "@/lib/mood-engine";

export function TransitionOverlay() {
  const { isTransitioning } = useMoodEngine();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: isTransitioning ? "all" : "none",
        background: "#F8F4EE",
        opacity: isTransitioning ? 1 : 0,
        transition: "opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    />
  );
}
