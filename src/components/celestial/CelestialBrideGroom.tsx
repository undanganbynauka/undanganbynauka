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
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1000),
      setTimeout(() => setStep(4), 1400),
      setTimeout(() => setStep(5), 1800),
      setTimeout(() => setStep(6), 2200),
      setTimeout(() => setStep(7), 2600),
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
      {/* Opening invitation text */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.6875rem",
          fontWeight: 400,
          color: "var(--cel-text-dim)",
          lineHeight: 2,
          textAlign: "center",
          maxWidth: "16rem",
          marginBottom: "3rem",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}
      >
        Dengan penuh rasa bahagia, kami mengundang Bapak/Ibu/Saudara/i untuk hadir serta memberikan doa restu pada hari bahagia kami
      </p>

      {/* ── Groom ── */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        {/* Initial with gold border + glow */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "1px solid rgba(201, 169, 110, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            position: "relative",
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "scale(1)" : "scale(0.85)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
            animation: step >= 2 ? "cel-initial-glow 4s ease-in-out infinite" : "none",
          }}
        >
          {/* Inner ring */}
          <div style={{
            position: "absolute",
            inset: "6px",
            borderRadius: "50%",
            border: "0.5px solid rgba(201, 169, 110, 0.12)",
          }} />
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            position: "relative",
            zIndex: 1,
          }}>
            A
          </p>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.625rem",
          fontWeight: 400,
          color: "var(--cel-text)",
          letterSpacing: "0.04em",
          marginBottom: "0.625rem",
          opacity: step >= 3 ? 1 : 0,
          transform: step >= 3 ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          Ali Rahman
        </h3>

        {/* Gold thin line under name */}
        <div style={{
          width: "2rem",
          height: "0.5px",
          background: "var(--cel-accent)",
          opacity: step >= 3 ? 0.3 : 0,
          margin: "0 auto 0.75rem",
          transition: "opacity 0.8s ease 0.3s",
        }} />

        {/* Parent */}
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.625rem",
          fontWeight: 400,
          color: "var(--cel-text-dim)",
          lineHeight: 1.7,
          letterSpacing: "0.02em",
          opacity: step >= 4 ? 0.8 : 0,
          transform: step >= 4 ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          Putra dari<br />Bapak Hendri &amp; Ibu Ningsih
        </p>
      </div>

      {/* Divider — ornamental */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          marginBottom: "3rem",
          opacity: step >= 5 ? 1 : 0,
          transition: `opacity 1s ${ease}`,
        }}
      >
        <div style={{ width: "3rem", height: "0.5px", background: "linear-gradient(to right, transparent, var(--cel-accent))", opacity: 0.35 }} />
        <div style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          border: "0.5px solid var(--cel-accent)",
          opacity: 0.4,
        }} />
        <span style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "0.875rem",
          fontWeight: 400,
          color: "var(--cel-accent)",
          opacity: 0.5,
        }}>
          &amp;
        </span>
        <div style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          border: "0.5px solid var(--cel-accent)",
          opacity: 0.4,
        }} />
        <div style={{ width: "3rem", height: "0.5px", background: "linear-gradient(to left, transparent, var(--cel-accent))", opacity: 0.35 }} />
      </div>

      {/* ── Bride ── */}
      <div style={{ textAlign: "center" }}>
        {/* Initial with gold border + glow */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "1px solid rgba(201, 169, 110, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            position: "relative",
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? "scale(1)" : "scale(0.85)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
            animation: step >= 6 ? "cel-initial-glow 4s ease-in-out 2s infinite" : "none",
          }}
        >
          {/* Inner ring */}
          <div style={{
            position: "absolute",
            inset: "6px",
            borderRadius: "50%",
            border: "0.5px solid rgba(201, 169, 110, 0.12)",
          }} />
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "3.5rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            lineHeight: 1,
            letterSpacing: "0.02em",
            position: "relative",
            zIndex: 1,
          }}>
            L
          </p>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.625rem",
          fontWeight: 400,
          color: "var(--cel-text)",
          letterSpacing: "0.04em",
          marginBottom: "0.625rem",
          opacity: step >= 6 ? 1 : 0,
          transform: step >= 6 ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
        }}>
          Lyla Azzahra
        </h3>

        {/* Gold thin line under name */}
        <div style={{
          width: "2rem",
          height: "0.5px",
          background: "var(--cel-accent)",
          opacity: step >= 6 ? 0.3 : 0,
          margin: "0 auto 0.75rem",
          transition: "opacity 0.8s ease 0.3s",
        }} />

        {/* Parent */}
        <p style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.625rem",
          fontWeight: 400,
          color: "var(--cel-text-dim)",
          lineHeight: 1.7,
          letterSpacing: "0.02em",
          opacity: step >= 7 ? 0.8 : 0,
          transform: step >= 7 ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          Putri dari<br />Bapak Yusuf &amp; Ibu Rahayu
        </p>
      </div>

      <style>{`
        @keyframes cel-initial-glow {
          0%, 100% {
            box-shadow:
              0 0 15px rgba(201, 169, 110, 0.05),
              0 0 30px rgba(201, 169, 110, 0.03),
              inset 0 0 15px rgba(201, 169, 110, 0.02);
          }
          50% {
            box-shadow:
              0 0 25px rgba(201, 169, 110, 0.12),
              0 0 50px rgba(201, 169, 110, 0.06),
              inset 0 0 25px rgba(201, 169, 110, 0.05);
          }
        }
      `}</style>
    </section>
  );
}
