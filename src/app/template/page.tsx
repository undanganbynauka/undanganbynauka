"use client";

import React, { useState, useCallback, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { DaftarIsi } from "@/components/nauka/DaftarIsi";

type Phase = "gate" | "opening" | "inside";

/* ── Hero Section (Wedding Invitation Cover) ── */
function WeddingHero({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="nauka-canvas-hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-32 pt-20">
      {/* Floating blur shapes */}
      <div className="nauka-blob-1 animate-nauka-float-slow -top-20 -right-20 md:-top-10 md:-right-10" />
      <div className="nauka-blob-2 animate-nauka-float -bottom-10 -left-10 md:bottom-20 md:left-20" />
      <div className="nauka-blob-3 animate-nauka-float-slow top-1/3 right-1/4" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Ornamental arch at top */}
        <div
          className="relative w-full max-w-[200px] md:max-w-[260px] lg:max-w-[300px]"
          style={{ height: "22vh", minHeight: "140px", maxHeight: "260px" }}
        >
          <Image
            src="/daftar-isi-arch.png"
            alt="Ornamental Arch"
            fill
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 260px, 300px"
            className="object-contain object-top"
            priority
          />
        </div>

        {/* Couple names */}
        <h1
          className="animate-nauka-fade-in mt-4 font-serif text-4xl font-light tracking-[0.2em] text-nauka-warm-700 md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Nama &amp; Nama
        </h1>

        {/* Date */}
        <p
          className="animate-nauka-fade-in-delay-1 mt-3 font-serif text-sm tracking-[0.3em] text-nauka-warm-400 md:text-base"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          07 . 2026
        </p>

        {/* Decorative line */}
        <div className="animate-nauka-fade-in-delay-2 mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-nauka-gold/30 md:w-12" />
          <span className="h-1.5 w-1.5 rounded-full bg-nauka-gold/40" />
          <span className="h-px w-8 bg-nauka-gold/30 md:w-12" />
        </div>

        {/* CTA Button */}
        <button
          onClick={onEnter}
          className="animate-nauka-fade-in-delay-3 group relative mt-8 cursor-pointer overflow-hidden rounded-full border border-nauka-warm-400/40 bg-nauka-warm-50/60 px-10 py-3.5 font-serif text-base tracking-widest text-nauka-warm-700 backdrop-blur-sm transition-all duration-500 hover:border-nauka-gold/50 hover:bg-nauka-warm-100/60 hover:tracking-[0.25em] md:text-lg"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          <span className="relative z-10">Buka Undangan</span>
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-nauka-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>
    </section>
  );
}

/* ── Placeholder Sections (to be built later) ── */
function WeddingDetails() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      id="wedding-details"
      ref={ref}
      className="nauka-canvas relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <h2
        className={`font-serif text-3xl tracking-[0.15em] text-nauka-warm-700 md:text-4xl transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        The Wedding Details
      </h2>
      <div
        className={`mt-4 flex items-center gap-3 transition-all duration-1000 delay-100 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
        <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/30" />
        <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
      </div>
      <p
        className={`mt-6 font-serif text-sm tracking-widest text-nauka-warm-400 md:text-base transition-all duration-1000 delay-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Informasi acara &amp; lokasi akan ditampilkan di sini
      </p>
    </section>
  );
}

function OurStory() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
      id="our-story"
      ref={ref}
      className="nauka-canvas relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <h2
        className={`font-serif text-3xl tracking-[0.15em] text-nauka-warm-700 md:text-4xl transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Our Story
      </h2>
      <div
        className={`mt-4 flex items-center gap-3 transition-all duration-1000 delay-100 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
        <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/30" />
        <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
      </div>
      <p
        className={`mt-6 font-serif text-sm tracking-widest text-nauka-warm-400 md:text-base transition-all duration-1000 delay-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Cerita perjalanan kami akan ditampilkan di sini
      </p>
    </section>
  );
}

/* ── Template Page Content (uses useSearchParams, needs Suspense) ── */
function TemplatePageContent() {
  const [phase, setPhase] = useState<Phase>("gate");
  const searchParams = useSearchParams();
  const jalur = searchParams.get("jalur") || "universal";

  const handleEnter = useCallback(() => {
    setPhase("opening");
    setTimeout(() => setPhase("inside"), 1600);
  }, []);

  const isGateVisible = phase === "gate" || phase === "opening";

  return (
    <main className="nauka-page-bg relative min-h-screen">
      {/* Paper grain overlay */}
      <div className="nauka-page-grain pointer-events-none fixed inset-0 z-0" />

      {/* Floating ambient shapes */}
      <div className="nauka-blob-1 animate-nauka-float-slow fixed -top-20 -right-20 z-0" />
      <div className="nauka-blob-2 animate-nauka-float-slow fixed -bottom-20 -left-20 z-0" />
      <div className="nauka-blob-3 animate-nauka-float fixed top-1/3 right-1/4 z-0" />

      {/* Content sections — scrollable */}
      <div className="relative z-10">
        {/* Daftar Isi — first section after hero opens */}
        <DaftarIsi visible={phase === "inside"} />

        {/* Wedding Details section */}
        <WeddingDetails />

        {/* Our Story section */}
        <OurStory />
      </div>

      {/* HERO GATE — covers content until user clicks "Buka Undangan" */}
      {isGateVisible && (
        <div
          className={`fixed inset-0 z-50 bg-[#FAF7F2] ${
            phase === "opening" ? "animate-gate-open" : ""
          }`}
        >
          <WeddingHero onEnter={handleEnter} />
        </div>
      )}
    </main>
  );
}

/* ── Template Page (Suspense wrapper for useSearchParams) ── */
export default function TemplatePage() {
  return (
    <Suspense>
      <TemplatePageContent />
    </Suspense>
  );
}
