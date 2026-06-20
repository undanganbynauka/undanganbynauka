"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Tabel perbandingan 14 baris (final) ───
type Cell = string;

interface FeatureRow {
  feature: string;
  free: Cell;
  basic: Cell;
  premium: Cell;
  highlight?: boolean;
  subText?: string;
}

const FEATURES: FeatureRow[] = [
  { feature: "Hero", free: "✓", basic: "✓", premium: "✓" },
  { feature: "Countdown", free: "✓", basic: "✓", premium: "✓" },
  { feature: "Data Mempelai", free: "✓", basic: "✓", premium: "✓" },
  { feature: "Acara", free: "✓", basic: "✓", premium: "✓" },
  { feature: "Penutup", free: "✓", basic: "✓", premium: "✓" },
  { feature: "Our Journey", free: "✓", basic: "✓", premium: "✓" },
  { feature: "RSVP", free: "✗", basic: "✓", premium: "✓", highlight: true },
  { feature: "Amplop Digital", free: "✗", basic: "✓", premium: "✓", highlight: true },
  { feature: "Doa & Ucapan", free: "✗", basic: "20", premium: "Unlimited", highlight: true },
  { feature: "Daftar Tamu", free: "✗", basic: "✓", premium: "✓", highlight: true },
  { feature: "Analitik", free: "✗", basic: "✗", premium: "✓", highlight: true },
  { feature: "Personalized Guest", free: "✗", basic: "✗", premium: "✓", highlight: true },
  {
    feature: "Sound (default off)",
    subText: "Vocal only · Acapella · Sound Alam",
    free: "✓",
    basic: "✓",
    premium: "✓",
  },
  { feature: "Masa Aktif", free: "H+14", basic: "H+30", premium: "H+90", highlight: true },
];

const PHILOSOPHY = [
  {
    emoji: "🆓",
    name: "Free",
    tagline: "Mengumumkan",
    desc: "Membantu pasangan mengumumkan pernikahan secara digital. Tanpa biaya, tanpa fitur yang membebani operasional Nauka.",
    url: "ali-lyla.vercel.app",
  },
  {
    emoji: "🌿",
    name: "Basic",
    tagline: "Mengelola",
    desc: "Mulai membantu mengelola tamu. Ada fitur interaktif yang membutuhkan penyimpanan data.",
    url: "ali-lyla.vercel.app/invitation",
  },
  {
    emoji: "✨",
    name: "Premium",
    tagline: "Personal",
    desc: "Memberikan pengalaman yang lebih personal dan lengkap untuk setiap tamu.",
    url: "ali-lyla.vercel.app/sarah",
  },
];

const WA_FREE = "https://wa.me/6289655592925?text=Halo%20Nauka%2C%20saya%20tertarik%20mencoba%20paket%20Free";
const WA_BASIC = "https://wa.me/6289655592925?text=Halo%20Nauka%2C%20saya%20tertarik%20dengan%20paket%20Basic";
const WA_PREMIUM = "https://wa.me/6289655592925?text=Halo%20Nauka%2C%20saya%20tertarik%20dengan%20paket%20Premium";

function FeatureCell({ value }: { value: Cell }) {
  if (value === "✓") {
    return (
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "13px",
          color: "rgba(255,255,255,0.75)",
          textAlign: "center",
        }}
      >
        ✓
      </span>
    );
  }
  if (value === "✗") {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.20)",
          background: "rgba(201,169,110,0.04)",
          color: "rgba(201,169,110,0.55)",
          fontSize: "10px",
          margin: "0 auto",
        }}
        title="Terkunci — tersedia di paket Basic atau Premium"
      >
        🔒
      </span>
    );
  }
  return (
    <span
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "12px",
        fontWeight: 500,
        color: "rgba(201,169,110,0.75)",
        textAlign: "center",
        letterSpacing: "0.02em",
      }}
    >
      {value}
    </span>
  );
}

export function NaukaHarga() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
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
        padding: "90px 20px",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(135deg, rgba(201,169,110,0.025) 0%, transparent 40%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[680px]">
        <h2
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "clamp(20px, 4vw, 26px)",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.88)",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
        >
          Pilihan Paket
        </h2>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
            maxWidth: "440px",
            margin: "18px auto 0",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out 0.15s, transform 1.3s ease-out 0.15s",
          }}
        >
          Satu dashboard. Satu sistem. Fitur terbuka sesuai paket.
        </p>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "42px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.2s",
          }}
        />

        {/* ─── 3 Price Cards ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.25s, transform 1.4s ease-out 0.25s",
          }}
        >
          {/* Free */}
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              padding: "22px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>🆓</div>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Free
            </span>
            <div style={{ marginTop: "10px" }}>
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.92)",
                  display: "inline-block",
                }}
              >
                Gratis
              </span>
            </div>
          </div>

          {/* Basic */}
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.025)",
              padding: "22px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>🌿</div>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Basic
            </span>
            <div style={{ marginTop: "10px" }}>
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.92)",
                  display: "inline-block",
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
              border: "1px solid rgba(201,169,110,0.18)",
              background: "rgba(201,169,110,0.03)",
              padding: "22px 12px",
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
                padding: "3px 12px",
                borderRadius: "100px",
                border: "1px solid rgba(201,169,110,0.15)",
                background: "rgba(17,24,39,0.95)",
                fontFamily: "var(--font-inter)",
                fontSize: "9px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.7)",
                animation: "nauka-breathe 3s ease-in-out infinite",
              }}
            >
              Rekomendasi
            </span>
            <div style={{ fontSize: "20px", marginBottom: "6px" }}>✨</div>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              Premium
            </span>
            <div style={{ marginTop: "10px" }}>
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "28px",
                  fontWeight: 400,
                  color: "rgba(201,169,110,0.85)",
                  display: "inline-block",
                }}
              >
                99rb
              </span>
            </div>
          </div>
        </div>

        {/* ─── Comparison Table ─── */}
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.015)",
            overflow: "hidden",
            marginTop: "32px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.35s, transform 1.4s ease-out 0.35s",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
              padding: "12px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>Fitur</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", textAlign: "center" }}>🆓</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)", textAlign: "center" }}>🌿</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)", textAlign: "center" }}>✨</span>
          </div>

          {FEATURES.map((feat, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
                padding: "11px 14px",
                borderBottom: i < FEATURES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                background: feat.highlight ? "rgba(201,169,110,0.015)" : "transparent",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.72)",
                    fontWeight: 400,
                  }}
                >
                  {feat.feature}
                </span>
                {feat.subText && (
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.30)",
                      marginTop: "2px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {feat.subText}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FeatureCell value={feat.free} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FeatureCell value={feat.basic} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FeatureCell value={feat.premium} />
              </div>
            </div>
          ))}
        </div>

        {/* ─── 3 CTA Buttons ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
            marginTop: "32px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.5s, transform 1.4s ease-out 0.5s",
          }}
        >
          <a
            href={WA_FREE}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 8px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.10)",
              background: "transparent",
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              transition: "border-color 0.3s ease, color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.color = "rgba(255,255,255,0.85)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
              e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Coba Gratis
          </a>

          <a
            href={WA_BASIC}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 8px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.04)",
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.85)",
              textDecoration: "none",
              transition: "border-color 0.3s ease, color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
          >
            Gunakan Basic
          </a>

          <a
            href={WA_PREMIUM}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 8px",
              borderRadius: "12px",
              border: "1px solid rgba(201,169,110,0.25)",
              background: "rgba(201,169,110,0.08)",
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "rgba(201,169,110,0.92)",
              textDecoration: "none",
              transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
              e.currentTarget.style.background = "rgba(201,169,110,0.14)";
              e.currentTarget.style.color = "rgba(201,169,110,1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
              e.currentTarget.style.background = "rgba(201,169,110,0.08)";
              e.currentTarget.style.color = "rgba(201,169,110,0.92)";
            }}
          >
            Gunakan Premium
          </a>
        </div>

        {/* ─── Filosofi 3 Paket ─── */}
        <div
          style={{
            marginTop: "48px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.65s, transform 1.4s ease-out 0.65s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            Tujuan Tiap Paket
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {PHILOSOPHY.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 18px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{p.emoji}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-bodoni)",
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(201,169,110,0.55)",
                      marginLeft: "auto",
                    }}
                  >
                    {p.tagline}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "12px",
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.48)",
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "10px",
                      letterSpacing: "0.06em",
                      color: "rgba(201,169,110,0.45)",
                    }}
                  >
                    URL
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.55)",
                      wordBreak: "break-all",
                    }}
                  >
                    {p.url}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.30)",
            textAlign: "center",
            marginTop: "36px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.8s",
          }}
        >
          Pilih paket sesuai kebutuhan. Keduanya dibuat dengan standar kualitas yang sama.
        </p>
      </div>

      <style>{`
        @keyframes nauka-breathe {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
