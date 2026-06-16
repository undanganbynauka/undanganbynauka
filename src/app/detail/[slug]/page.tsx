"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NaukaCheckout } from "@/components/nauka/NaukaCheckout";

interface TemplateDetail {
  id: string;
  name: string;
  collection: string;
  collectionLabel: string;
  demoHref: string;
  gradient: string;
  accent: string;
  ornament: "arch" | "diamond" | "line";
  description: string;
  highlights: string[];
  emotionalNote: string;
}

const templates: Record<string, TemplateDetail> = {
  sacred: {
    id: "sacred",
    name: "Sacred",
    collection: "Syar'i",
    collectionLabel: "Syar'i Collection",
    demoHref: "/sacred",
    gradient: "linear-gradient(160deg, #0B1120 0%, #16213e 55%, #1a1a2e 100%)",
    accent: "rgba(201,169,110,0.12)",
    ornament: "arch",
    description:
      "Sacred dirancang untuk pasangan yang mengutamakan kesederhanaan syar'i dalam setiap detail undangannya. Tanpa foto, tanpa musik instrumental — hanya keindahan yang terjaga dan kata-kata yang bermakna.",
    highlights: [
      "Desain tanpa foto, tetap elegan dan bermakna",
      "Audio vokal pilihan atau suara alam",
      "Ornamen geometris yang merujuk pada estetika islami",
      "Bahasa dan nuansa yang selaras dengan nilai syar'i",
    ],
    emotionalNote: "Undangan yang menjaga kehormatan momen Anda.",
  },
  celestial: {
    id: "celestial",
    name: "Celestial",
    collection: "Universal",
    collectionLabel: "Universal Collection",
    demoHref: "/celestial",
    gradient: "linear-gradient(160deg, #111827 0%, #1e1b3a 55%, #0f172a 100%)",
    accent: "rgba(147,130,200,0.10)",
    ornament: "diamond",
    description:
      "Celestial menghadirkan keanggunan universal dalam desain undangan digital. Dengan animasi sinematik dan tipografi yang halus, setiap detail dirancang untuk memberikan kesan mendalam bagi tamu Anda.",
    highlights: [
      "Animasi sinematik yang lembut dan bermakna",
      "Tipografi elegan yang memberikan kesan premium",
      "Desain tanpa foto, fokus pada kata dan suasana",
      "Cocok untuk semua latar belakang dan kepercayaan",
    ],
    emotionalNote: "Momen Anda layak diungkapkan dengan keindahan.",
  },
  heritage: {
    id: "heritage",
    name: "Heritage",
    collection: "Universal",
    collectionLabel: "Universal Collection",
    demoHref: "/template",
    gradient: "linear-gradient(160deg, #0f172a 0%, #1e293b 55%, #0B1120 100%)",
    accent: "rgba(148,163,184,0.08)",
    ornament: "line",
    description:
      "Heritage menggabungkan sentuhan tradisional dengan desain digital modern. Ornamen klasik dipadukan dengan tata letak yang bersih, menciptakan undangan yang terasa hangat namun tetap sophisticated.",
    highlights: [
      "Ornamen tradisional yang dikurasi dengan rapi",
      "Paduan klasik dan modern yang harmonis",
      "Desain bersih yang tetap kaya karakter",
      "Pilihan audio yang melengkapi suasana",
    ],
    emotionalNote: "Warisan budaya dalam sentuhan digital.",
  },
};

export default function DetailTemplatePage() {
  const params = useParams();
  const slug = params.slug as string;
  const tpl = templates[slug];
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!tpl) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#0B1120" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-bodoni)", fontSize: "24px", color: "rgba(255,255,255,0.72)" }}>
            Template tidak ditemukan
          </p>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              color: "rgba(255,255,255,0.45)",
              marginTop: "16px",
              display: "inline-block",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Kembali ke beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      {/* DETAIL — PREVIEW + STORYTELLING */}
      <section
        className="nauka-grain relative"
        style={{
          background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
          padding: "60px 24px 0",
        }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: loaded
              ? `radial-gradient(ellipse at 50% 10%, ${tpl.accent} 0%, transparent 50%)`
              : "none",
            transition: "background 1.8s ease",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[580px]">
          {/* Back link */}
          <Link
            href="/#nauka-etalase"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.30)",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: "32px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.30)"; }}
          >
            ← Kembali
          </Link>

          {/* Collection label */}
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.2s ease-out",
            }}
          >
            {tpl.collectionLabel}
          </span>

          {/* Template name */}
          <h1
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "36px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.92)",
              marginTop: "10px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.4s ease-out 0.1s, transform 1.4s ease-out 0.1s",
            }}
          >
            {tpl.name}
          </h1>

          {/* Preview mockup */}
          <div
            style={{
              marginTop: "36px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1.4s ease-out 0.2s, transform 1.4s ease-out 0.2s",
            }}
          >
            <div
              style={{
                width: "100%",
                paddingTop: "140%",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: tpl.gradient,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Accent */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 20%, ${tpl.accent} 0%, transparent 60%)`,
                }}
              />

              {/* Ornament */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ padding: "48px" }}
              >
                {tpl.ornament === "arch" && (
                  <div
                    style={{
                      width: "80px",
                      height: "120px",
                      borderRadius: "50% 50% 0 0",
                      border: "1px solid rgba(201,169,110,0.20)",
                      borderBottom: "none",
                    }}
                  />
                )}
                {tpl.ornament === "diamond" && (
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "1px solid rgba(147,130,200,0.20)",
                      transform: "rotate(45deg)",
                    }}
                  />
                )}
                {tpl.ornament === "line" && (
                  <div
                    style={{
                      width: "64px",
                      height: "1px",
                      background: "rgba(148,163,184,0.20)",
                    }}
                  />
                )}
              </div>

              {/* Template name centered */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ gap: "10px" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-bodoni)",
                    fontSize: "32px",
                    fontWeight: 400,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.65)",
                    textTransform: "uppercase",
                  }}
                >
                  {tpl.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  Preview
                </span>
              </div>
            </div>
          </div>

          {/* Lihat Demo link */}
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link
              href={tpl.demoHref}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.40)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                transition: "color 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.12)";
              }}
            >
              Buka demo penuh →
            </Link>
          </div>

          {/* Description */}
          <div style={{ marginTop: "48px" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.60)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 1.3s ease-out 0.3s, transform 1.3s ease-out 0.3s",
              }}
            >
              {tpl.description}
            </p>
          </div>

          {/* Highlights */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "28px 0 0",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.4s, transform 1.3s ease-out 0.4s",
            }}
          >
            {tpl.highlights.map((h, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.50)",
                  paddingLeft: "16px",
                  position: "relative",
                  marginBottom: i < tpl.highlights.length - 1 ? "10px" : 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "10px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(201,169,110,0.35)",
                  }}
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Emotional note */}
          <p
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.55)",
              marginTop: "32px",
              fontStyle: "italic",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.3s ease-out 0.5s",
            }}
          >
            {tpl.emotionalNote}
          </p>

          {/* Divider before checkout */}
          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              margin: "48px 0 0",
            }}
          />
        </div>
      </section>

      {/* CHECKOUT */}
      <NaukaCheckout
        templateName={tpl.name}
        templateId={tpl.id}
        basicPrice={75}
        premiumPrice={99}
      />
    </main>
  );
}
