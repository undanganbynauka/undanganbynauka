"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

/**
 * CelestialNightSky — "Save the Date" night sky section before Countdown.
 * Dark sky + stars + shooting star + grass silhouette + text bottom-left.
 * Step-based animation: total 7-9 seconds.
 */

const EASE = "cubic-bezier(0.42, 0, 0.58, 1)";

/* ── Twinkling Stars (small, slowly moving) ── */
function NightStars({ visible }: { visible: boolean }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 70, // only upper 70%
        size: Math.random() * 1.5 + 0.4,
        delay: Math.random() * 3,
        duration: Math.random() * 4 + 3,
        drift: (Math.random() - 0.5) * 0.3, // slow horizontal drift
      })),
    []
  );

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: star.size > 1 ? "rgba(201, 169, 110, 0.9)" : "rgba(255, 255, 255, 0.75)",
            boxShadow: star.size > 1 ? "0 0 4px rgba(201, 169, 110, 0.4)" : "0 0 2px rgba(255,255,255,0.3)",
            opacity: visible ? 1 : 0,
            animation: visible
              ? `celNightTwinkle ${star.duration}s ease-in-out ${star.delay}s infinite, celNightDrift ${20 + star.drift * 40}s linear infinite`
              : "none",
            transition: `opacity 2s ${EASE}`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Grass Silhouette ── */
function GrassSilhouette({ step }: { step: number }) {
  const visible = step >= 4;
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "18%",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1.5s ${EASE}, transform 1.5s ${EASE}`,
      }}
    >
      <svg
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        {/* Back layer — darker grass */}
        <path
          d="M0,80 L0,55 Q10,30 15,50 Q20,20 25,45 Q30,10 35,40 Q40,25 45,48 Q50,15 55,42 Q60,28 65,50 Q70,18 75,45 Q80,30 85,52 Q90,12 95,38 Q100,22 105,48 Q110,8 115,35 Q120,28 125,50 Q130,15 135,42 Q140,25 145,48 Q150,10 155,38 Q160,22 165,45 Q170,18 175,50 Q180,12 185,40 Q190,25 195,48 Q200,8 205,35 Q210,20 215,45 Q220,15 225,42 Q230,28 235,50 Q240,12 245,38 Q250,22 255,48 Q260,10 265,35 Q270,25 275,45 Q280,18 285,50 Q290,12 295,40 Q300,28 305,48 Q310,15 315,42 Q320,22 325,45 Q330,10 335,38 Q340,20 345,50 Q350,15 355,42 Q360,28 365,48 Q370,18 375,45 Q380,12 385,40 Q390,25 395,48 L400,50 L400,80 Z"
          fill="rgba(8, 12, 28, 0.85)"
          style={{
            animation: visible ? "celNightGrassSway 8s ease-in-out infinite" : "none",
            transformOrigin: "bottom center",
          }}
        />
        {/* Front layer — darkest grass */}
        <path
          d="M0,80 L0,62 Q8,45 12,58 Q18,35 22,55 Q28,28 32,52 Q38,40 42,56 Q48,30 52,50 Q58,38 62,58 Q68,25 72,48 Q78,35 82,55 Q88,22 92,45 Q98,38 102,56 Q108,28 112,50 Q118,35 122,55 Q128,20 132,48 Q138,32 142,52 Q148,25 152,50 Q158,35 162,55 Q168,22 172,45 Q178,38 182,58 Q188,30 192,52 Q198,35 202,55 Q208,25 212,48 Q218,32 222,52 Q228,20 232,45 Q238,35 242,55 Q248,28 252,50 Q258,32 262,55 Q268,22 272,48 Q278,35 282,52 Q288,25 292,50 Q298,30 302,55 Q308,22 312,45 Q318,35 322,52 Q328,28 332,50 Q338,32 342,55 Q348,25 352,48 Q358,35 362,55 Q368,28 372,50 Q378,22 382,45 Q388,35 392,55 L400,52 L400,80 Z"
          fill="rgba(5, 8, 20, 0.95)"
          style={{
            animation: visible ? "celNightGrassSway2 10s ease-in-out 1s infinite" : "none",
            transformOrigin: "bottom center",
          }}
        />
      </svg>
    </div>
  );
}

/* ── Main Component ── */
export function CelestialNightSky() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver
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

  // Step-based animation chain (total ~5s)
  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // step 1: Stars begin appearing
    timers.push(setTimeout(() => setStep(1), 0));

    // step 2: Shooting star
    timers.push(setTimeout(() => setStep(2), 350));

    // step 3: Background fully revealed
    timers.push(setTimeout(() => setStep(3), 1000));

    // step 4: Grass silhouette fades in
    timers.push(setTimeout(() => setStep(4), 1700));

    // step 5: "The Wedding Of" text
    timers.push(setTimeout(() => setStep(5), 2400));

    // step 6: "Ali" appears
    timers.push(setTimeout(() => setStep(6), 3100));

    // step 7: "&" glow
    timers.push(setTimeout(() => setStep(7), 3600));

    // step 8: "Lyla" appears
    timers.push(setTimeout(() => setStep(8), 4100));

    // step 9: Date appears
    timers.push(setTimeout(() => setStep(9), 4700));

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="celestial-section"
      style={{
        background: "linear-gradient(180deg, #080C1C 0%, #0B1026 30%, #111836 70%, #0B1026 100%)",
        padding: 0,
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes celNightTwinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
        @keyframes celNightDrift {
          0% { transform: translateX(0); }
          50% { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
        @keyframes celNightShoot {
          0% {
            transform: translateX(0) translateY(0);
            box-shadow:
              0 0 8px 3px rgba(255,255,255,0.9),
              0 0 16px 6px rgba(201,169,110,0.5),
              -12px 6px 14px 3px rgba(201,169,110,0.3),
              -24px 12px 20px 2px rgba(255,255,255,0.15),
              -36px 18px 26px 1px rgba(201,169,110,0.06);
            opacity: 1;
          }
          70% { opacity: 1; }
          100% {
            transform: translateX(280px) translateY(140px);
            box-shadow: 0 0 4px 1px rgba(201,169,110,0.1);
            opacity: 0;
          }
        }
        @keyframes celNightShootFade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes celNightGrassSway {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(0.5deg); }
          75% { transform: skewX(-0.3deg); }
        }
        @keyframes celNightGrassSway2 {
          0%, 100% { transform: skewX(0deg); }
          30% { transform: skewX(-0.4deg); }
          70% { transform: skewX(0.3deg); }
        }
        @keyframes celNightAmpGlow {
          0%, 100% { text-shadow: 0 0 12px rgba(201,169,110,0.4), 0 0 24px rgba(201,169,110,0.15); }
          50% { text-shadow: 0 0 20px rgba(201,169,110,0.7), 0 0 40px rgba(201,169,110,0.3), 0 0 60px rgba(201,169,110,0.1); }
        }
      `}</style>

      {/* Stars — appear first */}
      <NightStars visible={step >= 1} />

      {/* Shooting star — 2s duration, gold trail */}
      {step === 2 && (
        <div style={{ position: "absolute", top: "8%", right: "15%", pointerEvents: "none", zIndex: 5 }}>
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#fff",
              animation: "celNightShoot 2s ease-out forwards",
              transform: "rotate(35deg)",
            }}
          />
        </div>
      )}

      {/* Light spread after shooting star */}
      {step >= 2 && step < 4 && (
        <div
          style={{
            position: "absolute",
            top: "12%",
            right: "18%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "celSectionLightSpread 1.5s ease-out forwards",
          }}
        />
      )}

      {/* Floating particles — always alive */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`np-${i}`}
            style={{
              position: "absolute",
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              borderRadius: "50%",
              background: i % 3 === 0 ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.3)",
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 85}%`,
              opacity: step >= 3 ? undefined : 0,
              animation: step >= 3
                ? `celSectionParticle ${6 + Math.random() * 8}s ease-in-out ${Math.random() * 5}s infinite`
                : "none",
              transition: `opacity 1.5s ${EASE}`,
            }}
          />
        ))}
      </div>

      {/* Bottom gradient — blend into grass */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(to top, rgba(8,12,28,0.9) 0%, rgba(8,12,28,0.4) 50%, transparent 100%)",
          pointerEvents: "none",
          opacity: step >= 4 ? 1 : 0,
          transition: `opacity 1.5s ${EASE}`,
        }}
      />

      {/* Grass Silhouette */}
      <GrassSilhouette step={step} />

      {/* ── TEXT — bottom left ── */}
      <div
        style={{
          position: "absolute",
          bottom: "4rem",
          left: "1.5rem",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          zIndex: 10,
        }}
      >
        {/* "The Wedding Of" — step 5 */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5625rem",
            fontWeight: 400,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--cel-accent)",
            marginBottom: "0.75rem",
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
          }}
        >
          The Wedding Of
        </p>

        {/* Names — "Ali & Lyla" step 6-8 */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "2.25rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            letterSpacing: "0.03em",
            lineHeight: 1.1,
            textAlign: "left",
            marginBottom: "0.75rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(11,16,38,0.4)",
          }}
        >
          {/* "Ali" — step 6 */}
          <span
            style={{
              opacity: step >= 6 ? 1 : 0,
              transform: step >= 6 ? "translateY(0)" : "translateY(15px)",
              display: "inline-block",
              transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
            }}
          >
            Ali
          </span>{" "}
          {/* "&" — step 7: gold glow */}
          <span
            style={{
              color: "var(--cel-accent)",
              fontWeight: 400,
              opacity: step >= 7 ? 1 : 0,
              transform: step >= 7 ? "scale(1)" : "scale(0.7)",
              display: "inline-block",
              transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
              animation: step >= 7 ? "celNightAmpGlow 4s ease-in-out infinite" : "none",
            }}
          >
            &amp;
          </span>{" "}
          {/* "Lyla" — step 8 */}
          <span
            style={{
              opacity: step >= 8 ? 1 : 0,
              transform: step >= 8 ? "translateY(0)" : "translateY(15px)",
              display: "inline-block",
              transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
            }}
          >
            Lyla
          </span>
        </h2>

        {/* Date — step 9 */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            letterSpacing: "0.18em",
            color: "var(--cel-text-dim)",
            opacity: step >= 9 ? 1 : 0,
            transform: step >= 9 ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
          }}
        >
          05 Juli 2026
        </p>
      </div>
    </section>
  );
}
