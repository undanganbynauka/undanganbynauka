"use client";

import React, { useEffect, useRef, useState } from "react";

const features = [
  { name: "Doa & Ucapan", basic: "Maks. 20 orang", premium: "Tanpa batas", highlight: true },
  { name: "Masa Aktif", basic: "H+30", premium: "H+90" },
  { name: "Input Tamu", basic: "Isi sendiri", premium: "Isi sendiri / Terima jadi" },
  { name: "BGM", basic: "Default", premium: "Library pilihan" },
  { name: "Custom URL", basic: "nauka.id/inv/abc123", premium: "nauka.id/nama-pasangan" },
  { name: "RSVP", basic: "✓", premium: "✓" },
  { name: "Amplop Digital", basic: "✓", premium: "✓" },
  { name: "Jumlah Tamu", basic: "Tanpa batas", premium: "Tanpa batas" },
  { name: "Support", basic: "WhatsApp", premium: "Prioritas + revisi minor" },
  { name: "Analitik", basic: "—", premium: "✓", highlight: true },
];

export function NaukaHarga() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "#111827",
        padding: "90px 24px",
      }}
    >
      {/* Ambient glow — top right */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(225deg, rgba(201,169,110,0.02) 0%, transparent 40%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[620px]">
        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
          className="md:!text-[22px]"
        >
          Paket & Harga
        </h2>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "42px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.2s",
          }}
        />

        {/* Price cards */}
        <div
          className="grid gap-6 md:grid-cols-2"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.3s, transform 1.4s ease-out 0.3s",
          }}
        >
          {/* Basic */}
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              padding: "28px",
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Basic
            </span>
            <div style={{ marginTop: "14px" }}>
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "36px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.92)",
                  display: "inline-block",
                  animation: visible ? "nauka-price-in 1.2s ease-out 0.5s both" : "none",
                }}
              >
                75rb
              </span>
            </div>
          </div>

          {/* Premium */}
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(201,169,110,0.12)",
              background: "rgba(201,169,110,0.02)",
              padding: "28px",
              textAlign: "center",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-11px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "4px 14px",
                borderRadius: "100px",
                border: "1px solid rgba(201,169,110,0.10)",
                background: "rgba(17,24,39,0.95)",
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.6)",
                animation: "nauka-breathe 3s ease-in-out infinite",
              }}
            >
              Rekomendasi
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Premium
            </span>
            <div style={{ marginTop: "14px" }}>
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "36px",
                  fontWeight: 400,
                  color: "rgba(201,169,110,0.8)",
                  display: "inline-block",
                  animation: visible ? "nauka-price-in 1.2s ease-out 0.7s both" : "none",
                }}
              >
                99rb
              </span>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.015)",
            overflow: "hidden",
            marginTop: "42px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.5s, transform 1.4s ease-out 0.5s",
          }}
        >
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              padding: "12px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Fitur</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>Basic</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,169,110,0.55)", textAlign: "center" }}>Premium</span>
          </div>
          {/* Rows */}
          {features.map((feat, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                padding: "12px 20px",
                borderBottom: i < features.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                background: feat.highlight ? "rgba(201,169,110,0.015)" : "transparent",
              }}
            >
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>{feat.name}</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.45)", textAlign: "center" }}>{feat.basic}</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(201,169,110,0.6)", textAlign: "center" }}>{feat.premium}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
