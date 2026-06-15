"use client";

import React, { useState, useEffect, useRef } from "react";

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = new Date("2026-12-05T08:00:00+07:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  // Staggered letter reveal helper
  const renderLetters = (
    text: string,
    baseDelay: number,
    delayPerChar: number = 0.04
  ) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.6s ${ease} ${baseDelay + i * delayPerChar}s, transform 0.6s ${ease} ${baseDelay + i * delayPerChar}s`,
          whiteSpace: char === " " ? "pre" : undefined,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#FAF7F2",
      }}
    >
      {/* Full-bleed banner image — fills entire viewport, no gap */}
      <div style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        marginLeft: "calc(-50vw + 50%)",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
      }}>
        <img
          src="/sacred/countdown-top.png"
          alt="The Wedding of Ali & Lyla"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        {/* Bottom gradient overlay */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "linear-gradient(to top, rgba(250,247,242,0.9) 0%, rgba(250,247,242,0.3) 50%, transparent 100%)",
          pointerEvents: "none",
        }} />
        {/* Text at bottom-right — staggered letter reveal */}
        <div style={{
          position: "absolute",
          bottom: "3.5rem",
          right: "1.5rem",
          textAlign: "right",
          zIndex: 2,
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant)", fontSize: "0.8125rem", fontWeight: 400,
            fontStyle: "italic", color: "#6F6F6F", letterSpacing: "0.06em",
            marginBottom: "0.625rem", margin: 0,
          }}>
            {renderLetters("The Wedding of", 0.3, 0.035)}
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500,
            color: "#2E2E2E", letterSpacing: "0.02em",
            marginBottom: "0.625rem",
          }}>
            {renderLetters("Ali & Lyla", 0.85, 0.05)}
          </h2>
          <p style={{
            fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 400,
            color: "#8A8A8A", letterSpacing: "0.1em",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.7s ${ease} 1.4s, transform 0.7s ${ease} 1.4s`,
          }}>
            Ahad, 5 Juli 2026
          </p>
        </div>
      </div>

      {/* Content below image */}
      <div style={{
        padding: "3rem 1.5rem 4rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}>

      <p style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
        letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A",
        marginBottom: "0.5rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1s ${ease} 1.6s, transform 1s ${ease} 1.6s`,
      }}>
        Menghitung Hari
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500,
        color: "#2E2E2E", marginBottom: "2rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1s ${ease} 1.7s, transform 1s ${ease} 1.7s`,
      }}>
        Countdown
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem", maxWidth: "20rem", width: "100%" }}>
        {units.map((u, i) => (
          <div key={u.label} style={{
            background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "16px", padding: "1.25rem 0.5rem", textAlign: "center",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.8s ${ease} ${1.8 + i * 0.1}s, transform 0.8s ${ease} ${1.8 + i * 0.1}s`,
          }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500, color: "#2E2E2E", lineHeight: 1, marginBottom: "0.375rem" }}>
              {String(u.value).padStart(2, "0")}
            </p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8A8A" }}>
              {u.label}
            </p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
