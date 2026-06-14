"use client";

import React from "react";
import { useMoodEngine } from "@/lib/mood-engine";

export function SoundToggle() {
  const { isSoundOn, toggleSound, isSoundLoading, activeTheme } = useMoodEngine();

  return (
    <button
      onClick={toggleSound}
      disabled={isSoundLoading}
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: `1px solid ${activeTheme.accent}33`,
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isSoundLoading ? "wait" : "pointer",
        transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        zIndex: 60,
        boxShadow: isSoundOn
          ? `0 2px 10px ${activeTheme.accentAlpha}`
          : "0 1px 3px rgba(0,0,0,0.04)",
        opacity: isSoundLoading ? 0.6 : 1,
      }}
      title={isSoundOn ? "Matikan ambience" : "Putar ambience"}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={activeTheme.accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isSoundOn ? (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </>
        ) : (
          <>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        )}
      </svg>
    </button>
  );
}
