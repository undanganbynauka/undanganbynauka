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

function FlipUnit({ value, label, visible, delay }: { value: string; label: string; visible: boolean; delay: number }) {
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

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.375rem",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1s ${ease} ${delay}ms, transform 1s ${ease} ${delay}ms`,
      }}
    >
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
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const tick = useCallback(() => {
    setTime(getTimeLeft());
  }, []);

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tick]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  // Staggered reveal: title → cards → button
  useEffect(() => {
    if (!sectionVisible) return;
    const t1 = setTimeout(() => setShowTitle(true), 200);
    const t2 = setTimeout(() => setShowCards(true), 700);
    const t3 = setTimeout(() => setShowButton(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [sectionVisible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#F8F4EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        minHeight: "100vh",
      }}
    >
      {/* Background image */}
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
              opacity: showTitle ? 1 : 0,
              transform: showTitle ? "translateY(0)" : "translateY(15px)",
              transition: `opacity 1s ${ease}, transform 1s ${ease}`,
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
              opacity: showTitle ? 1 : 0,
              transform: showTitle ? "translateY(0)" : "translateY(15px)",
              transition: `opacity 1s ${ease} 0.15s, transform 1s ${ease} 0.15s`,
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
              opacity: showTitle ? 0.75 : 0,
              transform: showTitle ? "translateY(0)" : "translateY(10px)",
              marginBottom: "1.5rem",
              letterSpacing: "0.03em",
              transition: `opacity 1s ${ease} 0.3s, transform 1s ${ease} 0.3s`,
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
              opacity: showTitle ? 1 : 0,
              transition: `opacity 1s ${ease} 0.4s`,
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
              opacity: showCards ? 0.5 : 0,
              marginBottom: "1rem",
              transition: `opacity 0.8s ${ease}`,
            }}
          >
            Countdown Acara
          </p>

          {/* Flip cards — stagger 180ms each */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
            <FlipUnit value={String(time.d).padStart(2, "0")} label="Hari" visible={showCards} delay={0} />
            <FlipUnit value={String(time.h).padStart(2, "0")} label="Jam" visible={showCards} delay={180} />
            <FlipUnit value={String(time.m).padStart(2, "0")} label="Menit" visible={showCards} delay={360} />
            <FlipUnit value={String(time.s).padStart(2, "0")} label="Detik" visible={showCards} delay={540} />
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
              opacity: showButton ? 1 : 0,
              transform: showButton ? "translateY(0)" : "translateY(10px)",
            }}
          >
            Save The Date
          </a>
        </div>
      </div>
    </section>
  );
}
