"use client";

import React, { useState, useEffect, useRef } from "react";

interface WishMessage {
  id: string;
  name: string;
  message: string;
  timestamp: Date;
  status: "pending" | "approved" | "rejected";
}

export function WishesSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [nama, setNama] = useState("");
  const [doa, setDoa] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messages, setMessages] = useState<WishMessage[]>([
    {
      id: "1",
      name: "Aliyah",
      message: "Barakallahu lakuma wa baraka 'alaikuma",
      timestamp: new Date(Date.now() - 120000),
      status: "approved",
    },
    {
      id: "2",
      name: "Ustadz Ahmad",
      message:
        "Semoga Allah menjadikan pernikahan kalian sebagai ibadah yang diterima, rumah tangga yang sakinah, mawaddah, warahmah.",
      timestamp: new Date(Date.now() - 3600000),
      status: "approved",
    },
    {
      id: "3",
      name: "Keluarga Besar Rahman",
      message:
        "Baarakallahu lakum wa baaraka 'alaykum wa jama'a baynakumaa fii khayr. Aamiin.",
      timestamp: new Date(Date.now() - 7200000),
      status: "approved",
    },
  ]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  // Staggered reveal
  useEffect(() => {
    if (!sectionVisible) return;
    const t1 = setTimeout(() => setShowTitle(true), 200);
    const t2 = setTimeout(() => setShowForm(true), 700);
    const t3 = setTimeout(() => setShowFeed(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [sectionVisible]);

  const isValid = nama.trim().length > 0 && doa.trim().length > 0;

  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit lalu`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari lalu`;
  };

  const handleSubmit = () => {
    if (!isValid) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const newMessage: WishMessage = {
        id: Date.now().toString(),
        name: nama.trim(),
        message: doa.trim(),
        timestamp: new Date(),
        status: "approved",
      };

      setMessages((prev) => [newMessage, ...prev].slice(0, 12));
      setNama("");
      setDoa("");
      setIsSubmitting(false);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 3000);
    }, 1800);
  };

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.75rem",
    fontWeight: 400,
    color: "#7D6E63",
    background: "rgba(125, 110, 99, 0.03)",
    border: "1px solid rgba(125, 110, 99, 0.15)",
    borderRadius: "8px",
    padding: "0.625rem 0.875rem",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.625rem",
    fontWeight: 500,
    color: "#7D6E63",
    opacity: 0.7,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    marginBottom: "0.375rem",
    display: "block",
  };

  const approvedMessages = messages.filter((m) => m.status === "approved");
  const isEmpty = approvedMessages.length === 0;

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#F8F4EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Paper grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Single Card */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "22rem",
          width: "100%",
          background: "rgba(125, 110, 99, 0.04)",
          border: "1px solid rgba(125, 110, 99, 0.12)",
          borderRadius: "20px",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.125rem",
            fontWeight: 400,
            color: "#7D6E63",
            letterSpacing: "0.1em",
            textAlign: "center",
            marginBottom: "0.5rem",
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
          }}
        >
          Ucapan & Doa
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: showTitle ? 0.5 : 0,
            textAlign: "center",
            lineHeight: 1.7,
            marginBottom: "2rem",
            transform: showTitle ? "translateY(0)" : "translateY(10px)",
            transition: `opacity 1s ${ease} 0.15s, transform 1s ${ease} 0.15s`,
          }}
        >
          Tinggalkan doa terbaik untuk kami
        </p>

        {/* INPUT FORM */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "2rem",
            opacity: showForm ? 1 : 0,
            transform: showForm ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
          }}
        >
          {/* Nama */}
          <div>
            <label style={labelStyle}>Nama</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama kamu"
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(125, 110, 99, 0.3)";
                e.target.style.boxShadow = "0 0 0 2px rgba(125, 110, 99, 0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(125, 110, 99, 0.15)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Doa / Pesan */}
          <div>
            <label style={labelStyle}>Doa / Pesan</label>
            <textarea
              value={doa}
              onChange={(e) => setDoa(e.target.value)}
              placeholder="Tuliskan doa atau ucapan untuk kedua mempelai"
              rows={3}
              style={{
                ...inputStyle,
                resize: "none" as const,
                minHeight: "4.5rem",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(125, 110, 99, 0.3)";
                e.target.style.boxShadow = "0 0 0 2px rgba(125, 110, 99, 0.06)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(125, 110, 99, 0.15)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: isValid && !isSubmitting ? "#7D6E63" : "rgba(125, 110, 99, 0.35)",
              background: isValid && !isSubmitting ? "rgba(184, 155, 106, 0.1)" : "rgba(125, 110, 99, 0.03)",
              border: isValid && !isSubmitting ? "1px solid rgba(184, 155, 106, 0.3)" : "1px solid rgba(125, 110, 99, 0.1)",
              borderRadius: "8px",
              padding: "0.625rem 1.5rem",
              cursor: isValid && !isSubmitting ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isSubmitting ? <span style={{ position: "relative", zIndex: 1 }}>Mengirim...</span> : "Kirim Ucapan"}
            {isSubmitting && (
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(184, 155, 106, 0.15), transparent)",
                  animation: "nauka-shimmer 1.5s ease-in-out infinite",
                }}
              />
            )}
          </button>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(125, 110, 99, 0.08)",
            marginBottom: "1.5rem",
            opacity: showFeed ? 1 : 0,
            transition: `opacity 0.8s ${ease}`,
          }}
        />

        {/* Live Feed Label */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.5625rem",
            fontWeight: 500,
            color: "#7D6E63",
            opacity: showFeed ? 0.4 : 0,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            marginBottom: "1rem",
            textAlign: "center",
            transition: `opacity 0.8s ${ease}`,
          }}
        >
          Live Doa
        </p>

        {/* LIVE FEED */}
        <div
          ref={feedRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            maxHeight: "420px",
            overflowY: "auto",
            paddingRight: "0.25rem",
          }}
        >
          {isEmpty ? (
            <p
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.75rem",
                fontWeight: 400,
                color: "#7D6E63",
                opacity: 0.4,
                textAlign: "center",
                padding: "2rem 0",
                lineHeight: 1.8,
              }}
            >
              Jadilah yang pertama mengirim doa
            </p>
          ) : (
            approvedMessages.map((msg, index) => (
              <div
                key={msg.id}
                style={{
                  background: "rgba(125, 110, 99, 0.025)",
                  border: "1px solid rgba(125, 110, 99, 0.07)",
                  borderRadius: "12px",
                  padding: "0.875rem 1rem",
                  cursor: "default",
                  opacity: showFeed ? (index >= 8 ? Math.max(0.3, 1 - (index - 7) * 0.15) : 1) : 0,
                  transform: showFeed ? "scale(1) translateY(0)" : "scale(0.98) translateY(10px)",
                  transition: `transform 0.3s ease, box-shadow 0.3s ease, opacity 0.8s ${ease} ${index * 0.1}s, transform 0.8s ${ease} ${index * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.015)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(125, 110, 99, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Name */}
                <p
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    color: "#7D6E63",
                    opacity: 0.55,
                    letterSpacing: "0.04em",
                    marginBottom: "0.375rem",
                  }}
                >
                  {msg.name}
                </p>

                {/* Message */}
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                    lineHeight: 1.8,
                    marginBottom: "0.375rem",
                  }}
                >
                  &ldquo;{msg.message}&rdquo;
                </p>

                {/* Timestamp */}
                <p
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.5rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                    opacity: 0.25,
                  }}
                >
                  {formatTimestamp(msg.timestamp)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Success Toast */}
        {showToast && (
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(184, 155, 106, 0.12)",
              border: "1px solid rgba(184, 155, 106, 0.2)",
              borderRadius: "8px",
              padding: "0.5rem 1.25rem",
              fontFamily: "var(--font-jakarta)",
              fontSize: "0.6875rem",
              fontWeight: 400,
              color: "#7D6E63",
              whiteSpace: "nowrap",
              animation: "nauka-toast-in 0.5s ease forwards",
              zIndex: 10,
            }}
          >
            Jazakumullahu khairan
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes nauka-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        @keyframes nauka-toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  );
}
