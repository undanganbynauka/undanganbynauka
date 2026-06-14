"use client";

import React from "react";
import Image from "next/image";

interface ChooseYourJourneyProps {
  visible?: boolean;
}

export function ChooseYourJourney({ visible = true }: ChooseYourJourneyProps) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#F8F4EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    >
      {/* Paper grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Islamic geometric pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='900'%3E%3Cdefs%3E%3Cpattern id='p' width='65' height='65' patternUnits='userSpaceOnUse'%3E%3Cpath d='M32.5 4 L61 32.5 L32.5 61 L4 32.5 Z' fill='none' stroke='%23b9ab98' stroke-width='1.2' opacity='0.22'/%3E%3Cpath d='M32.5 16 L48 32.5 L32.5 49 L16 32.5 Z' fill='none' stroke='%23b9ab98' stroke-width='0.9' opacity='0.16'/%3E%3Ccircle cx='32.5' cy='32.5' r='1.6' fill='%23b9ab98' opacity='0.22'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content wrapper — normal flow, arch above text */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "18rem",
          padding: "0 1rem",
        }}
      >
        {/* Arch ornament — normal flow, sits above the text */}
        <Image
          src="/journey-arch.png"
          alt="Arch Ornament"
          width={1026}
          height={555}
          style={{
            width: "90%",
            height: "auto",
            display: "block",
            marginBottom: "1rem",
          }}
          priority
        />

        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1rem",
            fontWeight: 400,
            color: "#7D6E63",
            letterSpacing: "0.04em",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Choose Your Journey
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-lora)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: 0.6,
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: "16rem",
            marginBottom: "1.5rem",
          }}
        >
          Setiap perjalanan memiliki cerita. Pilih bagian yang ingin Anda jelajahi terlebih dahulu.
        </p>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            width: "100%",
          }}
        >
          {/* Card 1: The Wedding Details — disabled until sections are ready */}
          <div
            style={{
              display: "block",
              border: "1px solid rgba(125, 110, 99, 0.25)",
              borderRadius: "4px",
              padding: "0.875rem 1rem",
              textAlign: "center",
              transition: "all 0.4s ease",
              background: "rgba(248, 244, 238, 0.6)",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "#7D6E63",
                letterSpacing: "0.04em",
              }}
            >
              The Wedding Details
            </h3>
          </div>

          {/* Card 2: Our Story — disabled until sections are ready */}
          <div
            style={{
              display: "block",
              border: "1px solid rgba(125, 110, 99, 0.25)",
              borderRadius: "4px",
              padding: "0.875rem 1rem",
              textAlign: "center",
              transition: "all 0.4s ease",
              background: "rgba(248, 244, 238, 0.6)",
              pointerEvents: "none",
              cursor: "default",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "#7D6E63",
                letterSpacing: "0.04em",
              }}
            >
              Our Story
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
