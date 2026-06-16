"use client";

import React, { useState, useEffect } from "react";

/* ── Tiny twinkling stars for the cover ── */
function CoverStars() {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.5,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generated);
  }, []);

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
            background: star.size > 1.2 ? "rgba(201, 169, 110, 0.9)" : "rgba(255, 255, 255, 0.8)",
            boxShadow: star.size > 1.2 ? "0 0 6px rgba(201, 169, 110, 0.5)" : "0 0 3px rgba(255,255,255,0.3)",
            animation: `cel-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Shooting stars for the cover ── */
function CoverShootingStar() {
  const [shootingStars, setShootingStars] = useState<
    Array<{ id: number; top: number; left: number; angle: number }>
  >([]);

  useEffect(() => {
    let counter = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 6000; // 4-10 seconds (more frequent than inside)
      timeoutId = setTimeout(() => {
        counter++;
        const star = {
          id: counter,
          top: 5 + Math.random() * 30,
          left: 10 + Math.random() * 50,
          angle: 25 + Math.random() * 25,
        };
        setShootingStars((prev) => [...prev, star]);
        setTimeout(() => {
          setShootingStars((prev) => prev.filter((s) => s.id !== star.id));
        }, 1500);
        scheduleNext();
      }, delay);
    };

    // First one appears sooner
    const firstDelay = 1500 + Math.random() * 3000;
    const firstTimeout = setTimeout(() => {
      counter++;
      const star = {
        id: counter,
        top: 8 + Math.random() * 25,
        left: 15 + Math.random() * 45,
        angle: 30 + Math.random() * 20,
      };
      setShootingStars((prev) => [...prev, star]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== star.id));
      }, 1500);
      scheduleNext();
    }, firstDelay);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {shootingStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
        >
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow:
                "0 0 10px 4px rgba(255,255,255,0.8), " +
                "-25px 0 15px 2px rgba(201,169,110,0.4), " +
                "-50px 0 25px 2px rgba(255,255,255,0.25), " +
                "-75px 0 35px 1px rgba(255,255,255,0.1)",
              animation: "cel-shooting 1.5s linear forwards",
              transform: `rotate(${star.angle}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* ── Easing constant ── */
const EASE = "cubic-bezier(0.42, 0, 0.58, 1)";

/* ── Main Hero ── */

export function CelestialHero({ onOpen }: { onOpen?: () => void }) {
  const [guestName, setGuestName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    if (name) setGuestName(decodeURIComponent(name));

    // Step-based animation chain
    const timers: ReturnType<typeof setTimeout>[] = [];

    // step 1: Shooting star phase
    timers.push(setTimeout(() => setStep(1), 300));

    // step 2: "The Wedding of" fade in
    timers.push(setTimeout(() => setStep(2), 600));

    // step 3: "Ali" fade in from below
    timers.push(setTimeout(() => setStep(3), 1200));

    // step 4: "&" with gold glow fade in
    timers.push(setTimeout(() => setStep(4), 1650));

    // step 5: "Lyla" fade in from below
    timers.push(setTimeout(() => setStep(5), 2100));

    // step 6: Date fade in
    timers.push(setTimeout(() => setStep(6), 2550));

    // step 7: "Buka Undangan" button
    timers.push(setTimeout(() => setStep(7), 3150));

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Cover image — full bleed, cover fit */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/celestial/cover.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: mounted ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />

      {/* Dark overlay — so text is readable */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(11,16,38,0.45) 0%, rgba(11,16,38,0.30) 40%, rgba(11,16,38,0.50) 70%, rgba(11,16,38,0.75) 100%)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 2s ease 0.3s",
        }}
      />

      {/* ★ Stars & Shooting stars layer ★ */}
      <CoverStars />
      <CoverShootingStar />

      {/* Content */}
      {/* Guest name */}
      {guestName && (
        <p
          style={{
            position: "relative",
            fontFamily: "var(--font-inter)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "var(--cel-accent)",
            marginBottom: "2rem",
            opacity: mounted ? 0.9 : 0,
            transition: "opacity 1.5s ease 0.3s",
          }}
        >
          Kepada Yth. {guestName}
        </p>
      )}

      {/* Names section — each element animated independently by step */}
      <div style={{ position: "relative", textAlign: "center" }}>
        {/* "The Wedding of" — step 2: cinematic opening entrance */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cel-text-dim)",
            marginBottom: "1rem",
            opacity: step >= 2 ? 1 : 0,
            transform: step >= 2 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 600ms ${EASE} 200ms, transform 600ms ${EASE} 200ms`,
          }}
        >
          The Wedding of
        </p>

        {/* "Ali" — step 3: fade in with emotional breathing glow */}
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "2.25rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            letterSpacing: "0.04em",
            lineHeight: 1.2,
            marginBottom: "0.5rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
          }}
        >
          {/* "Ali" — subtle glow breathing, 8s cycle */}
          <span
            style={{
              display: "inline-block",
              animation: step >= 3 ? "celHeroNameBreath 8s ease-in-out 1.5s infinite" : "none",
            }}
          >
            Ali
          </span>{" "}
          {/* "&" — step 4: fade in with gold glow + breathing */}
          <span
            style={{
              color: "var(--cel-accent)",
              fontWeight: 400,
              opacity: step >= 4 ? 1 : 0,
              textShadow: step >= 4
                ? "0 0 18px rgba(201,169,110,0.6), 0 0 40px rgba(201,169,110,0.25)"
                : "none",
              transition: `opacity 0.8s ${EASE}, text-shadow 1.5s ${EASE}`,
              display: "inline-block",
              transform: step >= 4 ? "scale(1)" : "scale(0.8)",
              animation: step >= 4 ? "celHeroAmpGlow 6s ease-in-out 2s infinite" : "none",
            }}
          >
            &amp;
          </span>{" "}
          {/* "Lyla" — subtle glow breathing, 10s cycle (different from Ali for organic feel) */}
          <span
            style={{
              opacity: step >= 5 ? 1 : 0,
              transform: step >= 5 ? "translateY(0)" : "translateY(20px)",
              display: "inline-block",
              transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
              animation: step >= 5 ? "celHeroNameBreath 10s ease-in-out 2.5s infinite" : "none",
            }}
          >
            Lyla
          </span>
        </h1>

        {/* Date — step 6: fade in */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.625rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            color: "var(--cel-text-muted)",
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 1s ${EASE}, transform 1s ${EASE}`,
          }}
        >
          05 . 07 . 2026
        </p>
      </div>

      {/* Open button — step 7: cinematic entrance + idle float + hover glow */}
      {onOpen && (
        <button
          onClick={onOpen}
          style={{
            position: "relative",
            marginTop: "2.5rem",
            padding: "0.5rem 1.25rem",
            border: "1px solid var(--cel-accent)",
            borderRadius: "4px",
            background: "transparent",
            color: "var(--cel-accent)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            opacity: step >= 7 ? 1 : 0,
            transform: step >= 7 ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 800ms ${EASE}, transform 800ms ${EASE}, background 0.4s ease, box-shadow 0.5s ease, border-color 0.4s ease`,
            animation: step >= 7 ? "celHeroBtnFloat 5s ease-in-out 1.5s infinite, cel-glow-pulse 4s ease-in-out infinite" : "none",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "rgba(201, 169, 110, 0.08)";
            el.style.boxShadow = "0 0 20px rgba(201,169,110,0.15), 0 0 40px rgba(201,169,110,0.06)";
            el.style.transform = "scale(1.03)";
            el.style.borderColor = "rgba(201,169,110,0.5)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.boxShadow = "none";
            el.style.transform = "scale(1)";
            el.style.borderColor = "var(--cel-accent)";
          }}
        >
          Buka Undangan
        </button>
      )}
    </div>
  );
}
