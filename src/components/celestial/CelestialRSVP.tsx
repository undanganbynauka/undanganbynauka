"use client";

import React, { useState, useEffect, useRef } from "react";

export function CelestialRSVP() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(-1);
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

  // Step-based animation
  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(0), 100),   // shooting star
      setTimeout(() => setStep(1), 1600),  // light spread
      setTimeout(() => setStep(2), 2400),  // subtitle
      setTimeout(() => setStep(3), 3000),  // title
      setTimeout(() => setStep(4), 3800),  // form
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const easeInOut = "cubic-bezier(0.42, 0, 0.58, 1)";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section ref={sectionRef} id="rsvp" className="celestial-section" style={{ background: "linear-gradient(180deg, var(--cel-deep) 0%, var(--cel-midnight) 100%)", padding: "4rem 1.5rem 5rem", position: "relative", overflow: "hidden" }}>
      {/* Shooting Star — signature */}
      {step >= 0 && step < 2 && (
        <div style={{ position: "absolute", top: "10%", left: "8%", pointerEvents: "none", zIndex: 5 }}>
          <div style={{
            width: "3px", height: "3px", borderRadius: "50%", background: "#fff",
            animation: "celSectionShoot 1.5s ease-out forwards",
          }} />
        </div>
      )}

      {/* Light spread */}
      {step >= 1 && (
        <div style={{
          position: "absolute", top: "16%", right: "12%",
          width: "60px", height: "60px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "celSectionLightSpread 1.5s ease-out forwards",
        }} />
      )}

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`p-${i}`} style={{
            position: "absolute",
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.4)",
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            opacity: 0,
            animation: `celSectionParticle ${5 + Math.random() * 7}s ease-in-out ${Math.random() * 4}s infinite`,
          }} />
        ))}
      </div>

      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
        marginBottom: "0.5rem",
        opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
      }}>
        Konfirmasi Kehadiran
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 300,
        color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "2rem",
        opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
      }}>
        RSVP
      </h2>

      {status === "success" ? (
        <div style={{
          textAlign: "center", maxWidth: "18rem",
          opacity: 1, animation: "cel-fade-in 0.6s ease-out",
        }}>
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✨</div>
          <p style={{
            fontFamily: "var(--font-cormorant)", fontSize: "1.125rem", color: "var(--cel-text)",
            marginBottom: "0.5rem",
          }}>
            Terima Kasih
          </p>
          <p style={{
            fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--cel-text-dim)", lineHeight: 1.7,
          }}>
            Konfirmasi kehadiran kamu telah kami terima. Sampai jumpa di hari bahagia!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          maxWidth: "20rem", width: "100%", display: "flex", flexDirection: "column", gap: "1rem",
          opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
        }}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            required
            style={{
              padding: "0.75rem 1rem", border: "1px solid var(--cel-border)",
              borderRadius: "12px", background: "var(--cel-glass)",
              color: "var(--cel-text)", fontFamily: "var(--font-inter)",
              fontSize: "0.75rem", outline: "none",
            }}
          />
          <select
            required
            defaultValue=""
            style={{
              padding: "0.75rem 1rem", border: "1px solid var(--cel-border)",
              borderRadius: "12px", background: "var(--cel-glass)",
              color: "var(--cel-text-dim)", fontFamily: "var(--font-inter)",
              fontSize: "0.75rem", outline: "none",
            }}
          >
            <option value="" disabled>Konfirmasi Kehadiran</option>
            <option value="hadir">Hadir</option>
            <option value="tidak">Tidak Hadir</option>
            <option value="ragu">Masih Ragu</option>
          </select>
          <input
            type="number"
            placeholder="Jumlah Tamu"
            min={1}
            max={5}
            style={{
              padding: "0.75rem 1rem", border: "1px solid var(--cel-border)",
              borderRadius: "12px", background: "var(--cel-glass)",
              color: "var(--cel-text)", fontFamily: "var(--font-inter)",
              fontSize: "0.75rem", outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            style={{
              padding: "0.75rem 2rem", border: "1px solid var(--cel-accent)",
              borderRadius: "9999px", background: "rgba(201, 169, 110, 0.08)",
              color: "var(--cel-accent)", fontFamily: "var(--font-inter)",
              fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.15em",
              textTransform: "uppercase", cursor: "pointer",
              transition: "all 0.3s ease",
              opacity: status === "loading" ? 0.6 : 1,
            }}
          >
            Kirim
          </button>
        </form>
      )}
    </section>
  );
}
