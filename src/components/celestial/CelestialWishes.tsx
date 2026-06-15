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

export function CelestialWishes() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [wishes, setWishes] = useState<Wish[]>(DUMMY_WISHES);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [newlyAddedIds, setNewlyAddedIds] = useState<Set<string>>(new Set());
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
    const t = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 500),
    ];
    return () => t.forEach(clearTimeout);
  }, [visible]);

  // Fetch initial wishes from Supabase
  const fetchWishes = useCallback(async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setWishes(json.data);
        }
      }
    } catch {
      // Silently fall back to dummy data
    }
  }, []);

  // Subscribe to Supabase Realtime (only if configured)
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
          // Auto-scroll to top when new wish arrives
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
          }, 1500);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchWishes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newWish.name, message: newWish.message }),
      });
      if (res.ok) {
        setNewWish({ name: "", message: "" });
        // If Supabase not configured, add locally
        if (!isSupabaseConfigured) {
          const localWish: Wish = {
            id: `local-${Date.now()}`,
            name: newWish.name.trim(),
            message: newWish.message.trim(),
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
          }, 1500);
        }
      }
    } catch {
      // Silently fail
    } finally {
      setSubmitting(false);
    }
  };

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      ref={sectionRef}
      id="ucapan"
      className="celestial-section"
      style={{ background: "var(--cel-deep)", padding: "4rem 1.5rem 5rem" }}
    >
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
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
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
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0)" : "translateY(15px)",
          transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s`,
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
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0) scale(1)" : "translateY(15px) scale(0.98)",
          transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
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
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--cel-accent)";
            e.target.style.boxShadow = "0 0 12px rgba(201, 169, 110, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--cel-border)";
            e.target.style.boxShadow = "none";
          }}
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
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--cel-accent)";
            e.target.style.boxShadow = "0 0 12px rgba(201, 169, 110, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--cel-border)";
            e.target.style.boxShadow = "none";
          }}
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

      {/* Wishes List */}
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
          opacity: step >= 2 ? 1 : 0,
          transition: `opacity 0.8s ${ease} 0.2s`,
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
                animation: isNew ? "celWishSlideIn 0.6s ease-out, celWishGlow 1.5s ease-out" : "none",
                borderColor: isNew ? "var(--cel-accent)" : undefined,
                transition: "border-color 0.5s ease",
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
                <span style={{ fontSize: "0.625rem" }}>⭐</span>
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
      <style jsx>{`
        @keyframes celWishSlideIn {
          from {
            opacity: 0;
            transform: translateY(-15px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes celWishGlow {
          0% {
            box-shadow: 0 0 20px rgba(201, 169, 110, 0.25);
          }
          100% {
            box-shadow: none;
          }
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
