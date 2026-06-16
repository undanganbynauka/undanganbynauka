"use client";

import React, { useEffect, useRef, useState } from "react";

export function NaukaMockup() {
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

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

        {/* Phone frame with video */}
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
              background: "#0B1120",
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
                background: "rgba(0,0,0,0.4)",
                zIndex: 2,
              }}
            />

            {/* Celestial video */}
            <video
              ref={videoRef}
              src="/etalase/celestial-preview.mp4"
              muted
              loop
              playsInline
              preload="auto"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
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
