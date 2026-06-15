"use client";

import React, { useEffect, useRef, useState } from "react";

const features = [
  {
    name: "Doa & Ucapan",
    basic: "Maks. 20 orang",
    premium: "Tanpa batas",
    highlight: true,
  },
  {
    name: "Masa Aktif",
    basic: "H+30",
    premium: "H+90",
  },
  {
    name: "Input Tamu",
    basic: "Isi sendiri",
    premium: "Isi sendiri / Terima jadi",
  },
  {
    name: "BGM",
    basic: "Default",
    premium: "Library pilihan",
  },
  {
    name: "Custom URL",
    basic: "nauka.id/inv/abc123",
    premium: "nauka.id/nama-pasangan",
  },
  {
    name: "RSVP",
    basic: "✓",
    premium: "✓",
  },
  {
    name: "Amplop Digital",
    basic: "✓",
    premium: "✓",
  },
  {
    name: "Jumlah Tamu",
    basic: "Tanpa batas",
    premium: "Tanpa batas",
  },
  {
    name: "Support",
    basic: "WhatsApp",
    premium: "Prioritas + revisi minor",
  },
  {
    name: "Analitik",
    basic: "—",
    premium: "✓",
    highlight: true,
  },
];

export function NaukaHarga() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[#0a0a0a] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        {/* Section heading — shimmer */}
        <h2
          className={`nauka-shimmer mb-4 text-center text-2xl tracking-[0.15em] md:text-3xl lg:text-4xl ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            fontFamily: "var(--font-cormorant)",
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          Harga
        </h2>
        <div
          className="mx-auto mb-14 flex items-center justify-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          <span className="h-px w-8 nauka-line-shimmer" />
          <span className="nauka-breathe h-1 w-1 rounded-full bg-[#c9a96e]/50" />
          <span className="h-px w-8 nauka-line-shimmer" />
        </div>

        {/* Price cards */}
        <div
          className="mb-12 grid gap-6 md:grid-cols-2"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          {/* Basic */}
          <div className="rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-8 text-center transition-all duration-500 hover:border-[#8a8578]/20">
            <span className="text-xs tracking-[0.2em] uppercase text-[#8a8578]">
              Basic
            </span>
            <div className="mt-3">
              <span
                className="inline-block text-4xl font-light text-[#f5f0e8] md:text-5xl"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  animation: visible ? "nauka-price-in 0.8s ease 0.5s both" : "none",
                }}
              >
                75rb
              </span>
            </div>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border border-[#c9a96e]/20 bg-[#0c0c0c] p-8 text-center transition-all duration-500 hover:border-[#c9a96e]/35 hover:shadow-[0_0_30px_rgba(201,169,110,0.06)]">
            <span className="nauka-breathe absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c9a96e]/10 px-4 py-1 text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] border border-[#c9a96e]/15">
              Rekomendasi
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#8a8578]">
              Premium
            </span>
            <div className="mt-3">
              <span
                className="nauka-shimmer inline-block text-4xl font-light md:text-5xl"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  animation: visible ? "nauka-price-in 0.8s ease 0.7s both" : "none",
                }}
              >
                99rb
              </span>
            </div>
          </div>
        </div>

        {/* Comparison table */}
        <div
          className="overflow-hidden rounded-xl border border-[#1a1a1a] bg-[#0c0c0c]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}
        >
          {/* Table header */}
          <div className="grid grid-cols-3 border-b border-[#1a1a1a] bg-[#0a0a0a] px-5 py-3">
            <span className="text-xs tracking-[0.1em] uppercase text-[#8a8578]">Fitur</span>
            <span className="text-center text-xs tracking-[0.1em] uppercase text-[#8a8578]">Basic</span>
            <span className="text-center text-xs tracking-[0.1em] uppercase text-[#c9a96e]">Premium</span>
          </div>
          {/* Rows */}
          {features.map((feat, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-5 py-3 transition-colors duration-300 hover:bg-[#111] ${
                i < features.length - 1 ? "border-b border-[#1a1a1a]" : ""
              } ${feat.highlight ? "bg-[#c9a96e]/[0.03]" : ""}`}
            >
              <span className="text-sm text-[#f5f0e8]/80">{feat.name}</span>
              <span className="text-center text-sm text-[#8a8578]">{feat.basic}</span>
              <span className="text-center text-sm text-[#c9a96e]/80">{feat.premium}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
