"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialBrideGroom() {
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

  // Master animation sequence — total ~10s
  useEffect(() => {
    if (!visible) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. Shooting star
    timers.push(setTimeout(() => setStep(1), 100));

    // 2. Shooting star done, light spreads
    timers.push(setTimeout(() => setStep(2), 1100));

    // 3. Invitation text line 1
    timers.push(setTimeout(() => setStep(3), 1600));

    // 4. Invitation text line 2
    timers.push(setTimeout(() => setStep(4), 2100));

    // 5. Groom initial circle — scale up + glow
    timers.push(setTimeout(() => setStep(5), 2600));

    // 6. Groom name — fade in from below
    timers.push(setTimeout(() => setStep(6), 3300));

    // 7. Groom decorative line
    timers.push(setTimeout(() => setStep(7), 3800));

    // 8. "Putra dari" text
    timers.push(setTimeout(() => setStep(8), 4200));

    // 9. Parent names
    timers.push(setTimeout(() => setStep(9), 4600));

    // 10. "&" symbol with glow
    timers.push(setTimeout(() => setStep(10), 5100));

    // 11. Bride initial circle — scale up + glow
    timers.push(setTimeout(() => setStep(11), 5900));

    // 12. Bride name — fade in from below
    timers.push(setTimeout(() => setStep(12), 6600));

    // 13. Bride decorative line
    timers.push(setTimeout(() => setStep(13), 7100));

    // 14. "Putri dari" text
    timers.push(setTimeout(() => setStep(14), 7500));

    // 15. Parent names
    timers.push(setTimeout(() => setStep(15), 7900));

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const easeInOut = "cubic-bezier(0.42, 0, 0.58, 1)";
  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="mempelai"
      className="celestial-section"
      style={{
        background: "var(--cel-midnight)",
        padding: "4rem 1.5rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Background particles ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              borderRadius: "50%",
              background: i % 3 === 0 ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.4)",
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              opacity: 0,
              animation: `celBgParticle ${5 + Math.random() * 7}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── 1. Shooting Star ── */}
      {step >= 1 && (
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "8%",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#fff",
              animation: step === 1
                ? "celBrideShoot 1.5s ease-out forwards"
                : step >= 2
                ? "celBrideShootFade 0.8s ease-out forwards"
                : "none",
            }}
          />
        </div>
      )}

      {/* ── 2. Light spread after shooting star ── */}
      {step >= 2 && (
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "15%",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "celLightSpread 1.5s ease-out forwards",
          }}
        />
      )}

      {/* ── 3-4. Opening invitation text ── */}
      <div
        style={{
          maxWidth: "16rem",
          textAlign: "center",
          marginBottom: "3.5rem",
          lineHeight: 2.2,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            color: "var(--cel-text-dim)",
            display: "inline",
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
          }}
        >
          Dengan penuh rasa bahagia, kami mengundang Bapak/Ibu/Saudara/i
        </span>
        <br />
        <span
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            color: "var(--cel-text-dim)",
            display: "inline",
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
          }}
        >
          untuk hadir serta memberikan doa restu pada hari bahagia kami
        </span>
      </div>

      {/* ── GROOM ── */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        {/* 5. Initial circle — scale up + glow */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "1px solid rgba(201, 169, 110, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            position: "relative",
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? "scale(1)" : "scale(0.6)",
            transition: `opacity 1s ${easeInOut}, transform 1s ${easeInOut}`,
            animation: step >= 5 ? "celInitialGlow 5s ease-in-out infinite" : "none",
          }}
        >
          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              inset: "6px",
              borderRadius: "50%",
              border: "0.5px solid rgba(201, 169, 110, 0.12)",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "3.5rem",
              fontWeight: 300,
              color: "var(--cel-text)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              position: "relative",
              zIndex: 1,
            }}
          >
            A
          </p>
        </div>

        {/* 6. Name — fade in from below */}
        <h3
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.625rem",
            fontWeight: 400,
            color: "var(--cel-text)",
            letterSpacing: "0.04em",
            marginBottom: "0.625rem",
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1.2s ${easeInOut}, transform 1.2s ${easeInOut}`,
          }}
        >
          Ali Rahman
        </h3>

        {/* 7. Decorative line */}
        <div
          style={{
            width: "2rem",
            height: "0.5px",
            background: "var(--cel-accent)",
            opacity: step >= 7 ? 0.3 : 0,
            margin: "0 auto 0.75rem",
            transition: `opacity 0.6s ${easeInOut}`,
          }}
        />

        {/* 8. "Putra dari" */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 400,
            color: "var(--cel-accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
            opacity: step >= 8 ? 0.7 : 0,
            transform: step >= 8 ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 0.6s ${easeInOut}, transform 0.6s ${easeInOut}`,
          }}
        >
          Putra dari
        </p>

        {/* 9. Parent names */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            color: "var(--cel-text-dim)",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
            opacity: step >= 9 ? 0.8 : 0,
            transform: step >= 9 ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
          }}
        >
          Bapak Hendri &amp; Ibu Ningsih
        </p>
      </div>

      {/* ── 10. "&" Divider with glow ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          marginBottom: "3rem",
          opacity: step >= 10 ? 1 : 0,
          transform: step >= 10 ? "scale(1)" : "scale(0.8)",
          transition: `opacity 1.2s ${easeInOut}, transform 1.2s ${easeInOut}`,
        }}
      >
        <div
          style={{
            width: "3rem",
            height: "0.5px",
            background: "linear-gradient(to right, transparent, var(--cel-accent))",
            opacity: 0.35,
          }}
        />
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            border: "0.5px solid var(--cel-accent)",
            opacity: 0.4,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "0.875rem",
            fontWeight: 400,
            color: "var(--cel-accent)",
            textShadow: "0 0 15px rgba(201,169,110,0.3)",
          }}
        >
          &amp;
        </span>
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            border: "0.5px solid var(--cel-accent)",
            opacity: 0.4,
          }}
        />
        <div
          style={{
            width: "3rem",
            height: "0.5px",
            background: "linear-gradient(to left, transparent, var(--cel-accent))",
            opacity: 0.35,
          }}
        />
      </div>

      {/* ── BRIDE ── */}
      <div style={{ textAlign: "center" }}>
        {/* 11. Initial circle — scale up + glow */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "1px solid rgba(201, 169, 110, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            position: "relative",
            opacity: step >= 11 ? 1 : 0,
            transform: step >= 11 ? "scale(1)" : "scale(0.6)",
            transition: `opacity 1s ${easeInOut}, transform 1s ${easeInOut}`,
            animation: step >= 11 ? "celInitialGlow 5s ease-in-out 2s infinite" : "none",
          }}
        >
          {/* Inner ring */}
          <div
            style={{
              position: "absolute",
              inset: "6px",
              borderRadius: "50%",
              border: "0.5px solid rgba(201, 169, 110, 0.12)",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "3.5rem",
              fontWeight: 300,
              color: "var(--cel-text)",
              lineHeight: 1,
              letterSpacing: "0.02em",
              position: "relative",
              zIndex: 1,
            }}
          >
            L
          </p>
        </div>

        {/* 12. Name — fade in from below */}
        <h3
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.625rem",
            fontWeight: 400,
            color: "var(--cel-text)",
            letterSpacing: "0.04em",
            marginBottom: "0.625rem",
            opacity: step >= 12 ? 1 : 0,
            transform: step >= 12 ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1.2s ${easeInOut}, transform 1.2s ${easeInOut}`,
          }}
        >
          Lyla Azzahra
        </h3>

        {/* 13. Decorative line */}
        <div
          style={{
            width: "2rem",
            height: "0.5px",
            background: "var(--cel-accent)",
            opacity: step >= 13 ? 0.3 : 0,
            margin: "0 auto 0.75rem",
            transition: `opacity 0.6s ${easeInOut}`,
          }}
        />

        {/* 14. "Putri dari" */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 400,
            color: "var(--cel-accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "0.25rem",
            opacity: step >= 14 ? 0.7 : 0,
            transform: step >= 14 ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 0.6s ${easeInOut}, transform 0.6s ${easeInOut}`,
          }}
        >
          Putri dari
        </p>

        {/* 15. Parent names */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            color: "var(--cel-text-dim)",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
            opacity: step >= 15 ? 0.8 : 0,
            transform: step >= 15 ? "translateY(0)" : "translateY(6px)",
            transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
          }}
        >
          Bapak Yusuf &amp; Ibu Rahayu
        </p>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes celBrideShoot {
          0% {
            transform: translateX(0) translateY(0);
            box-shadow:
              0 0 6px 2px rgba(255,255,255,0.9),
              0 0 12px 4px rgba(201,169,110,0.5),
              -8px 4px 10px 2px rgba(201,169,110,0.3),
              -16px 8px 14px 1px rgba(255,255,255,0.15),
              -24px 12px 18px 0 rgba(201,169,110,0.08);
            opacity: 1;
          }
          70% {
            opacity: 1;
            box-shadow:
              0 0 4px 1px rgba(255,255,255,0.6),
              0 0 8px 2px rgba(201,169,110,0.3),
              -6px 3px 8px 1px rgba(201,169,110,0.2),
              -12px 6px 10px 0 rgba(255,255,255,0.08);
          }
          100% {
            transform: translateX(250px) translateY(130px);
            box-shadow: 0 0 3px 1px rgba(201,169,110,0.2);
            opacity: 0;
          }
        }

        @keyframes celBrideShootFade {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes celLightSpread {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          40% {
            opacity: 0.8;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes celInitialGlow {
          0%, 100% {
            box-shadow:
              0 0 15px rgba(201, 169, 110, 0.05),
              0 0 30px rgba(201, 169, 110, 0.03),
              inset 0 0 15px rgba(201, 169, 110, 0.02);
          }
          50% {
            box-shadow:
              0 0 25px rgba(201, 169, 110, 0.12),
              0 0 50px rgba(201, 169, 110, 0.06),
              inset 0 0 25px rgba(201, 169, 110, 0.05);
          }
        }

        @keyframes celBgParticle {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          20% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.15;
            transform: translateY(-12px) translateX(4px);
          }
          80% {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}
