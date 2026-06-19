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
      "Sacred dirancang untuk pasangan yang mengutamakan kesederhanaan syar'i dalam setiap detail undangannya.",
    highlights: [
      "Desain tanpa foto",
      "Audio vokal atau alam",
      "Ornamen islami",
      "Bahasa syar'i",
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
      "Celestial menghadirkan keanggunan universal dalam desain undangan digital.",
    highlights: [
      "Animasi sinematik",
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

          <Image
            src={tpl.preview}
            alt={tpl.name}
            width={600}
            height={900}
            style={{ marginTop: 20, borderRadius: 12 }}
          />

          <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 20 }}>
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

      {/* CHECKOUT (FIXED - SINGLE COMPONENT ONLY) */}
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
