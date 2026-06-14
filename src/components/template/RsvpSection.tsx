"use client";

import React, { useState, useEffect, useRef } from "react";

type RsvpState = "form" | "loading" | "success";

export function RsvpSection() {
  const [state, setState] = useState<RsvpState>("form");
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [nama, setNama] = useState("");
  const [kehadiran, setKehadiran] = useState<"hadir" | "tidak_hadir" | "">("");
  const [jumlahTamu, setJumlahTamu] = useState(1);
  const [pesan, setPesan] = useState("");
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

  useEffect(() => {
    if (!sectionVisible) return;
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, [sectionVisible]);

  const isValid = nama.trim().length > 0 && kehadiran !== "";

  const handleSubmit = () => {
    if (!isValid) return;
    setState("loading");

    setTimeout(() => {
      setState("success");
    }, 1800);
  };

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
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(25px)",
          transition: "opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1), transform 1s cubic-bezier(0.25, 0.1, 0.25, 1)",
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
          }}
        >
          RSVP / Konfirmasi Kehadiran
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
            lineHeight: 1.7,
            marginBottom: "2rem",
          }}
        >
          Konfirmasi kehadiranmu dalam acara kami
        </p>

        {/* FORM STATE */}
        {state === "form" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Nama Lengkap */}
            <div>
              <label style={labelStyle}>Nama Lengkap *</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama lengkap kamu"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(125, 110, 99, 0.3)";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(125, 110, 99, 0.06)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(125, 110, 99, 0.15)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Kehadiran */}
            <div>
              <label style={labelStyle}>Kehadiran *</label>
              <div style={{ display: "flex", gap: "1rem", marginTop: "0.25rem" }}>
                {/* Hadir */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                  }}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border:
                        kehadiran === "hadir"
                          ? "1.5px solid #B89B6A"
                          : "1.5px solid rgba(125, 110, 99, 0.25)",
                      background:
                        kehadiran === "hadir"
                          ? "#B89B6A"
                          : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease",
                      flexShrink: 0,
                    }}
                  >
                    {kehadiran === "hadir" && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#FFF",
                        }}
                      />
                    )}
                  </span>
                  Hadir
                  <input
                    type="radio"
                    name="kehadiran"
                    value="hadir"
                    checked={kehadiran === "hadir"}
                    onChange={() => setKehadiran("hadir")}
                    style={{ display: "none" }}
                  />
                </label>

                {/* Tidak Hadir */}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                  }}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border:
                        kehadiran === "tidak_hadir"
                          ? "1.5px solid rgba(125, 110, 99, 0.4)"
                          : "1.5px solid rgba(125, 110, 99, 0.25)",
                      background:
                        kehadiran === "tidak_hadir"
                          ? "rgba(125, 110, 99, 0.5)"
                          : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease",
                      flexShrink: 0,
                    }}
                  >
                    {kehadiran === "tidak_hadir" && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#FFF",
                        }}
                      />
                    )}
                  </span>
                  Tidak Hadir
                  <input
                    type="radio"
                    name="kehadiran"
                    value="tidak_hadir"
                    checked={kehadiran === "tidak_hadir"}
                    onChange={() => setKehadiran("tidak_hadir")}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>

            {/* Jumlah Tamu */}
            {kehadiran === "hadir" && (
              <div
                style={{
                  opacity: 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <label style={labelStyle}>Jumlah Tamu</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {/* Minus */}
                  <button
                    type="button"
                    onClick={() => setJumlahTamu(Math.max(1, jumlahTamu - 1))}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      border: "1px solid rgba(125, 110, 99, 0.2)",
                      background: "rgba(125, 110, 99, 0.03)",
                      color: "#7D6E63",
                      fontFamily: "var(--font-jakarta)",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      cursor: jumlahTamu <= 1 ? "not-allowed" : "pointer",
                      opacity: jumlahTamu <= 1 ? 0.35 : 0.7,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "opacity 0.2s ease",
                      padding: 0,
                    }}
                  >
                    −
                  </button>

                  {/* Count */}
                  <span
                    style={{
                      fontFamily: "var(--font-jakarta)",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "#7D6E63",
                      minWidth: "1.5rem",
                      textAlign: "center",
                    }}
                  >
                    {jumlahTamu}
                  </span>

                  {/* Plus */}
                  <button
                    type="button"
                    onClick={() => setJumlahTamu(jumlahTamu + 1)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      border: "1px solid rgba(125, 110, 99, 0.2)",
                      background: "rgba(125, 110, 99, 0.03)",
                      color: "#7D6E63",
                      fontFamily: "var(--font-jakarta)",
                      fontSize: "0.875rem",
                      fontWeight: 400,
                      cursor: "pointer",
                      opacity: 0.7,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "opacity 0.2s ease",
                      padding: 0,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Pesan / Doa */}
            <div>
              <label style={labelStyle}>Pesan / Doa</label>
              <textarea
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tuliskan pesan atau doa untuk kedua mempelai"
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "none" as const,
                  minHeight: "4.5rem",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(125, 110, 99, 0.3)";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(125, 110, 99, 0.06)";
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
              disabled={!isValid}
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: isValid ? "#7D6E63" : "rgba(125, 110, 99, 0.35)",
                background: isValid
                  ? "rgba(184, 155, 106, 0.1)"
                  : "rgba(125, 110, 99, 0.03)",
                border: isValid
                  ? "1px solid rgba(184, 155, 106, 0.3)"
                  : "1px solid rgba(125, 110, 99, 0.1)",
                borderRadius: "8px",
                padding: "0.625rem 1.5rem",
                cursor: isValid ? "pointer" : "not-allowed",
                transition:
                  "all 0.3s ease",
                width: "100%",
                marginTop: "0.5rem",
              }}
            >
              Kirim Konfirmasi
            </button>
          </div>
        )}

        {/* LOADING STATE */}
        {state === "loading" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem 0",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "2px",
                borderRadius: "1px",
                background: "rgba(125, 110, 99, 0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(184, 155, 106, 0.5), transparent)",
                  animation: "nauka-shimmer 1.5s ease-in-out infinite",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                color: "#7D6E63",
                opacity: 0.45,
              }}
            >
              Mengirim konfirmasi...
            </p>
          </div>
        )}

        {/* SUCCESS STATE */}
        {state === "success" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "1.5rem 0",
              gap: "0.75rem",
              animation: "nauka-fade-in 0.8s ease forwards",
            }}
          >
            {/* Check mark */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1.5px solid #B89B6A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "0.5rem",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 8L7 11L12 5"
                  stroke="#B89B6A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "1rem",
                fontWeight: 400,
                color: "#7D6E63",
                letterSpacing: "0.04em",
              }}
            >
              Terima kasih
            </p>

            <p
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                color: "#7D6E63",
                opacity: 0.55,
                lineHeight: 1.7,
              }}
            >
              Konfirmasi kamu sudah kami terima
            </p>

            <p
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                fontWeight: 400,
                color: "#B89B6A",
                lineHeight: 1.7,
              }}
            >
              Jazakumullahu khairan
            </p>

            {/* Optional CTA */}
            <button
              type="button"
              style={{
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.625rem",
                fontWeight: 500,
                color: "#7D6E63",
                opacity: 0.5,
                background: "transparent",
                border: "1px solid rgba(125, 110, 99, 0.15)",
                borderRadius: "6px",
                padding: "0.375rem 1rem",
                cursor: "pointer",
                letterSpacing: "0.04em",
                marginTop: "0.75rem",
                transition: "opacity 0.2s ease",
              }}
            >
              Lanjut ke Ucapan
            </button>
          </div>
        )}
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes nauka-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
        @keyframes nauka-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
