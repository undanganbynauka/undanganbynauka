"use client";

import React, { useEffect, useRef, useState } from "react";

const points = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Ramah & Tenang",
    desc: "Suara default mati — undangan yang dibuka tidak mengejutkan siapa pun.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Tampilan Berbeda",
    desc: "Animasi sinematik dan desain yang tidak akan kamu temui di undangan lain.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Tanpa Foto, Tetap Elegan",
    desc: "Desain murni visual — tidak perlu upload foto, hasilnya sudah indah.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Semua Dikurasi",
    desc: "Nasyid, animasi, desain — sudah dipilihkan yang terbaik. Tidak perlu repot.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: "Satu Link, Semua Tamu",
    desc: "Bagikan satu tautan — semua tamu bisa menerima undangan secara langsung.",
  },
];

export function NaukaKenapa() {
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
      <div className="mx-auto max-w-4xl">
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
          Kenapa Nauka?
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

        {/* Points grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => (
            <div
              key={i}
              className="group rounded-xl border border-[#c9a96e]/10 bg-[#0f0f0f] p-6 transition-all duration-500 hover:border-[#c9a96e]/25 hover:bg-[#111111]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.7s ease ${0.15 + i * 0.1}s, transform 0.7s ease ${0.15 + i * 0.1}s`,
              }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-[#c9a96e]/15 bg-[#c9a96e]/5 text-[#c9a96e]">
                {point.icon}
              </div>
              <h3
                className="mb-2 text-lg font-medium tracking-wide text-[#f5f0e8]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#8a8578]">
                {point.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
