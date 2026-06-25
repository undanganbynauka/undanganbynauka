"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface AmplopDigitalSectionProps {
  groomFullName?: string;
  groomBank?: string;
  groomRekening?: string;
  groomAn?: string;
  brideFullName?: string;
  brideBank?: string;
  brideRekening?: string;
  brideAn?: string;
  giftRecipientName?: string;
  giftAddress?: string;
}

export function AmplopDigitalSection({ groomFullName = "Ali Rahman", groomBank = "Bank Syariah Indonesia", groomRekening = "1234567890", groomAn = "", brideFullName = "Lyla Azzahra", brideBank = "Bank Muamalat Indonesia", brideRekening = "1234567890", brideAn = "", giftRecipientName = "Lyla Azzahra", giftAddress = "Jakarta Pusat" }: AmplopDigitalSectionProps = {}) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [showGroom, setShowGroom] = useState(false);
  const [showBride, setShowBride] = useState(false);
  const [copiedGroom, setCopiedGroom] = useState(false);
  const [copiedBride, setCopiedBride] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const t = [setTimeout(() => setStep(1), 200), setTimeout(() => setStep(2), 500)];
    return () => t.forEach(clearTimeout);
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  const maskNumber = (num: string) => "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 " + (num ? num.slice(-4) : "0000");

  const handleCopy = useCallback(async (number: string, who: "groom" | "bride") => {
    try { await navigator.clipboard.writeText(number); } catch {
      const textarea = document.createElement("textarea");
      textarea.value = number;
      textarea.style.position = "fixed"; textarea.style.opacity = "0";
      document.body.appendChild(textarea); textarea.select();
      document.execCommand("copy"); document.body.removeChild(textarea);
    }
    if (who === "groom") { setCopiedGroom(true); setTimeout(() => setCopiedGroom(false), 2000); }
    else { setCopiedBride(true); setTimeout(() => setCopiedBride(false), 2000); }
  }, []);

  const hasGroomRek = groomRekening && groomRekening !== "1234567890";
  const hasBrideRek = brideRekening && brideRekening !== "1234567890";
  const hasGift = giftRecipientName || (giftAddress && giftAddress !== "Jakarta Pusat");

  return (
    <section ref={sectionRef} id="hadiah" style={{ position: "relative", padding: "4rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2" }}>
      <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)", transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}` }}>Tanda Kasih</p>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "1rem", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)", transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s` }}>Hadiah</h2>
      <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F", textAlign: "center", lineHeight: 1.7, maxWidth: "18rem", marginBottom: "1.5rem", opacity: step >= 2 ? 0.8 : 0, transition: `opacity 0.8s ${ease}` }}>
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, kami menyediakan informasi berikut.
      </p>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(125, 106, 82, 0.16)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(125, 106, 82, 0.08)"; }} style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7D6A52", background: "rgba(125, 106, 82, 0.08)", border: "1px solid rgba(125, 106, 82, 0.2)", borderRadius: "999px", padding: "0.625rem 1.5rem", cursor: "pointer", opacity: step >= 2 ? 1 : 0, transition: "all 0.3s ease" }}>
          Lihat
        </button>
      ) : (
        <div style={{ maxWidth: "22rem", width: "100%", display: "flex", flexDirection: "column", gap: "1rem", animation: "fadeInUp 0.5s ease forwards" }}>
          {hasGroomRek && (
            <div style={{ background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)", borderRadius: "16px", padding: "1.25rem" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>{groomFullName}</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A", marginBottom: "0.5rem" }}>{groomBank}</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem", color: "#7D6A52", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{showGroom ? groomRekening : maskNumber(groomRekening)}</p>
              {groomAn && <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", color: "#8A8A8A", marginBottom: "0.5rem" }}>a.n {groomAn}</p>}
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <button onClick={() => setShowGroom(!showGroom)} style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500, color: "#7D6A52", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0 }}>{showGroom ? "\uD83D\uDC41\uFE0F Sembunyikan nomor" : "\uD83D\uDC41\uFE0F Tampilkan nomor"}</button>
                <button onClick={() => handleCopy(groomRekening, "groom")} style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500, color: "#7D6A52", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0 }}>{copiedGroom ? "\uD83D\uDCCB Tersalin!" : "\uD83D\uDCCB Salin"}</button>
              </div>
            </div>
          )}

          {hasBrideRek && (
            <div style={{ background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)", borderRadius: "16px", padding: "1.25rem" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>{brideFullName}</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A", marginBottom: "0.5rem" }}>{brideBank}</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem", color: "#7D6A52", fontWeight: 500, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{showBride ? brideRekening : maskNumber(brideRekening)}</p>
              {brideAn && <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", color: "#8A8A8A", marginBottom: "0.5rem" }}>a.n {brideAn}</p>}
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <button onClick={() => setShowBride(!showBride)} style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500, color: "#7D6A52", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0 }}>{showBride ? "\uD83D\uDC41\uFE0F Sembunyikan nomor" : "\uD83D\uDC41\uFE0F Tampilkan nomor"}</button>
                <button onClick={() => handleCopy(brideRekening, "bride")} style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500, color: "#7D6A52", background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: 0 }}>{copiedBride ? "\uD83D\uDCCB Tersalin!" : "\uD83D\uDCCB Salin"}</button>
              </div>
            </div>
          )}

          {hasGift && (
            <div style={{ background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)", borderRadius: "16px", padding: "1.25rem" }}>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7D6A52", marginBottom: "0.5rem" }}>{"\uD83C\uDF81 KADO FISIK"}</p>
              {giftRecipientName && <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.25rem" }}>{giftRecipientName}</p>}
              {giftAddress && <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", color: "#8A8A8A", lineHeight: 1.7 }}>{giftAddress}</p>}
            </div>
          )}

          <style>{`@keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      )}
    </section>
  );
}
