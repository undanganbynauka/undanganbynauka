"use client";

import React from "react";

export function EventSection() {
  return (
    <section
      style={{
        position: "relative",
        background: "#F8F4EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Paper grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "22rem",
          textAlign: "center",
          width: "100%",
          gap: "1.25rem",
        }}
      >
        {/* Card: Akad Nikah */}
        <div
          style={{
            background: "rgba(125, 110, 99, 0.04)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px",
            padding: "1.75rem 1.5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#7D6E63",
              marginBottom: "1rem",
              letterSpacing: "0.03em",
            }}
          >
            Akad Nikah
          </h3>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            Ahad, 5 Juli 2026
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            09.00 - selesai
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            Gedung Auditorium Koni, Tanah Abang 1 - Jakarta Pusat
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#7D6E63",
              border: "1px solid rgba(125, 110, 99, 0.3)",
              borderRadius: "4px",
              padding: "0.375rem 1rem",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            Lihat Lokasi
          </a>
        </div>

        {/* Card: Resepsi */}
        <div
          style={{
            background: "rgba(125, 110, 99, 0.04)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px",
            padding: "1.75rem 1.5rem",
            textAlign: "center",
            width: "100%",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.125rem",
              fontWeight: 400,
              color: "#7D6E63",
              marginBottom: "1rem",
              letterSpacing: "0.03em",
            }}
          >
            Resepsi
          </h3>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            Ahad, 5 Juli 2026
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.25rem",
            }}
          >
            09.00 - selesai
          </p>
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.75rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "1.25rem",
            }}
          >
            Gedung Auditorium Koni, Tanah Abang 1 - Jakarta Pusat
          </p>
          <a
            href="#"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#7D6E63",
              border: "1px solid rgba(125, 110, 99, 0.3)",
              borderRadius: "4px",
              padding: "0.375rem 1rem",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            Lihat Lokasi
          </a>
        </div>
      </div>
    </section>
  );
}
