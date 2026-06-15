"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export function AmplopDigitalSection() {
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showAli, setShowAli] = useState(false);
  const [showLyla, setShowLyla] = useState(false);
  const [copiedAli, setCopiedAli] = useState(false);
  const [copiedLyla, setCopiedLyla] = useState(false);
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

  const aliAccount = "1234567890";
  const lylaAccount = "1234567890";

  const maskNumber = (num: string) => {
    return "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 " + num.slice(-4);
  };

  const handleCopy = useCallback(async (number: string, who: "ali" | "lyla") => {
    try {
      await navigator.clipboard.writeText(number);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = number;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    if (who === "ali") {
      setCopiedAli(true);
      setTimeout(() => setCopiedAli(false), 2000);
    } else {
      setCopiedLyla(true);
      setTimeout(() => setCopiedLyla(false), 2000);
    }
  }, []);

  return (
    <section ref={sectionRef} id="hadiah" style={{
      position: "relative", padding: "4.5rem 1.5rem",
      display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2",
      opacity: visible ? 1 : 0,
      transition: "opacity 600ms ease",
    }}>
      <p style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
        letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem",
      }}>Tanda Kasih</p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500,
        color: "#2E2E2E", marginBottom: "1rem",
      }}>Hadiah</h2>
      <p style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F",
        textAlign: "center", lineHeight: 1.7, maxWidth: "18rem", marginBottom: "1.5rem", opacity: 0.8,
      }}>
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan informasi berikut.
      </p>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(125, 106, 82, 0.16)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(125, 106, 82, 0.08)"; }}
          style={{
            fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase", color: "#7D6A52",
            background: "rgba(125, 106, 82, 0.08)", border: "1px solid rgba(125, 106, 82, 0.2)",
            borderRadius: "999px", padding: "0.625rem 1.5rem", cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Lihat
        </button>
      ) : (
        <div style={{
          maxWidth: "22rem", width: "100%", display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          {/* Ali Rahman */}
          <div style={{
            background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "16px", padding: "1.25rem",
          }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>Ali Rahman</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A", marginBottom: "0.5rem" }}>Bank Syariah Indonesia</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem", color: "#7D6A52", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              {showAli ? aliAccount : maskNumber(aliAccount)}
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                onClick={() => setShowAli(!showAli)}
                style={{
                  fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500,
                  color: "#7D6A52", background: "none", border: "none", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0,
                }}
              >
                {showAli ? "\uD83D\uDC41\uFE0F Sembunyikan nomor" : "\uD83D\uDC41\uFE0F Tampilkan nomor"}
              </button>
              <button
                onClick={() => handleCopy(aliAccount, "ali")}
                style={{
                  fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500,
                  color: "#7D6A52", background: "none", border: "none", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0,
                }}
              >
                {copiedAli ? "\uD83D\uDCCB Tersalin!" : "\uD83D\uDCCB Salin"}
              </button>
            </div>
          </div>

          {/* Lyla Azzahra */}
          <div style={{
            background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "16px", padding: "1.25rem",
          }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>Lyla Azzahra</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A", marginBottom: "0.5rem" }}>Bank Muamalat Indonesia</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem", color: "#7D6A52", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              {showLyla ? lylaAccount : maskNumber(lylaAccount)}
            </p>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                onClick={() => setShowLyla(!showLyla)}
                style={{
                  fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500,
                  color: "#7D6A52", background: "none", border: "none", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0,
                }}
              >
                {showLyla ? "\uD83D\uDC41\uFE0F Sembunyikan nomor" : "\uD83D\uDC41\uFE0F Tampilkan nomor"}
              </button>
              <button
                onClick={() => handleCopy(lylaAccount, "lyla")}
                style={{
                  fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500,
                  color: "#7D6A52", background: "none", border: "none", cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0,
                }}
              >
                {copiedLyla ? "\uD83D\uDCCB Tersalin!" : "\uD83D\uDCCB Salin"}
              </button>
            </div>
          </div>

          {/* Kado Fisik */}
          <div style={{
            background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "16px", padding: "1.25rem",
          }}>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7D6A52", marginBottom: "0.5rem" }}>
              {"\uD83C\uDF81 KADO FISIK"}
            </p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>Lyla Azzahra</p>
            <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A", lineHeight: 1.7 }}>
              Kebon Jahe Kober 1<br />Jakarta Pusat
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
