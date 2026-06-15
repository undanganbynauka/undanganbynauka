"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function NaukaGerbang() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="nauka-grain relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)" }}
    >
      {/* Ambient glow — top only */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: loaded
            ? "linear-gradient(180deg, rgba(201,169,110,0.035) 0%, transparent 40%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          }}
        >
          <div className="relative h-14 w-[176px] md:h-[72px] md:w-[240px]">
            <Image
              src="/nauka-logo-new.png"
              alt="Nauka"
              fill
              sizes="(max-width: 768px) 176px, 240px"
              priority
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>

        {/* Tagline */}
        <p
          className="mt-6 md:mt-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "26px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "rgba(255,255,255,0.72)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1.4s ease-out 0.35s, transform 1.4s ease-out 0.35s",
          }}
        >
          Langkah awal menuju momen bahagia
        </p>

        {/* Negative space */}
        <div style={{ height: "120px" }} />

        {/* Scroll indicator */}
        <div
          className="flex flex-col items-center gap-3"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.8s",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "11px",
              letterSpacing: "0.28em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)",
              animation: "nauka-scroll-float 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
