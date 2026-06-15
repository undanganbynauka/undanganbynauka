"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialBrideGroom() {
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
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 500),
      setTimeout(() => setStep(3), 900),
      setTimeout(() => setStep(4), 1300),
      setTimeout(() => setStep(5), 1700),
      setTimeout(() => setStep(6), 2100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="mempelai"
      className="celestial-section"
      style={{ background: "var(--cel-midnight)", padding: "3rem 1.5rem 5rem" }}
    >
      {/* ── Groom: Initial left, name right ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1.25rem",
          maxWidth: "20rem",
          width: "100%",
          marginBottom: "2.5rem",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}
      >
        {/* Initial A */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "4.5rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            lineHeight: 1,
            textShadow: "0 0 20px rgba(201, 169, 110, 0.12), 0 0 40px rgba(201, 169, 110, 0.05)",
            flexShrink: 0,
            letterSpacing: "0.02em",
          }}
        >
          A
        </p>
        {/* Name & parent */}
        <div style={{ paddingTop: "0.625rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.375rem",
              fontWeight: 400,
              color: "var(--cel-text)",
              letterSpacing: "0.03em",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            Ali Rahman
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.625rem",
              color: "var(--cel-text-dim)",
              lineHeight: 1.7,
              opacity: step >= 2 ? 0.8 : 0,
              transform: step >= 2 ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
            }}
          >
            Putra dari<br />Bapak Hendri &amp; Ibu Ningsih
          </p>
        </div>
      </div>

      {/* Divider — & */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2.5rem",
          opacity: step >= 3 ? 1 : 0,
          transition: `opacity 1s ${ease}`,
        }}
      >
        <div style={{ width: "2.5rem", height: "0.5px", background: "var(--cel-accent)", opacity: 0.3 }} />
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "var(--cel-accent)",
            opacity: 0.6,
          }}
        >
          &amp;
        </span>
        <div style={{ width: "2.5rem", height: "0.5px", background: "var(--cel-accent)", opacity: 0.3 }} />
      </div>

      {/* ── Bride: Initial right, name left ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "1.25rem",
          maxWidth: "20rem",
          width: "100%",
          flexDirection: "row-reverse",
          opacity: step >= 4 ? 1 : 0,
          transform: step >= 4 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}
      >
        {/* Initial L */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "4.5rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            lineHeight: 1,
            textShadow: "0 0 20px rgba(201, 169, 110, 0.12), 0 0 40px rgba(201, 169, 110, 0.05)",
            flexShrink: 0,
            letterSpacing: "0.02em",
          }}
        >
          L
        </p>
        {/* Name & parent */}
        <div style={{ paddingTop: "0.625rem", textAlign: "right" }}>
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.375rem",
              fontWeight: 400,
              color: "var(--cel-text)",
              letterSpacing: "0.03em",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            Lyla Azzahra
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.625rem",
              color: "var(--cel-text-dim)",
              lineHeight: 1.7,
              opacity: step >= 5 ? 0.8 : 0,
              transform: step >= 5 ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
            }}
          >
            Putri dari<br />Bapak Yusuf &amp; Ibu Rahayu
          </p>
        </div>
      </div>
    </section>
  );
}
