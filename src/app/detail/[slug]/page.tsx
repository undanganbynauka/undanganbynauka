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
      "Celestial menghadirkan desain undangan digital yang elegan dan universal.",
    highlights: [
      "Animasi halus",
      "Tipografi elegan",
      "Desain modern",
      "Universal",
    ],
    emotionalNote: "Momen Anda layak diungkapkan dengan keindahan.",
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
      <main style={{ minHeight: "100vh", background: "#0B1120", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "white" }}>Template tidak ditemukan</p>
      </main>
    );
  }

  return (
    <main style={{ background: "#0B1120", minHeight: "100vh" }}>
      {/* HEADER */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.5)" }}>
            ← Kembali
          </Link>

          <h1 style={{ color: "white", marginTop: 20 }}>
            {tpl.name}
          </h1>

          {/* Preview image — clickable ke live preview */}
          <Link
            href={tpl.previewHref}
            style={{ display: "block", marginTop: 20 }}
          >
            <Image
              src={tpl.preview}
              alt={tpl.name}
              width={600}
              height={900}
              style={{
                borderRadius: 12,
                cursor: "pointer",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            />
          </Link>

          {/* Tombol preview emas — prominent */}
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link
              href={tpl.previewHref}
              style={{
                display: "inline-block",
                padding: "14px 36px",
                borderRadius: "999px",
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "rgba(201,169,110,0.95)",
                textDecoration: "none",
                background: "rgba(201,169,110,0.06)",
                border: "1px solid rgba(201,169,110,0.35)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 24px rgba(201,169,110,0.4)";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.8)";
                e.currentTarget.style.background = "rgba(201,169,110,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                e.currentTarget.style.background = "rgba(201,169,110,0.06)";
              }}
            >
              Lihat Preview Live →
            </Link>
          </div>

          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 28 }}>
            {tpl.description}
          </p>

          <ul style={{ color: "rgba(255,255,255,0.6)" }}>
            {tpl.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

          <p style={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>
            {tpl.emotionalNote}
          </p>
        </div>
      </section>

      {/* CHECKOUT — FIXED (ONLY ONE INSTANCE) */}
      <NaukaCheckout
        templateName={tpl.name}
        templateId={tpl.id}
      />

      {/* FOOTER */}
      <NaukaFooter />

      <NaukaWhatsAppFloat />
    </main>
  );
}
