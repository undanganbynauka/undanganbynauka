"use client";

import React, { useState, useEffect, useRef } from "react";

interface CelestialCountdownProps {
  groomName?: string;
  brideName?: string;
  akadDate?: string;
  akadStartTime?: string;
  resepsiEndTime?: string;
  akadAddress?: string;
}

export function CelestialCountdown({ groomName = "Ali", brideName = "Lyla", akadDate = "2026-12-05", akadStartTime = "08:00", resepsiEndTime = "14:00", akadAddress = "Jakarta Pusat" }: CelestialCountdownProps = {}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const prevSeconds = useRef(-1);
  const [shimmerKey, setShimmerKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const coupleName = `${groomName} & ${brideName}`;

  useEffect(() => {
    const target = new Date(`${akadDate}T${akadStartTime}:00+07:00`).getTime();
    if (isNaN(target)) return;
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [akadDate, akadStartTime]);

  useEffect(() => {
    if (timeLeft.seconds !== prevSeconds.current) {
      prevSeconds.current = timeLeft.seconds;
      setShimmerKey((k) => k + 1);
    }
  }, [timeLeft.seconds]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => setStep(3), 2400),
      setTimeout(() => setStep(4), 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";
  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  const handleSaveDate = () => {
    const start = new Date(`${akadDate}T${akadStartTime}:00+07:00`);
    const end = new Date(`${akadDate}T${resepsiEndTime}:00+07:00`);
    const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding+${encodeURIComponent(coupleName)}&dates=${start.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}/${end.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"")}&details=The+Wedding+of+${encodeURIComponent(coupleName)}&location=${encodeURIComponent(akadAddress)}`;
    window.open(gcal, "_blank");
  };

  return (
    <section ref={sectionRef} className="celestial-section" style={{ background: "linear-gradient(180deg, #0F1530 0%, #1A2555 40%, #0F1530 100%)", padding: "4rem 1.5rem 5rem", position: "relative", overflow: "hidden" }}>
      {step >= 0 && step < 2 && (
        <div style={{ position: "absolute", top: "10%", left: "8%", pointerEvents: "none", zIndex: 5 }}>
          <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#fff", animation: "celSectionShoot 1.5s ease-out forwards" }} />
        </div>
      )}
      {step >= 1 && (
        <div style={{ position: "absolute", top: "16%", right: "12%", width: "60px", height: "60px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)", pointerEvents: "none", animation: "celSectionLightSpread 1.5s ease-out forwards" }} />
      )}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`p-${i}`} style={{ position: "absolute", width: `${1 + Math.random() * 1.5}px`, height: `${1 + Math.random() * 1.5}px`, borderRadius: "50%", background: i % 3 === 0 ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.4)", left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%`, opacity: 0, animation: `celSectionParticle ${5 + Math.random() * 7}s ease-in-out ${Math.random() * 4}s infinite` }} />
        ))}
      </div>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 400, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--cel-accent)", marginBottom: "2rem", opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(10px)", transition: `opacity 1s ${ease}, transform 1s ${ease}` }}>Our Special Day</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem", maxWidth: "18rem", width: "100%", opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(15px)", transition: `opacity 1s ${ease}, transform 1s ${ease}` }}>
        {units.map((u, i) => (
          <React.Fragment key={u.label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <p className="cel-countdown-number" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 300, color: "var(--cel-text)", lineHeight: 1, marginBottom: "0.25rem", textShadow: "0 0 6px rgba(201, 169, 110, 0.3), 0 0 12px rgba(201, 169, 110, 0.1)" }}>{String(u.value).padStart(2, "0")}</p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.375rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cel-text-muted)" }}>{u.label}</p>
            </div>
            {i < units.length - 1 && (<p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 200, color: "var(--cel-text-muted)", marginBottom: "0.75rem", textShadow: "0 0 4px rgba(201, 169, 110, 0.2)" }}>:</p>)}
          </React.Fragment>
        ))}
      </div>
      <div key={shimmerKey} className="cel-countdown-shimmer" />
      <div className="celestial-divider" style={{ justifyContent: "center", margin: "2.5rem 0", opacity: step >= 4 ? 1 : 0, transition: `opacity 1s ${ease}` }}>
        <div className="celestial-divider-line" /><span className="celestial-divider-star">✦</span><div className="celestial-divider-line" />
      </div>
      <div style={{ textAlign: "center", maxWidth: "18rem", opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "translateY(0)" : "translateY(12px)", transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}` }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.8125rem", fontWeight: 400, fontStyle: "italic", color: "var(--cel-text)", lineHeight: 2, letterSpacing: "0.02em" }}>
          Setiap langkah dalam hidup membawa cerita, dan pada titik tertentu, dua perjalanan yang berbeda dipertemukan untuk berjalan ke arah yang sama.
        </p>
      </div>
      <div style={{ marginTop: "2rem", opacity: step >= 4 ? 1 : 0, transition: `opacity 1s ${ease} 0.3s` }}>
        <button onClick={handleSaveDate} style={{ padding: "0.5rem 1.25rem", border: "1px solid var(--cel-accent)", borderRadius: "4px", background: "transparent", color: "var(--cel-accent)", fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.4s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201, 169, 110, 0.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>Save The Date</button>
      </div>
      <style>{`
        .cel-countdown-number { transition: text-shadow 0.4s ease; }
        .cel-countdown-shimmer { height: 0; overflow: visible; pointer-events: none; animation: cel-shimmer-sweep 1.2s ease-out forwards; }
        @keyframes cel-shimmer-sweep { 0% { box-shadow: 0 0 0 0 rgba(201, 169, 110, 0); } 20% { box-shadow: 0 -1px 40px 2px rgba(201, 169, 110, 0.08); } 100% { box-shadow: 0 0 0 0 rgba(201, 169, 110, 0); } }
      `}</style>
    </section>
  );
}
