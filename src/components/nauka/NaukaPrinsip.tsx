"use client";

import React, { useEffect, useRef, useState } from "react";

const keunggulan = [
  "Desain yang bercerita dan membangun suasana",
  "Animasi lembut dan cinematic",
  "Personalisasi yang intim dan bermakna",
  "Dua jalur estetika: Syar'i & Universal",
];

const catatan = [
  "Tidak menggunakan foto dalam desain undangan",
  "Tidak menggunakan musik instrumental",
  "Audio hanya berupa suara vokal (acapella / nasyid tanpa musik)",
  "Tersedia opsi suara alam sebagai alternatif",
];

export function NaukaPrinsip() {
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
        background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
        padding: "90px 24px",
      }}
    >
      {/* Ambient glow — top left */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(135deg, rgba(201,169,110,0.025) 0%, transparent 40%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[580px]">
        {/* Section title */}
        <h2
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
          className="md:!text-[22px]"
        >
          Keunggulan & Prinsip Nauka
        </h2>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "42px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.2s",
          }}
        />

        {/* BAGIAN 1 — KEUNGGULAN */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.3s, transform 1.4s ease-out 0.3s",
          }}
        >
          {/* Intro text */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.72)",
              marginBottom: "28px",
            }}
          >
            Nauka merancang undangan digital sebagai pengalaman, bukan sekadar halaman.
          </p>

          {/* Bullet list */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {keunggulan.map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.55)",
                  paddingLeft: "16px",
                  position: "relative",
                  marginBottom: i < keunggulan.length - 1 ? "12px" : 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "10px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(201,169,110,0.45)",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Closing line */}
          <p
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.5,
              letterSpacing: "0.02em",
              color: "rgba(255,255,255,0.72)",
              marginTop: "32px",
              fontStyle: "italic",
            }}
          >
            Nauka adalah ruang kecil untuk momen yang besar .
          </p>
        </div>

        {/* Divider between sections */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "42px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.5s",
          }}
        />

        {/* BAGIAN 2 — CATATAN PENGALAMAN */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.6s, transform 1.4s ease-out 0.6s",
          }}
        >
          {/* Small title */}
          <p
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.72)",
              marginBottom: "24px",
            }}
          >
            Catatan Pengalaman
          </p>

          {/* Notes list */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {catatan.map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.45)",
                  paddingLeft: "16px",
                  position: "relative",
                  marginBottom: i < catatan.length - 1 ? "12px" : 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "10px",
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.25)",
                  }}
                />
                {item}
              </li>
            ))}
          </ul>

          {/* Explanation */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "13px",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.45)",
              marginTop: "28px",
            }}
          >
            Setiap elemen audio dipilih dengan kehati-hatian agar tetap selaras dengan nilai dan karakter Nauka.
          </p>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "42px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.8s",
          }}
        />

        {/* Note footer */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out 0.9s, transform 1.4s ease-out 0.9s",
          }}
        >
          Nauka merancang pengalaman undangan yang sederhana, elegan, dan terjaga.
        </p>
      </div>
    </section>
  );
}
