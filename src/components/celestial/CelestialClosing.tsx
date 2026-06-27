"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface CelestialClosingProps {
  groomName?: string;
  brideName?: string;
  akadDate?: string;
  groomFullName?: string;
  groomBank?: string;
  groomRekening?: string;
  brideFullName?: string;
  brideBank?: string;
  brideRekening?: string;
  giftRecipientName?: string;
  giftAddress?: string;
}

function formatShortDate(isoDate: string): string {
  if (!isoDate) return "5 Desember 2026";
  try {
    const d = new Date(`${isoDate}T00:00:00+07:00`);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" });
  } catch { return isoDate; }
}

function maskNumber(num: string) {
  return "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 " + (num ? num.slice(-4) : "0000");
}

export function CelestialClosing({ groomName = "Ali", brideName = "Lyla", akadDate = "2026-12-05", groomFullName = "Ali Rahman", groomBank = "Bank Syariah Indonesia", groomRekening = "1234567890", brideFullName = "Lyla Azzahra", brideBank = "Bank Muamalat Indonesia", brideRekening = "1234567890", giftRecipientName = "Lyla Azzahra", giftAddress = "Jakarta Pusat" }: CelestialClosingProps = {}) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRekening, setShowRekening] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const BANK_ACCOUNTS = [
    { name: groomFullName, bank: groomBank, number: groomRekening },
    { name: brideFullName, bank: brideBank, number: brideRekening },
  ];

  const dateLabel = formatShortDate(akadDate);
  const coupleName = `${groomName} & ${brideName}`;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStep(1), 200));
    timers.push(setTimeout(() => setStep(2), 600));
    timers.push(setTimeout(() => setStep(3), 1000));
    timers.push(setTimeout(() => setStep(4), 1400));
    timers.push(setTimeout(() => setStep(5), 1800));
    timers.push(setTimeout(() => setStep(6), 2200));
    timers.push(setTimeout(() => setStep(7), 2600));
    timers.push(setTimeout(() => setStep(8), 3000));
    timers.push(setTimeout(() => setStep(9), 3400));
    timers.push(setTimeout(() => setStep(10), 3800));
    timers.push(setTimeout(() => setStep(11), 4200));
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const handleCopy = useCallback(async (number: string, key: string) => {
    try { await navigator.clipboard.writeText(number); } catch {
      const ta = document.createElement("textarea");
      ta.value = number; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="closing" className="celestial-section" style={{ background: "var(--cel-deep)", padding: "4rem 1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Stars */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`star-${i}`} style={{ position: "absolute", width: `${1 + Math.random() * 1.5}px`, height: `${1 + Math.random() * 1.5}px`, borderRadius: "50%", background: i % 3 === 0 ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.4)", left: `${5 + Math.random() * 90}%`, top: `${5 + Math.random() * 90}%`, opacity: 0, animation: `celBgParticle ${5 + Math.random() * 7}s ease-in-out ${Math.random() * 4}s infinite` }} />
        ))}
      </div>

      <div style={{ maxWidth: "20rem", width: "100%", textAlign: "center" }}>
        {/* Quote */}
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.8125rem", fontStyle: "italic", fontWeight: 400, color: "var(--cel-text)", lineHeight: 2, letterSpacing: "0.02em", maxWidth: "18rem", margin: "0 auto 2.5rem", opacity: step >= 1 ? 0.9 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)", transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}` }}>
          Di bawah langit yang sama, semoga setiap langkah yang ditempuh bersama selalu dipenuhi cinta, ketenangan, dan kebahagiaan yang tumbuh sepanjang waktu.
        </p>

        {/* Divider */}
        <div className="celestial-divider" style={{ justifyContent: "center", margin: "0 auto 2.5rem", opacity: step >= 2 ? 1 : 0, transition: `opacity 1s ${ease}` }}>
          <div className="celestial-divider-line" /><span className="celestial-divider-star">✦</span><div className="celestial-divider-line" />
        </div>

        {/* Icon bulan sabit putih */}
        <div style={{ textAlign: "center", marginBottom: "1.5rem", opacity: step >= 3 ? 1 : 0, transform: step >= 3 ? "translateY(0)" : "translateY(20px)", transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}` }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "inline-block" }}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="rgba(255,255,255,0.85)" stroke="rgba(255,255,255,0.85)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Teks terima kasih */}
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.875rem", fontWeight: 400, color: "var(--cel-text)", lineHeight: 1.9, textAlign: "center", maxWidth: "18rem", margin: "0 auto 2.5rem", opacity: step >= 4 ? 1 : 0, transform: step >= 4 ? "translateY(0)" : "translateY(15px)", transition: `opacity 1.2s ${ease}, transform 1.2s ${ease}` }}>
          Terima kasih telah menjadi bagian dari perjalanan kecil kami menuju kisah baru.
        </p>

        {/* Divider 2 */}
        <div className="celestial-divider" style={{ justifyContent: "center", margin: "0 auto 2rem", opacity: step >= 7 ? 1 : 0, transition: `opacity 1s ${ease}` }}>
          <div className="celestial-divider-line" /><span className="celestial-divider-star">✦</span><div className="celestial-divider-line" />
        </div>

        {/* Couple Names */}
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.875rem", fontWeight: 300, color: "var(--cel-text)", letterSpacing: "0.1em", marginBottom: "0.625rem", opacity: step >= 8 ? 1 : 0, transform: step >= 8 ? "translateY(0)" : "translateY(12px)", transition: `opacity 0.9s ${ease}, transform 0.9s ${ease}` }}>
          {groomName}{" "}<span style={{ color: "var(--cel-accent)" }}>&amp;</span>{" "}{brideName}
        </p>

        {/* Date */}
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 400, color: "var(--cel-text-muted)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "2.5rem", opacity: step >= 9 ? 0.5 : 0, transition: `opacity 0.8s ${ease}` }}>
          {dateLabel}
        </p>

        {/* Amplop Digital */}
        <div style={{ opacity: step >= 10 ? 1 : 0, transform: step >= 10 ? "translateY(0)" : "translateY(15px)", transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}` }}>
          {!showRekening ? (
            <button onClick={() => setShowRekening(true)} style={{ padding: "0.625rem 1.5rem", border: "1px solid var(--cel-border)", borderRadius: "9999px", background: "var(--cel-glass)", color: "var(--cel-accent)", fontFamily: "var(--font-inter)", fontSize: "0.625rem", fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s ease", marginBottom: "1.5rem" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,169,110,0.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--cel-glass)"; }}>Tanda Kasih</button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "20rem", margin: "0 auto 1.5rem", animation: "fadeInUp 0.5s ease forwards" }}>
              {BANK_ACCOUNTS.map((acc, i) => (
                <div key={i} style={{ background: "var(--cel-glass)", border: "1px solid var(--cel-border)", borderRadius: "16px", padding: "1.25rem", textAlign: "center" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 400, color: "var(--cel-text)", marginBottom: "0.25rem" }}>{acc.name}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.625rem", color: "var(--cel-text-dim)", marginBottom: "0.5rem" }}>{acc.bank}</p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "var(--cel-accent)", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{maskNumber(acc.number)}</p>
                  <button onClick={() => handleCopy(acc.number, `acc-${i}`)} style={{ fontFamily: "var(--font-inter)", fontSize: "0.5625rem", fontWeight: 500, color: "var(--cel-accent)", background: "none", border: "none", cursor: "pointer" }}>
                    {copiedKey === `acc-${i}` ? "✓ Tersalin!" : "📋 Salin"}
                  </button>
                </div>
              ))}
              {/* Gift physical */}
              <div style={{ background: "var(--cel-glass)", border: "1px solid var(--cel-border)", borderRadius: "16px", padding: "1.25rem", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--cel-accent)", marginBottom: "0.5rem" }}>🎁 KADO FISIK</p>
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 400, color: "var(--cel-text)", marginBottom: "0.25rem" }}>{giftRecipientName}</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.625rem", color: "var(--cel-text-dim)", lineHeight: 1.7 }}>{giftAddress}</p>
              </div>
              <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            </div>
          )}
        </div>

        {/* Logo */}
        <div style={{ marginTop: "2rem", opacity: step >= 11 ? 0.6 : 0, transform: step >= 11 ? "translateY(0)" : "translateY(8px)", transition: `opacity 1.5s ${ease}, transform 1.5s ${ease}` }}>
          <img src="/nauka-logo.png" alt="Nauka" style={{ width: "64px", height: "auto", filter: "brightness(0.7)" }} />
        </div>
      </div>

      <style>{`
        @keyframes celBgParticle { 0%, 100% { opacity: 0; transform: translateY(0) translateX(0); } 20% { opacity: 0.35; } 50% { opacity: 0.15; transform: translateY(-12px) translateX(4px); } 80% { opacity: 0.3; } }
      `}</style>
    </section>
  );
}
