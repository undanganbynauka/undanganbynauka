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
  },
  {
    id: "universal",
    label: "Universal",
    tagline: "Hangat · Fleksibel · Ekspresif",
    desc: "Cocok untuk semua kalangan. Desain yang elegan tanpa batasan afiliasi — indah untuk siapa saja.",
    route: "/celestial",
    preview: "/celestial/moon.png",
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
      className="nauka-grain relative"
      style={{
        background: "#111827",
        padding: "90px 24px",
      }}
    >
      {/* Ambient glow — top right corner */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(225deg, rgba(201,169,110,0.025) 0%, transparent 50%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[960px]">
        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "28px",
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.92)",
            textAlign: "center",
            marginBottom: "12px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
        >
          Pilih Templat
        </h2>

        {/* Divider */}
        <div
          className="mx-auto mb-14 flex items-center justify-center gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.2s",
          }}
        >
          <span style={{ height: "1px", width: "32px", background: "rgba(255,255,255,0.18)" }} />
          <span style={{
            height: "3px",
            width: "3px",
            borderRadius: "50%",
            background: "rgba(201,169,110,0.6)",
            animation: "nauka-breathe 3s ease-in-out infinite",
          }} />
          <span style={{ height: "1px", width: "32px", background: "rgba(255,255,255,0.18)" }} />
        </div>

        {/* Template cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {templates.map((tpl, i) => (
            <div
              key={tpl.id}
              className="group"
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                overflow: "hidden",
                transition: "border-color 0.5s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${0.2 + i * 0.15}s`,
                transitionProperty: "opacity, transform, border-color",
                transitionDuration: "1.4s, 1.4s, 0.5s",
                transitionTimingFunction: "ease-out",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              {/* Preview area */}
              <div
                style={{
                  height: "200px",
                  background: "linear-gradient(180deg, #111827 0%, #0B1120 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tpl.preview}
                  alt={tpl.label}
                  style={{
                    height: "120px",
                    width: "auto",
                    objectFit: "contain",
                    opacity: 0.5,
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  background: "linear-gradient(transparent, rgba(17,24,39,0.9))",
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: "28px" }}>
                {/* Label + Tagline */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "12px" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "24px",
                      fontWeight: 400,
                      letterSpacing: "0.06em",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {tpl.label}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "11px",
                      letterSpacing: "0.15em",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {tpl.tagline}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "24px",
                  }}
                >
                  {tpl.desc}
                </p>

                {/* Basic / Premium toggle */}
                <div
                  style={{
                    display: "flex",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    padding: "4px",
                    marginBottom: "24px",
                  }}
                >
                  {(["basic", "premium"] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() =>
                        setActiveTier((prev) => ({ ...prev, [tpl.id]: tier }))
                      }
                      style={{
                        flex: 1,
                        padding: "8px 0",
                        borderRadius: "6px",
                        border: activeTier[tpl.id] === tier ? "1px solid rgba(201,169,110,0.2)" : "1px solid transparent",
                        background: activeTier[tpl.id] === tier ? "rgba(201,169,110,0.06)" : "transparent",
                        color: activeTier[tpl.id] === tier ? "rgba(201,169,110,0.9)" : "rgba(255,255,255,0.35)",
                        fontFamily: "var(--font-inter)",
                        fontSize: "11px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                {/* Price */}
                <div
                  style={{ marginBottom: "24px" }}
                  key={`${tpl.id}-${activeTier[tpl.id]}`}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "32px",
                      fontWeight: 300,
                      color: "rgba(255,255,255,0.92)",
                      animation: "nauka-price-in 0.6s ease-out",
                      display: "inline-block",
                    }}
                  >
                    {activeTier[tpl.id] === "basic" ? "75rb" : "99rb"}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={tpl.route}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 24px",
                    borderRadius: "100px",
                    border: "1px solid rgba(201,169,110,0.15)",
                    background: "rgba(201,169,110,0.04)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    letterSpacing: "0.15em",
                    color: "rgba(201,169,110,0.8)",
                    textDecoration: "none",
                    transition: "all 0.5s ease",
                  }}
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
