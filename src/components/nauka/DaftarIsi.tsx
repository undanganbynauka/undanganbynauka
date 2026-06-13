"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DaftarIsiProps {
  visible?: boolean;
}

export function DaftarIsi({ visible: forceVisible }: DaftarIsiProps) {
  const [scrolledVisible, setScrolledVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<"details" | "story" | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleSelectSection = (section: "details" | "story") => {
    const targetId = section === "details" ? "wedding-details" : "our-story";
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="daftar-isi"
      className="nauka-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 md:py-24"
    >
      {/* Arch ornament — centered at top */}
      <div
        className={`relative w-full max-w-xs md:max-w-sm lg:max-w-md transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
        style={{ height: "28vh", minHeight: "180px", maxHeight: "320px" }}
      >
        <Image
          src="/daftar-isi-arch.png"
          alt="Ornamental Arch"
          fill
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
          className="object-contain object-top"
          priority
        />
      </div>

      {/* Title */}
      <h1
        className={`mt-6 md:mt-10 font-serif text-3xl font-light tracking-[0.15em] text-nauka-warm-700 md:text-4xl lg:text-5xl transition-all duration-1000 delay-100 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Choose Your Journey
      </h1>

      {/* Subtitle */}
      <p
        className={`mt-3 md:mt-4 font-serif text-sm font-light tracking-widest text-nauka-warm-400 md:text-base lg:text-lg transition-all duration-1000 delay-200 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Setiap perjalanan memiliki cerita.
      </p>

      {/* Ornament divider */}
      <div
        className={`mt-8 md:mt-10 flex items-center gap-3 transition-all duration-1000 delay-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span className="h-px w-8 bg-nauka-warm-300/40 md:w-12" />
        <span className="h-1 w-1 rounded-full bg-nauka-gold/30" />
        <span className="h-px w-8 bg-nauka-warm-300/40 md:w-12" />
      </div>

      {/* Two cards */}
      <div
        className={`mt-8 md:mt-10 flex w-full max-w-xl flex-col items-center gap-5 md:flex-row md:gap-8 transition-all duration-1000 delay-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        {/* The Wedding Details Card */}
        <div
          onClick={() => handleSelectSection("details")}
          onMouseEnter={() => setHoveredCard("details")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group flex flex-1 cursor-pointer flex-col items-center rounded-sm border border-nauka-warm-300/40 bg-transparent px-8 py-10 text-center transition-all duration-500 md:px-10 md:py-14 ${
            hoveredCard === "details"
              ? "border-nauka-gold/50 bg-nauka-warm-50/30"
              : hoveredCard === "story"
              ? "opacity-50"
              : ""
          }`}
        >
          {/* Small icon accent */}
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-4 bg-nauka-gold/25 md:w-6" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-nauka-warm-400"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="h-px w-4 bg-nauka-gold/25 md:w-6" />
          </div>

          {/* Card title */}
          <h3
            className="font-serif text-xl tracking-[0.12em] text-nauka-warm-700 md:text-2xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The Wedding Details
          </h3>

          {/* Ornament line */}
          <div className="mt-4 mb-5 flex items-center gap-2">
            <span className="h-px w-5 bg-nauka-gold/20 md:w-8" />
            <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/30" />
            <span className="h-px w-5 bg-nauka-gold/20 md:w-8" />
          </div>

          {/* Card description */}
          <p
            className="font-serif text-xs font-light tracking-widest text-nauka-warm-400 md:text-sm"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Informasi acara &amp; lokasi
          </p>
        </div>

        {/* Our Story Card */}
        <div
          onClick={() => handleSelectSection("story")}
          onMouseEnter={() => setHoveredCard("story")}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group flex flex-1 cursor-pointer flex-col items-center rounded-sm border border-nauka-warm-300/40 bg-transparent px-8 py-10 text-center transition-all duration-500 md:px-10 md:py-14 ${
            hoveredCard === "story"
              ? "border-nauka-gold/50 bg-nauka-warm-50/30"
              : hoveredCard === "details"
              ? "opacity-50"
              : ""
          }`}
        >
          {/* Small icon accent */}
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-4 bg-nauka-gold/25 md:w-6" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-nauka-warm-400"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="h-px w-4 bg-nauka-gold/25 md:w-6" />
          </div>

          {/* Card title */}
          <h3
            className="font-serif text-xl tracking-[0.12em] text-nauka-warm-700 md:text-2xl"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Our Story
          </h3>

          {/* Ornament line */}
          <div className="mt-4 mb-5 flex items-center gap-2">
            <span className="h-px w-5 bg-nauka-gold/20 md:w-8" />
            <span className="h-0.5 w-0.5 rounded-full bg-nauka-gold/30" />
            <span className="h-px w-5 bg-nauka-gold/20 md:w-8" />
          </div>

          {/* Card description */}
          <p
            className="font-serif text-xs font-light tracking-widest text-nauka-warm-400 md:text-sm"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Cerita perjalanan kami
          </p>
        </div>
      </div>
    </section>
  );
}
