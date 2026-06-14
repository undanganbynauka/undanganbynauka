"use client";

import React from "react";

export function BismillahSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
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
        }}
      >
        {/* Bismillah — Amiri */}
        <p
          style={{
            fontFamily: "var(--font-amiri)",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.8,
            marginBottom: "2rem",
            direction: "rtl",
          }}
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>

        {/* Verse Card — subtle highlight */}
        <div
          style={{
            background: "rgba(125, 110, 99, 0.04)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "20px",
            padding: "1.75rem 1.5rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {/* Ayat — Cormorant Garamond Italic */}
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1rem",
              fontWeight: 400,
              color: "#7D6E63",
              lineHeight: 1.8,
              marginBottom: "0.75rem",
            }}
          >
            &ldquo;Dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>

          {/* Referensi Ayat — Plus Jakarta Sans Medium */}
          <p
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "#7D6E63",
              opacity: 0.7,
              letterSpacing: "0.05em",
            }}
          >
            QS. Ar-Rum: 21
          </p>
        </div>

        {/* Paragraf — Plus Jakarta Sans Regular */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.9,
            textAlign: "center",
          }}
        >
          Setiap pertemuan memiliki waktu terbaik yang telah Allah tetapkan. Melalui jalan yang mungkin tidak selalu kami pahami, Dia mempertemukan, menjaga, dan menuntun langkah hingga tiba pada hari yang penuh syukur ini.
        </p>
      </div>
    </section>
  );
}
