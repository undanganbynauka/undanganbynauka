"use client";

import React from "react";
import { useMoodEngine } from "@/lib/mood-engine";
import { MOOD_KEYS, MOOD_THEMES, MoodKey } from "@/lib/mood-themes";

export function MoodSelector() {
  const { activeMood, setMood, isTransitioning } = useMoodEngine();

  const handleSelect = (key: MoodKey) => {
    if (isTransitioning || key === activeMood) return;
    setMood(key);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5rem",
        right: "1rem",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {MOOD_KEYS.map((key) => {
        const theme = MOOD_THEMES[key];
        const isActive = key === activeMood;
        return (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            disabled={isTransitioning}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              border: isActive
                ? `1.5px solid ${theme.accent}`
                : "1px solid rgba(125, 110, 99, 0.1)",
              background: isActive
                ? `linear-gradient(135deg, ${theme.accentAlpha}, rgba(255,255,255,0.6))`
                : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
              cursor: isTransitioning ? "not-allowed" : "pointer",
              transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
              transform: isActive ? "scale(1.05)" : "scale(1)",
              boxShadow: isActive
                ? `0 2px 12px ${theme.accentAlpha}`
                : "0 1px 4px rgba(0,0,0,0.04)",
              opacity: isTransitioning ? 0.6 : 1,
            }}
            title={`${theme.label} — ${theme.soundDesc}`}
          >
            {theme.emoji}
          </button>
        );
      })}
    </div>
  );
}
