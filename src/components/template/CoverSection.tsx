"use client";

import React, { useState, useEffect, useRef } from "react";
import { useMoodEngine } from "@/lib/mood-engine";

export function CoverSection({ onOpen }: { onOpen: () => void }) {
  const { activeTheme } = useMoodEngine();
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sequential reveal: bg → frame → names → date → CTA
    const timers = [
      setTimeout(() => setStep(1), 200),   // bg visible
      setTimeout(() => setStep(2), 600),   // frame
      setTimeout(() => setStep(3), 900),   // names
      setTimeout(() => setStep(4), 1200),  // date
      setTimeout(() => setStep(5), 1500),  // CTA
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="cover"
      style={{
        position: "relative",
        background: activeTheme.bgGradient,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1.5rem",
        opacity: step >= 1 ? 1 : 0,
        transition: `opacity 1.2s ${ease}`,
      }}
    >
      {/* Grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: activeTheme.grainOpacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          pointerEvents: "none",
        }}
      />

      {/* Decorative frame */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          border: `0.75px solid ${activeTheme.gold}44`,
          borderRadius: "24px",
          padding: "3rem 2.5rem",
          maxWidth: "24rem",
          width: "100%",
          textAlign: "center",
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "scale(1)" : "scale(0.95)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}
      >
        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: activeTheme.textMuted,
            marginBottom: "1rem",
            opacity: step >= 2 ? 1 : 0,
            transition: `opacity 0.8s ${ease}`,
          }}
        >
          The Wedding Of
        </p>

        {/* Names */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "2.75rem",
            fontWeight: 500,
            color: activeTheme.textPrimary,
            lineHeight: 1.2,
            letterSpacing: "0.02em",
            marginBottom: "0.75rem",
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
          }}
        >
          Ali &amp; Lyla
        </h1>

        {/* Date */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: activeTheme.textSecondary,
            letterSpacing: "0.05em",
            marginBottom: "2rem",
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          }}
        >
          Sabtu &bull; 05 Desember 2026
        </p>

        {/* CTA Button */}
        <button
          onClick={onOpen}
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: activeTheme.textPrimary,
            background: "transparent",
            border: `0.75px solid ${activeTheme.gold}88`,
            borderRadius: "999px",
            padding: "0.625rem 1.75rem",
            cursor: "pointer",
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}, background 0.3s ease, border-color 0.3s ease`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = activeTheme.accentAlpha;
            e.currentTarget.style.borderColor = activeTheme.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = `${activeTheme.gold}88`;
          }}
        >
          Open Invitation
        </button>
      </div>

      {/* Recipient */}
      <p
        style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "0.6875rem",
          color: activeTheme.textMuted,
          marginTop: "1.5rem",
          opacity: step >= 5 ? 0.7 : 0,
          transition: `opacity 1s ${ease} 0.3s`,
          position: "relative",
          zIndex: 2,
        }}
      >
        Kepada Yth. Bapak/Ibu/Saudara/i
      </p>
    </section>
  );
}
