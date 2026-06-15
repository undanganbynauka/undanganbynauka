"use client";

import React, { useState, useEffect, useRef } from "react";

const JOURNEY_PHASES = [
  {
    title: "Ta'aruf",
    desc: "Sebuah pertemuan yang Allah pertemukan, bukan kebetulan melainkan takdir yang indah.",
  },
  {
    title: "Nadzor",
    desc: "Melihat dengan hati yang jujur, memastikan bahwa ketenangan ada dalam pandangan pertama.",
  },
  {
    title: "Khitbah",
    desc: "Sebuah komitmen suci untuk menjaga hati, mempersiapkan langkah menuju ikatan yang halal.",
  },
  {
    title: "Menikah",
    desc: "Hari ketika dua perjalanan menjadi satu, dengan niat dan doa menuju ridha-Nya.",
  },
];

export function CelestialJourney() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [activePhase, setActivePhase] = useState(-1);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver — trigger when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // Master animation sequence
  useEffect(() => {
    if (!visible) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Subtitle fade in (0.6s)
    timers.push(setTimeout(() => setStep(1), 100));

    // Step 2: Title slide up + fade in (1s)
    timers.push(setTimeout(() => setStep(2), 700));

    // Step 3: Pause — let title breathe (1s)
    // Step 4: Timeline line grows from top to bottom (2s)
    timers.push(setTimeout(() => setStep(3), 1800));

    // Animate timeline line growing
    const lineStart = 2800;
    const lineDuration = 2000;
    const lineSteps = 40;
    for (let i = 0; i <= lineSteps; i++) {
      timers.push(
        setTimeout(() => {
          setTimelineProgress(i / lineSteps);
        }, lineStart + (lineDuration / lineSteps) * i)
      );
    }

    // Step 5+: Phase reveals — each 1.3s apart
    const phaseStart = lineStart + lineDuration + 400;
    JOURNEY_PHASES.forEach((_, i) => {
      // Dot glow appears
      timers.push(
        setTimeout(() => {
          setActivePhase(i);
        }, phaseStart + i * 1300)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const easeInOut = "cubic-bezier(0.42, 0, 0.58, 1)";

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="celestial-section"
      style={{
        background: "var(--cel-midnight)",
        padding: "5rem 1.5rem 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background particles ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: `${1.5 + Math.random() * 1.5}px`,
              height: `${1.5 + Math.random() * 1.5}px`,
              borderRadius: "50%",
              background: i % 3 === 0 ? "var(--cel-accent)" : "rgba(255,255,255,0.5)",
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              opacity: 0,
              animation: `celJourneyParticle ${4 + Math.random() * 6}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Subtitle ── */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.4375rem",
          fontWeight: 500,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "var(--cel-accent)",
          marginBottom: "0.75rem",
          opacity: step >= 1 ? 1 : 0,
          transition: `opacity 0.6s ${easeInOut}`,
        }}
      >
        Cerita Kami
      </p>

      {/* ── Title ── */}
      <h2
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.75rem",
          fontWeight: 300,
          color: "var(--cel-text)",
          letterSpacing: "0.06em",
          marginBottom: "3.5rem",
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1s ${easeInOut}, transform 1s ${easeInOut}`,
        }}
      >
        Our Journey
      </h2>

      {/* ── Timeline ── */}
      <div
        style={{
          position: "relative",
          maxWidth: "18rem",
          width: "100%",
        }}
      >
        {/* Vertical line — grows from top to bottom */}
        <div
          style={{
            position: "absolute",
            left: "11px",
            top: "0",
            bottom: "0",
            width: "1px",
            background:
              "linear-gradient(to bottom, rgba(201,169,110,0.25), rgba(201,169,110,0.08))",
            transformOrigin: "top center",
            scaleY: timelineProgress,
            opacity: step >= 3 ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {JOURNEY_PHASES.map((phase, i) => {
          const isRevealed = activePhase >= i;
          const isActive = activePhase === i;
          const isPast = activePhase > i;
          const isLast = i === JOURNEY_PHASES.length - 1;

          return (
            <div
              key={phase.title}
              style={{
                position: "relative",
                marginBottom: isLast ? 0 : "2.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                {/* ── Dot ── */}
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    marginTop: "2px",
                  }}
                >
                  {/* Outer glow ring — only for active */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "1px solid rgba(201,169,110,0.15)",
                        animation: "celJourneyRingPulse 3s ease-in-out infinite",
                      }}
                    />
                  )}

                  {/* The dot itself */}
                  <div
                    style={{
                      width: isLast ? "8px" : "6px",
                      height: isLast ? "8px" : "6px",
                      borderRadius: "50%",
                      background: isRevealed
                        ? "var(--cel-accent)"
                        : "rgba(201,169,110,0.15)",
                      boxShadow: isRevealed
                        ? isActive
                          ? "0 0 10px rgba(201,169,110,0.6), 0 0 25px rgba(201,169,110,0.2)"
                          : isPast
                          ? "0 0 4px rgba(201,169,110,0.25)"
                          : "0 0 6px rgba(201,169,110,0.35)"
                        : "none",
                      transform: isRevealed ? "scale(1)" : "scale(0.5)",
                      opacity: isRevealed ? 1 : 0,
                      transition: `all 0.6s ${easeInOut}`,
                      position: "relative",
                      zIndex: 2,
                    }}
                  />

                  {/* Active dot pulse */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--cel-accent)",
                        animation: "celJourneyDotPulse 2.5s ease-in-out infinite",
                        zIndex: 1,
                      }}
                    />
                  )}
                </div>

                {/* ── Content ── */}
                <div
                  style={{
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "translateY(0)" : "translateY(8px)",
                    transition: `opacity 0.7s ${easeInOut} 0.4s, transform 0.7s ${easeInOut} 0.4s`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.0625rem",
                      fontWeight: isActive ? 400 : 300,
                      color: isActive
                        ? "var(--cel-text)"
                        : isPast
                        ? "var(--cel-text-dim)"
                        : "var(--cel-text-muted)",
                      letterSpacing: "0.04em",
                      marginBottom: "0.375rem",
                      transition: `color 0.8s ${easeInOut}, font-weight 0.5s ease`,
                    }}
                  >
                    {phase.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.6875rem",
                      color: isActive
                        ? "var(--cel-text-dim)"
                        : isPast
                        ? "rgba(139,143,168,0.5)"
                        : "var(--cel-text-muted)",
                      lineHeight: 1.8,
                      maxWidth: "14rem",
                      transition: `color 0.8s ${easeInOut}`,
                    }}
                  >
                    {phase.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes celJourneyParticle {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          25% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.2;
            transform: translateY(-15px) translateX(5px);
          }
          75% {
            opacity: 0.35;
          }
        }

        @keyframes celJourneyDotPulse {
          0% {
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 0 6px rgba(201,169,110,0.5);
          }
          50% {
            transform: scale(2.5);
            opacity: 0;
            box-shadow: 0 0 20px rgba(201,169,110,0.2);
          }
          100% {
            transform: scale(1);
            opacity: 0;
            box-shadow: 0 0 6px rgba(201,169,110,0.5);
          }
        }

        @keyframes celJourneyRingPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
