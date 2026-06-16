"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function NaukaFooter() {
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
    <footer
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #080d1a 100%)",
        padding: "80px 24px 48px",
      }}
    >
      {/* Ambient glow — very subtle bottom warmth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(0deg, rgba(201,169,110,0.012) 0%, transparent 40%)"
            : "none",
          transition: "background 2s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[520px] text-center">
        {/* Closing tagline */}
        <p
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "20px",
            fontWeight: 400,
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.55)",
            fontStyle: "italic",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.6s ease-out, transform 1.6s ease-out",
          }}
          className="md:!text-[24px]"
        >
          Dirancang dengan tenang, untuk dikenang.
        </p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.06)",
            margin: "48px auto",
            maxWidth: "60px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.4s ease-out 0.3s",
          }}
        />

        {/* Logo — small, quiet */}
        <div
          style={{
            width: "56px",
            height: "19px",
            margin: "0 auto",
            opacity: visible ? 0.5 : 0,
            transition: "opacity 1.6s ease-out 0.4s",
          }}
        >
          <div className="relative" style={{ width: "56px", height: "19px" }}>
            <Image
              src="/nauka-logo-new.png"
              alt="Nauka"
              fill
              sizes="56px"
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Contact — minimal */}
        <div
          style={{
            marginTop: "24px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.55s",
          }}
        >
          <a
            href="https://wa.me/6289655592925"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.25)",
              textDecoration: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
          >
            wa.me/6289655592925
          </a>
        </div>

        {/* Copyright — very muted */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.15)",
            marginTop: "20px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.65s",
          }}
        >
          Nauka &copy; 2026
        </p>
      </div>
    </footer>
  );
}
