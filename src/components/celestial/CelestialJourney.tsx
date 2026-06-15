"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

const JOURNEY_PHASES = [
  {
    title: "Pertemuan",
    desc: "Sebuah awal sederhana yang perlahan menjadi bagian penting dari cerita kami.",
  },
  {
    title: "Mengenal",
    desc: "Waktu membawa kami untuk saling memahami dan menemukan kenyamanan satu sama lain.",
  },
  {
    title: "Komitmen",
    desc: "Tumbuh dari keyakinan yang sama untuk melangkah ke arah yang lebih serius.",
  },
  {
    title: "Hari Bahagia",
    desc: "Hari ketika kami memulai perjalanan baru sebagai satu keluarga, dengan harapan yang sama untuk masa depan.",
  },
];

/* ── Shooting Star with Gentle Trail Dust ── */
function JourneyShootingStar({ visible }: { visible: boolean }) {
  // Trail dust particles — positioned along the shooting star diagonal path
  // Shooting star goes from ~top-right to ~bottom-left
  const trailDust = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        // Positions along the diagonal path (staggered)
        left: 72 - i * 3.8, // 72% → ~19%
        top: 7 + i * 4.2, // 7% → ~66%
        size: 0.6 + Math.random() * 1,
        // Each particle has its own unique drift keyframe
        delay: i * 0.15 + 0.5,
        duration: 3.5 + Math.random() * 2,
        isGold: i % 4 === 0,
        // Unique drift direction per particle
        driftX: (Math.random() - 0.5) * 20,
        driftY: -5 - Math.random() * 15, // gentle upward drift
      })),
    []
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 5 }}>
      {/* Shooting star head — slow, graceful diagonal traverse */}
      {visible && (
        <div style={{ position: "absolute", top: "7%", right: "28%" }}>
          <div
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow:
                "0 0 5px 2px rgba(255,255,255,0.8), " +
                "0 0 10px 3px rgba(201,169,110,0.35), " +
                "0 0 18px 5px rgba(255,255,255,0.1)",
              animation: "celJourneyShoot 3s ease-in-out forwards",
            }}
          />
        </div>
      )}

      {/* Trail dust — each particle has a unique drift via inline keyframes */}
      {visible &&
        trailDust.map((dust) => (
          <div
            key={dust.id}
            style={{
              position: "absolute",
              left: `${dust.left}%`,
              top: `${dust.top}%`,
              width: `${dust.size}px`,
              height: `${dust.size}px`,
              borderRadius: "50%",
              background: dust.isGold ? "rgba(201,169,110,0.85)" : "rgba(255,255,255,0.65)",
              boxShadow: dust.isGold
                ? "0 0 3px rgba(201,169,110,0.3)"
                : "0 0 2px rgba(255,255,255,0.15)",
              animation: `celJourneyDust${dust.id} ${dust.duration}s ease-in-out ${dust.delay}s forwards`,
              pointerEvents: "none",
            }}
          />
        ))}

      {/* Per-particle unique keyframes — each drifts in a unique direction */}
      <style>{trailDust.map((dust) => `
        @keyframes celJourneyDust${dust.id} {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.4);
          }
          12% {
            opacity: ${0.2 + Math.random() * 0.2};
            transform: translate(0, 0) scale(1);
          }
          35% {
            opacity: ${0.12 + Math.random() * 0.1};
            transform: translate(${dust.driftX * 0.3}px, ${dust.driftY * 0.3}px) scale(0.85);
          }
          65% {
            opacity: ${0.06 + Math.random() * 0.06};
            transform: translate(${dust.driftX * 0.7}px, ${dust.driftY * 0.7}px) scale(0.6);
          }
          100% {
            opacity: 0;
            transform: translate(${dust.driftX}px, ${dust.driftY}px) scale(0.2);
          }
        }
      `).join("")}</style>
    </div>
  );
}

export function CelestialJourney() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [activePhase, setActivePhase] = useState(-1);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver
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

    // Step 0: Shooting star starts immediately
    // Step 1: Subtitle fade in (2.8s — after shooting star traversed)
    timers.push(setTimeout(() => setStep(1), 2800));

    // Step 2: Title slide up + fade in (3.5s)
    timers.push(setTimeout(() => setStep(2), 3500));

    // Step 3: Timeline line grows
    timers.push(setTimeout(() => setStep(3), 4600));

    // Animate timeline line growing
    const lineStart = 4600;
    const lineDuration = 2000;
    const lineSteps = 40;
    for (let i = 0; i <= lineSteps; i++) {
      timers.push(
        setTimeout(() => {
          setTimelineProgress(i / lineSteps);
        }, lineStart + (lineDuration / lineSteps) * i)
      );
    }

    // Phase reveals
    const phaseStart = lineStart + lineDuration + 400;
    JOURNEY_PHASES.forEach((_, i) => {
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
      {/* Shooting Star with Trail Dust */}
      <JourneyShootingStar visible={visible} />

      {/* Background ambient particles — very slow, gentle */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: `${0.8 + Math.random() * 0.8}px`,
              height: `${0.8 + Math.random() * 0.8}px`,
              borderRadius: "50%",
              background: i % 3 === 0 ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.2)",
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              opacity: 0,
              animation: `celJourneyAmbient ${7 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`,
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
          transition: `opacity 0.8s ${easeInOut}`,
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
        {/* Vertical line */}
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
        /* Slow, graceful shooting star — diagonal traverse, ease-in-out */
        @keyframes celJourneyShoot {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          75% {
            opacity: 0.85;
          }
          100% {
            transform: translate(-240px, 120px);
            opacity: 0;
          }
        }

        /* Ambient floating particles — very slow, gentle */
        @keyframes celJourneyAmbient {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          20% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.08;
            transform: translateY(-8px) translateX(2px);
          }
          80% {
            opacity: 0.12;
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
