"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function NaukaGerbang() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
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
            ? "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, transparent 35%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      {/* Main content — vertical center */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[520px]">

        {/* LOGO */}
        <div
          style={{
            width: "84px",
            opacity: loaded ? 0.9 : 0,
            transform: loaded ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
          }}
        >
          <div className="relative md:!w-[104px]" style={{ width: "84px" }}>
            <div className="relative" style={{ width: "84px", height: "28px" }}>
              <Image
                src="/nauka-logo-new.png"
                alt="Nauka"
                fill
                sizes="84px"
                priority
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
              />
            </div>
            <div className="relative hidden md:block" style={{ width: "104px", height: "34px" }}>
              <Image
                src="/nauka-logo-new.png"
                alt="Nauka"
                fill
                sizes="104px"
                priority
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
              />
            </div>
          </div>
        </div>

        {/* TAGLINE */}
        <p
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "26px",
            fontWeight: 400,
            lineHeight: 1.45,
            letterSpacing: "0.02em",
            color: "rgba(255,255,255,0.92)",
            maxWidth: "460px",
            marginTop: "30px",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.4s ease-out 0.3s, transform 1.4s ease-out 0.3s",
          }}
          className="md:!text-[32px]"
        >
          Langkah awal menuju momen bahagia
        </p>

        {/* EMPTY SPACE — dominant breathing room */}
        <div style={{ height: "160px" }} className="md:!h-[180px]" />

        {/* GATE TITLE */}
        <p
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.72)",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.3s ease-out 0.6s",
          }}
          className="md:!text-[22px]"
        >
          Pilih Jalur Anda
        </p>

        {/* CARDS */}
        <div
          className="mt-6 flex w-full flex-col gap-3 md:mt-[24px] md:flex-row md:gap-4"
          style={{ maxWidth: "420px" }}
        >
          {/* Syar'i Collection */}
          <Link
            href="/sacred"
            className="block w-full"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1.3s ease-out 0.8s, transform 1.3s ease-out 0.8s",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.3s ease-out, transform 0.3s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Syar&apos;i Collection
              </span>
            </div>
          </Link>

          {/* Universal Collection */}
          <Link
            href="/celestial"
            className="block w-full"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 1.3s ease-out 0.95s, transform 1.3s ease-out 0.95s",
            }}
          >
            <div
              style={{
                padding: "18px 24px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.3s ease-out, transform 0.3s ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Universal Collection
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
