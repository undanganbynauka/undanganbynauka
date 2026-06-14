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
          width: "60px",
          height: "76px",
          perspective: "600px",
        }}
      >
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          {/* Top half */}
          <div
            style={{
              height: "50%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#fff",
              borderRadius: "10px 10px 0 0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              fontFamily: "var(--font-jakarta)",
              fontSize: "1.375rem",
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
              borderRadius: "0 0 10px 10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              fontFamily: "var(--font-jakarta)",
              fontSize: "1.375rem",
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
          fontSize: "0.5rem",
          fontWeight: 500,
          color: "#7D6E63",
          opacity: 0.55,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Google Calendar link
const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Ali+%26+Lyla&dates=20260705T020000Z/20260705T070000Z&details=Pernikahan+Ali+Rahman+%26+Lyla+Azzahra%0AAhad%2C+5+Juli+2026%0A09.00+-+selesai%0AGedung+Auditorium+Koni%2C+Tanah+Abang+1+-+Jakarta+Pusat&location=Gedung+Auditorium+Koni%2C+Tanah+Abang+1%2C+Jakarta+Pusat";

export function CountdownSection() {
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
      {/* Background image — 8-10% opacity */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: "url(/countdown-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "22rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Countdown card */}
        <div
          style={{
            background: "rgba(125, 110, 99, 0.04)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px",
            padding: "2rem 1.5rem",
            textAlign: "center",
          }}
        >
          {/* Wedding Invitation */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#7D6E63",
              marginBottom: "0.5rem",
            }}
          >
            Wedding Invitation
          </p>

          {/* Ali & Lyla */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.5rem",
              fontWeight: 400,
              color: "#7D6E63",
              marginBottom: "0.5rem",
            }}
          >
            Ali & Lyla
          </h2>

          {/* Date */}
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              opacity: 0.75,
              marginBottom: "1.5rem",
              letterSpacing: "0.03em",
            }}
          >
            Ahad, 5 Juli 2026
          </p>

          {/* Divider */}
          <div
            style={{
              width: "2rem",
              height: "1px",
              background: "rgba(125, 110, 99, 0.2)",
              margin: "0 auto 1.5rem",
            }}
          />

          {/* Countdown label */}
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.5625rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#7D6E63",
              opacity: 0.5,
              marginBottom: "1rem",
            }}
          >
            Countdown Acara
          </p>

          {/* Flip cards */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
            <FlipUnit value={String(time.d).padStart(2, "0")} label="Hari" />
            <FlipUnit value={String(time.h).padStart(2, "0")} label="Jam" />
            <FlipUnit value={String(time.m).padStart(2, "0")} label="Menit" />
            <FlipUnit value={String(time.s).padStart(2, "0")} label="Detik" />
          </div>

          {/* Save The Date button */}
          <a
            href={GOOGLE_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#7D6E63",
              border: "1px solid rgba(125, 110, 99, 0.3)",
              borderRadius: "4px",
              padding: "0.5rem 1.25rem",
              textDecoration: "none",
              letterSpacing: "0.06em",
              boxShadow: "0 1px 3px rgba(125, 110, 99, 0.15), 0 1px 2px rgba(125, 110, 99, 0.08)",
              transition: "all 0.3s ease",
            }}
          >
            Save The Date
          </a>
        </div>
      </div>
    </section>
  );
}
