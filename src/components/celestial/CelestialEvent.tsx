"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialEvent() {
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
      setTimeout(() => setStep(1), 1500),   // light spread
      setTimeout(() => setStep(2), 2200),   // "Waktu & Tempat" subtitle
      setTimeout(() => setStep(3), 2800),   // "Acara" title
      setTimeout(() => setStep(4), 3500),   // Akad card
      setTimeout(() => setStep(5), 4300),   // Resepsi card
      setTimeout(() => setStep(6), 5000),   // Google Maps button
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  const events = [
    {
      title: "Akad Nikah",
      date: "Ahad, 5 Juli 2026",
      time: "08:00 - 10:00 WIB",
      venue: "Gedung Auditorium Koni",
      address: "Jakarta Pusat",
    },
    {
      title: "Resepsi",
      date: "Ahad, 5 Juli 2026",
      time: "11:00 - 14:00 WIB",
      venue: "Gedung Auditorium Koni",
      address: "Jakarta Pusat",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="acara"
      className="celestial-section"
      style={{
        background: "linear-gradient(180deg, var(--cel-deep) 0%, var(--cel-midnight) 100%)",
        padding: "4rem 1.5rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shooting Star — signature */}
      {step >= 0 && step < 2 && (
        <div style={{ position: "absolute", top: "10%", left: "8%", pointerEvents: "none", zIndex: 5 }}>
          <div style={{
            width: "3px", height: "3px", borderRadius: "50%", background: "#fff",
            animation: "celSectionShoot 1.5s ease-out forwards",
          }} />
        </div>
      )}

      {/* Light spread */}
      {step >= 1 && (
        <div style={{
          position: "absolute", top: "16%", right: "12%",
          width: "60px", height: "60px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "celSectionLightSpread 1.5s ease-out forwards",
        }} />
      )}

      {/* Floating background particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`p-${i}`} style={{
            position: "absolute",
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.4)",
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            opacity: 0,
            animation: `celSectionParticle ${5 + Math.random() * 7}s ease-in-out ${Math.random() * 4}s infinite`,
          }} />
        ))}
      </div>

      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
        marginBottom: "0.5rem",
        opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
      }}>
        Waktu & Tempat
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 300,
        color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "2.5rem",
        opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
      }}>
        Acara
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "22rem", width: "100%" }}>
        {events.map((evt, i) => {
          const cardStep = i === 0 ? 4 : 5;
          return (
            <div
              key={evt.title}
              className="celestial-card"
              style={{
                textAlign: "center",
                opacity: step >= cardStep ? 1 : 0,
                transform: step >= cardStep ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
              }}
            >
              <p style={{
                fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 400,
                color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "0.75rem",
              }}>
                {evt.title}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--cel-text-dim)",
                lineHeight: 1.8, letterSpacing: "0.02em",
              }}>
                {evt.date}<br />
                {evt.time}<br />
                <span style={{ color: "var(--cel-text)", fontWeight: 500 }}>{evt.venue}</span><br />
                {evt.address}
              </p>
            </div>
          );
        })}
      </div>

      {/* Google Maps button */}
      <a
        href="https://maps.google.com/?q=Gedung+Auditorium+Koni+Jakarta+Pusat"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "1.5rem",
          padding: "0.625rem 1.75rem",
          border: "1px solid var(--cel-border)",
          borderRadius: "9999px",
          background: "var(--cel-glass)",
          color: "var(--cel-accent)",
          fontFamily: "var(--font-inter)",
          fontSize: "0.625rem",
          fontWeight: 400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          transition: "all 0.3s ease",
          opacity: step >= 6 ? 1 : 0,
        }}
      >
        <span>📍</span> Lihat Lokasi
      </a>
    </section>
  );
}
