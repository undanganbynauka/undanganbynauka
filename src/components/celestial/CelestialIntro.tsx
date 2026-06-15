"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialIntro() {
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

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(1), 300),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} className="celestial-section" style={{ background: "var(--cel-deep)", padding: "4rem 1.5rem 5rem" }}>
      {/* Opening quote - universal */}
      <div style={{ textAlign: "center", maxWidth: "20rem" }}>
        <div style={{
          marginBottom: "2rem",
          opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }}>
          <p style={{
            fontFamily: "var(--font-cormorant)", fontSize: "1.125rem", fontWeight: 400,
            fontStyle: "italic", color: "var(--cel-text)", lineHeight: 2, letterSpacing: "0.02em",
          }}>
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya.&rdquo;
          </p>
        </div>

        <div style={{
          opacity: step >= 2 ? 0.6 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 1s ${ease}, transform 1s ${ease}`,
          marginBottom: "2rem",
        }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontSize: "0.625rem", fontWeight: 400,
            letterSpacing: "0.1em", color: "var(--cel-text-dim)",
          }}>
            QS. Ar-Rum: 21
          </p>
        </div>

        <div className="celestial-divider" style={{ justifyContent: "center", marginBottom: "2rem" }}>
          <div className="celestial-divider-line" />
          <span className="celestial-divider-star">✦</span>
          <div className="celestial-divider-line" />
        </div>

        <div style={{
          opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 400,
            color: "var(--cel-text-dim)", lineHeight: 1.9, letterSpacing: "0.02em",
          }}>
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.
          </p>
        </div>
      </div>
    </section>
  );
}
