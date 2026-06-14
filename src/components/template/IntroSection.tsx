"use client";

import React, { useState, useEffect, useRef } from "react";

export function IntroSection() {
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
      setTimeout(() => setStep(1), 200),   // divider
      setTimeout(() => setStep(2), 500),   // bismillah title
      setTimeout(() => setStep(3), 900),   // paragraph
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
      background: "#FAF7F2",
    }}>
      {/* Divider */}
      <div style={{
        width: "80px",
        height: "0.5px",
        background: "#C8B28A",
        opacity: step >= 1 ? 0.4 : 0,
        transform: step >= 1 ? "scaleX(1)" : "scaleX(0)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        marginBottom: "3rem",
      }} />

      {/* Bismillah */}
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontSize: "1rem",
        fontWeight: 400,
        color: "#2E2E2E",
        textAlign: "center",
        letterSpacing: "0.04em",
        opacity: step >= 2 ? 1 : 0,
        transform: step >= 2 ? "translateY(0)" : "translateY(25px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        marginBottom: "1.75rem",
      }}>
        Bismillahirrahmanirrahim
      </p>

      {/* Intro paragraph */}
      <p style={{
        fontFamily: "var(--font-jakarta)",
        fontSize: "0.8125rem",
        fontWeight: 400,
        color: "#6F6F6F",
        textAlign: "center",
        lineHeight: 2,
        maxWidth: "650px",
        opacity: step >= 3 ? 1 : 0,
        transform: step >= 3 ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 1s ${ease}, transform 1s ${ease}`,
      }}>
        Atas izin dan kehendak Allah Subhanahu wa Ta&rsquo;ala, kami dipertemukan dalam sebuah perjalanan yang penuh makna. Dengan penuh rasa syukur, izinkan kami memperkenalkan diri sebelum melangkah menuju hari yang InsyaAllah penuh keberkahan.
      </p>
    </section>
  );
}
