"use client";

import React from "react";
import Image from "next/image";

export function HeroSection() {
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
          right: 0,
          bottom: 0,
          width: 280,
          height: 400,
          objectFit: "cover",
          objectPosition: "bottom center",
          zIndex: 1,
        }}
        priority
      />

      {/* Center content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "40%",
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
            fontSize: "0.875rem",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7D6E63",
            marginBottom: "2rem",
          }}
        >
          The Wedding Invitation Of
        </p>

        {/* Ali dan Lyla */}
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "2rem",
            fontWeight: 400,
            color: "#7D6E63",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          Ali dan Lyla
        </h1>

        {/* Date */}
        <p
          style={{
            fontFamily: "var(--font-lora)",
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
            fontFamily: "var(--font-lora)",
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
            fontFamily: "var(--font-lora)",
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
            fontFamily: "var(--font-playfair)",
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
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.5625rem",
            fontWeight: 400,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#7D6E63",
            background: "transparent",
            border: "1px solid rgba(125, 110, 99, 0.35)",
            borderRadius: "2px",
            padding: "0.35rem 0.85rem",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(125, 110, 99, 0.06)",
            transition: "all 0.3s ease",
          }}
        >
          Open Invitation
        </button>
      </div>
    </section>
  );
}
