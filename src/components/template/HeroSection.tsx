"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function HeroSection({ onOpen }: { onOpen: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [showFrame, setShowFrame] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // Background appears first
    setMounted(true);
    // Frame after 400ms
    const t1 = setTimeout(() => setShowFrame(true), 400);
    // Subtitle after 600ms
    const t2 = setTimeout(() => setShowSubtitle(true), 600);
    // Names after 300ms more
    const t3 = setTimeout(() => setShowNames(true), 900);
    // Date after 300ms more
    const t4 = setTimeout(() => setShowDate(true), 1200);
    // Guest info after 300ms more
    const t5 = setTimeout(() => setShowGuest(true), 1500);
    // CTA after 300ms more
    const t6 = setTimeout(() => setShowCta(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#F8F4EE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        opacity: mounted ? 1 : 0,
        transition: `opacity 1s ${ease}`,
      }}
    >
      {/* Groom — left side */}
      <Image
        src="/groom.png"
        alt="Groom"
        width={280}
        height={400}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: 280,
          height: 400,
          objectFit: "cover",
          objectPosition: "bottom center",
          zIndex: 1,
        }}
        priority
      />

      {/* Bride — right side */}
      <Image
        src="/bride.png"
        alt="Bride"
        width={280}
        height={400}
        style={{
          position: "absolute",
          right: -15,
          bottom: 0,
          width: 280,
          height: 400,
          objectFit: "cover",
          objectPosition: "bottom center",
          zIndex: 1,
        }}
        priority
      />

      {/* Top ornament */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "-5%",
          right: "-5%",
          width: "110%",
          height: "180px",
          overflow: "hidden",
          zIndex: 3,
          pointerEvents: "none",
          lineHeight: 0,
        }}
      >
        <Image
          src="/hero-ornament-top.png"
          alt="Ornament"
          width={1400}
          height={200}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
          }}
          priority
        />
      </div>

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "60%",
          maxWidth: "600px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        {/* The Wedding Invitation Of */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.75rem",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            color: "#7D6E63",
            marginBottom: "2rem",
            opacity: showFrame ? 1 : 0,
            transform: showFrame ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease} 0s, transform 1s ${ease} 0s`,
          }}
        >
          The Wedding Invitation Of
        </p>

        {/* Ali dan Lyla */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#7D6E63",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
            opacity: showNames ? 1 : 0,
            transform: showNames ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease} 0s, transform 1s ${ease} 0s`,
          }}
        >
          Ali & Lyla
        </h1>

        {/* Date */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: showDate ? 0.85 : 0,
            transform: showDate ? "translateY(0)" : "translateY(15px)",
            marginBottom: "3rem",
            letterSpacing: "0.05em",
            transition: `opacity 1s ${ease} 0s, transform 1s ${ease} 0s`,
          }}
        >
          Sabtu • 05 Desember 2026
        </p>

        {/* Kepada Yth. */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: showGuest ? 0.7 : 0,
            transform: showGuest ? "translateY(0)" : "translateY(12px)",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
            transition: `opacity 0.9s ${ease} 0s, transform 0.9s ${ease} 0s`,
          }}
        >
          Kepada Yth.
        </p>
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: showGuest ? 0.7 : 0,
            transform: showGuest ? "translateY(0)" : "translateY(12px)",
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
            transition: `opacity 0.9s ${ease} 0.1s, transform 0.9s ${ease} 0.1s`,
          }}
        >
          Bapak/Ibu/Saudara/i
        </p>
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "1rem",
            fontWeight: 500,
            color: "#7D6E63",
            opacity: showGuest ? 1 : 0,
            transform: showGuest ? "translateY(0)" : "translateY(12px)",
            marginBottom: "1.5rem",
            transition: `opacity 0.9s ${ease} 0.2s, transform 0.9s ${ease} 0.2s`,
          }}
        >
          Nama Tamu
        </p>

        {/* Open Invitation Button */}
        <button
          onClick={onOpen}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.75rem",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7D6E63",
            background: "transparent",
            border: "1px solid rgba(125, 110, 99, 0.3)",
            borderRadius: "2px",
            padding: "0.25rem 0.6rem",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(125, 110, 99, 0.05)",
            opacity: showCta ? 1 : 0,
            transform: showCta ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 1s ${ease} 0s, transform 1s ${ease} 0s, all 0.3s ease`,
          }}
        >
          Open Invitation
        </button>
      </div>
    </section>
  );
}
