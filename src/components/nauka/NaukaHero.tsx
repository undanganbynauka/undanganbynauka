"use client";

import React from "react";
import Image from "next/image";
import { LineArtOrnament } from "./LineArtOrnament";

export function NaukaHero() {
  return (
    <section className="nauka-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Floating blur shapes */}
      <div className="nauka-blob-1 animate-nauka-float-slow -top-20 -right-20 md:-top-10 md:-right-10" />
      <div className="nauka-blob-2 animate-nauka-float -bottom-10 -left-10 md:bottom-20 md:left-20" />
      <div className="nauka-blob-3 animate-nauka-float-slow top-1/3 right-1/4" />

      {/* Line art ornaments */}
      <LineArtOrnament position="top-left" />
      <LineArtOrnament position="top-right" />
      <LineArtOrnament position="bottom-left" />
      <LineArtOrnament position="bottom-right" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="animate-nauka-fade-in relative h-40 w-40 md:h-52 md:w-52">
          <Image
            src="/nauka-logo.png"
            alt="Nauka Logo"
            fill
            sizes="(max-width: 768px) 160px, 208px"
            priority
            className="object-contain"
          />
        </div>

        {/* Tagline */}
        <h1
          className="animate-nauka-fade-in-delay-1 mt-4 font-serif text-2xl font-light leading-relaxed tracking-wide text-nauka-warm-700 md:text-3xl lg:text-4xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Sebuah ruang kecil
          <br />
          untuk mengantar momen
        </h1>

        {/* Decorative line */}
        <div className="animate-nauka-fade-in-delay-2 mt-6 flex items-center gap-3">
          <span className="h-px w-8 bg-nauka-gold/30 md:w-12" />
          <span className="h-1.5 w-1.5 rounded-full bg-nauka-gold/40" />
          <span className="h-px w-8 bg-nauka-gold/30 md:w-12" />
        </div>

        {/* CTA Button */}
        <button
          className="animate-nauka-fade-in-delay-3 group relative mt-6 cursor-pointer overflow-hidden rounded-full border border-nauka-warm-400/40 bg-nauka-warm-50/60 px-10 py-3.5 font-serif text-base tracking-widest text-nauka-warm-700 backdrop-blur-sm transition-all duration-500 hover:border-nauka-gold/50 hover:bg-nauka-warm-100/60 hover:tracking-[0.25em] md:text-lg"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          <span className="relative z-10">Mulai</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-nauka-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>

      {/* Bottom scroll hint */}
      <div className="animate-nauka-fade-in-delay-3 absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="h-8 w-px bg-nauka-warm-400/30" />
          <div className="h-2 w-2 rotate-45 border-b border-r border-nauka-warm-400/30" />
        </div>
      </div>
    </section>
  );
}
