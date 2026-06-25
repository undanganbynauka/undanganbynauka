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
    name: "Tamu",
    message: "Baarakallaahu lakumaa wa baaraka 'alaikumaa wa jama'a bainakumaa fii khair.",
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
  {
    id: "dummy-2",
    name: "Sahabat",
    message: "Semoga menjadi keluarga yang sakinah, mawaddah, wa rahmah.",
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
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

interface WishesSectionProps {
  orderId?: string;
}

export function WishesSection({ orderId }: WishesSectionProps = {}) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);
  const [wishes, setWishes] = useState<Wish[]>(DUMMY_WISHES);
  const [newWish, setNewWish] = useState({ name: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [newlyAddedIds, setNewlyAddedIds] = useState<Set<string>>(new Set());
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

  const fetchWishes = useCallback(async () => {
    try {
      const url = orderId ? `/api/wishes?order_id=${orderId}` : "/api/wishes";
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) { setWishes(json.data); }
      }
    } catch {}
  }, [orderId]);

  useEffect(() => {
    fetchWishes();
    if (!isSupabaseConfigured || !supabase) return;
    const channel = supabase
      .channel("guest_messages_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "guest_messages" }, (payload) => {
        const newEntry = payload.new as Wish;
        setWishes((prev) => { if (prev.some((w) => w.id === newEntry.id)) return prev; return [newEntry, ...prev]; });
        setNewlyAddedIds((prev) => new Set(prev).add(newEntry.id));
        setTimeout(() => { setNewlyAddedIds((prev) => { const next = new Set(prev); next.delete(newEntry.id); return next; }); }, 600);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [fetchWishes]);

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
      if (res.ok) { setNewWish({ name: "", message: "" }); }
    } catch {} finally { setSubmitting(false); }
  };

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section ref={sectionRef} id="ucapan" style={{ position: "relative", padding: "4rem 1.5rem", display: "flex", flexDirection: "column", alignItems: "center", background: "#FAF7F2" }}>
      <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", marginBottom: "0.5rem", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)", transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}` }}>Sampaikan doa dan harapan terbaik untuk kedua mempelai</p>
      <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.75rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "2rem", opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? "translateY(0)" : "translateY(15px)", transition: `opacity 0.8s ${ease} 0.1s, transform 0.8s ${ease} 0.1s` }}>Ucapan &amp; Doa</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: "22rem", width: "100%", marginBottom: "2.5rem", opacity: step >= 2 ? 1 : 0, transform: step >= 2 ? "translateY(0) scale(1)" : "translateY(15px) scale(0.98)", transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}` }}>
        <input type="text" placeholder="Nama" required value={newWish.name} onChange={(e) => setNewWish({ ...newWish, name: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem", color: "#2E2E2E", background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)", borderRadius: "12px", outline: "none", marginBottom: "0.75rem", transition: "border-color 0.3s ease" }} onFocus={(e) => (e.target.style.borderColor = "#7D6A52")} onBlur={(e) => (e.target.style.borderColor = "rgba(125, 110, 99, 0.12)")} />
        <textarea placeholder="Ucapan & Doa" required rows={3} value={newWish.message} onChange={(e) => setNewWish({ ...newWish, message: e.target.value })} style={{ width: "100%", padding: "0.625rem 0.875rem", fontFamily: "var(--font-jakarta)", fontSize: "0.8125rem", color: "#2E2E2E", background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)", borderRadius: "12px", outline: "none", resize: "none", marginBottom: "0.75rem", transition: "border-color 0.3s ease" }} onFocus={(e) => (e.target.style.borderColor = "#7D6A52")} onBlur={(e) => (e.target.style.borderColor = "rgba(125, 110, 99, 0.12)")} />
        <button type="submit" disabled={submitting} style={{ width: "100%", padding: "0.625rem", fontFamily: "var(--font-jakarta)", fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2E2E2E", background: "rgba(125, 106, 82, 0.08)", border: "1px solid rgba(125, 106, 82, 0.2)", borderRadius: "999px", cursor: submitting ? "wait" : "pointer", transition: "all 0.3s ease", opacity: submitting ? 0.6 : 1 }}>
          {submitting ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </form>
      <div style={{ maxWidth: "22rem", width: "100%", maxHeight: "28rem", overflowY: "auto", paddingRight: "0.5rem", WebkitOverflowScrolling: "touch" }} className="wishes-scroll-container">
        {wishes.map((w) => {
          const isNew = newlyAddedIds.has(w.id);
          return (
            <div key={w.id} style={{ background: "rgba(125, 110, 99, 0.04)", border: "1px solid rgba(125, 110, 99, 0.12)", borderRadius: "16px", padding: "1rem 1.25rem", marginBottom: "0.75rem", opacity: 1, transform: "translateY(0)", transition: isNew ? `opacity 0.5s ease-out, transform 0.5s ease-out` : "none", animation: isNew ? "wishSlideIn 0.5s ease-out" : "none" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.9375rem", fontWeight: 500, color: "#2E2E2E", marginBottom: "0.375rem" }}>{w.name}</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.75rem", color: "#6F6F6F", lineHeight: 1.7, marginBottom: "0.375rem", whiteSpace: "pre-line" }}>{w.message}</p>
              <p style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", color: "#8A8A8A" }}>{formatRelativeTime(w.created_at)}</p>
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes wishSlideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .wishes-scroll-container { scrollbar-width: thin; scrollbar-color: rgba(125, 110, 99, 0.25) transparent; }
        .wishes-scroll-container::-webkit-scrollbar { width: 4px; }
        .wishes-scroll-container::-webkit-scrollbar-track { background: transparent; }
        .wishes-scroll-container::-webkit-scrollbar-thumb { background: rgba(125, 110, 99, 0.25); border-radius: 999px; }
        .wishes-scroll-container::-webkit-scrollbar-thumb:hover { background: rgba(125, 110, 99, 0.4); }
      `}</style>
    </section>
  );
}
