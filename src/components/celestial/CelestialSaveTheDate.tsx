"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialSaveTheDate() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="celestial-section"
      style={{
        background: "linear-gradient(180deg, #0F1530 0%, #1A2555 50%, #0F1530 100%)",
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Image — full width, cover */}
      <div
        style={{
          width: "100%",
          aspectRatio: "9 / 16",
          maxHeight: "85vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/celestial/save-the-date.png')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
            opacity: visible ? 1 : 0,
            transition: `opacity 1.5s ${ease}`,
          }}
        />

        {/* Bottom gradient fade into dark */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, #0F1530 0%, rgba(15,21,48,0.6) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Text overlay on top of image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
          }}
        >
          {/* The Wedding of */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5625rem",
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cel-accent)",
              marginBottom: "1.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 1s ${ease} 0.3s, transform 1s ${ease} 0.3s`,
            }}
          >
            The Wedding of
          </p>

          {/* Names */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "2.75rem",
              fontWeight: 300,
              color: "var(--cel-text)",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              textAlign: "center",
              marginBottom: "1.5rem",
              textShadow: "0 0 30px rgba(11,16,38,0.6), 0 0 60px rgba(11,16,38,0.3)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(15px)",
              transition: `opacity 1s ${ease} 0.5s, transform 1s ${ease} 0.5s`,
            }}
          >
            Ali <span style={{ color: "var(--cel-accent)", fontWeight: 400 }}>&amp;</span> Lyla
          </h2>

          {/* Date */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.625rem",
              fontWeight: 400,
              letterSpacing: "0.18em",
              color: "var(--cel-text-dim)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 1s ${ease} 0.7s, transform 1s ${ease} 0.7s`,
            }}
          >
            05 Juli 2026
          </p>
        </div>
      </div>
    </section>
  );
}
