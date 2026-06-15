"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const [flashKey, setFlashKey] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const prevTime = useRef({ days: -1, hours: -1, minutes: -1, seconds: -1 });
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

  // Track value changes for flash effect
  useEffect(() => {
    setFlashKey((prev) => ({
      days: timeLeft.days !== prevTime.current.days ? prev.days + 1 : prev.days,
      hours: timeLeft.hours !== prevTime.current.hours ? prev.hours + 1 : prev.hours,
      minutes: timeLeft.minutes !== prevTime.current.minutes ? prev.minutes + 1 : prev.minutes,
      seconds: timeLeft.seconds !== prevTime.current.seconds ? prev.seconds + 1 : prev.seconds,
    }));
    prevTime.current = { ...timeLeft };
  }, [timeLeft]);

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
    { label: "Hari", value: timeLeft.days, flash: flashKey.days },
    { label: "Jam", value: timeLeft.hours, flash: flashKey.hours },
    { label: "Menit", value: timeLeft.minutes, flash: flashKey.minutes },
    { label: "Detik", value: timeLeft.seconds, flash: flashKey.seconds },
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
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.625rem",
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--cel-accent)",
          marginBottom: "0.75rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        }}
      >
        Menghitung Hari
      </p>
      <h2
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "2rem",
          fontWeight: 300,
          color: "var(--cel-text)",
          letterSpacing: "0.04em",
          marginBottom: "2.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1s ${ease} 0.1s, transform 1s ${ease} 0.1s`,
        }}
      >
        Countdown
      </h2>

      {/* ── Glow Pulse Countdown Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.75rem",
          maxWidth: "20rem",
          width: "100%",
        }}
      >
        {units.map((u, i) => (
          <div
            key={u.label}
            style={{
              position: "relative",
              borderRadius: "16px",
              padding: "1.25rem 0.5rem",
              textAlign: "center",
              background: "var(--cel-glass)",
              border: "1px solid var(--cel-border)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s ${ease} ${0.15 + i * 0.1}s, transform 0.8s ${ease} ${0.15 + i * 0.1}s`,
              // Glow pulse — continuous breathing light
              animation: visible
                ? `cel-countdown-glow 3s ease-in-out ${i * 0.4}s infinite`
                : "none",
            }}
          >
            {/* Number with flash effect on change */}
            <p
              key={u.flash}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1.75rem",
                fontWeight: 300,
                color: "var(--cel-text)",
                lineHeight: 1,
                marginBottom: "0.375rem",
                animation: "cel-number-flash 0.6s ease-out",
              }}
            >
              {String(u.value).padStart(2, "0")}
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.5rem",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--cel-text-dim)",
              }}
            >
              {u.label}
            </p>

            {/* Inner glow overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "16px",
                pointerEvents: "none",
                background: "radial-gradient(ellipse at 50% 40%, rgba(201, 169, 110, 0.06) 0%, transparent 70%)",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Colon separators between units ── */}
      {/* (not using — the glow cards look cleaner without) */}

      {/* Save the Date */}
      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1s ${ease} 0.6s, transform 1s ${ease} 0.6s`,
        }}
      >
        <div
          className="celestial-divider"
          style={{ justifyContent: "center", marginBottom: "1.5rem" }}
        >
          <div className="celestial-divider-line" />
          <span className="celestial-divider-star">✦</span>
          <div className="celestial-divider-line" />
        </div>
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.25rem",
            fontWeight: 400,
            color: "var(--cel-text)",
            letterSpacing: "0.03em",
            marginBottom: "0.5rem",
          }}
        >
          Save The Date
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            color: "var(--cel-text-dim)",
            letterSpacing: "0.08em",
            lineHeight: 1.8,
          }}
        >
          Ahad, 5 Juli 2026
          <br />
          Gedung Auditorium Koni, Jakarta Pusat
        </p>
      </div>

      {/* ── Keyframe styles injected once ── */}
      <style>{`
        @keyframes cel-countdown-glow {
          0%, 100% {
            box-shadow:
              0 0 12px rgba(201, 169, 110, 0.05),
              0 0 24px rgba(201, 169, 110, 0.03),
              inset 0 0 12px rgba(201, 169, 110, 0.02);
          }
          50% {
            box-shadow:
              0 0 20px rgba(201, 169, 110, 0.15),
              0 0 40px rgba(201, 169, 110, 0.08),
              inset 0 0 20px rgba(201, 169, 110, 0.05);
          }
        }

        @keyframes cel-number-flash {
          0% {
            text-shadow:
              0 0 8px rgba(201, 169, 110, 0.8),
              0 0 20px rgba(201, 169, 110, 0.4),
              0 0 40px rgba(201, 169, 110, 0.2);
            color: #E8DCC8;
          }
          50% {
            text-shadow:
              0 0 4px rgba(201, 169, 110, 0.3),
              0 0 10px rgba(201, 169, 110, 0.1);
            color: var(--cel-text);
          }
          100% {
            text-shadow: none;
            color: var(--cel-text);
          }
        }
      `}</style>
    </section>
  );
}
