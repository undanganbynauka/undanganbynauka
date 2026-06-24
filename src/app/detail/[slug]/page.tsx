"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { NaukaCheckout } from "@/components/nauka/NaukaCheckout";
import { NaukaFooter } from "@/components/nauka/NaukaFooter";

interface TemplateDetail {
  id: string;
  name: string;
  collection: string;
  collectionLabel: string;
  previewHref: string;
  preview: string;
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
    previewHref: "/sacred?preview=true",
    preview: "/etalase/sacred-preview.mp4",
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
    previewHref: "/celestial?preview=true",
    preview: "/etalase/celestial-preview.mp4",
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
  luna: {
    id: "luna",
    name: "Luna",
    collection: "Universal",
    collectionLabel: "Universal Collection — Free",
    previewHref: "/luna?preview=true",
    preview: "/etalase/luna-preview.mp4",
    description:
      "Luna adalah template gratis dari Nauka — minimalis, hangat, dan tetap elegan. Dirancang dengan palet sage muted dan tipografi klasik, Luna memberi kesan tenang tanpa berlebihan. Cocok untuk pasangan yang baru memulai, tetap ingin memberi tamu undangan digital yang bermakna.",
    highlights: [
      "Gratis — tanpa biaya, tanpa QRIS",
      "Palet sage muted yang menenangkan",
      "Countdown, maps, dan doa dari tamu",
      "Cocok untuk semua latar belakang",
    ],
    emotionalNote: "Karena setiap momen indah layak dibagikan.",
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
      <section
        className="nauka-grain relative"
        style={{
          background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
          padding: "60px 24px 0",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: loaded
              ? "radial-gradient(ellipse at 50% 10%, rgba(201,169,110,0.03) 0%, transparent 50%)"
              : "none",
            transition: "background 1.8s ease",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[580px]">
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
                aspectRatio: "9 / 16",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                position: "relative",
                background: "#0B1120",
              }}
            >
              <video
  src={tpl.preview}
  autoPlay
  muted
  loop
  playsInline
  className="object-cover"
  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
/>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link
              href={tpl.previewHref}
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
              Buka preview →
            </Link>
          </div>

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

          <div
            style={{
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              margin: "48px 0 0",
            }}
          />
        </div>
      </section>

      <NaukaCheckout
        templateName={tpl.name}
        templateId={tpl.id}
        basicPrice={75}
        premiumPrice={99}
        freeAvailable={tpl.id === "luna"}
      />

      <NaukaFooter />
    </main>
  );
}
