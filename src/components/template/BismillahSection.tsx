"use client";

import React, { useState, useEffect, useRef } from "react";

export function BismillahSection() {
  const [visible, setVisible] = useState(false);
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
      opacity: visible ? 1 : 0,
      transition: "opacity 600ms ease",
    }}>
      {/* Top divider */}
      <div style={{
        width: "80px",
        height: "0.5px",
        background: "#C8B28A",
        opacity: 0.4,
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
        opacity: 0.7,
        marginBottom: "2.5rem",
      }}>
        QS. Al-Baqarah : 187
      </p>

      {/* Bottom divider */}
      <div style={{
        width: "80px",
        height: "0.5px",
        background: "#C8B28A",
        opacity: 0.4,
      }} />
    </section>
  );
}
