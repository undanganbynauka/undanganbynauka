"use client";

import React from "react";
import Image from "next/image";

export function HeroSection({ onOpen }: { onOpen: () => void }) {
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

      {/* Islamic geometric pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cdefs%3E%3Cpattern id='p' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath d='M40 5 L75 40 L40 75 L5 40 Z' fill='none' stroke='%23cbbfae' stroke-width='0.6' opacity='0.25'/%3E%3Cpath d='M40 18 L62 40 L40 62 L18 40 Z' fill='none' stroke='%23cbbfae' stroke-width='0.4' opacity='0.2'/%3E%3Ccircle cx='40' cy='40' r='1.2' fill='%23cbbfae' opacity='0.25'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top ornament — over-stretched to hide transparent edges */}
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
          }}
        >
          The Wedding Invitation Of
        </p>

        {/* Ali dan Lyla — Cormorant Garamond */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#7D6E63",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
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
            opacity: 0.85,
            marginBottom: "3rem",
            letterSpacing: "0.05em",
          }}
        >
          Ahad • 05 Juli 2026
        </p>

        {/* Kepada Yth. */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: 0.7,
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
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
            opacity: 0.7,
            letterSpacing: "0.1em",
            marginBottom: "0.5rem",
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
            marginBottom: "1.5rem",
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
            transition: "all 0.3s ease",
          }}
        >
          Open Invitation
        </button>
      </div>
    </section>
  );
}
