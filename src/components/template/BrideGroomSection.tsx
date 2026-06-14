"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function BrideGroomSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [showBridePhoto, setShowBridePhoto] = useState(false);
  const [showBrideName, setShowBrideName] = useState(false);
  const [showBrideDesc, setShowBrideDesc] = useState(false);
  const [showGroomPhoto, setShowGroomPhoto] = useState(false);
  const [showGroomName, setShowGroomName] = useState(false);
  const [showGroomDesc, setShowGroomDesc] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  // Staggered: intro → bride photo → bride name → bride desc → groom photo → groom name → groom desc
  useEffect(() => {
    if (!sectionVisible) return;
    const timers = [
      setTimeout(() => setShowIntro(true), 200),
      setTimeout(() => setShowBridePhoto(true), 800),
      setTimeout(() => setShowBrideName(true), 1200),
      setTimeout(() => setShowBrideDesc(true), 1500),
      setTimeout(() => setShowGroomPhoto(true), 2200),
      setTimeout(() => setShowGroomName(true), 2600),
      setTimeout(() => setShowGroomDesc(true), 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, [sectionVisible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
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
            opacity: showIntro ? 1 : 0,
            transform: showIntro ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
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
            <div
              style={{
                opacity: showBridePhoto ? 1 : 0,
                transform: showBridePhoto ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                transition: `opacity 1.1s ${ease}, transform 1.1s ${ease}`,
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
            </div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "#7D6E63",
                marginBottom: "0.375rem",
                letterSpacing: "0.02em",
                opacity: showBrideName ? 1 : 0,
                transform: showBrideName ? "translateY(0)" : "translateY(15px)",
                transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}`,
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
                opacity: showBrideDesc ? 0.7 : 0,
                transform: showBrideDesc ? "translateY(0)" : "translateY(10px)",
                lineHeight: 1.6,
                transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}`,
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
            <div
              style={{
                opacity: showGroomPhoto ? 1 : 0,
                transform: showGroomPhoto ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
                transition: `opacity 1.1s ${ease}, transform 1.1s ${ease}`,
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
            </div>
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "#7D6E63",
                marginBottom: "0.375rem",
                letterSpacing: "0.02em",
                opacity: showGroomName ? 1 : 0,
                transform: showGroomName ? "translateY(0)" : "translateY(15px)",
                transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}`,
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
                opacity: showGroomDesc ? 0.7 : 0,
                transform: showGroomDesc ? "translateY(0)" : "translateY(10px)",
                lineHeight: 1.6,
                transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}`,
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
