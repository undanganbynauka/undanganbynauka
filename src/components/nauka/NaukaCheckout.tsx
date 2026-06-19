import { PRICING, formatIDR } from "@/lib/pricing";
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getWAOrderNotifLink, GOOGLE_FORM_URL } from "@/lib/whatsapp";

interface CheckoutProps {
  templateName: string;
  templateId: string;
}

function generateOrderId(templateId: string): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `NAU-${templateId.substring(0, 3).toUpperCase()}-${ts}-${rand}`;
}

function formatDateTime(): string {
  const now = new Date();
  const opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return now.toLocaleDateString("id-ID", opts);
}

 export function NaukaCheckout({ templateName, templateId }: CheckoutProps) {
  const [selected, setSelected] = useState<"basic" | "premium">("premium");
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
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

  const price = selected === "basic" ? PRICING.basic : PRICING.premium;
  const packageName = selected === "basic" ? "Basic" : "Premium";
  const waNotifLink = getWAOrderNotifLink(templateName, packageName, price);

  const handleConfirm = () => {
    setOrderId(generateOrderId(templateId));
    setOrderDate(formatDateTime());
    setConfirmed(true);
    // Auto-open WA notif ke owner (background tab)
    window.open(waNotifLink, "_blank");
  };

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
                {formatIDR(PRICING.basic)}
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
                {formatIDR(PRICING.premium)}
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

        {/* ─── 4. PEMBAYARAN — QRIS ─── */}
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
            Scan QR untuk menyelesaikan pembayaran
          </p>

          {/* QR Code — premium glass card */}
          <div
            style={{
              marginTop: "28px",
              padding: "28px 24px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.025)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.2), 0 0 80px rgba(201,169,110,0.02)",
              textAlign: "center",
            }}
          >
            {/* QR Image */}
            <div
              style={{
                width: "200px",
                height: "200px",
                margin: "0 auto",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative",
                background: "#ffffff",
                padding: "12px",
              }}
            >
              <Image
                src="/qris.png"
                alt="QRIS Payment"
                fill
                sizes="200px"
                className="object-contain"
                style={{ borderRadius: "8px" }}
                priority
              />
            </div>

            {/* QRIS label */}
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.60)",
                display: "block",
                marginTop: "18px",
              }}
            >
              QRIS
            </span>

            {/* Micro info */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                fontWeight: 400,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.28)",
                marginTop: "8px",
              }}
            >
              Dapat dibayar melalui semua aplikasi pembayaran &amp; mobile banking
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
            Setelah pembayaran berhasil, klik konfirmasi. Notifikasi akan otomatis dikirim ke Nauka, lalu Anda akan diarahkan ke form pengisian detail undangan.
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
              onClick={handleConfirm}
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

              {/* ─── NOTA DIGITAL ─── */}
              <div
                style={{
                  padding: "28px 24px",
                  borderRadius: "14px",
                  border: "1px solid rgba(201,169,110,0.12)",
                  background: "rgba(255,255,255,0.02)",
                  textAlign: "left",
                  marginBottom: "28px",
                }}
              >
                {/* Header nota */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-bodoni)",
                      fontSize: "16px",
                      fontWeight: 400,
                      letterSpacing: "0.04em",
                      color: "rgba(255,255,255,0.75)",
                    }}
                  >
                    Nota Pesanan
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "9px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "100px",
                      border: "1px solid rgba(201,169,110,0.18)",
                      color: "rgba(201,169,110,0.55)",
                    }}
                  >
                    Menunggu Verifikasi
                  </span>
                </div>

                {/* Order ID + Date */}
                <div style={{ marginBottom: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.30)", letterSpacing: "0.06em" }}>No. Pesanan</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>{orderId}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.30)", letterSpacing: "0.06em" }}>Tanggal</span>
                    <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>{orderDate}</span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 0 18px" }} />

                {/* Order details */}
                <div style={{ marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Template</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.72)" }}>{templateName}</span>
                </div>
                <div style={{ marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Paket</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: selected === "premium" ? "rgba(201,169,110,0.7)" : "rgba(255,255,255,0.72)" }}>{packageName}</span>
                </div>
                <div style={{ marginBottom: "6px", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Pembayaran</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.55)" }}>QRIS</span>
                </div>

                {/* Total divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", margin: "16px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-bodoni)", fontSize: "20px", fontWeight: 400, color: "rgba(255,255,255,0.85)" }}>
                    Rp{price.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Micro footer */}
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "10px",
                    color: "rgba(255,255,255,0.20)",
                    marginTop: "18px",
                    lineHeight: 1.5,
                  }}
                >
                  Simpan nota ini sebagai bukti pemesanan. Tim Nauka akan memverifikasi pembayaran Anda.
                </p>
              </div>

              {/* Notif info */}
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.30)",
                  marginBottom: "24px",
                  lineHeight: 1.5,
                }}
              >
                Notifikasi konfirmasi telah dikirim ke Nauka.
              </p>

              {/* PRIMARY: Google Form */}
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  width: "100%",
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
                  textAlign: "center",
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
                Isi Detail Undangan →
              </a>

              {/* SECONDARY: WA fallback — small, subtle */}
              <div style={{ marginTop: "20px" }}>
                <a
                  href={waNotifLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.25)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    transition: "color 0.3s ease, border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                    e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.25)";
                    e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.08)";
                  }}
                >
                  Kirim ulang notifikasi via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
