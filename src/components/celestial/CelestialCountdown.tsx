"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const prevSeconds = useRef(-1);
  const [shimmerKey, setShimmerKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Trigger shimmer on seconds change
  useEffect(() => {
    if (timeLeft.seconds !== prevSeconds.current) {
      prevSeconds.current = timeLeft.seconds;
      setShimmerKey((k) => k + 1);
    }
  }, [timeLeft.seconds]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
        background: "linear-gradient(180deg, #1A2555 0%, #0F1530 100%)",
        padding: "5rem 1.5rem",
      }}
    >
      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.625rem", fontWeight: 400,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
        marginBottom: "0.75rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
      }}>
        Menghitung Hari
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300,
        color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "2.5rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1s ${ease} 0.1s, transform 1s ${ease} 0.1s`,
      }}>
        Countdown
      </h2>

      {/* ── Thin Glow Countdown ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "0.25rem", maxWidth: "20rem", width: "100%",
      }}>
        {units.map((u, i) => (
          <React.Fragment key={u.label}>
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
              transition: `opacity 0.8s ${ease} ${0.15 + i * 0.08}s, transform 0.8s ${ease} ${0.15 + i * 0.08}s`,
            }}>
              {/* Number with thin constant glow */}
              <p className="cel-countdown-number" style={{
                fontFamily: "var(--font-cormorant)", fontSize: "2.25rem", fontWeight: 300,
                color: "var(--cel-text)", lineHeight: 1, marginBottom: "0.375rem",
                textShadow: "0 0 6px rgba(201, 169, 110, 0.3), 0 0 12px rgba(201, 169, 110, 0.1)",
              }}>
                {String(u.value).padStart(2, "0")}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: "0.4375rem", fontWeight: 400,
                letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cel-text-muted)",
              }}>
                {u.label}
              </p>
            </div>
            {/* Thin colon separator */}
            {i < units.length - 1 && (
              <p style={{
                fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", fontWeight: 200,
                color: "var(--cel-text-muted)", marginBottom: "1rem",
                textShadow: "0 0 4px rgba(201, 169, 110, 0.2)",
                opacity: visible ? 1 : 0,
                transition: `opacity 0.8s ${ease} ${0.4}s`,
              }}>
                :
              </p>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Shimmer sweep line — triggers every second */}
      <div key={shimmerKey} className="cel-countdown-shimmer" />

      {/* Save the Date */}
      <div style={{
        marginTop: "3rem", textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1s ${ease} 0.6s, transform 1s ${ease} 0.6s`,
      }}>
        <div className="celestial-divider" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
          <div className="celestial-divider-line" />
          <span className="celestial-divider-star">✦</span>
          <div className="celestial-divider-line" />
        </div>
        <p style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 400,
          color: "var(--cel-text)", letterSpacing: "0.03em", marginBottom: "0.5rem",
        }}>
          Save The Date
        </p>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--cel-text-dim)",
          letterSpacing: "0.08em", lineHeight: 1.8,
        }}>
          Ahad, 5 Juli 2026<br />
          Gedung Auditorium Koni, Jakarta Pusat
        </p>
      </div>

      <style>{`
        .cel-countdown-number {
          transition: text-shadow 0.4s ease;
        }

        /* Thin shimmer sweep — a faint light line passes through every second */
        .cel-countdown-shimmer {
          height: 0;
          overflow: visible;
          pointer-events: none;
          animation: cel-shimmer-sweep 1.2s ease-out forwards;
        }

        @keyframes cel-shimmer-sweep {
          0% {
            box-shadow: 0 0 0 0 rgba(201, 169, 110, 0);
          }
          20% {
            box-shadow: 0 -1px 40px 2px rgba(201, 169, 110, 0.08);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(201, 169, 110, 0);
          }
        }
      `}</style>
    </section>
  );
}
