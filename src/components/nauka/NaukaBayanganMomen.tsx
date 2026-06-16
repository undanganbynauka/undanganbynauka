"use client";

import React, { useEffect, useRef, useState } from "react";

const MOMENTS = [
  {
    quote:
      "Aku ingin undangan yang sederhana, tapi terasa seperti momen yang tidak akan dilupakan.",
    attribution: "calon pengantin",
  },
  {
    quote:
      "Semoga setiap tamu bisa langsung merasakan suasana hanya dari undangannya saja.",
    attribution: "calon pengguna Nauka",
  },
  {
    quote:
      "Tidak berlebihan, tapi cukup untuk membuat orang paham bahwa ini momen penting.",
    attribution: "harapan pengguna",
  },
  {
    quote:
      "Kalau undangannya saja sudah terasa istimewa, bayangkan hari H-nya nanti.",
    attribution: "angan-angan calon mempelai",
  },
];

export function NaukaBayanganMomen() {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-cycle quotes
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MOMENTS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0B1120 50%, #111827 100%)",
        padding: "90px 24px",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow — subtle, warm */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(201,169,110,0.025) 0%, transparent 70%)"
            : "none",
          transition: "background 2s ease",
        }}
      />

      {/* Faint vertical lines — cinematic depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: visible ? 0.025 : 0,
          transition: "opacity 2s ease 0.5s",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "15%",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, rgba(201,169,110,0.5), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "15%",
            top: 0,
            bottom: 0,
            width: "1px",
            background:
              "linear-gradient(to bottom, transparent, rgba(201,169,110,0.5), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[580px]">
        {/* Section label — tiny, uppercase */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(201,169,110,0.40)",
            textAlign: "center",
            marginBottom: "20px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }}
        >
          Cuplikan Perasaan
        </p>

        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "22px",
            fontWeight: 400,
            letterSpacing: "0.03em",
            color: "rgba(255,255,255,0.88)",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
          className="md:!text-[26px]"
        >
          Bayangan Momen
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.38)",
            textAlign: "center",
            maxWidth: "360px",
            margin: "16px auto 0",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.3s ease-out 0.15s, transform 1.3s ease-out 0.15s",
          }}
        >
          Bukan testimoni. Bukan review. Ini bayangan perasaan dan harapan mereka yang sedang menanti hari istimewa.
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.08)",
            margin: "42px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.2s",
          }}
        />

        {/* ── Quote Carousel ── */}
        <div
          style={{
            position: "relative",
            minHeight: "200px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.4s ease-out 0.3s, transform 1.4s ease-out 0.3s",
          }}
        >
          {MOMENTS.map((moment, i) => (
            <div
              key={i}
              style={{
                position: i === activeIndex ? "relative" : "absolute",
                inset: i !== activeIndex ? 0 : undefined,
                opacity: i === activeIndex ? 1 : 0,
                transform: i === activeIndex ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
                pointerEvents: i === activeIndex ? "auto" : "none",
              }}
            >
              {/* Quote mark — decorative */}
              <div
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "48px",
                  fontWeight: 300,
                  color: "rgba(201,169,110,0.12)",
                  lineHeight: 1,
                  textAlign: "center",
                  marginBottom: "8px",
                  userSelect: "none",
                }}
              >
                &ldquo;
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "17px",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1.85,
                  letterSpacing: "0.02em",
                  color: "rgba(255,255,255,0.78)",
                  textAlign: "center",
                  maxWidth: "440px",
                  margin: "0 auto",
                }}
              >
                {moment.quote}
              </p>

              {/* Attribution */}
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(201,169,110,0.35)",
                  textAlign: "center",
                  marginTop: "24px",
                }}
              >
                &mdash; {moment.attribution}
              </p>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "36px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.5s",
          }}
        >
          {MOMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                width: i === activeIndex ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                border: "none",
                background:
                  i === activeIndex
                    ? "rgba(201,169,110,0.45)"
                    : "rgba(255,255,255,0.12)",
                cursor: "pointer",
                transition: "all 0.5s ease",
                padding: 0,
              }}
              aria-label={`Quote ${i + 1}`}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            margin: "42px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.6s",
          }}
        />

        {/* Closing sentiment */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.28)",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.4s ease-out 0.7s, transform 1.4s ease-out 0.7s",
          }}
        >
          Ini bukan sekadar template. Ini tentang momen.
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes nauka-breathe {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
