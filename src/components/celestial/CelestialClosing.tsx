"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialClosing() {
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

  // Master animation sequence — total ~9-10s
  useEffect(() => {
    if (!visible) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. Particles already visible via CSS
    // 2. Shooting star (1.5s)
    timers.push(setTimeout(() => setStep(1), 200));

    // 3. Shooting star done, light spreads
    timers.push(setTimeout(() => setStep(2), 1700));

    // 4. Crescent moon appears (fade in + scale up)
    timers.push(setTimeout(() => setStep(3), 2500));

    // 5. Quote line 1
    timers.push(setTimeout(() => setStep(4), 3800));

    // 6. Quote line 2 (0.8s + 1s delay)
    timers.push(setTimeout(() => setStep(5), 5600));

    // 7. Quote line 3
    timers.push(setTimeout(() => setStep(6), 7400));

    // 8. Author name slides in
    timers.push(setTimeout(() => setStep(7), 8500));

    // 9. Ornament lines + heart
    timers.push(setTimeout(() => setStep(8), 9400));

    // 10. Couple names fade in from below
    timers.push(setTimeout(() => setStep(9), 10300));

    // 11. Date
    timers.push(setTimeout(() => setStep(10), 11600));

    // 12. Nauka logo
    timers.push(setTimeout(() => setStep(11), 12500));

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const easeInOut = "cubic-bezier(0.42, 0, 0.58, 1)";
  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="celestial-section"
      style={{
        position: "relative",
        padding: 0,
        minHeight: "100vh",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Background image (cover.jpg with grass) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/celestial/cover.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: visible ? 1 : 0,
          transition: `opacity 1.8s ${ease}`,
        }}
      />

      {/* ── Dark overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11,16,38,0.65) 0%, rgba(11,16,38,0.50) 30%, rgba(11,16,38,0.55) 60%, rgba(11,16,38,0.85) 100%)",
          opacity: visible ? 1 : 0,
          transition: `opacity 1.8s ${ease} 0.2s`,
        }}
      />

      {/* ── Top gradient fade ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "25%",
          background:
            "linear-gradient(to bottom, #0F1530 0%, rgba(15,21,48,0.5) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Background particles ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              borderRadius: "50%",
              background:
                i % 3 === 0
                  ? "rgba(201,169,110,0.5)"
                  : "rgba(255,255,255,0.4)",
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              opacity: 0,
              animation: `celClosingParticle ${5 + Math.random() * 8}s ease-in-out ${Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── 1-2. Shooting Star ── */}
      {step >= 1 && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "6%",
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
              animation:
                step === 1
                  ? "celClosingShoot 1.5s ease-out forwards"
                  : step >= 2
                  ? "celClosingShootFade 0.8s ease-out forwards"
                  : "none",
            }}
          />
        </div>
      )}

      {/* ── Light spread after shooting star ── */}
      {step >= 2 && (
        <div
          style={{
            position: "absolute",
            top: "16%",
            right: "12%",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "celClosingLightSpread 1.5s ease-out forwards",
          }}
        />
      )}

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: "20rem",
          padding: "5rem 1.5rem 3rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── 3. Crescent Moon ── */}
        <div
          style={{
            position: "relative",
            width: "110px",
            height: "110px",
            margin: "0 auto 2.5rem",
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "scale(1) translateY(0)" : "scale(0.95) translateY(5px)",
            transition: `opacity 1.5s ${easeInOut}, transform 1.5s ${easeInOut}`,
          }}
        >
          <img
            src="/celestial/moon.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(1.1)",
              animation: step >= 3 ? "celMoonFloat 8s ease-in-out infinite, celMoonGlow 5s ease-in-out infinite" : "none",
            }}
          />
        </div>

        {/* ── 4-6. Quote — line by line ── */}
        <div
          style={{
            marginBottom: "0.75rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--cel-text)",
              lineHeight: 2.2,
              letterSpacing: "0.02em",
              textShadow: "0 2px 15px rgba(0,0,0,0.4)",
              margin: 0,
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 1s ${easeInOut}, transform 1s ${easeInOut}`,
            }}
          >
            &ldquo;Cinta bukan tentang saling memandang,
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--cel-text)",
              lineHeight: 2.2,
              letterSpacing: "0.02em",
              textShadow: "0 2px 15px rgba(0,0,0,0.4)",
              margin: 0,
              opacity: step >= 5 ? 1 : 0,
              transform: step >= 5 ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 1s ${easeInOut}, transform 1s ${easeInOut}`,
            }}
          >
            tetapi tentang melihat
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--cel-text)",
              lineHeight: 2.2,
              letterSpacing: "0.02em",
              textShadow: "0 2px 15px rgba(0,0,0,0.4)",
              margin: 0,
              opacity: step >= 6 ? 1 : 0,
              transform: step >= 6 ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 1s ${easeInOut}, transform 1s ${easeInOut}`,
            }}
          >
            ke arah yang sama.&rdquo;
          </p>
        </div>

        {/* ── 7. Author — slide from left ── */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            color: "var(--cel-accent)",
            lineHeight: 1.8,
            marginBottom: "2rem",
            letterSpacing: "0.08em",
            textShadow: "0 1px 10px rgba(0,0,0,0.3)",
            opacity: step >= 7 ? 1 : 0,
            transform: step >= 7 ? "translateX(0)" : "translateX(-15px)",
            transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
          }}
        >
          &mdash; Antoine de Saint-Exup&eacute;ry
        </p>

        {/* ── 8. Ornament lines + heart ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: step >= 8 ? "3rem" : "0",
              height: "0.5px",
              background: "linear-gradient(to right, transparent, var(--cel-accent))",
              opacity: step >= 8 ? 0.35 : 0,
              transition: `width 0.8s ${easeInOut}, opacity 0.8s ${easeInOut}`,
              overflow: "hidden",
            }}
          />
          <span
            style={{
              color: "var(--cel-accent)",
              fontSize: "0.625rem",
              opacity: step >= 8 ? 0.5 : 0,
              transition: `opacity 0.6s ${easeInOut} 0.4s`,
            }}
          >
            ♥
          </span>
          <div
            style={{
              width: step >= 8 ? "3rem" : "0",
              height: "0.5px",
              background: "linear-gradient(to left, transparent, var(--cel-accent))",
              opacity: step >= 8 ? 0.35 : 0,
              transition: `width 0.8s ${easeInOut}, opacity 0.8s ${easeInOut}`,
              overflow: "hidden",
            }}
          />
        </div>

        {/* ── 9. Couple names ── */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.625rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            letterSpacing: "0.08em",
            marginBottom: "0.5rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            opacity: step >= 9 ? 1 : 0,
            transform: step >= 9 ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1.2s ${easeInOut}, transform 1.2s ${easeInOut}`,
          }}
        >
          Ali{" "}
          <span
            style={{
              color: "var(--cel-accent)",
              textShadow: "0 0 15px rgba(201,169,110,0.3)",
            }}
          >
            &amp;
          </span>{" "}
          Lyla
        </p>

        {/* ── 10. Date ── */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5625rem",
            fontWeight: 400,
            color: "var(--cel-text-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "2rem",
            opacity: step >= 10 ? 0.6 : 0,
            transition: `opacity 1s ${easeInOut}`,
          }}
        >
          5 Desember 2026
        </p>

        {/* ── 11. Nauka Logo (watermark) ── */}
        <div
          style={{
            marginTop: "3rem",
            opacity: step >= 11 ? 0.2 : 0,
            transform: step >= 11 ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 1.2s ${easeInOut}, transform 1.2s ${easeInOut}`,
          }}
        >
          <img
            src="/nauka-logo-new.png"
            alt="Undangan by Nauka"
            style={{
              width: "4rem",
              height: "auto",
              filter: "invert(1) brightness(0.85)",
            }}
          />
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes celClosingParticle {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          20% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.12;
            transform: translateY(-14px) translateX(5px);
          }
          80% {
            opacity: 0.25;
          }
        }

        @keyframes celClosingShoot {
          0% {
            transform: translateX(0) translateY(0);
            box-shadow:
              0 0 6px 2px rgba(255,255,255,0.9),
              0 0 12px 4px rgba(201,169,110,0.5),
              -8px 4px 10px 2px rgba(201,169,110,0.3),
              -16px 8px 14px 1px rgba(255,255,255,0.12),
              -24px 12px 18px 0 rgba(201,169,110,0.06);
            opacity: 1;
          }
          70% {
            opacity: 1;
            box-shadow:
              0 0 4px 1px rgba(255,255,255,0.5),
              0 0 8px 2px rgba(201,169,110,0.25),
              -6px 3px 8px 1px rgba(201,169,110,0.15);
          }
          100% {
            transform: translateX(280px) translateY(140px);
            box-shadow: 0 0 3px 1px rgba(201,169,110,0.15);
            opacity: 0;
          }
        }

        @keyframes celClosingShootFade {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes celClosingLightSpread {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          40% {
            opacity: 0.7;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes celMoonFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes celMoonGlow {
          0%, 100% {
            filter: brightness(1.1) drop-shadow(0 0 10px rgba(201,169,110,0.15));
          }
          50% {
            filter: brightness(1.15) drop-shadow(0 0 20px rgba(201,169,110,0.25));
          }
        }
      `}</style>
    </section>
  );
}
