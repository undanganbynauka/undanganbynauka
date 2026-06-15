"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function BrideGroomSection() {
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
      setTimeout(() => setStep(1), 200),   // groom avatar
      setTimeout(() => setStep(2), 600),   // groom name
      setTimeout(() => setStep(3), 900),   // groom parents
      setTimeout(() => setStep(4), 1300),  // divider lines
      setTimeout(() => setStep(5), 1600),  // divider star
      setTimeout(() => setStep(6), 2000),  // bride avatar
      setTimeout(() => setStep(7), 2400),  // bride name
      setTimeout(() => setStep(8), 2700),  // bride parents
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="mempelai" style={{
      position: "relative", padding: "3rem 1.5rem 5rem",
      display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2",
    }}>
      {/* Groom */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
          width: "140px", height: "140px", borderRadius: "50%",
          border: "0.75px solid rgba(125, 110, 99, 0.15)",
          margin: "0 auto 1.5rem", overflow: "hidden",
          opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "scale(1)" : "scale(0.95)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          <Image src="/sacred/groom-avatar.png" alt="Ali Rahman" width={140} height={140}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 500,
          letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A",
          marginBottom: "0.5rem",
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>Mempelai Pria</p>
        <h3 style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 500,
          color: "#2E2E2E", marginBottom: "0.5rem",
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
        }}>Ali Rahman</h3>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A",
          lineHeight: 1.7,
          opacity: step >= 3 ? 0.8 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          Putra dari<br />Bapak Hendri &amp; Ibu Ningsih
        </p>
      </div>

      {/* Decorative Divider ── ✦ ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "120px",
        marginBottom: "3rem",
      }}>
        {/* Left line */}
        <div style={{
          flex: 1,
          height: "0.5px",
          background: "#C8B28A",
          opacity: step >= 4 ? 0.35 : 0,
          transform: step >= 4 ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "right center",
          transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
        }} />
        {/* Star symbol (SVG) */}
        <svg
          width="10" height="10" viewBox="0 0 24 24"
          fill="#C8B28A"
          style={{
            margin: "0 6px",
            opacity: step >= 5 ? 0.4 : 0,
            transform: step >= 5 ? "scale(1)" : "scale(0.8)",
            transition: `opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s`,
          }}
        >
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        {/* Right line */}
        <div style={{
          flex: 1,
          height: "0.5px",
          background: "#C8B28A",
          opacity: step >= 4 ? 0.35 : 0,
          transform: step >= 4 ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left center",
          transition: `opacity 0.8s ease-out, transform 0.8s ease-out`,
        }} />
      </div>

      {/* Bride */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "140px", height: "140px", borderRadius: "50%",
          border: "0.75px solid rgba(125, 110, 99, 0.15)",
          margin: "0 auto 1.5rem", overflow: "hidden",
          opacity: step >= 6 ? 1 : 0, transform: step >= 6 ? "scale(1)" : "scale(0.95)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          <Image src="/sacred/bride-avatar.png" alt="Lyla Azzahra" width={140} height={140}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 500,
          letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A",
          marginBottom: "0.5rem",
          opacity: step >= 7 ? 1 : 0, transform: step >= 7 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>Mempelai Wanita</p>
        <h3 style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 500,
          color: "#2E2E2E", marginBottom: "0.5rem",
          opacity: step >= 7 ? 1 : 0, transform: step >= 7 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
        }}>Lyla Azzahra</h3>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A",
          lineHeight: 1.7,
          opacity: step >= 8 ? 0.8 : 0, transform: step >= 8 ? "translateY(0)" : "translateY(10px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          Putri dari<br />Bapak Yusuf &amp; Ibu Rahayu
        </p>
      </div>
    </section>
  );
}
