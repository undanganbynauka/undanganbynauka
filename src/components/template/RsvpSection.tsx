"use client";

import React, { useState, useEffect, useRef } from "react";

export function RsvpSection() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", attendance: "", guests: "1" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
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
    const t = [setTimeout(() => setStep(1), 200), setTimeout(() => setStep(2), 500)];
    return () => t.forEach(clearTimeout);
  }, [visible]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="rsvp" style={{
      position: "relative", padding: "4rem 1.5rem",
      display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2",
    }}>
      <p style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
        letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem",
        opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
      }}>Konfirmasi Kehadiran</p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500,
        color: "#2E2E2E", marginBottom: "2rem",
        opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
      }}>RSVP</h2>

      {status === "success" ? (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", fontWeight: 500, color: "#7D6A52", marginBottom: "0.5rem" }}>Terima kasih!</p>
          <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F" }}>Konfirmasi kehadiran Anda telah kami terima.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{
          maxWidth: "22rem", width: "100%",
          opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
        }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8A8A", display: "block", marginBottom: "0.375rem" }}>Nama</label>
            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{
              width: "100%", padding: "0.625rem 0.875rem", fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem",
              color: "#2E2E2E", background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
              borderRadius: "12px", outline: "none", transition: "border-color 0.3s ease",
            }} onFocus={(e) => (e.target.style.borderColor = "#7D6A52")} onBlur={(e) => (e.target.style.borderColor = "rgba(125, 110, 99, 0.12)")} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.625rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A8A8A", display: "block", marginBottom: "0.5rem" }}>Konfirmasi Kehadiran</label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {["Hadir", "Tidak Hadir"].map((opt) => (
                <button key={opt} type="button" onClick={() => setFormData({ ...formData, attendance: opt })} style={{
                  flex: 1, padding: "0.5rem", fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem",
                  color: formData.attendance === opt ? "#2E2E2E" : "#8A8A8A",
                  background: formData.attendance === opt ? "rgba(125, 106, 82, 0.08)" : "rgba(125, 110, 99, 0.04)",
                  border: `1px solid ${formData.attendance === opt ? "#7D6A52" : "rgba(125, 110, 99, 0.12)"}`,
                  borderRadius: "10px", cursor: "pointer", transition: "all 0.3s ease",
                }}>{opt}</button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={status === "loading"} style={{
            width: "100%", padding: "0.75rem", fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem",
            fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2E2E2E",
            background: "rgba(125, 106, 82, 0.08)", border: "1px solid rgba(125, 106, 82, 0.2)",
            borderRadius: "999px", cursor: status === "loading" ? "wait" : "pointer", transition: "all 0.3s ease", marginTop: "0.5rem",
          }}>{status === "loading" ? "Mengirim..." : "Kirim Konfirmasi"}</button>
        </form>
      )}
    </section>
  );
}
