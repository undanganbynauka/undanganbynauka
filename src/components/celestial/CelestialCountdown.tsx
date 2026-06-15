"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ──────────────────────────────────────────────
   Star Reveal Countdown — Canvas-based
   Numbers formed from star particles that
   scatter & regroup when the value changes.
   ────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isGold: boolean;
}

const PARTICLES_PER_DIGIT = 35;
const SCATTER_FORCE = 60;

// Sample positions from a text rendered on offscreen canvas
function sampleTextPositions(
  text: string,
  width: number,
  height: number,
  fontSize: number
): { x: number; y: number }[] {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  ctx.fillStyle = "#fff";
  ctx.font = `300 ${fontSize}px Cormorant Garamond, serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const positions: { x: number; y: number }[] = [];

  // Sample every 3rd pixel for performance
  for (let y = 0; y < height; y += 3) {
    for (let x = 0; x < width; x += 3) {
      const idx = (y * width + x) * 4;
      if (data[idx + 3] > 128) {
        positions.push({ x, y });
      }
    }
  }

  return positions;
}

// Randomly pick N positions from the sampled set
function pickPositions(
  positions: { x: number; y: number }[],
  count: number
): { x: number; y: number }[] {
  if (positions.length === 0) {
    // Fallback: random cluster
    return Array.from({ length: count }, () => ({
      x: 20 + Math.random() * 30,
      y: 10 + Math.random() * 30,
    }));
  }
  const shuffled = [...positions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function createParticles(
  targets: { x: number; y: number }[],
  oldParticles?: Particle[]
): Particle[] {
  return targets.map((t, i) => {
    const old = oldParticles?.[i];
    return {
      x: old?.x ?? t.x + (Math.random() - 0.5) * SCATTER_FORCE,
      y: old?.y ?? t.y + (Math.random() - 0.5) * SCATTER_FORCE,
      targetX: t.x,
      targetY: t.y,
      originX: old?.x ?? t.x,
      originY: old?.y ?? t.y,
      size: 1 + Math.random() * 1.5,
      alpha: 0.6 + Math.random() * 0.4,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      twinklePhase: Math.random() * Math.PI * 2,
      isGold: Math.random() < 0.25,
    };
  });
}

// Single canvas digit unit
function StarDigitCanvas({
  value,
  width,
  height,
  fontSize,
  visible,
}: {
  value: string;
  width: number;
  height: number;
  fontSize: number;
  visible: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const prevValueRef = useRef(value);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const rebuildParticles = useCallback(
    (val: string, animate = true) => {
      const positions = sampleTextPositions(val, width, height, fontSize);
      const targets = pickPositions(positions, PARTICLES_PER_DIGIT);
      const oldParticles = animate ? particlesRef.current : undefined;

      particlesRef.current = createParticles(targets, oldParticles);
      prevValueRef.current = val;
    },
    [width, height, fontSize]
  );

  // Initial build
  useEffect(() => {
    if (!visible) return;
    rebuildParticles(value, false);
  }, [visible, rebuildParticles, value]);

  // Rebuild on value change
  useEffect(() => {
    if (value !== prevValueRef.current && visible) {
      rebuildParticles(value, true);
    }
  }, [value, visible, rebuildParticles]);

  // Animation loop
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Ease toward target
        p.x = lerp(p.x, p.targetX, 0.08);
        p.y = lerp(p.y, p.targetY, 0.08);

        // Twinkle
        const twinkle =
          0.5 + 0.5 * Math.sin(timeRef.current * p.twinkleSpeed + p.twinklePhase);
        const alpha = p.alpha * (0.4 + 0.6 * twinkle);

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.isGold) {
          ctx.fillStyle = `rgba(201, 169, 110, ${alpha})`;
          ctx.shadowColor = "rgba(201, 169, 110, 0.5)";
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(232, 228, 220, ${alpha})`;
          ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
          ctx.shadowBlur = 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [visible, width, height]);

  if (!visible) return <div style={{ width, height }} />;

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height, display: "block" }}
    />
  );
}

/* ── Main Component ── */

export function CelestialCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [visible, setVisible] = useState(false);
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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setVisible(true);
      },
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

  // Canvas sizing — responsive
  const canvasW = 72;
  const canvasH = 52;
  const fontSize = 36;

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

      {/* ── Star Reveal Countdown Grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0.5rem",
          maxWidth: "20rem",
          width: "100%",
        }}
      >
        {units.map((u, i) => (
          <div
            key={u.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "var(--cel-glass)",
              border: "1px solid var(--cel-border)",
              borderRadius: "16px",
              padding: "0.75rem 0.25rem 0.625rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s ${ease} ${0.15 + i * 0.1}s, transform 0.8s ${ease} ${0.15 + i * 0.1}s`,
              // Subtle glow pulse on the card
              animation: visible
                ? `cel-countdown-glow 3s ease-in-out ${i * 0.4}s infinite`
                : "none",
            }}
          >
            <StarDigitCanvas
              value={String(u.value).padStart(2, "0")}
              width={canvasW}
              height={canvasH}
              fontSize={fontSize}
              visible={visible}
            />
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.5rem",
                fontWeight: 400,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--cel-text-dim)",
                marginTop: "0.25rem",
              }}
            >
              {u.label}
            </p>
          </div>
        ))}
      </div>

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

      {/* ── Keyframe styles ── */}
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
      `}</style>
    </section>
  );
}
