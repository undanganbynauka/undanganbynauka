"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function ClosingSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section ref={sectionRef} id="closing" style={{
      position: "relative", background: "#F7F3EE",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "0", minHeight: "100vh",
      opacity: visible ? 1 : 0,
      transition: "opacity 700ms ease",
    }}>
      <div style={{
        position: "relative", zIndex: 2, maxWidth: "24rem", width: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "3rem 1.5rem 2.5rem",
      }}>
        {/* Gold line */}
        <div style={{
          width: "40px", height: "0.75px", background: "#C8B28A", marginBottom: "2.5rem", opacity: 0.5,
        }} />

        {/* DOA */}
        <p style={{
          fontFamily: "var(--font-amiri)", fontSize: "1.375rem", fontWeight: 400,
          color: "#2E2E2E", lineHeight: 2.2, textAlign: "center", direction: "rtl",
          marginBottom: "1.5rem", maxWidth: "20rem", letterSpacing: "0.02em",
        }}>
          بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>

        {/* Transliteration */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.8125rem", fontWeight: 400,
          color: "#6F6F6F", lineHeight: 1.9, textAlign: "center", marginBottom: "1rem", maxWidth: "19rem",
        }}>
          Baarakallahu lakuma wa baaraka &lsquo;alaikuma wa jama&lsquo;a bainakuma fii khair
        </p>

        {/* Arti */}
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
          color: "#8A8A8A", lineHeight: 1.8, textAlign: "center", marginBottom: "2rem", maxWidth: "17rem",
        }}>
          Semoga Allah memberkahimu berdua dan memberkai pernikahanmu, serta menghimpun kalian berdua dalam kebaikan.
        </p>

        {/* Ucapan */}
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", fontWeight: 400,
          color: "#6F6F6F", lineHeight: 1.9, textAlign: "center", maxWidth: "18rem", opacity: 0.75,
        }}>
          Terima kasih telah menjadi bagian dari perjalanan kecil kami menuju kisah baru.
        </p>

        {/* Divider */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          marginTop: "2rem", marginBottom: "1.75rem",
        }}>
          <div style={{ width: "3rem", height: "0.5px", background: "#C8B28A", opacity: 0.5 }} />
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.75rem", color: "#C8B28A", lineHeight: 1 }}>⚭</span>
          <div style={{ width: "3rem", height: "0.5px", background: "#C8B28A", opacity: 0.5 }} />
        </div>

        {/* Nama Mempelai */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 500,
          color: "#2E2E2E", letterSpacing: "0.08em", textAlign: "center", marginBottom: "0.4rem",
        }}>
          Ali &amp; Lyla
        </p>

        {/* Tanggal */}
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 400,
          color: "#6F6F6F", opacity: 0.55, letterSpacing: "0.12em",
          textTransform: "uppercase", textAlign: "center",
        }}>
          05 Desember 2026
        </p>

        {/* Logo */}
        <div style={{ marginTop: "2.5rem", opacity: 0.35 }}>
          <Image src="/nauka-logo.png" alt="Nauka" width={28} height={28}
            style={{ width: "28px", height: "auto", filter: "brightness(0.35) sepia(0.12)" }} />
        </div>
      </div>
    </section>
  );
}
