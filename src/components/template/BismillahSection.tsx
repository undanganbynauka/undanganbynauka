"use client";

import React, { useState, useEffect, useRef } from "react";

export function BismillahSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showBismillah, setShowBismillah] = useState(false);
  const [showVerse, setShowVerse] = useState(false);
  const [showText, setShowText] = useState(false);
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

  useEffect(() => {
    if (!sectionVisible) return;
    const t1 = setTimeout(() => setShowBismillah(true), 200);
    const t2 = setTimeout(() => setShowVerse(true), 900);
    const t3 = setTimeout(() => setShowText(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [sectionVisible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#F8F4EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
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

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "22rem",
          textAlign: "center",
        }}
      >
        {/* Bismillah — Amiri */}
        <p
          style={{
            fontFamily: "var(--font-amiri)",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.8,
            marginBottom: "2rem",
            direction: "rtl",
            opacity: showBismillah ? 1 : 0,
            transform: showBismillah ? "translateY(0)" : "translateY(25px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
          }}
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        {/* Verse Card */}
        <div
          style={{
            background: "rgba(125, 110, 99, 0.04)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px",
            padding: "1.75rem 1.5rem",
            marginBottom: "2rem",
            textAlign: "center",
            opacity: showVerse ? 1 : 0,
            transform: showVerse ? "translateY(0)" : "translateY(25px)",
            transition: `opacity 1.1s ${ease}, transform 1.1s ${ease}`,
          }}
        >
          {/* Ayat */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.75rem",
            }}
          >
            &ldquo;Dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>

          {/* Referensi */}
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#7D6E63",
              opacity: 0.7,
              letterSpacing: "0.05em",
            }}
          >
            QS. Ar-Rum: 21
          </p>
        </div>

        {/* Paragraf */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.9,
            textAlign: "center",
            opacity: showText ? 1 : 0,
            transform: showText ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
          }}
        >
          Setiap pertemuan memiliki waktu terbaik yang telah Allah tetapkan. Melalui jalan yang mungkin tidak selalu kami pahami, Dia mempertemukan, menjaga, dan menuntun langkah hingga tiba pada hari yang penuh syukur ini.
        </p>
      </div>
    </section>
  );
}
