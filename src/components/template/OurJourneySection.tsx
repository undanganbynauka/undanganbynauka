"use client";

import React, { useState, useEffect, useRef } from "react";

const JOURNEY_PHASES = [
  { phase: "Ta'aruf", date: "Maret 2026", description: "Pertemuan pertama yang terasa seperti kenangan lama. Dua jiwa yang tak saling kenal, namun dunia seolah sudah mengatur jalan mereka untuk berpapasan." },
  { phase: "Nadzor", date: "Maret 2026", description: "Langkah kedua yang penuh kehati-hatian dan keindahan. Masing-masing melihat dengan mata hati, memastikan bahwa perasaan ini bukan sekadar ilusi." },
  { phase: "Khitbah", date: "Juni 2026", description: "Sebuah janji yang diucapkan dengan penuh keyakinan. Di hadapan keluarga, dua nama resmi disatukan dalam satu ikatan yang suci." },
  { phase: "Menikah", date: "Desember 2026", description: "Puncak dari segala doa dan harapan. Hari di mana dua jiwa akhirnya menjadi satu, di bawah rahmat dan berkat-Nya." },
];

export function OurJourneySection() {
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

  return (
    <section ref={sectionRef} id="journey" style={{
      position: "relative", padding: "4.5rem 1.5rem",
      display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2",
      opacity: visible ? 1 : 0,
      transition: "opacity 600ms ease",
    }}>
      <p style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
        letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem",
      }}>Perjalanan cinta yang Allah satukan</p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500,
        color: "#2E2E2E", marginBottom: "2.5rem",
      }}>Kisah Kami</h2>

      <div style={{ maxWidth: "22rem", width: "100%", position: "relative" }}>
        {/* Background line (full, faded) */}
        <div style={{ position: "absolute", left: "11px", top: "0.5rem", bottom: "0.5rem", width: "0.5px", background: "rgba(200, 178, 138, 0.15)" }} />

        {JOURNEY_PHASES.map((p, i) => (
          <div key={p.phase} style={{
            display: "flex", gap: "1rem", marginBottom: i < JOURNEY_PHASES.length - 1 ? "2rem" : 0,
          }}>
            <div style={{ width: "23px", flexShrink: 0, display: "flex", justifyContent: "center", paddingTop: "0.35rem" }}>
              <div style={{
                width: "7px", height: "7px", borderRadius: "50%",
                background: "#7D6A52",
                opacity: i === JOURNEY_PHASES.length - 1 ? 1 : 0.45,
              }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.125rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>{p.phase}</h3>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7D6A52", marginBottom: "0.5rem" }}>{p.date}</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F", lineHeight: 1.7 }}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
