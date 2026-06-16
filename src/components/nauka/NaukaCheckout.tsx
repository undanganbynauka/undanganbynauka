"use client";

import React, { useEffect, useRef, useState } from "react";

const QRIS_CODE = "00020101021126610014COM.GO-JEK.WWW01189360091435569828750210G5569828750303UMI51440014ID.CO.QRIS.WWW0215ID10265338820920303UMI5204899953033605802ID5925Undangan By Nauka, Digita6005BOGOR61051691362070703A016304EA85";

interface CheckoutProps {
  templateName: string;
  templateId: string;
  basicPrice: number;
  premiumPrice: number;
}

const WA_BASE = "6289655592925";

export function NaukaCheckout({ templateName, templateId, basicPrice, premiumPrice }: CheckoutProps) {
  const [selected, setSelected] = useState<"basic" | "premium">("premium");
  const [confirmed, setConfirmed] = useState(false);
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

  const price = selected === "basic" ? basicPrice : premiumPrice;
  const packageName = selected === "basic" ? "Basic" : "Premium";

  const waMessage = `Halo Nauka, saya ingin order undangan.%0A%0ATemplate: ${templateName}%0APaket: ${packageName}%0AHarga: Rp${price.toLocaleString("id-ID")}%0AMetode: QRIS`;
  const waLink = `https://wa.me/${WA_BASE}?text=${waMessage}`;

  return (
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
        padding: "80px 24px",
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

      <div className="relative z-10 mx-auto max-w-[520px]">
        {/* ─── 1. TITLE ─── */}
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
          Checkout
        </h2>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "36px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.15s",
          }}
        />

        {/* ─── 2. TEMPLATE NAME + PACKAGE SELECTOR ─── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out 0.2s, transform 1.3s ease-out 0.2s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "22px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.85)",
              display: "block",
              textAlign: "center",
            }}
          >
            {templateName}
          </span>

          {/* Package toggle */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginTop: "28px",
            }}
          >
            {/* Basic option */}
            <button
              onClick={() => { setSelected("basic"); setConfirmed(false); }}
              style={{
                padding: "16px 12px",
                borderRadius: "12px",
                border: selected === "basic" ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(255,255,255,0.06)",
                background: selected === "basic" ? "rgba(255,255,255,0.04)" : "transparent",
                cursor: "pointer",
                transition: "border-color 0.3s ease, background 0.3s ease",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: selected === "basic" ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
                  display: "block",
                  transition: "color 0.3s ease",
                }}
              >
                Basic
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: selected === "basic" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
                  display: "block",
                  marginTop: "8px",
                  transition: "color 0.3s ease",
                }}
              >
                {basicPrice}rb
              </span>
            </button>

            {/* Premium option */}
            <button
              onClick={() => { setSelected("premium"); setConfirmed(false); }}
              style={{
                padding: "16px 12px",
                borderRadius: "12px",
                border: selected === "premium" ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.06)",
                background: selected === "premium" ? "rgba(201,169,110,0.04)" : "transparent",
                cursor: "pointer",
                transition: "border-color 0.3s ease, background 0.3s ease",
                textAlign: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: selected === "premium" ? "rgba(201,169,110,0.75)" : "rgba(255,255,255,0.35)",
                  display: "block",
                  transition: "color 0.3s ease",
                }}
              >
                Premium
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "22px",
                  fontWeight: 400,
                  color: selected === "premium" ? "rgba(201,169,110,0.8)" : "rgba(255,255,255,0.35)",
                  display: "block",
                  marginTop: "8px",
                  transition: "color 0.3s ease",
                }}
              >
                {premiumPrice}rb
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            margin: "32px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.35s",
          }}
        />

        {/* ─── 3. RINGKASAN ─── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out 0.35s, transform 1.3s ease-out 0.35s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.30)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Ringkasan
          </span>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>Template</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.72)" }}>{templateName}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>Paket</span>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: selected === "premium" ? "rgba(201,169,110,0.7)" : "rgba(255,255,255,0.72)" }}>{packageName}</span>
          </div>

          {/* Total divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "16px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>Total</span>
            <span
              style={{
                fontFamily: "var(--font-bodoni)",
                fontSize: "20px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              Rp{price.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            margin: "32px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.4s",
          }}
        />

        {/* ─── 4. PEMBAYARAN — QRIS CODE ─── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out 0.4s, transform 1.3s ease-out 0.4s",
          }}
        >
          {/* Title */}
          <h3
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.80)",
              textAlign: "center",
            }}
          >
            Pembayaran
          </h3>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.38)",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            Salin kode QRIS untuk menyelesaikan pembayaran
          </p>

          {/* QRIS Code — premium glass card */}
          <div
            style={{
              marginTop: "28px",
              padding: "24px 20px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.025)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.2), 0 0 80px rgba(201,169,110,0.02)",
              textAlign: "center",
            }}
          >
            {/* QRIS badge */}
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.65)",
                display: "block",
                marginBottom: "16px",
              }}
            >
              QRIS
            </span>

            {/* Code display */}
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(0,0,0,0.25)",
                wordBreak: "break-all",
                fontFamily: "monospace",
                fontSize: "11px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.50)",
                letterSpacing: "0.02em",
                userSelect: "all",
              }}
            >
              {QRIS_CODE}
            </div>

            {/* Copy button */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(QRIS_CODE).then(() => {
                  const btn = document.activeElement as HTMLButtonElement;
                  const orig = btn.textContent;
                  btn.textContent = "Tersalin ✓";
                  btn.style.borderColor = "rgba(201,169,110,0.30)";
                  btn.style.color = "rgba(201,169,110,0.8)";
                  setTimeout(() => {
                    btn.textContent = orig;
                    btn.style.borderColor = "rgba(255,255,255,0.10)";
                    btn.style.color = "rgba(255,255,255,0.45)";
                  }, 1800);
                });
              }}
              style={{
                marginTop: "16px",
                padding: "10px 24px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                cursor: "pointer",
                transition: "border-color 0.3s ease, color 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                e.currentTarget.style.color = "rgba(255,255,255,0.60)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              Salin Kode
            </button>

            {/* Micro info */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.25)",
                marginTop: "16px",
              }}
            >
              Buka aplikasi pembayaran atau mobile banking, lalu tempel kode QRIS
            </p>
          </div>
        </div>

        {/* ─── 5. INFO PROSES ─── */}
        <div
          style={{
            marginTop: "24px",
            padding: "16px 18px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.015)",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.5s",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.38)",
            }}
          >
            Setelah pembayaran berhasil, konfirmasi melalui WhatsApp. Anda akan diarahkan ke Google Form untuk pengisian detail undangan.
          </p>
        </div>

        {/* ─── 6. CTA BUTTON ─── */}
        <div
          style={{
            marginTop: "32px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out 0.55s, transform 1.3s ease-out 0.55s",
          }}
        >
          {!confirmed ? (
            <button
              onClick={() => setConfirmed(true)}
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1px solid rgba(201,169,110,0.20)",
                background: "rgba(201,169,110,0.06)",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                color: "rgba(201,169,110,0.75)",
                cursor: "pointer",
                transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                e.currentTarget.style.background = "rgba(201,169,110,0.10)";
                e.currentTarget.style.color = "rgba(201,169,110,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.20)";
                e.currentTarget.style.background = "rgba(201,169,110,0.06)";
                e.currentTarget.style.color = "rgba(201,169,110,0.75)";
              }}
            >
              Konfirmasi Pembayaran
            </button>
          ) : (
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "20px",
                  lineHeight: 1.6,
                }}
              >
                Terima kasih. Silakan konfirmasi pembayaran Anda melalui WhatsApp untuk memproses pesanan.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "16px 32px",
                  borderRadius: "12px",
                  border: "1px solid rgba(201,169,110,0.25)",
                  background: "rgba(201,169,110,0.08)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  color: "rgba(201,169,110,0.8)",
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.40)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.12)";
                  e.currentTarget.style.color = "rgba(201,169,110,0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                  e.currentTarget.style.color = "rgba(201,169,110,0.8)";
                }}
              >
                Konfirmasi via WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Secondary link — Google Form */}
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.65s",
          }}
        >
          <a
            href="#"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.20)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.25)";
              e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.10)";
            }}
          >
            Isi detail undangan
          </a>
        </div>
      </div>
    </section>
  );
}
