"use client";

import React, { useState, useEffect, useRef } from "react";

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

export function CelestialJourney() {
  const [visible, setVisible] = useState(false);
  const [activeSteps, setActiveSteps] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // Observe each journey item individually
  useEffect(() => {
    if (!visible) return;
    const observers: IntersectionObserver[] = [];
    itemRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSteps((prev) => new Set(prev).add(i));
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="celestial-section"
      style={{ background: "var(--cel-midnight)", padding: "4rem 1.5rem 5rem" }}
    >
      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
        marginBottom: "0.5rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
      }}>
        Cerita Kami
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 300,
        color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "3rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
      }}>
        Our Journey
      </h2>

      <div style={{ maxWidth: "18rem", width: "100%" }}>
        {JOURNEY_PHASES.map((phase, i) => {
          const isActive = activeSteps.has(i);
          const isLast = i === JOURNEY_PHASES.length - 1;

          return (
            <div
              key={phase.title}
              ref={(el) => { itemRefs.current[i] = el; }}
              style={{
                position: "relative",
                marginBottom: isLast ? 0 : "2.5rem",
              }}
            >
              {/* ── Shooting star trail (vertical connector) ── */}
              {!isLast && (
                <div
                  style={{
                    position: "absolute",
                    left: "11px",
                    top: "24px",
                    bottom: "-2.5rem",
                    width: "1px",
                    background: isActive
                      ? "linear-gradient(to bottom, rgba(201,169,110,0.35), rgba(201,169,110,0.08))"
                      : "rgba(201,169,110,0.06)",
                    transition: "background 1.2s ease",
                  }}
                />
              )}

              {/* ── Star point with shooting animation ── */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
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
                  {/* The star dot */}
                  <div
                    className={isActive ? "cel-journey-star-active" : ""}
                    style={{
                      width: isLast ? "7px" : "5px",
                      height: isLast ? "7px" : "5px",
                      borderRadius: "50%",
                      background: isActive ? "var(--cel-accent)" : "rgba(201,169,110,0.25)",
                      boxShadow: isActive
                        ? "0 0 8px rgba(201,169,110,0.5), 0 0 16px rgba(201,169,110,0.2)"
                        : "none",
                      transition: "all 0.8s ease",
                      position: "relative",
                      zIndex: 2,
                    }}
                  />

                  {/* Shooting star trail — appears on activation */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          width: "3px",
                          height: "3px",
                          borderRadius: "50%",
                          background: "#fff",
                          animation: `cel-journey-shoot 1.5s ease-out forwards`,
                          position: "relative",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* ── Content ── */}
                <div>
                  <p style={{
                    fontFamily: "var(--font-cormorant)", fontSize: "1.0625rem", fontWeight: 400,
                    color: isActive ? "var(--cel-text)" : "var(--cel-text-dim)",
                    letterSpacing: "0.03em", marginBottom: "0.375rem",
                    transition: "color 0.8s ease",
                  }}>
                    {phase.title}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-inter)", fontSize: "0.6875rem",
                    color: "var(--cel-text-dim)", lineHeight: 1.8,
                    opacity: isActive ? 1 : 0.5,
                    transition: "opacity 0.8s ease",
                  }}>
                    {phase.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes cel-journey-shoot {
          0% {
            box-shadow:
              0 0 8px 3px rgba(255,255,255,0.8),
              -10px 0 8px 1px rgba(201,169,110,0.5),
              -20px 0 12px 1px rgba(255,255,255,0.3),
              -30px 0 18px 0px rgba(255,255,255,0.15),
              -40px 0 24px 0px rgba(201,169,110,0.08);
            opacity: 1;
          }
          30% {
            box-shadow:
              0 0 6px 2px rgba(255,255,255,0.6),
              -8px 0 6px 1px rgba(201,169,110,0.4),
              -15px 0 10px 1px rgba(255,255,255,0.2),
              -22px 0 14px 0px rgba(201,169,110,0.06);
            opacity: 1;
          }
          100% {
            box-shadow: 0 0 3px 1px rgba(201,169,110,0.3);
            opacity: 1;
          }
        }

        .cel-journey-star-active {
          animation: cel-journey-star-pulse 3s ease-in-out infinite;
        }

        @keyframes cel-journey-star-pulse {
          0%, 100% {
            box-shadow:
              0 0 6px rgba(201,169,110,0.4),
              0 0 12px rgba(201,169,110,0.15);
          }
          50% {
            box-shadow:
              0 0 10px rgba(201,169,110,0.6),
              0 0 20px rgba(201,169,110,0.25);
          }
        }
      `}</style>
    </section>
  );
}
