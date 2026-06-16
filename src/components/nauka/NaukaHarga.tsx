"use client";

import React, { useEffect, useRef, useState } from "react";

const features = [
  { name: "Doa & Ucapan", basic: "Hingga 20 tamu", premium: "Tanpa batas interaksi tamu", highlight: true },
  { name: "Masa Aktif", basic: "30 hari aktif", premium: "90 hari aktif" },
  { name: "Input Tamu", basic: "Mandiri", premium: "Mandiri / dibantu pengisian" },
  { name: "Custom URL", basic: "Standar", premium: "Personal nama pasangan" },
  { name: "RSVP", basic: "✓", premium: "✓" },
  { name: "Amplop Digital", basic: "✓", premium: "✓" },
  { name: "Jumlah Tamu", basic: "Tidak dibatasi", premium: "Tidak dibatasi" },
  { name: "Bagikan Undangan", basic: "WhatsApp", premium: "WhatsApp + Media Sosial", highlight: true },
  { name: "Analitik", basic: "—", premium: "Tersedia laporan interaksi", highlight: true },
];

// WhatsApp removed from pricing CTA — WA is support layer, not primary sales channel
// CTA hierarchy: Hero → Etalase → Pricing → Checkout → Footer WA

export function NaukaHarga() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
        padding: "90px 24px",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(135deg, rgba(201,169,110,0.02) 0%, transparent 40%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[640px]">
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
          Pilihan Paket
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            maxWidth: "420px",
            margin: "18px auto 0",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out 0.15s, transform 1.3s ease-out 0.15s",
          }}
        >
          Kedua paket dirancang dengan kualitas yang sama, dengan tingkat keluasan pengalaman yang berbeda.
        </p>

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
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.25s, transform 1.4s ease-out 0.25s",
          }}
        >
          {/* Basic */}
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              padding: "28px 20px",
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
              padding: "28px 20px",
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
            transition: "opacity 1.4s ease-out 0.4s, transform 1.4s ease-out 0.4s",
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
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: feat.highlight ? "rgba(201,169,110,0.7)" : "rgba(201,169,110,0.6)", textAlign: "center" }}>{feat.premium}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons — scroll to explore templates */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginTop: "42px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.55s, transform 1.4s ease-out 0.55s",
          }}
        >
          {/* Basic — outline, low emphasis */}
          <button
            onClick={() => {
              const el = document.getElementById("etalase-syari");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "transparent",
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.6)",
              cursor: "pointer",
              transition: "border-color 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.20)";
              e.currentTarget.style.color = "rgba(255,255,255,0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            Lihat Template
          </button>

          {/* Premium — filled subtle */}
          <a
            href="/detail/celestial"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 20px",
              borderRadius: "12px",
              border: "1px solid rgba(201,169,110,0.18)",
              background: "rgba(201,169,110,0.06)",
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "rgba(201,169,110,0.75)",
              textDecoration: "none",
              transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.30)";
              e.currentTarget.style.background = "rgba(201,169,110,0.10)";
              e.currentTarget.style.color = "rgba(201,169,110,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.18)";
              e.currentTarget.style.background = "rgba(201,169,110,0.06)";
              e.currentTarget.style.color = "rgba(201,169,110,0.75)";
            }}
          >
            Pesan Sekarang
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(201,169,110,0.40)",
                marginTop: "6px",
              }}
            >
              Mulai dari 75rb
            </span>
          </a>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.30)",
            textAlign: "center",
            marginTop: "32px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.7s",
          }}
        >
          Pilih paket sesuai kebutuhan. Keduanya dibuat dengan standar kualitas yang sama.
        </p>
      </div>
    </section>
  );
}
