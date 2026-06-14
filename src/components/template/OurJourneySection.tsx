"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const PHASES = [
  {
    label: "Ta'aruf",
    text: "Kami memulai dari proses ta'aruf, perkenalan yang dijaga dengan adab dan niat yang baik.",
  },
  {
    label: "Nadzor",
    text: "Dilanjutkan dengan nadzor, sebagai tahap saling mengenal secukupnya dalam batas yang Allah tetapkan.",
  },
  {
    label: "Khitbah",
    text: "Keluarga dipertemukan dalam proses khitbah sebagai bentuk keseriusan menuju pernikahan.",
  },
  {
    label: "Menikah",
    text: "Hingga akhirnya, dengan izin Allah dan restu keluarga, kami sampai pada akad pernikahan.",
  },
];

function TypewriterText({
  text,
  active,
  showFull,
  speed = 30,
}: {
  text: string;
  active: boolean;
  showFull: boolean;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (active && !hasStarted.current) {
      hasStarted.current = true;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [active, text, speed]);

  // If told to show full (scrolled past), show everything
  if (showFull && !done) {
    setDisplayed(text);
    setDone(true);
  }

  if (!hasStarted.current && !showFull) return null;

  return (
    <span>
      {done ? text : displayed}
      {!done && displayed.length < text.length && (
        <span style={{ opacity: 0.25, fontWeight: 300 }}>|</span>
      )}
    </span>
  );
}

export function OurJourneySection() {
  const [activePhase, setActivePhase] = useState(-1);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sentinelRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActivePhase((prev) => Math.max(prev, index));
          }
        },
        {
          threshold: 0.35,
          rootMargin: "0px 0px -5% 0px",
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      style={{
        position: "relative",
        background: "#F8F4EE",
        overflow: "hidden",
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

      {/* Floating quill pen */}
      {activePhase >= 0 && (
        <div
          style={{
            position: "absolute",
            right: "12%",
            top: `${22 + activePhase * 18}%`,
            transition: "top 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            opacity: 0.25,
            pointerEvents: "none",
            zIndex: 1,
            animation: "nauka-float 5s ease-in-out infinite",
          }}
        >
          <Image
            src="/quill-pen.png"
            alt="Quill Pen"
            width={40}
            height={40}
            style={{
              width: "40px",
              height: "auto",
              filter: "brightness(0.5) sepia(0.3)",
            }}
          />
        </div>
      )}

      {/* STATE 0 — Opening */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 1.5rem 2rem",
          minHeight: "55vh",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.125rem",
            fontWeight: 400,
            color: "#7D6E63",
            letterSpacing: "0.15em",
            marginBottom: "1rem",
          }}
        >
          Our Journey
        </h2>
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: 0.55,
            lineHeight: 1.8,
            maxWidth: "18rem",
          }}
        >
          Kami menuliskan perjalanan ini dengan penuh rasa syukur.
        </p>
      </div>

      {/* Phase blocks */}
      {PHASES.map((phase, index) => {
        const isActive = activePhase === index;
        const isPast = activePhase > index;
        const isFuture = activePhase < index;

        return (
          <div
            key={phase.label}
            ref={(el) => {
              sentinelRefs.current[index] = el;
            }}
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "2.5rem 1.5rem",
              minHeight: index === 3 ? "55vh" : "45vh",
              opacity: isFuture ? 0 : isPast ? 0.35 : 1,
              transform: isPast ? "translateY(-6px)" : "none",
              transition: "opacity 1.2s ease, transform 1.2s ease",
            }}
          >
            {/* Phase label */}
            <p
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.5625rem",
                fontWeight: 500,
                color: "#7D6E63",
                opacity: isActive ? 0.55 : 0.35,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              {phase.label}
            </p>

            {/* Phase text with typewriter or full display */}
            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontSize: "0.9375rem",
                fontWeight: 400,
                color: "#7D6E63",
                lineHeight: 2,
                maxWidth: "20rem",
                transition: "text-shadow 1.5s ease",
                textShadow:
                  index === 3 && isActive
                    ? "0 0 25px rgba(184, 155, 106, 0.12)"
                    : "none",
              }}
            >
              {isFuture ? null : isPast ? (
                phase.text
              ) : (
                <TypewriterText
                  text={phase.text}
                  active={isActive}
                  showFull={isPast}
                />
              )}
            </p>

            {/* Decorative dot after each phase */}
            {isPast && (
              <div
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "50%",
                  background: "rgba(125, 110, 99, 0.2)",
                  marginTop: "1.5rem",
                  transition: "opacity 1s ease",
                }}
              />
            )}
          </div>
        );
      })}
    </section>
  );
}
