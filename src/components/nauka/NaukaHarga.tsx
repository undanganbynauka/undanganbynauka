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
        {/* Section heading */}
        <h2
          className="mb-4 text-center text-2xl tracking-[0.15em] text-[#f5f0e8] md:text-3xl lg:text-4xl"
          style={{
            fontFamily: "var(--font-cormorant)",
            opacity: visible ? 1 : 0,
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
          <span className="h-px w-8 bg-[#c9a96e]/25" />
          <span className="h-1 w-1 rounded-full bg-[#c9a96e]/40" />
          <span className="h-px w-8 bg-[#c9a96e]/25" />
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
          <div className="rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] p-8 text-center">
            <span className="text-xs tracking-[0.2em] uppercase text-[#8a8578]">
              Basic
            </span>
            <div className="mt-3">
              <span
                className="text-4xl font-light text-[#f5f0e8] md:text-5xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                75rb
              </span>
            </div>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border border-[#c9a96e]/20 bg-[#0c0c0c] p-8 text-center">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#c9a96e]/10 px-4 py-1 text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] border border-[#c9a96e]/15">
              Rekomendasi
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#8a8578]">
              Premium
            </span>
            <div className="mt-3">
              <span
                className="text-4xl font-light text-[#c9a96e] md:text-5xl"
                style={{ fontFamily: "var(--font-cormorant)" }}
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
              className={`grid grid-cols-3 px-5 py-3 ${
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
