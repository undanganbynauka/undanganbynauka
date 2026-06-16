"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const BANK_ACCOUNTS = [
  { name: "Ali Rahman", bank: "Bank Syariah Indonesia", number: "1234567890" },
  { name: "Lyla Azzahra", bank: "Bank Muamalat Indonesia", number: "1234567890" },
];

export function CelestialClosing() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showRekening, setShowRekening] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver — trigger once
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  // Master animation sequence — slower, cinematic pacing
  // Total ~14s — everything breathes slower than previous sections
  useEffect(() => {
    if (!visible) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. Slow atmospheric fade (bg + overlay already transitioning via CSS)
    // 2. Particles appear very softly
    timers.push(setTimeout(() => setStep(1), 300));

    // 3. Shooting star — opening gesture
    timers.push(setTimeout(() => setStep(2), 900));

    // 4. Shooting star fades, light spreads
    timers.push(setTimeout(() => setStep(3), 2200));

    // 5. Crescent moon appears (very slow, 1.8s transition)
    timers.push(setTimeout(() => setStep(4), 3000));

    // 6. Doa line 1 — first breath
    timers.push(setTimeout(() => setStep(5), 4800));

    // 7. Doa line 2
    timers.push(setTimeout(() => setStep(6), 6400));

    // 8. Doa line 3
    timers.push(setTimeout(() => setStep(7), 8000));

    // 9. Author attribution
    timers.push(setTimeout(() => setStep(8), 9200));

    // 10. Ornamental divider
    timers.push(setTimeout(() => setStep(9), 10100));

    // 11. Couple names — focal point
    timers.push(setTimeout(() => setStep(10), 11200));

    // 12. Date
    timers.push(setTimeout(() => setStep(11), 12300));

    // 13. Rekening / Gift section
    timers.push(setTimeout(() => setStep(12), 13400));

    // 14. Nauka logo — final element
    timers.push(setTimeout(() => setStep(13), 14000));

    return () => timers.forEach(clearTimeout);
  }, [visible]);

  // Copy handler — calm, sacred feedback
  const handleCopy = useCallback((num: string, key: string) => {
    navigator.clipboard.writeText(num).catch(() => {
      const ta = document.createElement("textarea");
      ta.value = num;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    });
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  const easeCinematic = "cubic-bezier(0.42, 0, 0.58, 1)";
  const easeSacred = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="closing"
      className="celestial-section"
      style={{
        position: "relative",
        padding: 0,
        minHeight: "100vh",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      {/* ── Background image — slower, more intimate reveal ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/celestial/cover.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          opacity: visible ? 1 : 0,
          transition: `opacity 2.5s ${easeCinematic}`,
        }}
      />

      {/* ── Dark overlay — deeper, more intimate than other sections ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,12,32,0.70) 0%, rgba(8,12,32,0.55) 25%, rgba(8,12,32,0.50) 45%, rgba(8,12,32,0.60) 65%, rgba(8,12,32,0.90) 100%)",
          opacity: visible ? 1 : 0,
          transition: `opacity 2.5s ${easeCinematic} 0.3s`,
        }}
      />

      {/* ── Top gradient fade — seamless blend from previous section ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "30%",
          background:
            "linear-gradient(to bottom, #0B1026 0%, rgba(11,16,38,0.6) 40%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Slower, sparser background particles — "everything slows down" ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: `${0.8 + Math.random() * 1.2}px`,
              height: `${0.8 + Math.random() * 1.2}px`,
              borderRadius: "50%",
              background:
                i % 3 === 0
                  ? "rgba(201,169,110,0.35)"
                  : "rgba(255,255,255,0.25)",
              left: `${8 + Math.random() * 84}%`,
              top: `${5 + Math.random() * 85}%`,
              opacity: 0,
              animation: step >= 1
                ? `celClosingParticle ${8 + Math.random() * 10}s ease-in-out ${Math.random() * 5}s infinite`
                : "none",
            }}
          />
        ))}
      </div>

      {/* ── Shooting star — opening gesture ── */}
      {step >= 2 && step < 4 && (
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "5%",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#fff",
              animation:
                step === 2
                  ? "celClosingShoot 2s ease-out forwards"
                  : step >= 3
                  ? "celClosingShootFade 1.2s ease-out forwards"
                  : "none",
            }}
          />
        </div>
      )}

      {/* ── Light spread after shooting star ── */}
      {step >= 3 && (
        <div
          style={{
            position: "absolute",
            top: "14%",
            right: "10%",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            animation: "celClosingLightSpread 2s ease-out forwards",
          }}
        />
      )}

      {/* ── Content — centered, breathable ── */}
      <div
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: "22rem",
          padding: "5rem 1.5rem 2rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* ── Crescent Moon — slower, more sacred ── */}
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            margin: "0 auto 3rem",
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? "scale(1) translateY(0)" : "scale(0.92) translateY(8px)",
            transition: `opacity 1.8s ${easeCinematic}, transform 1.8s ${easeCinematic}`,
          }}
        >
          <img
            src="/celestial/moon.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              filter: "brightness(1.05)",
              animation: step >= 4
                ? "celClosingMoonFloat 10s ease-in-out infinite, celClosingMoonGlow 7s ease-in-out infinite"
                : "none",
            }}
          />
        </div>

        {/* ── Doa / Closing Text — breathable, read-aloud feel ── */}
        <div
          style={{
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.0625rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--cel-text)",
              lineHeight: 2.6,
              letterSpacing: "0.03em",
              textShadow: "0 2px 18px rgba(0,0,0,0.5)",
              margin: 0,
              opacity: step >= 5 ? 1 : 0,
              transform: step >= 5 ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 1.2s ${easeCinematic}, transform 1.2s ${easeCinematic}`,
            }}
          >
            &ldquo;Cinta bukan tentang saling memandang,
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.0625rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--cel-text)",
              lineHeight: 2.6,
              letterSpacing: "0.03em",
              textShadow: "0 2px 18px rgba(0,0,0,0.5)",
              margin: 0,
              opacity: step >= 6 ? 1 : 0,
              transform: step >= 6 ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 1.2s ${easeCinematic}, transform 1.2s ${easeCinematic}`,
            }}
          >
            tetapi tentang melihat
          </p>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "1.0625rem",
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--cel-text)",
              lineHeight: 2.6,
              letterSpacing: "0.03em",
              textShadow: "0 2px 18px rgba(0,0,0,0.5)",
              margin: 0,
              opacity: step >= 7 ? 1 : 0,
              transform: step >= 7 ? "translateY(0)" : "translateY(10px)",
              transition: `opacity 1.2s ${easeCinematic}, transform 1.2s ${easeCinematic}`,
            }}
          >
            ke arah yang sama.&rdquo;
          </p>
        </div>

        {/* ── Author — slide from left, slower ── */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5625rem",
            fontWeight: 400,
            color: "var(--cel-accent)",
            lineHeight: 1.8,
            marginBottom: "2.5rem",
            letterSpacing: "0.1em",
            textShadow: "0 1px 12px rgba(0,0,0,0.4)",
            opacity: step >= 8 ? 1 : 0,
            transform: step >= 8 ? "translateX(0)" : "translateX(-12px)",
            transition: `opacity 1s ${easeCinematic}, transform 1s ${easeCinematic}`,
          }}
        >
          &mdash; Antoine de Saint-Exup&eacute;ry
        </p>

        {/* ── Ornament divider ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: step >= 9 ? "3.5rem" : "0",
              height: "0.5px",
              background: "linear-gradient(to right, transparent, var(--cel-accent))",
              opacity: step >= 9 ? 0.3 : 0,
              transition: `width 1.2s ${easeCinematic}, opacity 1.2s ${easeCinematic}`,
              overflow: "hidden",
            }}
          />
          <span
            style={{
              color: "var(--cel-accent)",
              fontSize: "0.5rem",
              opacity: step >= 9 ? 0.4 : 0,
              transition: `opacity 0.8s ${easeCinematic} 0.6s`,
            }}
          >
            ✦
          </span>
          <div
            style={{
              width: step >= 9 ? "3.5rem" : "0",
              height: "0.5px",
              background: "linear-gradient(to left, transparent, var(--cel-accent))",
              opacity: step >= 9 ? 0.3 : 0,
              transition: `width 1.2s ${easeCinematic}, opacity 1.2s ${easeCinematic}`,
              overflow: "hidden",
            }}
          />
        </div>

        {/* ── Couple Names — focal point, subtle glow breathing ── */}
        <p
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.875rem",
            fontWeight: 300,
            color: "var(--cel-text)",
            letterSpacing: "0.1em",
            marginBottom: "0.625rem",
            opacity: step >= 10 ? 1 : 0,
            transform: step >= 10 ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 1.4s ${easeCinematic}, transform 1.4s ${easeCinematic}`,
            ...(step >= 10 ? { animation: "celClosingNameBreath 8s ease-in-out infinite" } : {}),
          }}
        >
          Ali{" "}
          <span
            style={{
              color: "var(--cel-accent)",
              ...(step >= 10 ? { animation: "celClosingAmpGlow 8s ease-in-out infinite" } : {}),
            }}
          >
            &amp;
          </span>{" "}
          Lyla
        </p>

        {/* ── Date ── */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.5rem",
            fontWeight: 400,
            color: "var(--cel-text-muted)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "3rem",
            opacity: step >= 11 ? 0.5 : 0,
            transition: `opacity 1.2s ${easeCinematic}`,
          }}
        >
          5 Desember 2026
        </p>

        {/* ── Rekening / Gift Section — minimal, clean, sacred ── */}
        {step >= 12 && (
          <div
            style={{
              maxWidth: "20rem",
              width: "100%",
              opacity: 1,
              animation: "celClosingReveal 1s cubic-bezier(0.42, 0, 0.58, 1) forwards",
            }}
          >
            {!showRekening ? (
              <button
                onClick={() => setShowRekening(true)}
                style={{
                  padding: "0.5rem 1.5rem",
                  border: "1px solid rgba(201,169,110,0.25)",
                  borderRadius: "9999px",
                  background: "rgba(201,169,110,0.04)",
                  color: "var(--cel-accent)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.5rem",
                  fontWeight: 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.5s ease",
                  opacity: 0.7,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(201,169,110,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Tanda Kasih
              </button>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  animation: "celClosingReveal 0.8s cubic-bezier(0.42, 0, 0.58, 1) forwards",
                }}
              >
                {BANK_ACCOUNTS.map((acc) => (
                  <div
                    key={acc.name}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(201,169,110,0.08)",
                      borderRadius: "14px",
                      padding: "0.875rem 1.125rem",
                      transition: "all 0.4s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,169,110,0.18)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,169,110,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        color: "var(--cel-text)",
                        marginBottom: "0.125rem",
                        opacity: 0.9,
                      }}
                    >
                      {acc.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.5rem",
                        color: "var(--cel-text-muted)",
                        letterSpacing: "0.08em",
                        marginBottom: "0.5rem",
                        opacity: 0.7,
                      }}
                    >
                      {acc.bank}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.75rem",
                          color: "var(--cel-accent)",
                          letterSpacing: "0.05em",
                          fontWeight: 400,
                          opacity: 0.85,
                        }}
                      >
                        {acc.number}
                      </p>
                      <button
                        onClick={() => handleCopy(acc.number, acc.name)}
                        style={{
                          background: "none",
                          border: "1px solid rgba(201,169,110,0.15)",
                          borderRadius: "6px",
                          padding: "0.25rem 0.5rem",
                          cursor: "pointer",
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.4375rem",
                          fontWeight: 400,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--cel-accent)",
                          opacity: 0.6,
                          transition: "all 0.4s ease",
                          transform: copiedKey === acc.name ? "scale(1.08)" : "scale(1)",
                          boxShadow: copiedKey === acc.name
                            ? "0 0 12px rgba(201,169,110,0.15)"
                            : "none",
                        }}
                      >
                        {copiedKey === acc.name ? "Tersalin" : "Salin"}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Kado Fisik */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(201,169,110,0.08)",
                    borderRadius: "14px",
                    padding: "0.875rem 1.125rem",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.18)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.5rem",
                      fontWeight: 500,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--cel-accent)",
                      marginBottom: "0.5rem",
                      opacity: 0.8,
                    }}
                  >
                    Kado Fisik
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.6875rem",
                      color: "var(--cel-text-dim)",
                      lineHeight: 1.7,
                      opacity: 0.8,
                    }}
                  >
                    Lyla Azzahra<br />
                    Kebon Jahe Kober 1, Jakarta Pusat
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Final Fade-to-Black — like film ending ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background:
            "linear-gradient(to top, rgba(8,12,32,0.98) 0%, rgba(8,12,32,0.7) 30%, rgba(8,12,32,0.3) 60%, transparent 100%)",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: `opacity 3s ${easeCinematic} 2s`,
        }}
      />

      {/* ── Very bottom — absolute darkness ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "8%",
          background: "#080C20",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: `opacity 4s ${easeCinematic} 3s`,
        }}
      />

      {/* ── Nauka Logo — on top of everything, bottom center ── */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: `translateX(-50%) ${step >= 13 ? "translateY(0)" : "translateY(6px)"}`,
          opacity: step >= 13 ? 0.5 : 0,
          transition: `opacity 2s ${easeCinematic}, transform 2s ${easeCinematic}`,
          zIndex: 10,
        }}
      >
        <img
          src="/nauka-logo-new.png"
          alt="Undangan by Nauka"
          style={{
            width: "3.5rem",
            height: "auto",
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>

      {/* ── Keyframes — slower, cinematic ── */}
      <style>{`
        @keyframes celClosingParticle {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          15% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.06;
            transform: translateY(-10px) translateX(3px);
          }
          85% {
            opacity: 0.12;
          }
        }

        @keyframes celClosingShoot {
          0% {
            transform: translateX(0) translateY(0);
            box-shadow:
              0 0 6px 2px rgba(255,255,255,0.85),
              0 0 12px 4px rgba(201,169,110,0.45),
              -8px 4px 10px 2px rgba(201,169,110,0.25),
              -16px 8px 14px 1px rgba(255,255,255,0.1),
              -24px 12px 18px 0 rgba(201,169,110,0.05);
            opacity: 1;
          }
          60% {
            opacity: 1;
            box-shadow:
              0 0 4px 1px rgba(255,255,255,0.5),
              0 0 8px 2px rgba(201,169,110,0.25),
              -6px 3px 8px 1px rgba(201,169,110,0.12);
          }
          100% {
            transform: translateX(280px) translateY(140px);
            box-shadow: 0 0 2px 1px rgba(201,169,110,0.1);
            opacity: 0;
          }
        }

        @keyframes celClosingShootFade {
          from { opacity: 0.8; }
          to { opacity: 0; }
        }

        @keyframes celClosingLightSpread {
          0% {
            transform: scale(0.2);
            opacity: 0;
          }
          35% {
            opacity: 0.5;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes celClosingMoonFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes celClosingMoonGlow {
          0%, 100% {
            filter: brightness(1.05) drop-shadow(0 0 12px rgba(201,169,110,0.1));
          }
          50% {
            filter: brightness(1.1) drop-shadow(0 0 24px rgba(201,169,110,0.18));
          }
        }

        @keyframes celClosingNameBreath {
          0%, 100% {
            text-shadow: 0 2px 20px rgba(0,0,0,0.5);
          }
          50% {
            text-shadow: 0 2px 20px rgba(0,0,0,0.5), 0 0 20px rgba(201,169,110,0.08), 0 0 40px rgba(201,169,110,0.03);
          }
        }

        @keyframes celClosingAmpGlow {
          0%, 100% {
            text-shadow: 0 0 15px rgba(201,169,110,0.45), 0 0 35px rgba(201,169,110,0.15);
          }
          50% {
            text-shadow: 0 0 20px rgba(201,169,110,0.6), 0 0 45px rgba(201,169,110,0.25), 0 0 55px rgba(201,169,110,0.06);
          }
        }

        @keyframes celClosingReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
