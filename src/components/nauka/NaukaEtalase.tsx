"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Template {
  id: string;
  name: string;
  collection: string;
  href: string;
  preview: string;
}

const allTemplates: Template[] = [
  {
    id: "sacred",
    name: "Sacred",
    collection: "Syar'i",
    href: "/detail/sacred",
    preview: "/etalase/sacred-preview.png",
  },
  {
    id: "celestial",
    name: "Celestial",
    collection: "Universal",
    href: "/detail/celestial",
    preview: "/etalase/celestial-preview.png",
  },
  {
    id: "heritage",
    name: "Heritage",
    collection: "Universal",
    href: "/detail/heritage",
    preview: "/etalase/heritage-preview.png",
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
      id={start === 0 ? "nauka-etalase" : undefined}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
        padding: "80px 24px",
      }}
    >
      {/* Ambient glow */}
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
        {/* Grid — 2 col mobile, 2 tablet, 3 desktop */}
        <div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: "16px",
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
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.015)",
                    transition: "border-color 0.3s ease-out, transform 0.3s ease-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Real screenshot preview */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "9 / 16",
                      overflow: "hidden",
                      background: "#0B1120",
                    }}
                  >
                    <Image
                      src={tpl.preview}
                      alt={`${tpl.name} preview`}
                      fill
                      sizes="(max-width: 768px) 48vw, 30vw"
                      className="object-cover"
                      style={{ opacity: 0.85 }}
                    />

                    {/* Subtle gradient overlay at bottom for readability */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0"
                      style={{
                        height: "40%",
                        background: "linear-gradient(to top, rgba(11,17,32,0.7) 0%, transparent 100%)",
                      }}
                    />
                  </div>

                  {/* Info bar */}
                  <div
                    style={{
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: "var(--font-bodoni)",
                          fontSize: "14px",
                          fontWeight: 400,
                          letterSpacing: "0.04em",
                          color: "rgba(255,255,255,0.70)",
                          display: "block",
                        }}
                      >
                        {tpl.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "9px",
                          fontWeight: 400,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.28)",
                          display: "block",
                          marginTop: "2px",
                        }}
                      >
                        {tpl.collection} · 75rb – 99rb
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "10px",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      Demo →
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
