"use client";

import React from "react";
import Image from "next/image";

export function BrideGroomSection() {
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

      {/* Islamic geometric pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='900'%3E%3Cdefs%3E%3Cpattern id='p' width='65' height='65' patternUnits='userSpaceOnUse'%3E%3Cpath d='M32.5 4 L61 32.5 L32.5 61 L4 32.5 Z' fill='none' stroke='%23b9ab98' stroke-width='1.2' opacity='0.45'/%3E%3Cpath d='M32.5 16 L48 32.5 L32.5 49 L16 32.5 Z' fill='none' stroke='%23b9ab98' stroke-width='0.9' opacity='0.35'/%3E%3Ccircle cx='32.5' cy='32.5' r='1.6' fill='%23b9ab98' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23p)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          pointerEvents: "none",
          zIndex: 1,
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
        }}
      >
        {/* Opening text */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            lineHeight: 1.9,
            marginBottom: "2.5rem",
          }}
        >
          Dengan memohon rahmat dan ridha Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menjadi bagian dari momen bahagia pernikahan kami.
        </p>

        {/* Bride & Groom profiles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Bride */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src="/bride-profile.png"
              alt="Mempelai Wanita"
              width={120}
              height={198}
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "1rem",
              }}
              priority
            />
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "#7D6E63",
                marginBottom: "0.375rem",
                letterSpacing: "0.02em",
              }}
            >
              Lyla Azzahra
            </h3>
            <p
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                color: "#7D6E63",
                opacity: 0.7,
                lineHeight: 1.6,
              }}
            >
              Putri kedua dari Bapak Ihsan & Ibu Ratna
            </p>
          </div>

          {/* Groom */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              src="/groom-profile.png"
              alt="Mempelai Pria"
              width={120}
              height={198}
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "1rem",
              }}
              priority
            />
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "#7D6E63",
                marginBottom: "0.375rem",
                letterSpacing: "0.02em",
              }}
            >
              Ali Rahman
            </h3>
            <p
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                color: "#7D6E63",
                opacity: 0.7,
                lineHeight: 1.6,
              }}
            >
              Putra pertama dari Bapak Hendri & Ibu Sarah
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
