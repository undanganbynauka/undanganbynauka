"use client";

import React from "react";
import Image from "next/image";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface HeritageHeroProps {
  bride: string;
  groom: string;
  date?: string;
  guestName?: string;
  onOpen?: () => void;
}

export function HeritageHero({
  bride,
  groom,
  date = "Ahad • 05 Juli 2026",
  guestName = "Nama Tamu",
  onOpen,
}: HeritageHeroProps) {
  const { ref, visible } = useHeritageEntrance();

  return (
    <section
      ref={ref}
      className="heritage-hero-section-original relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "#F8F3E9" }}
    >
      {/* Arch ornament at top */}
      <div
        className={`relative w-full max-w-xs md:max-w-sm transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
        style={{ height: "20vh", minHeight: "120px", maxHeight: "240px" }}
      >
        <Image
          src="/hero-arch-ornament.png"
          alt="Ornamental Arch"
          fill
          sizes="(max-width: 768px) 320px, 384px"
          className="object-contain object-top"
          priority
        />
      </div>

      {/* "The Wedding Invitation Of" */}
      <p
        className={`mt-3 md:mt-5 transition-all duration-1000 delay-100 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.875rem",
          letterSpacing: "0.2em",
          color: "#8B7D6B",
          textTransform: "uppercase",
        }}
      >
        The Wedding Invitation Of
      </p>

      {/* Names: Ali & Lyla — single line */}
      <div
        className={`mt-3 md:mt-5 flex items-baseline justify-center gap-3 transition-all duration-1000 delay-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "2.5rem",
            fontWeight: 300,
            color: "#5D4E37",
            lineHeight: 1.2,
            letterSpacing: "0.02em",
          }}
        >
          {groom}
        </h1>
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "2rem",
            color: "#8B7D6B",
            opacity: 0.6,
          }}
        >
          &
        </span>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "2.5rem",
            fontWeight: 300,
            color: "#5D4E37",
            lineHeight: 1.2,
            letterSpacing: "0.02em",
          }}
        >
          {bride}
        </h1>
      </div>

      {/* Date */}
      <p
        className={`mt-3 md:mt-4 transition-all duration-1000 delay-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.8125rem",
          color: "#8B7D6B",
          letterSpacing: "0.08em",
        }}
      >
        {date}
      </p>

      {/* Kepada Yth. */}
      <div
        className={`mt-5 md:mt-7 flex flex-col items-center gap-0.5 transition-all duration-1000 delay-400 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p style={{ fontSize: "0.75rem", color: "#8B7D6B", letterSpacing: "0.06em" }}>
          Kepada Yth.
        </p>
        <p style={{ fontSize: "0.75rem", color: "#8B7D6B", letterSpacing: "0.06em" }}>
          Bapak/Ibu/Saudara/i
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem",
            color: "#5D4E37",
            fontWeight: 500,
            letterSpacing: "0.04em",
            marginTop: "0.25rem",
          }}
        >
          {guestName}
        </p>
      </div>

      {/* Couple illustration */}
      <div
        className={`mt-5 md:mt-7 relative w-full max-w-xs md:max-w-sm transition-all duration-1000 delay-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ height: "25vh", minHeight: "140px", maxHeight: "260px" }}
      >
        <Image
          src="/couple-illustration.png"
          alt=""
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 320px, 384px"
        />
      </div>

      {/* Open Invitation button */}
      <button
        onClick={onOpen}
        className={`mt-5 md:mt-7 transition-all duration-500 delay-600 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{
          fontFamily: "var(--font-cormorant)",
          display: "inline-block",
          padding: "0.75rem 2.5rem",
          border: "1px solid #8B7D6B",
          borderRadius: "9999px",
          color: "#5D4E37",
          fontSize: "0.8125rem",
          fontWeight: 400,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          background: "transparent",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#5D4E37";
          e.currentTarget.style.color = "#F8F3E9";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#5D4E37";
        }}
      >
        Open Invitation
      </button>
    </section>
  );
}
