"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Wish {
  id: number;
  name: string;
  message: string;
  attendance: string | null;
  guest_count: number;
  status: string;
  created_at: string;
}

interface DashboardWishesProps {
  orderId: string;
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffSec = Math.floor((now - then) / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  if (diffSec < 60) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit lalu`;
  if (diffHour < 24) return `${diffHour} jam lalu`;
  return `${diffDay} hari lalu`;
}

const ATTENDANCE_LABELS: Record<string, string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak Hadir",
  ragu: "Masih Ragu",
};

export function DashboardWishes({ orderId }: DashboardWishesProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchWishes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wishes?order_id=${orderId}`);
      if (res.ok) {
        const json = await res.json();
        setWishes(json.data || []);
      }
    } catch (err) {
      console.error("[DashboardWishes] fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { fetchWishes(); }, [fetchWishes]);

  const filteredWishes = filter === "all"
    ? wishes
    : wishes.filter((w) => w.attendance === filter);

  const counts = {
    all: wishes.length,
    hadir: wishes.filter((w) => w.attendance === "hadir").length,
    tidak_hadir: wishes.filter((w) => w.attendance === "tidak_hadir").length,
    ragu: wishes.filter((w) => w.attendance === "ragu").length,
  };

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Memuat ucapan...</p>;
  }

  return (
    <div>
      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <FilterChip label={`Semua (${counts.all})`} active={filter === "all"} onClick={() => setFilter("all")} />
        <FilterChip label={`Hadir (${counts.hadir})`} active={filter === "hadir"} onClick={() => setFilter("hadir")} color="#10B981" />
        <FilterChip label={`Tidak Hadir (${counts.tidak_hadir})`} active={filter === "tidak_hadir"} onClick={() => setFilter("tidak_hadir")} color="#EF4444" />
        <FilterChip label={`Ragu (${counts.ragu})`} active={filter === "ragu"} onClick={() => setFilter("ragu")} color="#F59E0B" />
      </div>

      {/* List Wishes */}
      {filteredWishes.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Belum ada ucapan untuk filter ini.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filteredWishes.map((wish) => (
            <div key={wish.id} style={{ padding: 14, borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500, margin: 0 }}>{wish.name}</p>
                  <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(255,255,255,0.35)", margin: "2px 0 0" }}>{formatRelativeTime(wish.created_at)}</p>
                </div>
                {wish.attendance && (
                  <span style={{ padding: "2px 8px", borderRadius: 999, background: wish.attendance === "hadir" ? "rgba(16,185,129,0.10)" : wish.attendance === "tidak_hadir" ? "rgba(239,68,68,0.10)" : "rgba(245,158,11,0.10)", color: wish.attendance === "hadir" ? "#10B981" : wish.attendance === "tidak_hadir" ? "#EF4444" : "#F59E0B", fontSize: 10, fontWeight: 500 }}>
                    {ATTENDANCE_LABELS[wish.attendance] || wish.attendance}
                    {wish.attendance === "hadir" && wish.guest_count > 1 ? ` (${wish.guest_count})` : ""}
                  </span>
                )}
              </div>
              <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0, whiteSpace: "pre-line" }}>{wish.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: string }) {
  const c = color || "#C9A96E";
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 14px", borderRadius: 999,
        border: active ? `1px solid ${c}80` : "1px solid rgba(255,255,255,0.08)",
        background: active ? `${c}15` : "transparent",
        color: active ? c : "rgba(255,255,255,0.5)",
        fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, letterSpacing: "0.05em",
        cursor: "pointer", transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
}
