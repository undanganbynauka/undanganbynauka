"use client";

import React, { useState, useEffect } from "react";

export function CelestialHero({ onOpen }: { onOpen?: () => void }) {
  const [guestName, setGuestName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    if (name) setGuestName(decodeURIComponent(name));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Cover image — full bleed, cover fit */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/celestial/cover.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: mounted ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />

      {/* Dark overlay — so text is readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(11,16,38,0.45) 0%, rgba(11,16,38,0.30) 40%, rgba(11,16,38,0.50) 70%, rgba(11,16,38,0.75) 100%)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 2s ease 0.3s",
        }}
      />

      {/* Content */}
      {/* Guest name */}
      {guestName && (
        <p
          style={{
            position: "relative",
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "var(--cel-accent)",
            marginBottom: "2rem",
            opacity: mounted ? 0.9 : 0,
            transition: "opacity 1.5s ease 0.3s",
          }}
        >
          Kepada Yth. {guestName}
        </p>
      )}

      {/* Names */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 2s ease 0.5s, transform 2s ease 0.5s",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cel-text-dim)",
            marginBottom: "1rem",
          }}
        >
          The Wedding of
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "3rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            letterSpacing: "0.04em",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
          }}
        >
          Ali <span style={{ color: "var(--cel-accent)", fontWeight: 400 }}>&amp;</span> Lyla
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "var(--cel-text-muted)",
          }}
        >
          05 . 07 . 2026
        </p>
      </div>

      {/* Open button */}
      {onOpen && (
        <button
          onClick={onOpen}
          style={{
            position: "relative",
            marginTop: "3rem",
            padding: "0.75rem 2.5rem",
            border: "1px solid var(--cel-accent)",
            borderRadius: "9999px",
            background: "transparent",
            color: "var(--cel-accent)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            transition: "all 0.4s ease",
            opacity: mounted ? 1 : 0,
            animation: "cel-glow-pulse 4s ease-in-out infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(201, 169, 110, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          Buka Undangan
        </button>
      )}
    </div>
  );
}
