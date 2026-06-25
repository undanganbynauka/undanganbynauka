"use client";

import React, { useState, useEffect, useRef } from "react";

interface JourneyPhase {
  phase: string;
  date: string;
  description: string;
}

interface OurJourneySectionProps {
  journey?: JourneyPhase[];
}

const DEFAULT_JOURNEY: JourneyPhase[] = [
  { phase: "Ta'aruf", date: "Maret 2026", description: "Pertemuan pertama yang terasa seperti kenangan lama. Dua jiwa yang tak saling kenal, namun dunia seolah sudah mengatur jalan mereka untuk berpapasan." },
  { phase: "Nadzor", date: "Maret 2026", description: "Langkah kedua yang penuh kehati-hatian dan keindahan. Masing-masing melihat dengan mata hati, memastikan bahwa perasaan ini bukan sekadar ilusi." },
  { phase: "Khitbah", date: "Juni 2026", description: "Sebuah janji yang diucapkan dengan penuh keyakinan. Di hadapan keluarga, dua nama resmi disatukan dalam satu ikatan yang suci." },
  { phase: "Menikah", date: "Desember 2026", description: "Puncak dari segala doa dan harapan. Hari di mana dua jiwa akhirnya menjadi satu, di bawah rahmat dan berkat-Nya." },
];

export function OurJourneySection({ journey }: OurJourneySectionProps = {}) {
  const phases = (journey && journey.length > 0) ? journey : DEFAULT_JOURNEY;
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const t = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 600),
      setTimeout(() => setStep(3), 1000),
      setTimeout(() => setStep(4), 1200),
      setTimeout(() => setStep(5), 2000),
      setTimeout(() => setStep(6), 2800),
      setTimeout(() => setStep(7), 3600),
      setTimeout(() => setStep(8), 4400),
      setTimeout(() => setStep(9), 5200),
      setTimeout(() => setStep(10), 6000),
    ];
    return () => t.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  const getDotState = (i: number) => {
    const activeStep = (() => {
      if (step >= 10) return 3;
      if (step >= 9) return 3;
      if (step >= 8) return 2;
      if (step >= 7) return 2;
      if (step >= 6) return 1;
      if (step >= 5) return 1;
      if (step >= 4) return 0;
      return -1;
    })();
    const passedStep = (() => {
      if (step >= 9) return 2;
      if (step >= 7) return 1;
      if (step >= 5) return 0;
      return -1;
    })();
    if (i === activeStep) return "active";
    if (i <= passedStep) return "passed";
    return "inactive";
  };

  const getLineProgress = (segmentIndex: number) => {
    if (segmentIndex === 0) { if (step >= 6) return 1; if (step >= 5) return 0.5; if (step >= 4) return 0; return 0; }
    if (segmentIndex === 1) { if (step >= 8) return 1; if (step >= 7) return 0.5; return 0; }
    if (segmentIndex === 2) { if (step >= 10) return 1; if (step >= 9) return 0.5; return 0; }
    return 0;
  };

  const isContentVisible = (i: number) => {
    if (i === 0) return step >= 4;
    if (i === 1) return step >= 6;
    if (i === 2) return step >= 8;
    if (i === 3) return step >= 10;
    return false;
  };

  return (
    <section ref={sectionRef} id="journey" style={{ position: "relative", padding: "4rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2" }}>
      <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)", transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}` }}>Perjalanan cinta yang Allah satukan</p>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "2.5rem", opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(15px)", transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s` }}>Kisah Kami</h2>
      <div style={{ maxWidth: "22rem", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", left: "11px", top: "0.5rem", bottom: "0.5rem", width: "0.5px", background: "rgba(200, 178, 138, 0.15)" }} />
        {phases.slice(0, -1).map((_, i) => {
          const segmentHeight = `calc(${100 / (phases.length - 1)}% - 1rem)`;
          const topOffset = `calc(${(i * 100) / (phases.length - 1)}% + 0.5rem)`;
          const progress = getLineProgress(i);
          return (
            <div key={`line-${i}`} style={{ position: "absolute", left: "11px", top: topOffset, height: segmentHeight, width: "0.5px", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", background: "rgba(200, 178, 138, 0.4)", transformOrigin: "top", transform: `scaleY(${progress})`, transition: `transform 1.2s ease-out` }} />
            </div>
          );
        })}
        {phases.map((p, i) => {
          const dotState = getDotState(i);
          const contentVisible = isContentVisible(i);
          return (
            <div key={p.phase} style={{ display: "flex", gap: "1rem", marginBottom: i < phases.length - 1 ? "2rem" : 0, opacity: contentVisible ? 1 : 0, transform: contentVisible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.8s ease-out, transform 0.8s ease-out` }}>
              <div style={{ width: "23px", flexShrink: 0, display: "flex", justifyContent: "center", paddingTop: "0.35rem" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#7D6A52", opacity: dotState === "active" ? 1 : dotState === "passed" ? 0.45 : 0.2, transform: dotState === "active" ? "scale(1)" : dotState === "passed" ? "scale(0.9)" : "scale(1)", transition: "opacity 0.6s ease-out, transform 0.6s ease-out" }} />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.125rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>{p.phase}</h3>
                <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7D6A52", marginBottom: "0.5rem" }}>{p.date}</p>
                <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F", lineHeight: 1.7 }}>{p.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
