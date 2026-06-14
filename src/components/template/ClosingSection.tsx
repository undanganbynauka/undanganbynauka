"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function ClosingSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showDoa, setShowDoa] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const [showArti, setShowArti] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [showUcapan, setShowUcapan] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
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

  // Sequential: doa → translit → arti → divider → ucapan → footer
  useEffect(() => {
    if (!sectionVisible) return;
    const timers = [
      setTimeout(() => setShowDoa(true), 300),
      setTimeout(() => setShowTranslit(true), 1000),
      setTimeout(() => setShowArti(true), 1600),
      setTimeout(() => setShowDivider(true), 2200),
      setTimeout(() => setShowUcapan(true), 2800),     // after 500ms from divider
      setTimeout(() => setShowFooter(true), 3600),     // last, 1.2s fade
    ];
    return () => timers.forEach(clearTimeout);
  }, [sectionVisible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#F7F3EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0",
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
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2.5rem 1.5rem 0",
        }}
      >
        {/* Gold accent line — top */}
        <div
          style={{
            width: "40px",
            height: "0.75px",
            background: "#C8B28A",
            marginBottom: "3rem",
            opacity: showDoa ? 1 : 0,
            transform: showDoa ? "scaleX(1)" : "scaleX(0)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
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
            opacity: showDoa ? 1 : 0,
            transform: showDoa ? "translateY(0)" : "translateY(25px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
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
            opacity: showTranslit ? 1 : 0,
            transform: showTranslit ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1.1s ${ease}, transform 1.1s ${ease}`,
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
            opacity: showArti ? 1 : 0,
            transform: showArti ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
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
            opacity: showDivider ? 1 : 0,
            transform: showDivider ? "scaleX(1)" : "scaleX(0)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
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
            marginBottom: "0",
            maxWidth: "18rem",
            opacity: showUcapan ? 0.75 : 0,
            transform: showUcapan ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
          }}
        >
          Terima kasih telah menjadi bagian dari perjalanan kecil kami menuju kisah baru.
        </p>
      </div>

      {/* Nauka Logo + Signature — anchored to bottom */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          paddingBottom: "0.75rem",
          opacity: showFooter ? 1 : 0,
          transform: showFooter ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }}
      >
        {/* Logo above the box */}
        <Image
          src="/nauka-logo.png"
          alt="Nauka"
          width={56}
          height={56}
          style={{
            width: "56px",
            height: "auto",
            filter: "brightness(0.35) sepia(0.12)",
            opacity: 0.65,
          }}
        />

        {/* Slim signature box */}
        <div
          style={{
            width: "100%",
            borderTop: "0.75px solid rgba(125, 110, 99, 0.15)",
            padding: "0.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "0.15rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontWeight: 500,
              color: "#2E2E2E",
              letterSpacing: "0.05em",
            }}
          >
            Ali &amp; Lyla
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              color: "#6F6F6F",
              opacity: 0.6,
              letterSpacing: "0.05em",
            }}
          >
            05 Juli 2026
          </p>
        </div>
      </div>
    </section>
  );
}
