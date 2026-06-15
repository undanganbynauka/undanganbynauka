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
      setTimeout(() => setStep(3), 900),
      setTimeout(() => setStep(4), 1300),
      setTimeout(() => setStep(5), 1600),
      setTimeout(() => setStep(6), 2000),
      setTimeout(() => setStep(7), 2400),
      setTimeout(() => setStep(8), 2700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="mempelai" className="celestial-section" style={{ background: "var(--cel-midnight)", padding: "3rem 1.5rem 5rem" }}>
      {/* Groom - Constellation style */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        {/* Constellation circle */}
        <div style={{
          width: "140px", height: "140px", borderRadius: "50%",
          border: "1px solid var(--cel-border)",
          margin: "0 auto 1.5rem", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "scale(1)" : "scale(0.9)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          animation: step >= 1 ? "cel-glow-pulse 6s ease-in-out infinite" : "none",
        }}>
          {/* Stars constellation inside circle */}
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ position: "absolute" }}>
            {/* Head */}
            <circle cx="50" cy="25" r="12" stroke="var(--cel-accent)" strokeWidth="0.5" opacity="0.6" />
            {/* Body */}
            <path d="M30 55 Q50 40 70 55 L75 85 Q50 80 25 85 Z" stroke="var(--cel-accent)" strokeWidth="0.5" opacity="0.4" fill="none" />
            {/* Connection lines */}
            <line x1="50" y1="37" x2="50" y2="55" stroke="var(--cel-accent)" strokeWidth="0.3" opacity="0.3" />
            {/* Star points */}
            <circle cx="50" cy="25" r="1.5" fill="var(--cel-accent)" opacity="0.8" />
            <circle cx="35" cy="55" r="1" fill="var(--cel-accent)" opacity="0.6" />
            <circle cx="65" cy="55" r="1" fill="var(--cel-accent)" opacity="0.6" />
            <circle cx="30" cy="80" r="0.8" fill="var(--cel-accent)" opacity="0.4" />
            <circle cx="70" cy="80" r="0.8" fill="var(--cel-accent)" opacity="0.4" />
            <circle cx="50" cy="85" r="0.8" fill="var(--cel-accent)" opacity="0.4" />
          </svg>
          {/* Male symbol */}
          <p style={{
            fontFamily: "var(--font-cormorant)", fontSize: "0.75rem", color: "var(--cel-accent)",
            position: "relative", zIndex: 1, opacity: 0.3, letterSpacing: "0.1em",
          }}>♂</p>
        </div>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
          marginBottom: "0.5rem",
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>Mempelai Pria</p>
        <h3 style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 400,
          color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "0.5rem",
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
        }}>Ali Rahman</h3>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--cel-text-dim)", lineHeight: 1.7,
          opacity: step >= 3 ? 0.8 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          Putra dari<br />Bapak Hendri &amp; Ibu Ningsih
        </p>
      </div>

      {/* Divider */}
      <div className="celestial-divider" style={{ justifyContent: "center", marginBottom: "3rem" }}>
        <div className="celestial-divider-line" style={{ opacity: step >= 4 ? 0.4 : 0, transition: "opacity 0.8s ease" }} />
        <span style={{
          color: "var(--cel-accent)", fontSize: "0.75rem", opacity: step >= 5 ? 0.5 : 0,
          transition: "opacity 0.6s ease 0.3s",
        }}>⚭</span>
        <div className="celestial-divider-line" style={{ opacity: step >= 4 ? 0.4 : 0, transition: "opacity 0.8s ease" }} />
      </div>

      {/* Bride - Constellation style */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "140px", height: "140px", borderRadius: "50%",
          border: "1px solid var(--cel-border)",
          margin: "0 auto 1.5rem", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: step >= 6 ? 1 : 0, transform: step >= 6 ? "scale(1)" : "scale(0.9)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          animation: step >= 6 ? "cel-glow-pulse 6s ease-in-out 3s infinite" : "none",
        }}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" style={{ position: "absolute" }}>
            {/* Head with hijab */}
            <circle cx="50" cy="28" r="14" stroke="var(--cel-accent)" strokeWidth="0.5" opacity="0.6" />
            {/* Hijab shape */}
            <path d="M32 28 Q32 12 50 10 Q68 12 68 28 Q72 35 72 50 L28 50 Q28 35 32 28" stroke="var(--cel-accent)" strokeWidth="0.5" opacity="0.4" fill="none" />
            {/* Body */}
            <path d="M25 55 Q50 45 75 55 L78 85 Q50 82 22 85 Z" stroke="var(--cel-accent)" strokeWidth="0.5" opacity="0.35" fill="none" />
            {/* Star points */}
            <circle cx="50" cy="28" r="1.5" fill="var(--cel-accent)" opacity="0.8" />
            <circle cx="32" cy="40" r="1" fill="var(--cel-accent)" opacity="0.5" />
            <circle cx="68" cy="40" r="1" fill="var(--cel-accent)" opacity="0.5" />
            <circle cx="28" cy="70" r="0.8" fill="var(--cel-accent)" opacity="0.4" />
            <circle cx="72" cy="70" r="0.8" fill="var(--cel-accent)" opacity="0.4" />
            <circle cx="50" cy="85" r="0.8" fill="var(--cel-accent)" opacity="0.4" />
          </svg>
          <p style={{
            fontFamily: "var(--font-cormorant)", fontSize: "0.75rem", color: "var(--cel-accent)",
            position: "relative", zIndex: 1, opacity: 0.3, letterSpacing: "0.1em",
          }}>♀</p>
        </div>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
          letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
          marginBottom: "0.5rem",
          opacity: step >= 7 ? 1 : 0, transform: step >= 7 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>Mempelai Wanita</p>
        <h3 style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 400,
          color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "0.5rem",
          opacity: step >= 7 ? 1 : 0, transform: step >= 7 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
        }}>Lyla Azzahra</h3>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--cel-text-dim)", lineHeight: 1.7,
          opacity: step >= 8 ? 0.8 : 0, transform: step >= 8 ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          Putri dari<br />Bapak Yusuf &amp; Ibu Rahayu
        </p>
      </div>
    </section>
  );
}
