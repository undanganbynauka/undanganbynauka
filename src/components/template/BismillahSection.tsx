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

        {/* Ayat — Cormorant Garamond Italic */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "1rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.8,
            marginBottom: "0.5rem",
            maxWidth: "20rem",
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
            marginBottom: "2rem",
          }}
        >
          QS. Ar-Rum: 21
        </p>

        {/* Paragraf 1 — Plus Jakarta Sans Regular */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.9,
            marginBottom: "1.25rem",
          }}
        >
          Setiap pertemuan memiliki waktu terbaik yang telah Allah tetapkan. Melalui jalan yang mungkin tidak selalu kami pahami, Dia mempertemukan, menjaga, dan menuntun langkah hingga tiba pada hari yang penuh syukur ini.
        </p>

        {/* Paragraf 2 — Plus Jakarta Sans Regular */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.9,
          }}
        >
          Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menjadi bagian dari momen yang insyaAllah menjadi awal perjalanan kami dalam ikatan yang diberkahi, dipenuhi kasih sayang, serta senantiasa berada dalam tuntunan-Nya.
        </p>
      </div>
    </section>
  );
}
