"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  collection: string;
  href: string;
  gradient: string;
  accent: string;
  ornament: "arch" | "diamond" | "line";
}

const allTemplates: Template[] = [
  {
    id: "sacred",
    name: "Sacred",
    collection: "Syar'i",
    href: "/sacred",
    gradient: "linear-gradient(160deg, #0B1120 0%, #16213e 55%, #1a1a2e 100%)",
    accent: "rgba(201,169,110,0.12)",
    ornament: "arch",
  },
  {
    id: "celestial",
    name: "Celestial",
    collection: "Universal",
    href: "/celestial",
    gradient: "linear-gradient(160deg, #111827 0%, #1e1b3a 55%, #0f172a 100%)",
    accent: "rgba(147,130,200,0.10)",
    ornament: "diamond",
  },
  {
    id: "heritage",
    name: "Heritage",
    collection: "Universal",
    href: "/template",
    gradient: "linear-gradient(160deg, #0f172a 0%, #1e293b 55%, #0B1120 100%)",
    accent: "rgba(148,163,184,0.08)",
    ornament: "line",
  },
];

export function NaukaEtalase({ start = 0, end }: { start?: number; end?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const templates = end !== undefined ? allTemplates.slice(start, end) : allTemplates.slice(start);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="nauka-etalase"
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #111827 0%, #0B1120 100%)",
        padding: "80px 24px",
      }}
    >
      {/* Ambient glow — top corner */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(180deg, rgba(201,169,110,0.02) 0%, transparent 30%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[960px]">
        {/* Grid — Tailwind responsive */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "24px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
        >
          {templates.map((tpl, i) => (
            <div
              key={tpl.id}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 1.3s ease-out ${0.15 + i * 0.12}s, transform 1.3s ease-out ${0.15 + i * 0.12}s`,
              }}
            >
              <Link href={tpl.href} className="block" style={{ textDecoration: "none" }}>
                <div
                  style={{
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.015)",
                    transition: "border-color 0.3s ease-out, transform 0.3s ease-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Mockup cover area */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingTop: "140%",
                      background: tpl.gradient,
                      overflow: "hidden",
                    }}
                  >
                    {/* Subtle accent overlay */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at 50% 20%, ${tpl.accent} 0%, transparent 60%)`,
                      }}
                    />

                    {/* Ornamental element — centered */}
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ padding: "32px" }}
                    >
                      {tpl.ornament === "arch" && (
                        <div
                          style={{
                            width: "60px",
                            height: "90px",
                            borderRadius: "50% 50% 0 0",
                            border: "1px solid rgba(201,169,110,0.18)",
                            borderBottom: "none",
                          }}
                        />
                      )}
                      {tpl.ornament === "diamond" && (
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            border: "1px solid rgba(147,130,200,0.18)",
                            transform: "rotate(45deg)",
                          }}
                        />
                      )}
                      {tpl.ornament === "line" && (
                        <div
                          style={{
                            width: "48px",
                            height: "1px",
                            background: "rgba(148,163,184,0.18)",
                          }}
                        />
                      )}
                    </div>

                    {/* Template name — Bodoni Moda, centered */}
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{ gap: "8px" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-bodoni)",
                          fontSize: "24px",
                          fontWeight: 400,
                          letterSpacing: "0.06em",
                          color: "rgba(255,255,255,0.72)",
                          textTransform: "uppercase",
                        }}
                      >
                        {tpl.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "10px",
                          fontWeight: 400,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.3)",
                        }}
                      >
                        {tpl.collection}
                      </span>
                    </div>
                  </div>

                  {/* Info bar */}
                  <div
                    style={{
                      padding: "16px 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Price hint */}
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      75rb – 99rb
                    </span>

                    {/* Lihat Demo */}
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "11px",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.55)",
                        textDecoration: "none",
                      }}
                    >
                      Lihat Demo →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
