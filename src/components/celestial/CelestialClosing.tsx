"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialClosing() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
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

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1300),
      setTimeout(() => setStep(4), 1800),
      setTimeout(() => setStep(5), 2400),
      setTimeout(() => setStep(6), 3000),
      setTimeout(() => setStep(7), 3600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="celestial-section"
      style={{
        position: "relative",
        padding: 0,
        minHeight: "100vh",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image — same as cover/save-the-date */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/celestial/cover.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: visible ? 1 : 0,
          transition: `opacity 1.8s ${ease}`,
        }}
      />

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11,16,38,0.55) 0%, rgba(11,16,38,0.40) 30%, rgba(11,16,38,0.50) 60%, rgba(11,16,38,0.80) 100%)",
          opacity: visible ? 1 : 0,
          transition: `opacity 1.8s ${ease} 0.2s`,
        }}
      />

      {/* Top gradient fade from previous section */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(to bottom, #0F1530 0%, rgba(15,21,48,0.5) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: "20rem",
          padding: "5rem 1.5rem 3rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Moon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #F5E6C8 0%, rgba(201, 169, 110, 0.3) 70%, transparent 100%)",
            boxShadow: "0 0 30px rgba(201, 169, 110, 0.15)",
            margin: "0 auto 2rem",
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "scale(1)" : "scale(0.8)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
          }}
        />

        {/* Quote */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1rem",
            fontWeight: 400,
            fontStyle: "italic",
            color: "var(--cel-text)",
            lineHeight: 2,
            textAlign: "center",
            marginBottom: "0.75rem",
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
            letterSpacing: "0.02em",
            textShadow: "0 2px 15px rgba(0,0,0,0.4)",
          }}
        >
          &ldquo;Cinta bukan tentang saling memandang, tetapi tentang melihat ke
          arah yang sama.&rdquo;
        </p>

        {/* Author */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            color: "var(--cel-accent)",
            lineHeight: 1.8,
            marginBottom: "2rem",
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
            letterSpacing: "0.08em",
            textShadow: "0 1px 10px rgba(0,0,0,0.3)",
          }}
        >
          &mdash; Antoine de Saint-Exup&eacute;ry
        </p>

        {/* Divider */}
        <div
          className="celestial-divider"
          style={{ justifyContent: "center", marginBottom: "2rem" }}
        >
          <div
            className="celestial-divider-line"
            style={{
              opacity: step >= 5 ? 0.4 : 0,
              transition: "opacity 0.8s ease",
            }}
          />
          <span
            style={{
              color: "var(--cel-accent)",
              fontSize: "0.625rem",
              opacity: step >= 5 ? 0.5 : 0,
              transition: "opacity 0.6s ease 0.3s",
            }}
          >
            ♥
          </span>
          <div
            className="celestial-divider-line"
            style={{
              opacity: step >= 5 ? 0.4 : 0,
              transition: "opacity 0.8s ease",
            }}
          />
        </div>

        {/* Names */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.625rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          Ali <span style={{ color: "var(--cel-accent)" }}>&amp;</span> Lyla
        </p>

        {/* Date */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5625rem",
            fontWeight: 400,
            color: "var(--cel-text-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            opacity: step >= 6 ? 0.6 : 0,
            transition: "opacity 1s ease",
          }}
        >
          05 Juli 2026
        </p>

        {/* Nauka Logo */}
        <div
          style={{
            opacity: step >= 7 ? 0.5 : 0,
            transform: step >= 7 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
          }}
        >
          <img
            src="/nauka-logo-new.png"
            alt="Undangan by Nauka"
            style={{
              width: "5rem",
              height: "auto",
              filter: "brightness(0.8) grayscale(0.2)",
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </section>
  );
}
