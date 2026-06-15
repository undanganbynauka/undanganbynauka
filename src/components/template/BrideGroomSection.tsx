"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function BrideGroomSection() {
  const [visible, setVisible] = useState(false);
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

  return (
    <section ref={sectionRef} id="mempelai" style={{
      position: "relative", padding: "3.5rem 1.5rem 5rem",
      display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2",
      opacity: visible ? 1 : 0,
      transition: "opacity 600ms ease",
    }}>
      {/* Groom */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{
          width: "140px", height: "140px", borderRadius: "50%",
          border: "0.75px solid rgba(125, 110, 99, 0.15)",
          margin: "0 auto 1.5rem", overflow: "hidden",
        }}>
          <Image src="/sacred/groom-avatar.png" alt="Ali Rahman" width={140} height={140}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 500,
          letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A",
          marginBottom: "0.5rem",
        }}>Mempelai Pria</p>
        <h3 style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 500,
          color: "#2E2E2E", marginBottom: "0.5rem",
        }}>Ali Rahman</h3>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A",
          lineHeight: 1.7, opacity: 0.8,
        }}>
          Putra dari<br />Bapak Hendri &amp; Ibu Ningsih
        </p>
      </div>

      {/* Decorative Divider */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "120px",
        marginBottom: "3rem",
      }}>
        <div style={{ flex: 1, height: "0.5px", background: "#C8B28A", opacity: 0.35 }} />
        <svg width="10" height="10" viewBox="0 0 24 24" fill="#C8B28A" style={{ margin: "0 6px", opacity: 0.4 }}>
          <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41Z" />
        </svg>
        <div style={{ flex: 1, height: "0.5px", background: "#C8B28A", opacity: 0.35 }} />
      </div>

      {/* Bride */}
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "140px", height: "140px", borderRadius: "50%",
          border: "0.75px solid rgba(125, 110, 99, 0.15)",
          margin: "0 auto 1.5rem", overflow: "hidden",
        }}>
          <Image src="/sacred/bride-avatar.png" alt="Lyla Azzahra" width={140} height={140}
            style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 500,
          letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A",
          marginBottom: "0.5rem",
        }}>Mempelai Wanita</p>
        <h3 style={{
          fontFamily: "var(--font-cormorant)", fontSize: "1.625rem", fontWeight: 500,
          color: "#2E2E2E", marginBottom: "0.5rem",
        }}>Lyla Azzahra</h3>
        <p style={{
          fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A",
          lineHeight: 1.7, opacity: 0.8,
        }}>
          Putri dari<br />Bapak Yusuf &amp; Ibu Rahayu
        </p>
      </div>
    </section>
  );
}
