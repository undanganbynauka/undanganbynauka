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
      setTimeout(() => setStep(3), 800),
      setTimeout(() => setStep(4), 1200),
      setTimeout(() => setStep(5), 1500),
      setTimeout(() => setStep(6), 1900),
      setTimeout(() => setStep(7), 2300),
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
      {/* Groom */}
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        {/* Initial A */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "5rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            textShadow: "0 0 20px rgba(201, 169, 110, 0.15), 0 0 40px rgba(201, 169, 110, 0.06)",
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
          }}
        >
          A
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cel-accent)",
            marginBottom: "0.5rem",
            marginTop: "0.75rem",
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          }}
        >
          Mempelai Pria
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.625rem",
            fontWeight: 400,
            color: "var(--cel-text)",
            letterSpacing: "0.04em",
            marginBottom: "0.5rem",
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
          }}
        >
          Ali Rahman
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            color: "var(--cel-text-dim)",
            lineHeight: 1.7,
            opacity: step >= 3 ? 0.8 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          }}
        >
          Putra dari<br />Bapak Hendri &amp; Ibu Ningsih
        </p>
      </div>

      {/* Divider — A & L */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2.5rem",
          opacity: step >= 4 ? 1 : 0,
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

      {/* Bride */}
      <div style={{ textAlign: "center" }}>
        {/* Initial L */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "5rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            textShadow: "0 0 20px rgba(201, 169, 110, 0.15), 0 0 40px rgba(201, 169, 110, 0.06)",
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
          }}
        >
          L
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cel-accent)",
            marginBottom: "0.5rem",
            marginTop: "0.75rem",
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          }}
        >
          Mempelai Wanita
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.625rem",
            fontWeight: 400,
            color: "var(--cel-text)",
            letterSpacing: "0.04em",
            marginBottom: "0.5rem",
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
          }}
        >
          Lyla Azzahra
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            color: "var(--cel-text-dim)",
            lineHeight: 1.7,
            opacity: step >= 7 ? 0.8 : 0,
            transform: step >= 7 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          }}
        >
          Putri dari<br />Bapak Yusuf &amp; Ibu Rahayu
        </p>
      </div>
    </section>
  );
}
