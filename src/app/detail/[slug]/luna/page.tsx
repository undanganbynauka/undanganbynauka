"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NaukaFooter } from "@/components/nauka/NaukaFooter";

export default function LunaDetailPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const highlights = [
    "Ilustrasi pasangan yang hangat dan personal",
    "Palet sage + gold yang menenangkan",
    "Animasi sinematik lembut dari awal hingga penutup",
    "Audio kicau burung pagi yang menenangkan",
    "Bagian lengkap: pembuka, mempelai, acara, penutup",
    "Gratis selamanya — tanpa biaya tersembunyi",
  ];

  return (
    <main className="min-h-screen" style={{ background: "#0B1120" }}>
      {/* DETAIL */}
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
              ? "radial-gradient(ellipse at 50% 10%, rgba(201,169,110,0.03) 0%, transparent 50%)"
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

          {/* Collection label + FREE badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.2s ease-out",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.30)",
              }}
            >
              Universal Collection
            </span>
            <span
              style={{
                padding: "3px 10px",
                borderRadius: "999px",
                background: "rgba(247, 242, 234, 0.95)",
                color: "#3A4D3F",
                fontFamily: "var(--font-inter)",
                fontSize: "9px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Free
            </span>
          </div>

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
            Luna
          </h1>

          {/* Preview image */}
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
              <Image
                src="/nauka/couple-illustration-sage.png"
                alt="Luna preview"
                fill
                sizes="(max-width: 580px) 100vw, 580px"
                className="object-cover"
                style={{ opacity: 0.9 }}
                priority
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.3s, transform 1.3s ease-out 0.3s",
            }}
          >
            {/* Primary: Buka Luna Live */}
            <Link
              href="/luna"
              style={{
                display: "block",
                padding: "16px 24px",
                borderRadius: "10px",
                background: "linear-gradient(180deg, rgba(247,242,234,0.96) 0%, rgba(232,226,214,0.92) 100%)",
                color: "#3A4D3F",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textAlign: "center",
                textDecoration: "none",
                boxShadow: "0 4px 18px rgba(247,242,234,0.10)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 22px rgba(247,242,234,0.16)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 18px rgba(247,242,234,0.10)";
              }}
            >
              Buka Preview Luna →
            </Link>

            {/* Secondary: Klaim via WhatsApp */}
            <a
              href={`https://wa.me/6289655592925?text=${encodeURIComponent(
                "Halo Nauka, saya tertarik memakai Luna (template free) untuk undangan pernikahan saya. Mohon info lebih lanjut ya, terima kasih."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "14px 24px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.16)",
                background: "transparent",
                color: "rgba(255,255,255,0.78)",
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textAlign: "center",
                textDecoration: "none",
                transition: "border-color 0.3s ease, color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.32)";
                e.currentTarget.style.color = "rgba(255,255,255,0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
                e.currentTarget.style.color = "rgba(255,255,255,0.78)";
              }}
            >
              Klaim Luna Gratis via WhatsApp
            </a>
          </div>

          {/* Description */}
          <div style={{ marginTop: "56px" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.62)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 1.3s ease-out 0.4s, transform 1.3s ease-out 0.4s",
              }}
            >
              Luna hadir untuk memastikan setiap cinta tetap layak dirayakan, walau sederhana di hati. Sebuah undangan digital yang lembut, hangat, dan tetap indah — dirancang khusus untuk pasangan yang ingin berbagi kebahagiaan tanpa harus memikirkan beban budget. Luna membawa kehangatan ilustrasi pasangan, palet sage yang menenangkan, dan suara kicau burung pagi yang membuat tamu undangan merasa sedang memasuki taman kecil tempat momen sakral Anda dirayakan.
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
              transition: "opacity 1.3s ease-out 0.5s, transform 1.3s ease-out 0.5s",
            }}
          >
            {highlights.map((h, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                  paddingLeft: "16px",
                  position: "relative",
                  marginBottom: i < highlights.length - 1 ? "10px" : 0,
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
                    background: "rgba(201,169,110,0.45)",
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
              color: "rgba(255,255,255,0.58)",
              marginTop: "32px",
              fontStyle: "italic",
              opacity: loaded ? 1 : 0,
              transition: "opacity 1.3s ease-out 0.6s",
            }}
          >
            Setiap cinta layak dirayakan — walau sederhana, tetap indah.
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

      {/* FREE TIER NOTE */}
      <section
        style={{
          background: "linear-gradient(180deg, #111827 0%, #0B1120 100%)",
          padding: "60px 24px",
        }}
      >
        <div
          className="mx-auto"
          style={{ maxWidth: "580px", textAlign: "center" }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.70)",
              display: "block",
              marginBottom: "14px",
            }}
          >
            Catatan untuk calon mempelai
          </span>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Luna adalah template gratis dari Nauka. Karena gratis, kustomisasi terbatas pada data acara saja (nama mempelai, tanggal, lokasi, dan rundown). Untuk perubahan desain lebih dalam — palet warna khusus, layout alternatif, atau ilustrasi custom — silakan pertimbangkan Sacred atau Celestial, template premium kami yang dirancang untuk kebutuhan yang lebih personal.
          </p>
        </div>
      </section>

      <NaukaFooter />
    </main>
  );
}
