"use client";

import React, { useState, useEffect, useRef } from "react";

const DUMMY_WISHES = [
  { name: "Nafisa", message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin 🤲🏻", time: "2 jam lalu" },
  { name: "Khalid", message: "Barakallahu lakuma! Semoga pernikahan kalian penuh keberkahan ✨", time: "5 jam lalu" },
  { name: "Aufa", message: "MasyaAllah, turut berbahagia! Semoga sampai Jannah 🌙", time: "1 hari lalu" },
];

export function CelestialWishes() {
  const [wishes, setWishes] = useState(DUMMY_WISHES);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;
    setWishes([{ name: newName, message: newMessage, time: "Baru saja" }, ...wishes]);
    setNewName("");
    setNewMessage("");
  };

  return (
    <section ref={sectionRef} id="ucapan" className="celestial-section" style={{ background: "var(--cel-deep)", padding: "4rem 1.5rem 5rem" }}>
      <p style={{
        fontFamily: "var(--font-inter)", fontSize: "0.5rem", fontWeight: 500,
        letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cel-accent)",
        marginBottom: "0.5rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
      }}>
        Doa & Restu
      </p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 300,
        color: "var(--cel-text)", letterSpacing: "0.04em", marginBottom: "2rem",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)",
        transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
      }}>
        Ucapan & Doa
      </h2>

      {/* Wish list */}
      <div style={{
        maxWidth: "22rem", width: "100%", maxHeight: "28rem", overflowY: "auto",
        marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem",
        opacity: visible ? 1 : 0,
        transition: `opacity 0.8s ${ease} 0.2s`,
      }}>
        {wishes.map((wish, i) => (
          <div
            key={`${wish.name}-${i}`}
            className="celestial-card"
            style={{ padding: "1rem 1.25rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "0.625rem" }}>⭐</span>
              <span style={{
                fontFamily: "var(--font-inter)", fontSize: "0.6875rem", fontWeight: 500,
                color: "var(--cel-accent)", letterSpacing: "0.02em",
              }}>
                {wish.name}
              </span>
              <span style={{
                fontFamily: "var(--font-inter)", fontSize: "0.5rem", color: "var(--cel-text-muted)",
                marginLeft: "auto",
              }}>
                {wish.time}
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: "0.6875rem",
              color: "var(--cel-text-dim)", lineHeight: 1.7,
            }}>
              {wish.message}
            </p>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSend} style={{
        maxWidth: "22rem", width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem",
      }}>
        <input
          type="text"
          placeholder="Nama"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{
            padding: "0.75rem 1rem", border: "1px solid var(--cel-border)",
            borderRadius: "12px", background: "var(--cel-glass)",
            color: "var(--cel-text)", fontFamily: "var(--font-inter)",
            fontSize: "0.75rem", outline: "none",
          }}
        />
        <textarea
          placeholder="Tulis ucapan & doa..."
          rows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            padding: "0.75rem 1rem", border: "1px solid var(--cel-border)",
            borderRadius: "12px", background: "var(--cel-glass)",
            color: "var(--cel-text)", fontFamily: "var(--font-inter)",
            fontSize: "0.75rem", outline: "none", resize: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.625rem 1.5rem", border: "1px solid var(--cel-accent)",
            borderRadius: "9999px", background: "rgba(201, 169, 110, 0.08)",
            color: "var(--cel-accent)", fontFamily: "var(--font-inter)",
            fontSize: "0.5625rem", fontWeight: 500, letterSpacing: "0.15em",
            textTransform: "uppercase", cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Kirim Ucapan
        </button>
      </form>
    </section>
  );
}
