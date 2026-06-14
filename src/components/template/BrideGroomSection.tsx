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
              Putri kedua dari
              <br />
              Bapak Ihsan & Ibu Ratna
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
              Putra pertama dari
              <br />
              Bapak Hendri & Ibu Sarah
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
