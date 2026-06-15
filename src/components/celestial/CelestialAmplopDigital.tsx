"use client";

import React, { useState, useEffect, useRef } from "react";

const BANK_ACCOUNTS = [
  { name: "Ali Rahman", bank: "Bank Syariah Indonesia", number: "1234567890" },
  { name: "Lyla Azzahra", bank: "Bank Muamalat Indonesia", number: "1234567890" },
];

function maskNumber(num: string) {
  if (num.length <= 4) return num;
  return "*".repeat(num.length - 4) + num.slice(-4);
}

export function CelestialAmplopDigital() {
  const [visible, setVisible] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
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

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
  };

  return (
    <section ref={sectionRef} id="hadiah" className="celestial-section" style={{ background: "var(--cel-midnight)", padding: "4rem 1.5rem 5rem" }}>
      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
        marginBottom: "0.5rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
      }}>
        Support
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 300,
        color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "1rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
      }}>
        Tanda Kasih
      </h2>
      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--cel-text-dim)",
        lineHeight: 1.7, textAlign: "center", maxWidth: "18rem", marginBottom: "1.5rem",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.8s ${ease} 0.2s`,
      }}>
        Setiap doa dan perhatian dari Bapak/Ibu menjadi sesuatu yang sangat kami syukuri
      </p>

      {!showAccounts ? (
        <button
          onClick={() => setShowAccounts(true)}
          style={{
            padding: "0.625rem 1.75rem", border: "1px solid var(--cel-accent)",
            borderRadius: "9999px", background: "rgba(201, 169, 110, 0.08)",
            color: "var(--cel-accent)", fontFamily: "var(--font-inter)",
            fontSize: "0.5625rem", fontWeight: 500, letterSpacing: "0.15em",
            textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.3s ease",
            opacity: visible ? 1 : 0,
          }}
        >
          Lihat
        </button>
      ) : (
        <div style={{
          maxWidth: "22rem", width: "100%", display: "flex", flexDirection: "column", gap: "1rem",
          animation: "cel-fade-in 0.4s ease-out",
        }}>
          {BANK_ACCOUNTS.map((acc) => (
            <div key={acc.name} className="celestial-card" style={{ padding: "1rem 1.25rem" }}>
              <p style={{
                fontFamily: "var(--font-cormorant)", fontSize: "0.9375rem", fontWeight: 400,
                color: "var(--cel-text)", marginBottom: "0.25rem",
              }}>
                {acc.name}
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontSize: "0.5625rem", color: "var(--cel-text-muted)",
                letterSpacing: "0.08em", marginBottom: "0.5rem",
              }}>
                {acc.bank}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <p style={{
                  fontFamily: "var(--font-inter)", fontSize: "0.8125rem", color: "var(--cel-accent)",
                  letterSpacing: "0.06em", fontWeight: 500,
                }}>
                  {revealed[acc.name] ? acc.number : maskNumber(acc.number)}
                </p>
                <button onClick={() => setRevealed((r) => ({ ...r, [acc.name]: !r[acc.name] }))}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem" }}>
                  👁️
                </button>
                <button onClick={() => handleCopy(acc.number)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem" }}>
                  📋
                </button>
              </div>
            </div>
          ))}

          {/* Kado Fisik */}
          <div className="celestial-card" style={{ padding: "1rem 1.25rem" }}>
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
              letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cel-accent)",
              marginBottom: "0.5rem",
            }}>
              🎁 Kado Fisik
            </p>
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: "0.6875rem", color: "var(--cel-text-dim)",
              lineHeight: 1.7,
            }}>
              Lyla Azzahra<br />
              Kebon Jahe Kober 1, Jakarta Pusat
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
