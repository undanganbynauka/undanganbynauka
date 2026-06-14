"use client";

import React, { useState, useEffect, useRef } from "react";

export function AmplopDigitalSection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  const handleCopy = (rekening: string, id: string) => {
    navigator.clipboard.writeText(rekening).then(() => {
      setCopiedId(id);
      setShowToast(true);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);

      setTimeout(() => {
        setShowToast(false);
      }, 1800);
    });
  };

  const accounts = [
    {
      id: "groom",
      name: "Ali Rahman",
      bank: "Bank Muamalat",
      rekening: "1234567890",
    },
    {
      id: "bride",
      name: "Lyla Azzahra",
      bank: "BSI Syariah",
      rekening: "1234567890",
    },
  ];

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
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
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
            marginBottom: "0.75rem",
          }}
        >
          Amplop Digital
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.6875rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: 0.5,
            textAlign: "center",
            lineHeight: 1.8,
            marginBottom: "1.75rem",
            maxWidth: "18rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Dengan penuh rasa syukur, kami menerima setiap bentuk doa dan kasih
          sayang yang ingin disampaikan melalui amplop digital.
        </p>

        {/* Reveal Button */}
        {!isRevealed && (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => setIsRevealed(true)}
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                color: "#7D6E63",
                background: "rgba(184, 155, 106, 0.1)",
                border: "1px solid rgba(184, 155, 106, 0.3)",
                borderRadius: "8px",
                padding: "0.625rem 1.75rem",
                cursor: "pointer",
                letterSpacing: "0.04em",
                transition: "all 0.3s ease",
              }}
            >
              Lihat Tanda Kasih
            </button>
          </div>
        )}

        {/* Rekening Details — revealed */}
        {isRevealed && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              animation: "nauka-amplop-reveal 0.5s ease forwards",
            }}
          >
            {accounts.map((account) => (
              <div
                key={account.id}
                style={{
                  background: "rgba(125, 110, 99, 0.025)",
                  border: "1px solid rgba(125, 110, 99, 0.07)",
                  borderRadius: "12px",
                  padding: "1.125rem 1rem",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.01)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(125, 110, 99, 0.06)";
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
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "0.375rem",
                  }}
                >
                  {account.name}
                </p>

                {/* Bank */}
                <p
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.6875rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                    opacity: 0.7,
                    marginBottom: "0.5rem",
                  }}
                >
                  {account.bank}
                </p>

                {/* Rekening Number — monospace */}
                <p
                  style={{
                    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
                    fontSize: "0.8125rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                    lineHeight: 1,
                  }}
                >
                  {account.rekening}
                </p>

                {/* Salin Button */}
                <button
                  type="button"
                  onClick={() => handleCopy(account.rekening, account.id)}
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    color:
                      copiedId === account.id
                        ? "#B89B6A"
                        : "rgba(125, 110, 99, 0.55)",
                    background:
                      copiedId === account.id
                        ? "rgba(184, 155, 106, 0.08)"
                        : "transparent",
                    border:
                      copiedId === account.id
                        ? "1px solid rgba(184, 155, 106, 0.2)"
                        : "1px solid rgba(125, 110, 99, 0.12)",
                    borderRadius: "6px",
                    padding: "0.3rem 0.75rem",
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.3s ease",
                  }}
                >
                  {copiedId === account.id ? "✓ Tersalin" : "Salin"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Toast */}
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
              animation: "nauka-toast-in 0.4s ease forwards",
              zIndex: 10,
            }}
          >
            Tersalin ✓
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes nauka-amplop-reveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes nauka-toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </section>
  );
}
