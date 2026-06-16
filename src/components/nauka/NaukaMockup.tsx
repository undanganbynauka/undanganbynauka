"use client";

import React, { useEffect, useRef, useState } from "react";

export function NaukaMockup() {
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
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0B1120 100%)",
        padding: "60px 24px 80px",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(180deg, rgba(147,130,200,0.015) 0%, transparent 40%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div
        className="relative z-10 mx-auto flex flex-col items-center text-center"
        style={{ maxWidth: "480px" }}
      >
        {/* Small label */}
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.30)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out, transform 1.3s ease-out",
          }}
        >
          Sekilas Hasil
        </span>

        {/* Phone frame */}
        <div
          style={{
            marginTop: "28px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.4s ease-out 0.2s, transform 1.4s ease-out 0.2s",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "400px",
              borderRadius: "28px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "linear-gradient(160deg, #111827 0%, #1e1b3a 55%, #0f172a 100%)",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
            }}
          >
            {/* Notch */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "48px",
                height: "6px",
                borderRadius: "100px",
                background: "rgba(255,255,255,0.06)",
              }}
            />

            {/* Screen content — Celestial style */}
            <div
              style={{
                position: "absolute",
                inset: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                gap: "12px",
              }}
            >
              {/* Ambient accent */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at 50% 20%, rgba(147,130,200,0.08) 0%, transparent 60%)",
                }}
              />

              {/* Diamond ornament */}
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  border: "1px solid rgba(147,130,200,0.18)",
                  transform: "rotate(45deg)",
                  opacity: 0.7,
                }}
              />

              {/* Template name */}
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "16px",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  color: "rgba(255,255,255,0.65)",
                  textTransform: "uppercase",
                }}
              >
                Celestial
              </span>

              {/* Simulated names */}
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.40)",
                  marginTop: "8px",
                }}
              >
                Ahmad & Fatimah
              </span>

              {/* Simulated divider */}
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "rgba(255,255,255,0.12)",
                  margin: "4px 0",
                }}
              />

              {/* Simulated date */}
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "8px",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase",
                }}
              >
                12 . 06 . 2026
              </span>
            </div>
          </div>
        </div>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.30)",
            marginTop: "24px",
            maxWidth: "260px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.3s ease-out 0.4s, transform 1.3s ease-out 0.4s",
          }}
        >
          Tampilan nyata undangan digital Anda
        </p>
      </div>
    </section>
  );
}
