"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

// ════════════════════════════════════════════════════════════════
// LUNA — Universal Free Wedding Invitation Template (FINAL LOCK)
// Elegant · Romantic · Minimalist · Universal · Premium · Mobile First
// ════════════════════════════════════════════════════════════════

const C = {
  primary: "#F7F2EA",
  secondary: "#E8DCCF",
  accent: "#DCCFBE",
  contentBg: "#8B876A",
  buttonBg: "#6B6B4E",
  buttonBgHover: "#5A5A40",
  buttonBorder: "#F7F2EA",
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
  textShadowSoft: "0 1px 2px rgba(0, 0, 0, 0.10)",
  cardSurface: "rgba(247, 242, 234, 0.06)",
  cardBorder: "rgba(220, 207, 190, 0.35)",
  hairline: "rgba(220, 207, 190, 0.45)",
};

const FONT_SERIF = "var(--font-playfair)";
const FONT_SANS = "var(--font-jakarta)";

function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetIso).getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, isPast: diff === 0 };
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Luna() {
  const [opened, setOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  return (
    <main
      style={{
        fontFamily: FONT_SANS,
        color: C.primary,
        background: C.contentBg,
        margin: 0,
        padding: 0,
        lineHeight: 1.6,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <Hero opened={opened} onOpen={handleOpen} />
      <div ref={contentRef}>
        <QuoteAndCountdown />
        <Pembuka />
        <ProfilMempelai />
        <Acara />
        <Penutup />
        <NaukaFooter />
      </div>
      <AudioToggle />
    </main>
  );
}

function Hero({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "13vh",
        paddingBottom: "5vh",
        boxSizing: "border-box",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/nauka/couple-illustration-sage.png")',
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#3A4D3F",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.primary,
            margin: 0,
            textShadow: C.textShadowSoft,
            animation: "lunaFadeUp 0.9s ease-out 0.1s both",
          }}
        >
          The Wedding Of
        </p>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(64px, 18vw, 96px)",
            fontWeight: 500,
            lineHeight: 1.02,
            color: C.primary,
            margin: "18px 0 4px",
            textShadow: C.textShadow,
            letterSpacing: "0.01em",
            animation: "lunaFadeUp 0.9s ease-out 0.3s both",
          }}
        >
          Ali
        </h1>
        <span
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(28px, 7vw, 40px)",
            color: C.primary,
            margin: "2px 0",
            textShadow: C.textShadowSoft,
            opacity: 0.85,
            animation: "lunaFadeUp 0.9s ease-out 0.5s both",
          }}
        >
          &amp;
        </span>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(64px, 18vw, 96px)",
            fontWeight: 500,
            lineHeight: 1.02,
            color: C.primary,
            margin: "4px 0 0",
            textShadow: C.textShadow,
            letterSpacing: "0.01em",
            animation: "lunaFadeUp 0.9s ease-out 0.7s both",
          }}
        >
          Lyla
        </h1>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
          animation: "lunaFadeUp 0.9s ease-out 1.0s both",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.primary,
            margin: 0,
            textShadow: C.textShadowSoft,
          }}
        >
          Sabtu, 5 Desember 2026
        </p>
        <div
          style={{
            padding: "6px 16px",
            borderTop: `1px solid ${C.hairline}`,
            borderBottom: `1px solid ${C.hairline}`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "8px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.primary,
              margin: 0,
              opacity: 0.8,
              textShadow: C.textShadowSoft,
            }}
          >
            Kepada Yth
          </p>
          <p
            style={{
              fontFamily: FONT_SERIF,
              fontSize: "13px",
              fontWeight: 500,
              color: C.primary,
              margin: "4px 0 0",
              textShadow: C.textShadowSoft,
            }}
          >
            Bapak/Ibu/Saudara/i
          </p>
        </div>
        <button
          onClick={onOpen}
          aria-label="Open Invitation"
          style={{
            padding: "12px 32px",
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: C.primary,
            background: C.buttonBg,
            border: `1px solid ${C.buttonBorder}`,
            borderRadius: "999px",
            cursor: "pointer",
            transition: "background 0.3s ease, transform 0.2s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.18)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.buttonBgHover;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.buttonBg;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Open Invitation
        </button>
      </div>
      <style>{`
        @keyframes lunaFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}