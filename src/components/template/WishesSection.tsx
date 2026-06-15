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
    message: "Selamat ya Ali & Lyla.\nBaarakallaahulakuma wa baaraka 'alaikuma wa jama'a bainakumaa fii khair.",
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "dummy-2",
    name: "Khalid",
    message: "Waah Li, akhirnya hari ini datang juga.\nBaarakallaahu fiikumaa.",
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "dummy-3",
    name: "Aufa",
    message: "Selamat menempuh hidup baru Bang Ali dan Ka Lyla.\nSemoga menjadi keluarga yang sakinah, mawaddah, wa rahmah.",
    created_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
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

export function WishesSection() {
  const [visible, setVisible] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(DUMMY_WISHES);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver
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
      }
    } catch {
      // Silently fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="ucapan" style={{
      position: "relative", padding: "4.5rem 1.5rem",
      display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2",
      opacity: visible ? 1 : 0,
      transition: "opacity 600ms ease",
    }}>
      <p style={{
        fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400,
        letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem",
      }}>Sampaikan doa dan harapan terbaik untuk kedua mempelai</p>
      <h2 style={{
        fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500,
        color: "#2E2E2E", marginBottom: "2rem",
      }}>Ucapan &amp; Doa</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{
        maxWidth: "22rem", width: "100%", marginBottom: "2.5rem",
      }}>
        <input
          type="text"
          placeholder="Nama"
          required
          value={newWish.name}
          onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
          style={{
            width: "100%", padding: "0.625rem 0.875rem", fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem",
            color: "#2E2E2E", background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "12px", outline: "none", marginBottom: "0.75rem", transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#7D6A52")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(125, 110, 99, 0.12)")}
        />
        <textarea
          placeholder="Ucapan & Doa"
          required
          rows={3}
          value={newWish.message}
          onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
          style={{
            width: "100%", padding: "0.625rem 0.875rem", fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem",
            color: "#2E2E2E", background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "12px", outline: "none", resize: "none", marginBottom: "0.75rem", transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#7D6A52")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(125, 110, 99, 0.12)")}
        />
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%", padding: "0.625rem", fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem",
            fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2E2E2E",
            background: "rgba(125, 106, 82, 0.08)", border: "1px solid rgba(125, 106, 82, 0.2)",
            borderRadius: "999px", cursor: submitting ? "wait" : "pointer", transition: "all 0.3s ease",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </form>

      {/* Wishes List */}
      <div style={{
        maxWidth: "22rem", width: "100%", maxHeight: "28rem", overflowY: "auto",
        paddingRight: "0.5rem",
        WebkitOverflowScrolling: "touch",
      }} className="wishes-scroll-container">
        {wishes.map((w) => (
          <div
            key={w.id}
            style={{
              background: "rgba(125, 110, 99, 0.04)",
              border: "1px solid rgba(125, 110, 99, 0.12)",
              borderRadius: "16px",
              padding: "1rem 1.25rem",
              marginBottom: "0.75rem",
            }}
          >
            <p style={{
              fontFamily: "var(--font-cormorant)", fontSize: "0.9375rem", fontWeight: 500,
              color: "#2E2E2E", marginBottom: "0.375rem",
            }}>{w.name}</p>
            <p style={{
              fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F",
              lineHeight: 1.7, marginBottom: "0.375rem", whiteSpace: "pre-line",
            }}>{w.message}</p>
            <p style={{
              fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", color: "#8A8A8A",
            }}>{formatRelativeTime(w.created_at)}</p>
          </div>
        ))}
      </div>

      {/* Scroll styling */}
      <style>{`
        .wishes-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(125, 110, 99, 0.25) transparent;
        }
        .wishes-scroll-container::-webkit-scrollbar {
          width: 4px;
        }
        .wishes-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .wishes-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(125, 110, 99, 0.25);
          border-radius: 999px;
        }
        .wishes-scroll-container::-webkit-scrollbar-thumb:hover {
          background: rgba(125, 110, 99, 0.4);
        }
      `}</style>
    </section>
  );
}
