"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NaukaFooter } from "@/components/nauka/NaukaFooter";
import { MarwahClaimForm } from "@/components/nauka/MarwahClaimForm";

export default function MarwahDetailPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const highlights = [
    "Ilustrasi pasangan muslim yang hangat dan personal",
    "Palet mocha + cream yang menenangkan",
    "Nuansa islami yang sakral dan tenang",
    "Ayat Al-Quran, Bismillah, doa penutup",
    "Gratis selamanya — tanpa biaya tersembunyi",
  ];

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
              Syar'i Collection
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
            Marwah
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
                src="/etalase/marwah-preview.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/marwah/couple-illustration-marwah.png"
                style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
              />
            </div>
          </div>

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
            <Link
              href="/marwah"
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
              Buka Preview Marwah →
            </Link>

            <a
              href="#marwah-claim"
              style={{
                display: "block",
                padding: "14px 24px",
                borderRadius: "10px",
                border: "1px solid rgba(201,169,110,0.30)",
                background: "rgba(201,169,110,0.06)",
                color: "rgba(201,169,110,0.9)",
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textAlign: "center",
                textDecoration: "none",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
                e.currentTarget.style.background = "rgba(201,169,110,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.30)";
                e.currentTarget.style.background = "rgba(201,169,110,0.06)";
              }}
            >
              Klaim Marwah Gratis — Isi Data
            </a>
          </div>

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
              Marwah hadir untuk pasangan muslim yang menginginkan undangan sederhana, khidmat, dan penuh makna. Dengan palet mocha yang hangat, ilustrasi pasangan muslim, dan ayat-ayat suci Al-Quran yang menyertai setiap bagian, Marwah menghadirkan pengalaman undangan yang sakral dan tenang. Dirancang khusus untuk pasangan yang ingin berbagi kebahagiaan tanpa harus memikirkan beban budget.
            </p>
          </div>

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
            Sacred dan hangat, bukan mewah berlebihan.
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
            Marwah adalah template gratis dari Nauka. Karena gratis, kustomisasi terbatas pada data acara saja (nama mempelai, tanggal, lokasi, dan rundown). Untuk perubahan desain lebih dalam, silakan pertimbangkan Sacred atau Celestial, template premium kami yang dirancang untuk kebutuhan yang lebih personal.
          </p>
        </div>
      </section>

      <div id="marwah-claim">
        <MarwahClaimForm />
      </div>

      <NaukaFooter />
    </main>
  );
}
