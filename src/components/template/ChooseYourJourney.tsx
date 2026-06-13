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
        justifyContent: "flex-start",
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

      {/* Arch ornament — 70% of section height */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "70%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          pointerEvents: "none",
          zIndex: 1,
          lineHeight: 0,
        }}
      >
        <Image
          src="/journey-arch.png"
          alt="Arch Ornament"
          width={1026}
          height={555}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            objectPosition: "top center",
            display: "block",
          }}
          priority
        />
      </div>

      {/* Content — positioned within arch, close to it */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "18rem",
          paddingTop: "30vh",
        }}
      >
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
          {/* Card 1: The Wedding Details */}
          <a
            href="#wedding-details"
            style={{
              display: "block",
              border: "1px solid rgba(125, 110, 99, 0.25)",
              borderRadius: "4px",
              padding: "0.875rem 1rem",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.4s ease",
              background: "rgba(248, 244, 238, 0.6)",
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
          </a>

          {/* Card 2: Our Story */}
          <a
            href="#our-story"
            style={{
              display: "block",
              border: "1px solid rgba(125, 110, 99, 0.25)",
              borderRadius: "4px",
              padding: "0.875rem 1rem",
              textAlign: "center",
              textDecoration: "none",
              transition: "all 0.4s ease",
              background: "rgba(248, 244, 238, 0.6)",
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
          </a>
        </div>
      </div>
    </section>
  );
}
