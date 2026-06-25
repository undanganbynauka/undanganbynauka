"use client";

import React, { useState, useEffect, useRef } from "react";

interface CelestialSaveTheDateProps {
  groomName?: string;
  brideName?: string;
  akadDate?: string;
}

function formatLongDate(isoDate: string): string {
  if (!isoDate) return "5 Desember 2026";
  try {
    const d = new Date(`${isoDate}T00:00:00+07:00`);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
  } catch { return isoDate; }
}

export function CelestialSaveTheDate({ groomName = "Ali", brideName = "Lyla", akadDate = "2026-12-05" }: CelestialSaveTheDateProps = {}) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dateLabel = formatLongDate(akadDate);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(2), 600));
    timers.push(setTimeout(() => setStep(3), 1200));
    timers.push(setTimeout(() => setStep(4), 1650));
    timers.push(setTimeout(() => setStep(5), 2100));
    timers.push(setTimeout(() => setStep(6), 2550));
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const EASE = "cubic-bezier(0.42, 0, 0.58, 1)";

  return (
    <section ref={sectionRef} id="home" className="celestial-section" style={{ background: "#0F1530", padding: 0, position: "relative", overflow: "hidden" }}>
      <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/celestial/save-the-date.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", opacity: visible ? 1 : 0, transition: `opacity 1.5s ${EASE}` }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(11, 16, 38, 0.35)", opacity: visible ? 1 : 0, transition: `opacity 1.5s ${EASE} 0.2s` }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px", animation: visible ? "celSaveGrainDrift 20s linear infinite" : "none", zIndex: 2 }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
          <div style={{ position: "absolute", inset: 0, animation: visible ? "celSaveStarDriftA 60s linear infinite" : "none" }}>
            {[{ t: 8, l: 12 }, { t: 15, l: 72 }, { t: 22, l: 45 }, { t: 35, l: 88 }, { t: 42, l: 28 }, { t: 55, l: 65 }, { t: 68, l: 18 }, { t: 75, l: 52 }, { t: 85, l: 80 }, { t: 12, l: 38 }, { t: 48, l: 95 }, { t: 62, l: 8 }, { t: 90, l: 42 }, { t: 28, l: 58 }, { t: 78, l: 33 }].map((s, i) => (
              <div key={`sa${i}`} style={{ position: "absolute", top: `${s.t}%`, left: `${s.l}%`, width: "1.5px", height: "1.5px", borderRadius: "50%", background: "rgba(201,169,110,0.35)", boxShadow: "0 0 2px rgba(201,169,110,0.15)" }} />
            ))}
          </div>
          <div style={{ position: "absolute", inset: 0, animation: visible ? "celSaveStarDriftB 80s linear infinite" : "none" }}>
            {[{ t: 5, l: 20 }, { t: 18, l: 55 }, { t: 30, l: 82 }, { t: 44, l: 15 }, { t: 58, l: 70 }, { t: 72, l: 40 }, { t: 82, l: 90 }, { t: 92, l: 25 }, { t: 25, l: 62 }, { t: 65, l: 48 }].map((s, i) => (
              <div key={`sb${i}`} style={{ position: "absolute", top: `${s.t}%`, left: `${s.l}%`, width: "1px", height: "1px", borderRadius: "50%", background: "rgba(180,190,220,0.3)", boxShadow: "0 0 1.5px rgba(180,190,220,0.1)" }} />
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4 }}>
          {[{ t: 10, l: 22, d: 0 }, { t: 18, l: 78, d: 1.2 }, { t: 32, l: 50, d: 2.5 }, { t: 45, l: 85, d: 0.8 }, { t: 55, l: 15, d: 3.1 }, { t: 62, l: 68, d: 1.8 }, { t: 70, l: 35, d: 4.0 }, { t: 78, l: 92, d: 2.2 }, { t: 85, l: 48, d: 0.5 }, { t: 25, l: 60, d: 3.5 }, { t: 38, l: 8, d: 1.5 }, { t: 52, l: 40, d: 2.8 }, { t: 88, l: 72, d: 0.3 }, { t: 15, l: 45, d: 3.8 }, { t: 68, l: 55, d: 1.0 }].map((s, i) => (
            <div key={`sp${i}`} style={{ position: "absolute", top: `${s.t}%`, left: `${s.l}%`, width: "2px", height: "2px", borderRadius: "50%", background: "rgba(201,169,110,0.5)", opacity: 0, animation: visible ? `celSaveSparkle 6s ease-in-out ${s.d}s infinite` : "none" }} />
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(to top, #0F1530 0%, rgba(15,21,48,0.5) 50%, transparent 100%)", pointerEvents: "none", zIndex: 5 }} />
        <div style={{ position: "absolute", bottom: "5rem", left: "1.5rem", textAlign: "left", display: "flex", flexDirection: "column", alignItems: "flex-start", zIndex: 6 }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.5625rem", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--cel-accent)", marginBottom: "0.75rem", opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(10px)", transition: `opacity 1s ${EASE}, transform 1s ${EASE}` }}>The Wedding of</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.25rem", fontWeight: 300, color: "var(--cel-text)", letterSpacing: "0.03em", lineHeight: 1.1, textAlign: "left", marginBottom: "0.75rem", textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(11,16,38,0.4)" }}>
            <span style={{ display: "inline-block", opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(20px)", transition: `opacity 1s ${EASE}, transform 1s ${EASE}` }}>{groomName}</span>{" "}
            <span style={{ color: "var(--cel-accent)", fontWeight: 400, display: "inline-block", opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "scale(1)" : "scale(0.8)", transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`, animation: step >= 4 ? "celSaveAmpGlow 4s ease-in-out infinite" : "none" }}>&amp;</span>{" "}
            <span style={{ display: "inline-block", opacity: step >= 5 ? 1 : 0, transform: step >= 5 ? "translateY(0)" : "translateY(20px)", transition: `opacity 1s ${EASE}, transform 1s ${EASE}` }}>{brideName}</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.625rem", fontWeight: 400, letterSpacing: "0.18em", color: "var(--cel-text-dim)", opacity: step >= 6 ? 1 : 0, transform: step >= 6 ? "translateY(0)" : "translateY(10px)", transition: `opacity 1s ${EASE}, transform 1s ${EASE}` }}>{dateLabel}</p>
        </div>
      </div>
      <style>{`
        @keyframes celSaveAmpGlow { 0%, 100% { text-shadow: 0 0 12px rgba(201,169,110,0.4), 0 0 24px rgba(201,169,110,0.15); } 50% { text-shadow: 0 0 20px rgba(201,169,110,0.7), 0 0 40px rgba(201,169,110,0.3), 0 0 60px rgba(201,169,110,0.1); } }
        @keyframes celSaveGrainDrift { 0% { transform: translate(0, 0); } 25% { transform: translate(-2px, 1px); } 50% { transform: translate(1px, -1px); } 75% { transform: translate(-1px, -2px); } 100% { transform: translate(0, 0); } }
        @keyframes celSaveStarDriftA { 0% { transform: translate(0, 0); } 100% { transform: translate(-15px, -8px); } }
        @keyframes celSaveStarDriftB { 0% { transform: translate(0, 0); } 100% { transform: translate(-10px, -12px); } }
        @keyframes celSaveSparkle { 0%, 100% { opacity: 0; } 30% { opacity: 0.35; } 50% { opacity: 0.5; } 70% { opacity: 0.3; } }
      `}</style>
    </section>
  );
}
