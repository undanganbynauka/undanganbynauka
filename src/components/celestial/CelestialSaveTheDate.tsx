"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialSaveTheDate() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Step-based text animation chain
  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Image fades in (0s — handled by visible)
    // Step 2: "The Wedding of" (0.8s)
    timers.push(setTimeout(() => setStep(2), 800));

    // Step 3: "Ali" appears (1.8s)
    timers.push(setTimeout(() => setStep(3), 1800));

    // Step 4: "&" gold glow (2.6s)
    timers.push(setTimeout(() => setStep(4), 2600));

    // Step 5: "Lyla" appears (3.3s)
    timers.push(setTimeout(() => setStep(5), 3300));

    // Step 6: Date appears (4.2s)
    timers.push(setTimeout(() => setStep(6), 4200));

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const easeInOut = "cubic-bezier(0.42, 0, 0.58, 1)";

  return (
    <section
      ref={sectionRef}
      className="celestial-section"
      style={{
        background: "#0F1530",
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full viewport image */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Image — 100% width & height, cover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/celestial/save-the-date.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: visible ? 1 : 0,
            transition: `opacity 1.5s ${ease}`,
          }}
        />

        {/* Dark overlay — dim the image slightly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(11, 16, 38, 0.35)",
            opacity: visible ? 1 : 0,
            transition: `opacity 1.5s ${ease} 0.2s`,
          }}
        />

        {/* Bottom gradient fade into next section */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "35%",
            background: "linear-gradient(to top, #0F1530 0%, rgba(15,21,48,0.5) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* Text — bottom left corner, step-by-step reveal */}
        <div
          style={{
            position: "absolute",
            bottom: "5rem",
            left: "1.5rem",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* The Wedding of — step 2 */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.5625rem",
              fontWeight: 400,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--cel-accent)",
              marginBottom: "0.75rem",
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
            }}
          >
            The Wedding of
          </p>

          {/* Names — step 3-5 */}
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
            {/* "Ali" — step 3 */}
            <span
              style={{
                display: "inline-block",
                opacity: step >= 3 ? 1 : 0,
                transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
                transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
              }}
            >
              Ali
            </span>{" "}
            {/* "&" — step 4: gold glow breathing */}
            <span
              style={{
                color: "var(--cel-accent)",
                fontWeight: 400,
                display: "inline-block",
                opacity: step >= 4 ? 1 : 0,
                transform: step >= 4 ? "scale(1)" : "scale(0.7)",
                transition: `opacity 0.6s ${easeInOut}, transform 0.6s ${easeInOut}`,
                animation: step >= 4 ? "celSaveAmpGlow 4s ease-in-out infinite" : "none",
              }}
            >
              &amp;
            </span>{" "}
            {/* "Lyla" — step 5 */}
            <span
              style={{
                display: "inline-block",
                opacity: step >= 5 ? 1 : 0,
                transform: step >= 5 ? "translateY(0)" : "translateY(15px)",
                transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
              }}
            >
              Lyla
            </span>
          </h2>

          {/* Date — step 6 */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.625rem",
              fontWeight: 400,
              letterSpacing: "0.18em",
              color: "var(--cel-text-dim)",
              opacity: step >= 6 ? 1 : 0,
              transform: step >= 6 ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
            }}
          >
            05 Juli 2026
          </p>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes celSaveAmpGlow {
          0%, 100% { text-shadow: 0 0 12px rgba(201,169,110,0.4), 0 0 24px rgba(201,169,110,0.15); }
          50% { text-shadow: 0 0 20px rgba(201,169,110,0.7), 0 0 40px rgba(201,169,110,0.3), 0 0 60px rgba(201,169,110,0.1); }
        }
      `}</style>
    </section>
  );
}
