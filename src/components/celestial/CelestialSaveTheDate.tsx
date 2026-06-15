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
        background: "#0F1530",
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full viewport image */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Image — 100% width & height, cover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/celestial/save-the-date.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: visible ? 1 : 0,
            transition: `opacity 1.5s ${ease}`,
          }}
        />

        {/* Dark overlay — dim the image slightly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(11, 16, 38, 0.35)",
            opacity: visible ? 1 : 0,
            transition: `opacity 1.5s ${ease} 0.2s`,
          }}
        />

        {/* Bottom gradient fade into next section */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "35%",
            background: "linear-gradient(to top, #0F1530 0%, rgba(15,21,48,0.5) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Text — bottom right corner */}
        <div
          style={{
            position: "absolute",
            bottom: "3rem",
            right: "1.5rem",
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {/* The Wedding of */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5rem",
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cel-accent)",
              marginBottom: "0.875rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 1s ${ease} 0.3s, transform 1s ${ease} 0.3s`,
            }}
          >
            The Wedding of
          </p>

          {/* Names */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "2.5rem",
              fontWeight: 300,
              color: "var(--cel-text)",
              letterSpacing: "0.03em",
              lineHeight: 1.1,
              textAlign: "right",
              marginBottom: "0.875rem",
              textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(11,16,38,0.4)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 1s ${ease} 0.5s, transform 1s ${ease} 0.5s`,
            }}
          >
            Ali <span style={{ color: "var(--cel-accent)", fontWeight: 400 }}>&amp;</span> Lyla
          </h2>

          {/* Date */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5625rem",
              fontWeight: 400,
              letterSpacing: "0.18em",
              color: "var(--cel-text-dim)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
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
