"use client";

import React, { useState, useEffect, useRef } from "react";

export function BismillahSection() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(1), 300),   // top divider
      setTimeout(() => setStep(2), 800),   // quote
      setTimeout(() => setStep(3), 1400),  // reference
      setTimeout(() => setStep(4), 2000),  // bottom divider
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} style={{
      position: "relative",
      padding: "5rem 1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      background: "#FAF7F2",
    }}>
      {/* Top divider */}
      <div style={{
        width: "80px",
        height: "0.5px",
        background: "#C8B28A",
        opacity: step >= 1 ? 0.4 : 0,
        transform: step >= 1 ? "scaleX(1)" : "scaleX(0)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        marginBottom: "2.5rem",
      }} />

      {/* Quote */}
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontSize: "1.125rem",
        fontWeight: 400,
        color: "#2E2E2E",
        textAlign: "center",
        lineHeight: 2,
        maxWidth: "18rem",
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}`,
        marginBottom: "1.25rem",
      }}>
        &ldquo;Mereka adalah pakaian bagimu,
        dan kamu adalah pakaian bagi mereka.&rdquo;
      </p>

      {/* Reference */}
      <p style={{
        fontFamily: "var(--font-jakarta)",
        fontSize: "0.5625rem",
        fontWeight: 400,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#8A8A8A",
        opacity: step >= 3 ? 0.7 : 0,
        transform: step >= 3 ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
        marginBottom: "2.5rem",
      }}>
        QS. Al-Baqarah : 187
      </p>

      {/* Bottom divider */}
      <div style={{
        width: "80px",
        height: "0.5px",
        background: "#C8B28A",
        opacity: step >= 4 ? 0.4 : 0,
        transform: step >= 4 ? "scaleX(1)" : "scaleX(0)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
      }} />
    </section>
  );
}
