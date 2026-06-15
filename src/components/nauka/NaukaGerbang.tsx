"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export function NaukaGerbang() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Subtle radial gold glow behind logo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: loaded
            ? "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(201,169,110,0.08) 0%, transparent 70%)"
            : "none",
          transition: "background 2s ease",
        }}
      />

      {/* Faint grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <div
          className="relative h-16 w-44 md:h-24 md:w-64 lg:h-28 lg:w-72"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 1.4s ease, transform 1.4s ease",
          }}
        >
          <Image
            src="/nauka-logo-new.png"
            alt="Nauka"
            fill
            sizes="(max-width: 768px) 176px, (max-width: 1024px) 256px, 288px"
            priority
            className="object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-6 text-base font-light leading-relaxed tracking-[0.08em] text-[#8a8578] md:text-lg lg:text-xl"
          style={{
            fontFamily: "var(--font-cormorant)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 1.4s ease 0.4s, transform 1.4s ease 0.4s",
          }}
        >
          Menghadirkan keindahan dalam kesederhanaan
        </p>

        {/* Gold line separator */}
        <div
          className="mt-8 flex items-center gap-3"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease 0.8s",
          }}
        >
          <span className="h-px w-10 bg-[#c9a96e]/25 md:w-14" />
          <span className="h-1 w-1 rounded-full bg-[#c9a96e]/40" />
          <span className="h-px w-10 bg-[#c9a96e]/25 md:w-14" />
        </div>

        {/* Scroll hint */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease 1.2s",
          }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8a8578]/60">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-[#c9a96e]/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
