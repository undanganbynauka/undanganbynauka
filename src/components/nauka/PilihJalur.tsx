"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface PilihJalurProps {
  visible?: boolean;
}

export function PilihJalur({ visible: forceVisible }: PilihJalurProps) {
  const [scrolledVisible, setScrolledVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<"universal" | "syari" | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrolledVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const visible = forceVisible ?? scrolledVisible;

  const handleSelectJalur = (jalur: "universal" | "syari") => {
    router.push(`/template?jalur=${jalur}`);
  };

  return (
    <section
      ref={sectionRef}
      className="nauka-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 md:py-32"
    >
      {/* Section label */}
      <span
        className={`mb-10 font-serif text-2xl tracking-[0.2em] text-nauka-warm-400 transition-all duration-1000 md:mb-14 md:text-3xl lg:text-4xl ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Pilih Jalur Undangan
      </span>

      {/* Cards */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 md:flex-row md:gap-10">
        {/* Universal Card */}
        <div
          onClick={() => handleSelectJalur("universal")}
          onMouseEnter={() => setHoveredCard("universal")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group flex flex-1 cursor-pointer flex-col items-center rounded-2xl border border-nauka-warm-300/30 bg-nauka-warm-50/40 px-8 py-12 text-center backdrop-blur-sm transition-all duration-500 md:px-10 md:py-14 ${
            hoveredCard === "universal"
              ? "scale-[1.02] border-nauka-gold/30 shadow-lg shadow-nauka-gold/5"
              : hoveredCard === "syari"
              ? "scale-[0.98] opacity-60"
              : ""
          } ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Title */}
          <h3
            className="mb-5 font-serif text-2xl tracking-wider text-nauka-warm-700 md:text-3xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Universal
          </h3>

          {/* Ornament line */}
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
            <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/30" />
            <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
          </div>

          {/* Visual character */}
          <div className="mb-8 space-y-1.5">
            <span
              className="block font-serif text-xs tracking-widest uppercase text-nauka-warm-400"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Visual
            </span>
            <p
              className="font-serif text-sm font-light tracking-wide text-nauka-warm-500 md:text-base"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Hangat · Fleksibel · Ekspresif
            </p>
          </div>

          {/* Masuk button */}
          <span
            className="rounded-full border border-nauka-warm-400/30 bg-nauka-warm-50/60 px-8 py-2.5 font-serif text-sm tracking-widest text-nauka-warm-600 backdrop-blur-sm transition-all duration-500 group-hover:border-nauka-gold/40 group-hover:bg-nauka-warm-100/60 group-hover:text-nauka-warm-700 group-hover:tracking-[0.2em]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Masuk
          </span>
        </div>

        {/* Syar'i Card */}
        <div
          onClick={() => handleSelectJalur("syari")}
          onMouseEnter={() => setHoveredCard("syari")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group flex flex-1 cursor-pointer flex-col items-center rounded-2xl border border-nauka-warm-300/30 bg-nauka-warm-50/40 px-8 py-12 text-center backdrop-blur-sm transition-all duration-500 md:px-10 md:py-14 ${
            hoveredCard === "syari"
              ? "scale-[1.02] border-nauka-gold/30 shadow-lg shadow-nauka-gold/5"
              : hoveredCard === "universal"
              ? "scale-[0.98] opacity-60"
              : ""
          } ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "0.4s" }}
        >
          {/* Title */}
          <h3
            className="mb-5 font-serif text-2xl tracking-wider text-nauka-warm-700 md:text-3xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Syar&apos;i
          </h3>

          {/* Ornament line */}
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
            <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/30" />
            <span className="h-px w-6 bg-nauka-gold/20 md:w-8" />
          </div>

          {/* Visual character */}
          <div className="mb-8 space-y-1.5">
            <span
              className="block font-serif text-xs tracking-widest uppercase text-nauka-warm-400"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Visual
            </span>
            <p
              className="font-serif text-sm font-light tracking-wide text-nauka-warm-500 md:text-base"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Tenang · Minimal · Terjaga
            </p>
          </div>

          {/* Masuk button */}
          <span
            className="rounded-full border border-nauka-warm-400/30 bg-nauka-warm-50/60 px-8 py-2.5 font-serif text-sm tracking-widest text-nauka-warm-600 backdrop-blur-sm transition-all duration-500 group-hover:border-nauka-gold/40 group-hover:bg-nauka-warm-100/60 group-hover:text-nauka-warm-700 group-hover:tracking-[0.2em]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Masuk
          </span>
        </div>
      </div>
    </section>
  );
}
