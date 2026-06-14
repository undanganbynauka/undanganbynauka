"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const TARGET_DATE = new Date("2026-07-05T09:00:00+07:00");

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  const t = Math.floor(diff / 1000);
  return {
    d: Math.floor(t / 86400),
    h: Math.floor((t % 86400) / 3600),
    m: Math.floor((t % 3600) / 60),
    s: t % 60,
  };
}

function FlipUnit({ value, label }: { value: string; label: string }) {
  const [current, setCurrent] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prevRef = useRef(value);

  useEffect(() => {
    if (prevRef.current !== value) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setCurrent(value);
        setFlipping(false);
      }, 300);
      prevRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
      <div
        style={{
          position: "relative",
          width: "64px",
          height: "80px",
          perspective: "600px",
        }}
      >
        {/* Card */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Top half */}
          <div
            style={{
              height: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#fff",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              fontFamily: "var(--font-jakarta)",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#7D6E63",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              transition: flipping ? "transform 0.3s ease-in" : "none",
              transform: flipping ? "rotateX(-90deg)" : "rotateX(0deg)",
              transformOrigin: "bottom center",
            }}
          >
            {current}
          </div>
          {/* Bottom half */}
          <div
            style={{
              height: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#fff",
              borderRadius: "0 0 12px 12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              fontFamily: "var(--font-jakarta)",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#7D6E63",
            }}
          >
            {current}
          </div>
        </div>
      </div>
      {/* Label */}
      <span
        style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "0.5625rem",
          fontWeight: 500,
          color: "#7D6E63",
          opacity: 0.6,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function EventSection() {
  const [time, setTime] = useState(getTimeLeft);

  const tick = useCallback(() => {
    setTime(getTimeLeft());
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <section
      style={{
        position: "relative",
        background: "#F8F4EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Paper grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "22rem",
          textAlign: "center",
          width: "100%",
          gap: "1.25rem",
        }}
      >
        {/* Countdown */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7D6E63",
              marginBottom: "0.25rem",
            }}
          >
            Save The Date
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.25rem",
              fontWeight: 400,
              color: "#7D6E63",
              marginBottom: "1.25rem",
            }}
          >
            Ali & Lyla
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <FlipUnit value={String(time.d).padStart(2, "0")} label="Hari" />
            <FlipUnit value={String(time.h).padStart(2, "0")} label="Jam" />
            <FlipUnit value={String(time.m).padStart(2, "0")} label="Menit" />
            <FlipUnit value={String(time.s).padStart(2, "0")} label="Detik" />
          </div>
        </div>

        {/* Card: Akad Nikah */}
        <div
          style={{
            background: "rgba(125, 110, 99, 0.04)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px",
            padding: "1.75rem 1.5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#7D6E63",
              marginBottom: "1rem",
              letterSpacing: "0.03em",
            }}
          >
            Akad Nikah
          </h3>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            Ahad, 5 Juli 2026
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            09.00 - selesai
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            Gedung Auditorium Koni, Tanah Abang 1 - Jakarta Pusat
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#7D6E63",
              border: "1px solid rgba(125, 110, 99, 0.3)",
              borderRadius: "4px",
              padding: "0.375rem 1rem",
              textDecoration: "none",
              letterSpacing: "0.03em",
              boxShadow: "0 1px 3px rgba(125, 110, 99, 0.15), 0 1px 2px rgba(125, 110, 99, 0.08)",
            }}
          >
            Lihat Lokasi
          </a>
        </div>

        {/* Card: Resepsi */}
        <div
          style={{
            background: "rgba(125, 110, 99, 0.04)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px",
            padding: "1.75rem 1.5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#7D6E63",
              marginBottom: "1rem",
              letterSpacing: "0.03em",
            }}
          >
            Resepsi
          </h3>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            Ahad, 5 Juli 2026
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            09.00 - selesai
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            Gedung Auditorium Koni, Tanah Abang 1 - Jakarta Pusat
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#7D6E63",
              border: "1px solid rgba(125, 110, 99, 0.3)",
              borderRadius: "4px",
              padding: "0.375rem 1rem",
              textDecoration: "none",
              letterSpacing: "0.03em",
              boxShadow: "0 1px 3px rgba(125, 110, 99, 0.15), 0 1px 2px rgba(125, 110, 99, 0.08)",
            }}
          >
            Lihat Lokasi
          </a>
        </div>
      </div>
    </section>
  );
}
