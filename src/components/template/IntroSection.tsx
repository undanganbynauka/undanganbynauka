"use client";

import React, { useState, useEffect, useRef } from "react";

export function IntroSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <section ref={sectionRef} style={{
      position: "relative",
      padding: "5rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#FAF7F2",
      opacity: visible ? 1 : 0,
      transition: "opacity 600ms ease",
    }}>
      {/* Divider */}
      <div style={{
        width: "80px",
        height: "0.5px",
        background: "#C8B28A",
        opacity: 0.4,
        marginBottom: "3rem",
      }} />

      {/* Bismillah */}
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontSize: "1rem",
        fontWeight: 400,
        color: "#2E2E2E",
        textAlign: "center",
        letterSpacing: "0.04em",
        marginBottom: "1.75rem",
      }}>
        Bismillahirrahmanirrahim
      </p>

      {/* Intro paragraph */}
      <p style={{
        fontFamily: "var(--font-jakarta)",
        fontSize: "0.8125rem",
        fontWeight: 400,
        color: "#6F6F6F",
        textAlign: "center",
        lineHeight: 2,
        maxWidth: "650px",
      }}>
        Atas izin dan kehendak Allah Subhanahu wa Ta&rsquo;ala, kami dipertemukan dalam sebuah perjalanan yang penuh makna. Dengan penuh rasa syukur, izinkan kami memperkenalkan diri sebelum melangkah menuju hari yang InsyaAllah penuh keberkahan.
      </p>
    </section>
  );
}
