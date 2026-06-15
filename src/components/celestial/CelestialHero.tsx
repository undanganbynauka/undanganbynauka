"use client";

import React, { useState, useEffect, useRef } from "react";

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
        background: "linear-gradient(180deg, #0B1026 0%, #162044 50%, #1A2555 100%)",
        overflow: "hidden",
      }}
    >
      {/* Moon */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "15%",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #F5E6C8 0%, #E8D5A8 40%, rgba(201, 169, 110, 0.2) 70%, transparent 100%)",
          boxShadow: "0 0 60px rgba(201, 169, 110, 0.15), 0 0 120px rgba(201, 169, 110, 0.08)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />

      {/* Constellation lines - decorative */}
      <svg
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "120px",
          height: "120px",
          opacity: mounted ? 0.15 : 0,
          transition: "opacity 3s ease 0.5s",
        }}
        viewBox="0 0 120 120"
        fill="none"
        stroke="rgba(201, 169, 110, 0.5)"
        strokeWidth="0.5"
      >
        <circle cx="20" cy="20" r="1.5" fill="rgba(201, 169, 110, 0.5)" />
        <circle cx="60" cy="10" r="1" fill="rgba(201, 169, 110, 0.5)" />
        <circle cx="100" cy="30" r="1.5" fill="rgba(201, 169, 110, 0.5)" />
        <circle cx="50" cy="50" r="1" fill="rgba(201, 169, 110, 0.5)" />
        <circle cx="80" cy="70" r="1.5" fill="rgba(201, 169, 110, 0.5)" />
        <circle cx="30" cy="80" r="1" fill="rgba(201, 169, 110, 0.5)" />
        <line x1="20" y1="20" x2="60" y2="10" />
        <line x1="60" y1="10" x2="100" y2="30" />
        <line x1="60" y1="10" x2="50" y2="50" />
        <line x1="50" y1="50" x2="80" y2="70" />
        <line x1="50" y1="50" x2="30" y2="80" />
      </svg>

      {/* Guest name */}
      {guestName && (
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "var(--cel-accent)",
            marginBottom: "2rem",
            opacity: mounted ? 0.8 : 0,
            transition: "opacity 1.5s ease 0.3s",
          }}
        >
          Kepada Yth. {guestName}
        </p>
      )}

      {/* Names */}
      <div
        style={{
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
