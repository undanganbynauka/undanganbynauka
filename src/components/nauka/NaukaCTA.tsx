"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { WA_INQUIRY_LINK } from "@/lib/whatsapp";

// WA config centralized in @/lib/whatsapp
// This component is NOT currently used on the landing page.
// WhatsApp should remain a secondary support layer, not primary CTA.

export function NaukaCTA() {
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
      className="nauka-grain relative"
      style={{
        background: "#111827",
        padding: "90px 24px",
      }}
    >
      {/* Ambient glow — top */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(180deg, rgba(201,169,110,0.03) 0%, transparent 35%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "28px",
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.92)",
            marginBottom: "12px",
          }}
        >
          Siap Menghadirkan Momen?
        </h2>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.45)",
            marginBottom: "42px",
          }}
        >
          Hubungi kami dan wujudkan undangan impianmu.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={WA_INQUIRY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 32px",
            borderRadius: "100px",
            border: "1px solid rgba(201,169,110,0.15)",
            background: "rgba(201,169,110,0.04)",
            fontFamily: "var(--font-inter)",
            fontSize: "14px",
            letterSpacing: "0.12em",
            color: "rgba(201,169,110,0.8)",
            textDecoration: "none",
            transition: "all 0.5s ease",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Konsultasi via WhatsApp
        </a>
      </div>

      {/* Footer */}
      <footer
        className="relative z-10 mx-auto mt-[80px] max-w-[560px]"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "32px",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease-out 0.4s",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div className="relative" style={{ height: "28px", width: "72px" }}>
            <Image
              src="/nauka-logo-new.png"
              alt="Nauka"
              fill
              sizes="72px"
              className="object-contain"
              style={{ filter: "brightness(0) invert(1)", opacity: 0.35 }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              animation: "nauka-breathe 3s ease-in-out infinite",
            }}
          >
            Undangan by Nauka
          </span>
        </div>
      </footer>
    </section>
  );
}
