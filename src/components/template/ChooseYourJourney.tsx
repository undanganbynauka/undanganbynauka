"use client";

import React from "react";

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
        padding: "5rem 1.5rem",
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
        }}
      />

      {/* Title */}
      <h2
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "1.75rem",
          fontWeight: 400,
          color: "#7D6E63",
          letterSpacing: "0.04em",
          marginBottom: "1rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        Choose Your Journey
      </h2>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-lora)",
          fontSize: "0.8125rem",
          fontWeight: 400,
          color: "#7D6E63",
          opacity: 0.6,
          lineHeight: 1.8,
          textAlign: "center",
          maxWidth: "28rem",
          marginBottom: "3.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        Setiap perjalanan memiliki cerita. Pilih bagian yang ingin Anda jelajahi terlebih dahulu.
      </p>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "28rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Card 1: The Wedding Details */}
        <a
          href="#wedding-details"
          style={{
            display: "block",
            border: "1px solid rgba(125, 110, 99, 0.25)",
            borderRadius: "4px",
            padding: "2.5rem 2rem",
            textAlign: "center",
            textDecoration: "none",
            transition: "all 0.4s ease",
            background: "transparent",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7D6E63",
              opacity: 0.5,
              marginBottom: "0.75rem",
            }}
          >
            01
          </p>
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.25rem",
              fontWeight: 400,
              color: "#7D6E63",
              letterSpacing: "0.04em",
              marginBottom: "0.75rem",
            }}
          >
            The Wedding Details
          </h3>
          <p
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              opacity: 0.55,
              lineHeight: 1.7,
            }}
          >
            Informasi acara, profil mempelai, lokasi, jadwal, dan countdown.
          </p>
        </a>

        {/* Card 2: Our Story */}
        <a
          href="#our-story"
          style={{
            display: "block",
            border: "1px solid rgba(125, 110, 99, 0.25)",
            borderRadius: "4px",
            padding: "2.5rem 2rem",
            textAlign: "center",
            textDecoration: "none",
            transition: "all 0.4s ease",
            background: "transparent",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7D6E63",
              opacity: 0.5,
              marginBottom: "0.75rem",
            }}
          >
            02
          </p>
          <h3
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "1.25rem",
              fontWeight: 400,
              color: "#7D6E63",
              letterSpacing: "0.04em",
              marginBottom: "0.75rem",
            }}
          >
            Our Story
          </h3>
          <p
            style={{
              fontFamily: "var(--font-lora)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              opacity: 0.55,
              lineHeight: 1.7,
            }}
          >
            Kisah perjalanan, RSVP, amplop digital, dan ucapan untuk pengantin.
          </p>
        </a>
      </div>
    </section>
  );
}
