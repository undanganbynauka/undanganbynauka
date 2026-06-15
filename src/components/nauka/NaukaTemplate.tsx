"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const templates = [
  {
    id: "syari",
    label: "Syar'i",
    tagline: "Tenang · Minimal · Terjaga",
    desc: "Nuansa islami yang sopan dan menyejukkan. Dilengkapi nasyid pilihan dan doa-doa penuh keberkahan.",
    route: "/sacred",
    preview: "/sacred/arch.png",
    accent: "#c9a96e",
  },
  {
    id: "universal",
    label: "Universal",
    tagline: "Hangat · Fleksibel · Ekspresif",
    desc: "Cocok untuk semua kalangan. Desain yang elegan tanpa batasan afiliasi — indah untuk siapa saja.",
    route: "/celestial",
    preview: "/celestial/moon.png",
    accent: "#7ba7cc",
  },
];

export function NaukaTemplate() {
  const [visible, setVisible] = useState(false);
  const [activeTier, setActiveTier] = useState<Record<string, "basic" | "premium">>({
    syari: "basic",
    universal: "basic",
  });
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
      className="relative bg-[#070707] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
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
          Pilih Templat
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

        {/* Template cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {templates.map((tpl, i) => (
            <div
              key={tpl.id}
              className="group relative overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] transition-all duration-500 hover:border-[#c9a96e]/20"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.8s ease ${0.2 + i * 0.15}s, transform 0.8s ease ${0.2 + i * 0.15}s`,
              }}
            >
              {/* Preview area */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-b from-[#111] to-[#0a0a0a] md:h-56">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tpl.preview}
                    alt={tpl.label}
                    className="h-32 w-auto object-contain opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-80 md:h-40"
                  />
                </div>
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Label + Tagline */}
                <div className="mb-3 flex items-center gap-3">
                  <h3
                    className="text-2xl tracking-wider text-[#f5f0e8] md:text-3xl"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {tpl.label}
                  </h3>
                  <span className="text-xs tracking-[0.15em] text-[#8a8578]">
                    {tpl.tagline}
                  </span>
                </div>

                <p className="mb-6 text-sm leading-relaxed text-[#8a8578]">
                  {tpl.desc}
                </p>

                {/* Basic / Premium toggle */}
                <div className="mb-6 flex rounded-lg border border-[#1a1a1a] bg-[#0a0a0a] p-1">
                  {(["basic", "premium"] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() =>
                        setActiveTier((prev) => ({ ...prev, [tpl.id]: tier }))
                      }
                      className={`flex-1 rounded-md py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                        activeTier[tpl.id] === tier
                          ? "bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/20"
                          : "text-[#8a8578]/60 hover:text-[#8a8578]"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-3xl font-light text-[#f5f0e8]" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {activeTier[tpl.id] === "basic" ? "75rb" : "99rb"}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={tpl.route}
                  className="inline-flex items-center gap-2 rounded-full border border-[#c9a96e]/20 bg-[#c9a96e]/5 px-6 py-2.5 text-sm tracking-widest text-[#c9a96e] transition-all duration-500 hover:border-[#c9a96e]/40 hover:bg-[#c9a96e]/10 hover:tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Lihat Contoh
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
