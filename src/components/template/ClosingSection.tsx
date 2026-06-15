"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function ClosingSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showDoa, setShowDoa] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const [showArti, setShowArti] = useState(false);
  const [showUcapan, setShowUcapan] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [showNames, setShowNames] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !sectionVisible) setSectionVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  useEffect(() => {
    if (!sectionVisible) return;
    const timers = [
      setTimeout(() => setShowDoa(true), 300),
      setTimeout(() => setShowTranslit(true), 1000),
      setTimeout(() => setShowArti(true), 1600),
      setTimeout(() => setShowUcapan(true), 2200),
      setTimeout(() => setShowDivider(true), 2900),
      setTimeout(() => setShowNames(true), 3500),
      setTimeout(() => setShowDate(true), 4100),
      setTimeout(() => setShowLogo(true), 4700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [sectionVisible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="closing" style={{
      position: "relative", background: "#F7F3EE",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "0", minHeight: "100vh",
    }}>
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 2, maxWidth: "24rem", width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "2.5rem 1.5rem 2rem",
      }}>
        {/* Gold line */}
        <div style={{
          width: "40px", height: "0.75px", background: "#C8B28A", marginBottom: "2.5rem",
          opacity: showDoa ? 1 : 0, transform: showDoa ? "scaleX(1)" : "scaleX(0)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }} />

        {/* DOA */}
        <p style={{
          fontFamily: "var(--font-amiri)", fontSize: "1.375rem", fontWeight: 400,
          color: "#2E2E2E", lineHeight: 2.2, textAlign: "center", direction: "rtl",
          marginBottom: "1.5rem", maxWidth: "20rem",
          opacity: showDoa ? 1 : 0, transform: showDoa ? "translateY(0)" : "translateY(25px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`, letterSpacing: "0.02em",
        }}>
          بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>

        {/* Transliteration */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.8125rem", fontWeight: 400,
          color: "#6F6F6F", lineHeight: 1.9, textAlign: "center", marginBottom: "1rem", maxWidth: "19rem",
          opacity: showTranslit ? 1 : 0, transform: showTranslit ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1.1s ${ease}, transform 1.1s ${ease}`,
        }}>
          Baarakallahu lakuma wa baaraka &lsquo;alaikuma wa jama&lsquo;a bainakuma fii khair
        </p>

        {/* Arti */}
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
          color: "#8A8A8A", lineHeight: 1.8, textAlign: "center", marginBottom: "2rem", maxWidth: "17rem",
          opacity: showArti ? 1 : 0, transform: showArti ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}>
          Semoga Allah memberkahimu berdua dan memberkai pernikahanmu, serta menghimpun kalian berdua dalam kebaikan.
        </p>

        {/* Ucapan */}
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", fontWeight: 400,
          color: "#6F6F6F", lineHeight: 1.9, textAlign: "center", maxWidth: "18rem",
          opacity: showUcapan ? 0.75 : 0, transform: showUcapan ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }}>
          Terima kasih telah menjadi bagian dari perjalanan kecil kami menuju kisah baru.
        </p>

        {/* Divider ───── ⚭ ───── */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          marginTop: "2rem", marginBottom: "1.75rem",
          opacity: showDivider ? 1 : 0, transform: showDivider ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }}>
          <div style={{ width: "3rem", height: "0.5px", background: "#C8B28A", opacity: 0.5 }} />
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.75rem", color: "#C8B28A", lineHeight: 1 }}>⚭</span>
          <div style={{ width: "3rem", height: "0.5px", background: "#C8B28A", opacity: 0.5 }} />
        </div>

        {/* Nama Mempelai */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 500,
          color: "#2E2E2E", letterSpacing: "0.08em", textAlign: "center", marginBottom: "0.4rem",
          opacity: showNames ? 1 : 0, transform: showNames ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }}>
          Ali &amp; Lyla
        </p>

        {/* Tanggal */}
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 400,
          color: "#6F6F6F", opacity: showDate ? 0.55 : 0, letterSpacing: "0.12em",
          textTransform: "uppercase", textAlign: "center",
          transform: showDate ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}>
          05 Desember 2026
        </p>

        {/* Logo */}
        <div style={{
          marginTop: "2.5rem",
          opacity: showLogo ? 0.7 : 0, transform: showLogo ? "translateY(0)" : "translateY(6px)",
          transition: `opacity 1.5s ${ease}, transform 1.5s ${ease}`,
        }}>
          <Image src="/nauka-logo.png" alt="Nauka" width={48} height={48}
            style={{ width: "48px", height: "auto", filter: "brightness(0.35) sepia(0.12)" }} />
        </div>
      </div>
    </section>
  );
}
