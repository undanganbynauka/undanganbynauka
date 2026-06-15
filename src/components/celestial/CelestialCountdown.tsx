"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const prevSeconds = useRef(-1);
  const [shimmerKey, setShimmerKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Countdown timer
  useEffect(() => {
    const target = new Date("2026-07-05T08:00:00+07:00").getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Shimmer on seconds change
  useEffect(() => {
    if (timeLeft.seconds !== prevSeconds.current) {
      prevSeconds.current = timeLeft.seconds;
      setShimmerKey((k) => k + 1);
    }
  }, [timeLeft.seconds]);

  // IntersectionObserver + staggered reveal
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

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1200),
      setTimeout(() => setStep(4), 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section
      ref={sectionRef}
      id="home"
      className="celestial-section"
      style={{
        background: "linear-gradient(180deg, #0F1530 0%, #1A2555 40%, #0F1530 100%)",
        padding: "4rem 1.5rem 5rem",
      }}
    >
      {/* Section title */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5rem",
          fontWeight: 400,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--cel-accent)",
          marginBottom: "2rem",
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}
      >
        Our Special Day
      </p>

      {/* ── Thin Glow Countdown ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "0.25rem", maxWidth: "18rem", width: "100%",
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
      }}>
        {units.map((u, i) => (
          <React.Fragment key={u.label}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
            }}>
              <p className="cel-countdown-number" style={{
                fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300,
                color: "var(--cel-text)", lineHeight: 1, marginBottom: "0.25rem",
                textShadow: "0 0 6px rgba(201, 169, 110, 0.3), 0 0 12px rgba(201, 169, 110, 0.1)",
              }}>
                {String(u.value).padStart(2, "0")}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: "0.375rem", fontWeight: 400,
                letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cel-text-muted)",
              }}>
                {u.label}
              </p>
            </div>
            {i < units.length - 1 && (
              <p style={{
                fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 200,
                color: "var(--cel-text-muted)", marginBottom: "0.75rem",
                textShadow: "0 0 4px rgba(201, 169, 110, 0.2)",
              }}>
                :
              </p>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Shimmer sweep */}
      <div key={shimmerKey} className="cel-countdown-shimmer" />

      {/* Divider */}
      <div className="celestial-divider" style={{ justifyContent: "center", margin: "2.5rem 0", opacity: step >= 3 ? 1 : 0, transition: `opacity 1s ${ease}` }}>
        <div className="celestial-divider-line" />
        <span className="celestial-divider-star">✦</span>
        <div className="celestial-divider-line" />
      </div>

      {/* Ar-Rum quote */}
      <div style={{
        textAlign: "center", maxWidth: "18rem",
        opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
      }}>
        <p style={{
          fontFamily: "var(--font-cormorant)", fontSize: "0.8125rem", fontWeight: 400,
          fontStyle: "italic", color: "var(--cel-text)", lineHeight: 2, letterSpacing: "0.02em",
          marginBottom: "1rem",
        }}>
          &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.&rdquo;
        </p>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 400,
          letterSpacing: "0.1em", color: "var(--cel-text-dim)",
        }}>
          QS. Ar-Rum: 21
        </p>
      </div>

      <style>{`
        .cel-countdown-number {
          transition: text-shadow 0.4s ease;
        }

        .cel-countdown-shimmer {
          height: 0;
          overflow: visible;
          pointer-events: none;
          animation: cel-shimmer-sweep 1.2s ease-out forwards;
        }

        @keyframes cel-shimmer-sweep {
          0% { box-shadow: 0 0 0 0 rgba(201, 169, 110, 0); }
          20% { box-shadow: 0 -1px 40px 2px rgba(201, 169, 110, 0.08); }
          100% { box-shadow: 0 0 0 0 rgba(201, 169, 110, 0); }
        }
      `}</style>
    </section>
  );
}
