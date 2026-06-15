"use client";

import React, { useEffect, useRef, useState } from "react";

const points = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Ramah & Tenang",
    desc: "Suara default mati — undangan yang dibuka tidak mengejutkan siapa pun.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Tampilan Berbeda",
    desc: "Animasi sinematik dan desain yang tidak akan kamu temui di undangan lain.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Tanpa Foto, Tetap Elegan",
    desc: "Desain murni visual — tidak perlu upload foto, hasilnya sudah indah.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Semua Dikurasi",
    desc: "Nasyid, animasi, desain — sudah dipilihkan yang terbaik. Tidak perlu repot.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Satu Link, Semua Tamu",
    desc: "Bagikan satu tautan — semua tamu bisa menerima undangan secara langsung.",
  },
];

export function NaukaKenapa() {
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

  return (
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "#0B1120",
        padding: "90px 24px",
      }}
    >
      {/* Ambient glow — top corner */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(135deg, rgba(201,169,110,0.03) 0%, transparent 50%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[900px]">
        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "28px",
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            marginBottom: "12px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
        >
          Kenapa Nauka?
        </h2>

        {/* Divider */}
        <div
          className="mx-auto mb-14 flex items-center justify-center gap-3 md:mb-[42px]"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.2s",
          }}
        >
          <span style={{ height: "1px", width: "32px", background: "rgba(255,255,255,0.18)" }} />
          <span style={{
            height: "3px",
            width: "3px",
            borderRadius: "50%",
            background: "rgba(201,169,110,0.6)",
            animation: "nauka-breathe 3s ease-in-out infinite",
          }} />
          <span style={{ height: "1px", width: "32px", background: "rgba(255,255,255,0.18)" }} />
        </div>

        {/* Points grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => (
            <div
              key={i}
              className="group"
              style={{
                padding: "24px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                transition: "border-color 0.5s ease, background 0.5s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${0.2 + i * 0.1}s`,
                transitionProperty: "opacity, transform, border-color, background",
                transitionDuration: "1.4s, 1.4s, 0.5s, 0.5s",
                transitionTimingFunction: "ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)";
                e.currentTarget.style.background = "rgba(201,169,110,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  border: "1px solid rgba(201,169,110,0.12)",
                  background: "rgba(201,169,110,0.04)",
                  color: "rgba(201,169,110,0.8)",
                  marginBottom: "16px",
                  transition: "transform 0.5s ease",
                }}
              >
                {point.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "18px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.92)",
                  marginBottom: "8px",
                }}
              >
                {point.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
