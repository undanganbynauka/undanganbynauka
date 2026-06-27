"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Wish {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const DUMMY_WISHES: Wish[] = [
  {
    id: "dummy-1",
    name: "Nafisa",
    message: "Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "dummy-2",
    name: "Khalid",
    message: "Baarakallaahu lakuma wa baaraka 'alaikuma wa jama'a bainakumaa fii khair.",
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "dummy-3",
    name: "Aufa",
    message: "Selamat menempuh hidup baru! Semoga perjalanan kalian dipenuhi cinta dan keberkahan.",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  return `${diffDay} hari lalu`;
}

interface CelestialWishesProps {
  orderId?: string;
}

export function CelestialWishes({ orderId }: CelestialWishesProps = {}) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(-1);
  const [wishes, setWishes] = useState<Wish[]>(DUMMY_WISHES);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [newlyAddedIds, setNewlyAddedIds] = useState<Set<string>>(new Set());
  const [showSparkle, setShowSparkle] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver
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

  // Step animation
  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setStep(0), 100),
      setTimeout(() => setStep(1), 1100),
      setTimeout(() => setStep(2), 1700),
      setTimeout(() => setStep(3), 2100),
      setTimeout(() => setStep(4), 2700),
      setTimeout(() => setStep(5), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  // Fetch initial wishes from Supabase
  const fetchWishes = useCallback(async () => {
    try {
      const url = orderId ? `/api/wishes?order_id=${orderId}` : "/api/wishes";
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setWishes(json.data);
        }
      }
    } catch {
      // Silently fall back to dummy data
    }
  }, [orderId]);

  // Subscribe to Supabase Realtime
  useEffect(() => {
    fetchWishes();

    if (!isSupabaseConfigured || !supabase) return;

    const channel = supabase
      .channel("guest_messages_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guest_messages" },
        (payload) => {
          const newEntry = payload.new as Wish;
          setWishes((prev) => {
            if (prev.some((w) => w.id === newEntry.id)) return prev;
            return [newEntry, ...prev];
          });
          setNewlyAddedIds((prev) => new Set(prev).add(newEntry.id));
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
          }, 100);
          setTimeout(() => {
            setNewlyAddedIds((prev) => {
              const next = new Set(prev);
              next.delete(newEntry.id);
              return next;
            });
          }, 2500);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchWishes]);

  const triggerSparkle = () => {
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newWish.name, message: newWish.message, order_id: orderId }),
      });
      if (res.ok) {
        const savedName = newWish.name.trim();
        const savedMessage = newWish.message.trim();
        setNewWish({ name: "", message: "" });

        // Trigger emotional sparkle
        triggerSparkle();

        if (!isSupabaseConfigured) {
          const localWish: Wish = {
            id: `local-${Date.now()}`,
            name: savedName,
            message: savedMessage,
            created_at: new Date().toISOString(),
          };
          setWishes((prev) => [localWish, ...prev]);
          setNewlyAddedIds((prev) => new Set(prev).add(localWish.id));
          setTimeout(() => {
            if (scrollRef.current) {
              scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
          }, 100);
          setTimeout(() => {
            setNewlyAddedIds((prev) => {
              const next = new Set(prev);
              next.delete(localWish.id);
              return next;
            });
          }, 2500);
        }
      }
    } catch {
      // Silently fail
    } finally {
      setSubmitting(false);
    }
  };

  const easeInOut = "cubic-bezier(0.42, 0, 0.58, 1)";

  // Shared focus/blur handlers with warm glow
  const handleFocus = (field: string, e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(field);
    e.currentTarget.style.borderColor = "rgba(201, 169, 110, 0.4)";
    e.currentTarget.style.boxShadow = "0 0 16px rgba(201, 169, 110, 0.12)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocusedField(null);
    e.currentTarget.style.borderColor = "var(--cel-border)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <section
      ref={sectionRef}
      id="ucapan"
      className="celestial-section"
      style={{ background: "var(--cel-deep)", padding: "4rem 1.5rem 5rem", position: "relative", overflow: "hidden" }}
    >
      {/* Shooting Star — signature */}
      {step >= 0 && step < 2 && (
        <div style={{ position: "absolute", top: "10%", left: "8%", pointerEvents: "none", zIndex: 5 }}>
          <div style={{
            width: "3px", height: "3px", borderRadius: "50%", background: "#fff",
            animation: "celSectionShoot 1.5s ease-out forwards",
          }} />
        </div>
      )}

      {/* Light spread */}
      {step >= 1 && (
        <div style={{
          position: "absolute", top: "16%", right: "12%",
          width: "60px", height: "60px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "celSectionLightSpread 1.5s ease-out forwards",
        }} />
      )}

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`p-${i}`} style={{
            position: "absolute",
            width: `${1 + Math.random() * 1.5}px`,
            height: `${1 + Math.random() * 1.5}px`,
            borderRadius: "50%",
            background: i % 3 === 0 ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.4)",
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            opacity: 0,
            animation: `celSectionParticle ${5 + Math.random() * 7}s ease-in-out ${Math.random() * 4}s infinite`,
          }} />
        ))}
      </div>

      {/* Emotional sparkle burst on submit */}
      {showSparkle && (
        <div style={{
          position: "absolute", top: "30%", left: "50%", pointerEvents: "none", zIndex: 10,
          transform: "translate(-50%, -50%)",
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`sp-${i}`} style={{
              position: "absolute",
              width: "3px", height: "3px", borderRadius: "50%",
              background: "rgba(201,169,110,0.7)",
              animation: `celWishSparkleBurst 1.5s ease-out ${i * 0.08}s forwards`,
              transform: `rotate(${i * 45}deg)`,
            }}>
              <div style={{
                width: "3px", height: "3px", borderRadius: "50%",
                background: "rgba(201,169,110,0.6)",
              }} />
            </div>
          ))}
          {/* Soft glow center */}
          <div style={{
            width: "30px", height: "30px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,169,110,0.2) 0%, transparent 70%)",
            animation: "celWishGlowBurst 1.5s ease-out forwards",
            position: "absolute",
            top: "-15px", left: "-15px",
          }} />
        </div>
      )}

      {/* Section heading */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.5rem",
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--cel-accent)",
          marginBottom: "0.5rem",
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
        }}
      >
        Doa &amp; Restu
      </p>
      <h2
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.75rem",
          fontWeight: 300,
          color: "var(--cel-text)",
          letterSpacing: "0.04em",
          marginBottom: "2rem",
          opacity: step >= 3 ? 1 : 0,
          transform: step >= 3 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${easeInOut}, transform 0.8s ${easeInOut}`,
        }}
      >
        Ucapan &amp; Doa
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "22rem",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "2rem",
          opacity: step >= 4 ? 1 : 0,
          transform: step >= 4
            ? focusedField ? "translateY(0) scale(1.005)" : "translateY(0) scale(1)"
            : "translateY(15px) scale(0.98)",
          transition: `opacity 0.8s ${easeInOut}, transform 0.5s ${easeInOut}`,
        }}
      >
        <input
          type="text"
          placeholder="Nama"
          required
          value={newWish.name}
          onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
          style={{
            padding: "0.75rem 1rem",
            border: "1px solid var(--cel-border)",
            borderRadius: "12px",
            background: "var(--cel-glass)",
            color: "var(--cel-text)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            outline: "none",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
          onFocus={(e) => handleFocus("name", e)}
          onBlur={handleBlur}
        />
        <textarea
          placeholder="Tulis ucapan & doa..."
          required
          rows={3}
          value={newWish.message}
          onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
          style={{
            padding: "0.75rem 1rem",
            border: "1px solid var(--cel-border)",
            borderRadius: "12px",
            background: "var(--cel-glass)",
            color: "var(--cel-text)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            outline: "none",
            resize: "none",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
          onFocus={(e) => handleFocus("message", e)}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "0.625rem 1.5rem",
            border: "1px solid var(--cel-accent)",
            borderRadius: "9999px",
            background: submitting
              ? "rgba(201, 169, 110, 0.04)"
              : "rgba(201, 169, 110, 0.08)",
            color: "var(--cel-accent)",
            fontFamily: "var(--font-inter)",
            fontSize: "0.5625rem",
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: submitting ? "wait" : "pointer",
            transition: "all 0.3s ease",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </form>

      {/* Wishes List — live feed feel */}
      <div
        ref={scrollRef}
        className="cel-wishes-scroll"
        style={{
          maxWidth: "22rem",
          width: "100%",
          maxHeight: "28rem",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          opacity: step >= 5 ? 1 : 0,
          transition: `opacity 0.8s ${easeInOut}`,
        }}
      >
        {wishes.map((w) => {
          const isNew = newlyAddedIds.has(w.id);
          return (
            <div
              key={w.id}
              className="celestial-card"
              style={{
                padding: "1rem 1.25rem",
                animation: isNew
                  ? "celWishSlideIn 0.8s ease-out, celWishGlow 2.5s ease-out"
                  : "none",
                borderColor: isNew ? "rgba(201,169,110,0.3)" : undefined,
                background: isNew
                  ? "rgba(201, 169, 110, 0.04)"
                  : "var(--cel-glass)",
                transition: "border-color 0.8s ease, background 0.8s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                {/* Small star with subtle pulse for new wishes */}
                <span style={{
                  fontSize: "0.625rem",
                  display: "inline-block",
                  animation: isNew ? "celWishNewPulse 1.5s ease-in-out infinite" : "none",
                }}>⭐</span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.6875rem",
                    fontWeight: 500,
                    color: "var(--cel-accent)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {w.name}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.5rem",
                    color: "var(--cel-text-muted)",
                    marginLeft: "auto",
                  }}
                >
                  {formatRelativeTime(w.created_at)}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.6875rem",
                  color: "var(--cel-text-dim)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {w.message}
              </p>
            </div>
          );
        })}
      </div>

      {/* Inline keyframes & scrollbar styling */}
      <style>{`
        @keyframes celWishSlideIn {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes celWishGlow {
          0% {
            box-shadow: 0 0 24px rgba(201, 169, 110, 0.2);
          }
          100% {
            box-shadow: none;
          }
        }
        @keyframes celWishNewPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
        @keyframes celWishSparkleBurst {
          0% {
            transform: rotate(var(--rot, 0deg)) translateY(0);
            opacity: 0.8;
          }
          100% {
            transform: rotate(var(--rot, 0deg)) translateY(-25px);
            opacity: 0;
          }
        }
        @keyframes celWishGlowBurst {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(3); opacity: 0; }
        }
        .cel-wishes-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(201, 169, 110, 0.2) transparent;
        }
        .cel-wishes-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .cel-wishes-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .cel-wishes-scroll::-webkit-scrollbar-thumb {
          background: rgba(201, 169, 110, 0.2);
          border-radius: 999px;
        }
        .cel-wishes-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(201, 169, 110, 0.4);
        }
      `}</style>
    </section>
  );
}
