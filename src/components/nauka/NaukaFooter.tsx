"use client";

import React, { useEffect, useRef, useState } from "react";

export function NaukaFooter() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #080d1a 100%)",
        padding: "80px 24px 40px",
      }}
    >
      {/* Ambient glow — very subtle bottom warmth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(0deg, rgba(201,169,110,0.012) 0%, transparent 40%)"
            : "none",
          transition: "background 2s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[520px]">

        {/* ─── 1. BRAND LINE ─── */}
        <div
          style={{
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.6s ease-out, transform 1.6s ease-out",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "24px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.75)",
            }}
          >
            Nauka
          </span>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.35)",
              marginTop: "8px",
              lineHeight: 1.6,
            }}
          >
            Menghadirkan keindahan dalam kesederhanaan
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "40px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.4s ease-out 0.2s",
          }}
        />

        {/* ─── 2. CONTACT SECTION ─── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.3s ease-out 0.25s, transform 1.3s ease-out 0.25s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              display: "block",
              marginBottom: "20px",
            }}
          >
            Hubungi Kami
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {/* WhatsApp */}
            <a
              href="https://wa.me/6289655592925"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              0896-555-9292-5
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.20)", marginLeft: "8px", letterSpacing: "0.08em" }}>WhatsApp</span>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/undanganbynauka"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              @undanganbynauka
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.20)", marginLeft: "8px", letterSpacing: "0.08em" }}>Instagram</span>
            </a>

            {/* Email */}
            <a
              href="mailto:undanganbynauka@gmail.com"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              undanganbynauka@gmail.com
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.20)", marginLeft: "8px", letterSpacing: "0.08em" }}>Email</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "36px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.35s",
          }}
        />

        {/* ─── 3. PAYMENT — QRIS ONLY ─── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.4s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              display: "block",
              marginBottom: "14px",
            }}
          >
            Pembayaran
          </span>

          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            QRIS — via semua aplikasi pembayaran &amp; mobile banking
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "36px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.5s",
          }}
        />

        {/* ─── CLOSING TAGLINE ─── */}
        <p
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.40)",
            fontStyle: "italic",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.4s ease-out 0.55s",
          }}
        >
          Dirancang dengan tenang, untuk dikenang.
        </p>

        {/* ─── 4. COPYRIGHT ─── */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.15)",
            textAlign: "center",
            marginTop: "32px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.65s",
          }}
        >
          &copy; Nauka — All rights reserved.
        </p>
      </div>
    </footer>
  );
}
