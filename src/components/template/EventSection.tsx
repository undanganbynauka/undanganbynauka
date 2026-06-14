"use client";

import React, { useState, useEffect, useRef } from "react";

export function EventSection() {
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
    const t = [setTimeout(() => setStep(1), 200), setTimeout(() => setStep(2), 500), setTimeout(() => setStep(3), 700)];
    return () => t.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  const mapsUrl = "https://maps.google.com/?q=Gedung+Auditorium+Koni+Jakarta+Pusat";

  const events = [
    { title: "Akad Nikah", date: "Ahad, 05 Juli 2026", time: "08:00 — 10:00 WIB", venue: "Gedung Auditorium Koni", address: "Jakarta Pusat" },
    { title: "Resepsi", date: "Ahad, 05 Juli 2026", time: "11:00 — 14:00 WIB", venue: "Gedung Auditorium Koni", address: "Jakarta Pusat" },
  ];

  return (
    <section ref={sectionRef} id="acara" style={{
      position: "relative", padding: "4rem 1.5rem",
      display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2",
    }}>
      <p style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
        letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem",
        opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
      }}>Waktu &amp; Tempat</p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500,
        color: "#2E2E2E", marginBottom: "2rem",
        opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
      }}>Acara</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "22rem", width: "100%" }}>
        {events.map((ev, i) => (
          <div key={ev.title} style={{
            background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px", padding: "1.75rem 1.5rem", textAlign: "center",
            opacity: step >= i + 2 ? 1 : 0, transform: step >= i + 2 ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
          }}>
            <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.75rem" }}>{ev.title}</h3>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F", lineHeight: 1.7, marginBottom: "0.25rem" }}>{ev.date}</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#7D6A52", fontWeight: 500, letterSpacing: "0.03em", marginBottom: "0.75rem" }}>{ev.time}</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9375rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>{ev.venue}</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", color: "#8A8A8A", lineHeight: 1.5, marginBottom: "0.75rem" }}>{ev.address}</p>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.375rem",
              fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500,
              letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none",
              color: "#7D6A52", background: "rgba(125, 106, 82, 0.08)",
              border: "1px solid rgba(125, 106, 82, 0.2)", borderRadius: "999px",
              padding: "0.5rem 1.25rem", transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(125, 106, 82, 0.16)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(125, 106, 82, 0.08)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Lihat di Maps
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
