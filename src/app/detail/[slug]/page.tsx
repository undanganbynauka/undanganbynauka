"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { NaukaCheckout } from "@/components/nauka/NaukaCheckout";
import { NaukaFooter } from "@/components/nauka/NaukaFooter";
import { NaukaWhatsAppFloat } from "@/components/nauka/NaukaWhatsAppFloat";
import { WA_INQUIRY_LINK } from "@/lib/whatsapp";

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
    preview: "/etalase/sacred-preview.png",
    description:
      "Sacred dirancang untuk pasangan yang mengutamakan kesederhanaan syar'i dalam setiap detail undangan.",
    highlights: [
      "Desain tanpa foto",
      "Audio sederhana",
      "Ornamen islami",
      "Bahasa elegan",
    ],
    emotionalNote: "Undangan yang menjaga kehormatan momen Anda.",
  },

  celestial: {
    id: "celestial",
    name: "Celestial",
    collection: "Universal",
    collectionLabel: "Universal Collection",
    previewHref: "/celestial?preview=true",
    preview: "/etalase/celestial-preview.png",
    description:
      "Celestial membawa keanggunan universal yang cocok untuk semua latar belakang dan kepercayaan.",
    highlights: [
      "Desain elegan",
      "Animasi halus",
      "Audio ambient",
      "Layout fleksibel",
    ],
    emotionalNote: "Keanggunan yang dirancang untuk momen sakral Anda.",
  },
};

export default function TemplateDetailPage() {
  const params = useParams();
  const slug = String(params.slug || "");
  const tpl = templates[slug];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!tpl) {
    return (
      <main style={{ background: "#0B1120", color: "#fff", minHeight: "100vh", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 28, marginBottom: 12 }}>
          Template tidak ditemukan
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 24 }}>
          Maaf, template yang Anda cari tidak tersedia.
        </p>
        <Link href="/" style={{ color: "rgba(201,169,110,0.85)" }}>
          ← Kembali ke Beranda
        </Link>
      </main>
    );
  }

  return (
    <main style={{ background: "#0B1120", color: "#fff", minHeight: "100vh" }}>
      {/* HEADER */}
      <section
        style={{
          padding: "120px 24px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(201,169,110,0.05) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[720px]">
          <span
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.55)",
              display: "block",
              marginBottom: 16,
            }}
          >
            {tpl.collectionLabel}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-bodoni, Georgia, serif)",
              fontSize: "clamp(40px, 8vw, 64px)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.92)",
              margin: "0 0 24px",
              lineHeight: 1.1,
            }}
          >
            {tpl.name}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 14,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.55)",
              maxWidth: 480,
              margin: "0 auto 36px",
            }}
          >
            {tpl.description}
          </p>

          {/* Preview link */}
          <Link
            href={tpl.previewHref}
            target="_blank"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              borderRadius: "999px",
              border: "1px solid rgba(201,169,110,0.35)",
              background: "rgba(201,169,110,0.06)",
              color: "rgba(201,169,110,0.95)",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
          >
            Lihat Live Preview →
          </Link>
        </div>
      </section>

      {/* PREVIEW MOCKUP */}
      <section style={{ padding: "0 24px 80px" }}>
        <div
          className="mx-auto"
          style={{
            maxWidth: 320,
            aspectRatio: "9 / 16",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#000",
            position: "relative",
          }}
        >
          {mounted && (
            <Image
              src={tpl.preview}
              alt={`${tpl.name} preview`}
              fill
              sizes="320px"
              className="object-cover"
              style={{ opacity: 0.85 }}
            />
          )}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section style={{ padding: "60px 24px", background: "rgba(255,255,255,0.015)" }}>
        <div className="mx-auto max-w-[640px]">
          <h2
            style={{
              fontFamily: "var(--font-bodoni, Georgia, serif)",
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255,255,255,0.92)",
              textAlign: "center",
              margin: "0 0 36px",
            }}
          >
            Yang Anda Dapatkan
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {tpl.highlights.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: "16px 14px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: "rgba(201,169,110,0.12)",
                    color: "rgba(201,169,110,0.85)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-bodoni, Georgia, serif)",
                    fontSize: 12,
                    marginBottom: 8,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {h}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 13,
              fontStyle: "italic",
              color: "rgba(255,255,255,0.45)",
              textAlign: "center",
              marginTop: 32,
              lineHeight: 1.7,
            }}
          >
            {tpl.emotionalNote}
          </p>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section style={{ padding: "60px 24px", textAlign: "center" }}>
        <div className="mx-auto max-w-[480px]">
          <span
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.40)",
              display: "block",
              marginBottom: 12,
            }}
          >
            Mulai dari
          </span>
          <p
            style={{
              fontFamily: "var(--font-bodoni, Georgia, serif)",
              fontSize: 36,
              fontWeight: 400,
              color: "rgba(201,169,110,0.92)",
              margin: "0 0 8px",
            }}
          >
            Rp75.000
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 12,
              color: "rgba(255,255,255,0.50)",
              marginBottom: 28,
            }}
          >
            Paket Basic · atau Rp99.000 untuk Premium
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 11,
              color: "rgba(255,255,255,0.40)",
              marginBottom: 24,
            }}
          >
            Atau hubungi kami dulu untuk pertanyaan:
          </p>
          <a
            href={WA_INQUIRY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "rgba(255,255,255,0.70)",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textDecoration: "none",
            }}
          >
            Tanya via WhatsApp
          </a>
        </div>
      </section>

      {/* CHECKOUT — FIXED (ONLY ONE INSTANCE) */}
            <NaukaCheckout
        templateName={tpl.name}
        templateId={tpl.id}
        basicPrice={75}
        premiumPrice={99}
      />

      {/* FOOTER */}
      <NaukaFooter />

      <NaukaWhatsAppFloat />
    </main>
  );
}
