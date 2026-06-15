"use client";

import React, { useState, useEffect, useRef } from "react";

const JOURNEY_PHASES = [
  { title: "Ta'aruf", date: "Januari 2026", desc: "Pertama kali saling mengenal dalam bingkai ta'aruf." },
  { title: "Nadzor", date: "Maret 2026", desc: "Bertemu dalam pandangan, memastikan ketenangan hati." },
  { title: "Khitbah", date: "April 2026", desc: "Meminang dengan niat suci dan restu kedua keluarga." },
  { title: "Menikah", date: "Juli 2026", desc: "Menyempurnakan separuh agama dengan ikatan sakral." },
];

export function CelestialJourney() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="journey" className="celestial-section" style={{ background: "var(--cel-midnight)", padding: "4rem 1.5rem 5rem" }}>
      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
        marginBottom: "0.5rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
      }}>
        Cerita Kami
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 300,
        color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "2.5rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
      }}>
        Our Journey
      </h2>

      <div style={{ maxWidth: "20rem", width: "100%", position: "relative" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: "15px", top: "8px", bottom: "8px",
          width: "1px", background: "linear-gradient(to bottom, var(--cel-accent), transparent)",
          opacity: 0.3,
        }} />

        {JOURNEY_PHASES.map((phase, i) => (
          <div
            key={phase.title}
            style={{
              display: "flex", gap: "1rem", marginBottom: i < JOURNEY_PHASES.length - 1 ? "2rem" : 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s ${ease} ${0.2 + i * 0.15}s, transform 0.8s ${ease} ${0.2 + i * 0.15}s`,
            }}
          >
            {/* Star dot */}
            <div style={{
              width: "30px", height: "30px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: i === JOURNEY_PHASES.length - 1 ? "8px" : "5px",
                height: i === JOURNEY_PHASES.length - 1 ? "8px" : "5px",
                borderRadius: "50%",
                background: i === JOURNEY_PHASES.length - 1 ? "var(--cel-accent)" : "rgba(201, 169, 110, 0.5)",
                boxShadow: i === JOURNEY_PHASES.length - 1 ? "0 0 8px rgba(201, 169, 110, 0.4)" : "none",
              }} />
            </div>
            {/* Content */}
            <div>
              <p style={{
                fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 400,
                color: "var(--cel-text)", letterSpacing: "0.03em", marginBottom: "0.25rem",
              }}>
                {phase.title}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: "0.5625rem", fontWeight: 400,
                letterSpacing: "0.1em", color: "var(--cel-accent)", marginBottom: "0.375rem",
              }}>
                {phase.date}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: "0.6875rem",
                color: "var(--cel-text-dim)", lineHeight: 1.7,
              }}>
                {phase.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
