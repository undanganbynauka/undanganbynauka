"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialClosing() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
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

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1300),
      setTimeout(() => setStep(4), 1800),
      setTimeout(() => setStep(5), 2400),
      setTimeout(() => setStep(6), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="closing" className="celestial-section" style={{
      background: "linear-gradient(180deg, var(--cel-midnight) 0%, #0D1230 50%, #080C20 100%)",
      padding: "5rem 1.5rem 3rem",
      minHeight: "100vh",
      justifyContent: "center",
    }}>
      <div style={{ textAlign: "center", maxWidth: "20rem" }}>
        {/* Moon */}
        <div style={{
          width: "40px", height: "40px", borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #F5E6C8 0%, rgba(201, 169, 110, 0.3) 70%, transparent 100%)",
          boxShadow: "0 0 30px rgba(201, 169, 110, 0.15)",
          margin: "0 auto 2rem",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "scale(1)" : "scale(0.8)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }} />

        {/* Doa */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 400,
          fontStyle: "italic", color: "var(--cel-text)", lineHeight: 2.2,
          direction: "rtl", textAlign: "center", marginBottom: "1.5rem",
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
          letterSpacing: "0.02em",
        }}>
          بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
        </p>

        {/* Transliteration */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.75rem", fontWeight: 400,
          color: "var(--cel-text-dim)", lineHeight: 1.9, marginBottom: "1rem",
          opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}>
          Baarakallahu lakuma wa baaraka &lsquo;alaikuma wa jama&lsquo;a bainakuma fii khair
        </p>

        {/* Translation */}
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.6875rem", fontWeight: 400,
          color: "var(--cel-text-muted)", lineHeight: 1.8, marginBottom: "2rem",
          opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}>
          Semoga Allah memberkahimu berdua dan memberkai pernikahanmu, serta menghimpun kalian berdua dalam kebaikan.
        </p>

        {/* Divider */}
        <div className="celestial-divider" style={{ justifyContent: "center", marginBottom: "2rem" }}>
          <div className="celestial-divider-line" style={{ opacity: step >= 5 ? 0.4 : 0, transition: "opacity 0.8s ease" }} />
          <span style={{ color: "var(--cel-accent)", fontSize: "0.625rem", opacity: step >= 5 ? 0.5 : 0, transition: "opacity 0.6s ease 0.3s" }}>⚭</span>
          <div className="celestial-divider-line" style={{ opacity: step >= 5 ? 0.4 : 0, transition: "opacity 0.8s ease" }} />
        </div>

        {/* Names */}
        <p style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 300,
          color: "var(--cel-text)", letterSpacing: "0.08em", marginBottom: "0.5rem",
          opacity: step >= 6 ? 1 : 0, transform: step >= 6 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }}>
          Ali <span style={{ color: "var(--cel-accent)" }}>&amp;</span> Lyla
        </p>

        {/* Date */}
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.5625rem", fontWeight: 400,
          color: "var(--cel-text-muted)", letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: step >= 6 ? 0.6 : 0,
          transition: "opacity 1s ease",
        }}>
          05 Juli 2026
        </p>
      </div>
    </section>
  );
}
