"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function ClosingSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#F7F3EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 1.5rem 0",
        minHeight: "100vh",
      }}
    >
      {/* Paper grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main content wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "24rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* Gold accent line — top */}
        <div
          style={{
            width: "40px",
            height: "0.75px",
            background: "#C8B28A",
            marginBottom: "3rem",
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 1.2s ease 0.3s",
          }}
        />

        {/* DOA — Main Arabic Text */}
        <p
          style={{
            fontFamily: "var(--font-amiri)",
            fontSize: "1.375rem",
            fontWeight: 400,
            color: "#2E2E2E",
            lineHeight: 2.2,
            textAlign: "center",
            direction: "rtl",
            marginBottom: "2rem",
            maxWidth: "20rem",
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 1s ease 0.4s",
            letterSpacing: "0.02em",
          }}
        >
          بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>

        {/* Transliteration */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "0.8125rem",
            fontWeight: 400,
            color: "#6F6F6F",
            lineHeight: 1.9,
            textAlign: "center",
            marginBottom: "1.5rem",
            maxWidth: "19rem",
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 1s ease 0.7s",
          }}
        >
          Baarakallahu lakuma wa baaraka &lsquo;alaikuma wa jama&lsquo;a bainakuma fii khair
        </p>

        {/* Arti */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            color: "#8A8A8A",
            lineHeight: 1.8,
            textAlign: "center",
            marginBottom: "3rem",
            maxWidth: "17rem",
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 1s ease 1s",
          }}
        >
          Semoga Allah memberkahimu berdua dan memberkai pernikahanmu, serta menghimpun kalian berdua dalam kebaikan.
        </p>

        {/* Gold accent line — middle divider */}
        <div
          style={{
            width: "24px",
            height: "0.75px",
            background: "#C8B28A",
            marginBottom: "2.5rem",
            opacity: sectionVisible ? 1 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        />

        {/* Ucapan Terima Kasih */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#6F6F6F",
            lineHeight: 1.9,
            textAlign: "center",
            marginBottom: "4rem",
            maxWidth: "18rem",
            opacity: sectionVisible ? 0.75 : 0,
            transition: "opacity 1s ease 1.4s",
          }}
        >
          Terima kasih telah menjadi bagian dari perjalanan kecil kami menuju kisah baru.
        </p>
      </div>

      {/* Signature Block — full width slim footer, stacked centered */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          borderTop: "0.75px solid rgba(125, 110, 99, 0.15)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.0625rem",
          opacity: sectionVisible ? 1 : 0,
          transition: "opacity 1s ease 1.7s",
        }}
      >
        {/* Nauka Logo — small above names */}
        <Image
          src="/nauka-logo.png"
          alt="Nauka"
          width={24}
          height={24}
          style={{
            width: "24px",
            height: "auto",
            filter: "brightness(0.4) sepia(0.15)",
            opacity: 0.4,
            marginBottom: "0.125rem",
          }}
        />

        {/* Names */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.8125rem",
            fontWeight: 400,
            color: "#2E2E2E",
            letterSpacing: "0.04em",
          }}
        >
          Ali &amp; Lyla
        </p>

        {/* Date */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.5625rem",
            fontWeight: 400,
            color: "#6F6F6F",
            opacity: 0.5,
            letterSpacing: "0.04em",
          }}
        >
          05 Juli 2026
        </p>
      </div>
    </section>
  );
}
