"use client";

import React, { useState, useEffect, useCallback } from "react";

// ════════════════════════════════════════════════════════════════
// AdminWishesModeration — Moderasi wishes (approve/reject/delete)
//
// Fitur:
//   1. Filter status: All / Pending / Approved / Rejected
//   2. Statistik per status (counter)
//   3. List wishes dengan nama, pesan, tanggal
//   4. Tombol Approve / Reject / Delete per wish
// ════════════════════════════════════════════════════════════════

interface Wish {
  id: number;
  order_id: string;
  name: string;
  message: string;
  attendance: string | null;
  guest_count: number;
  status: string;
  created_at: string;
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface AdminWishesModerationProps {
  adminSecret: string;
}

export function AdminWishesModeration({ adminSecret }: AdminWishesModerationProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const fetchWishes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = filter === "all"
        ? "/api/wishes/moderate"
        : `/api/wishes/moderate?status=${filter}`;
      const res = await fetch(url, {
        headers: { "x-admin-secret": adminSecret },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal load wishes");
      }
      setWishes(data.data || []);
      setStats(data.stats || { total: 0, pending: 0, approved: 0, rejected: 0 });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [adminSecret, filter]);

  useEffect(() => { fetchWishes(); }, [fetchWishes]);

  async function updateWishStatus(id: number, status: string) {
    try {
      const res = await fetch(`/api/wishes/moderate?id=${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal update status");
      }
      fetchWishes();
    } catch (err: any) {
      alert(err.message);
    }
  }

  async function deleteWish(id: number) {
    if (!confirm("Hapus wish ini permanently?")) return;
    try {
      const res = await fetch(`/api/wishes/moderate?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-secret": adminSecret },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal hapus wish");
      }
      fetchWishes();
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Memuat wishes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p style={{ color: "rgba(255,100,100,0.8)", fontSize: 13 }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Statistik */}
      {stats && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
          <StatCard label="Total" value={stats.total} color="#06B6D4" active={filter === "all"} onClick={() => setFilter("all")} />
          <StatCard label="Pending" value={stats.pending} color="#F59E0B" active={filter === "pending"} onClick={() => setFilter("pending")} />
          <StatCard label="Approved" value={stats.approved} color="#10B981" active={filter === "approved"} onClick={() => setFilter("approved")} />
          <StatCard label="Rejected" value={stats.rejected} color="#EF4444" active={filter === "rejected"} onClick={() => setFilter("rejected")} />
        </div>
      )}

      {/* List Wishes */}
      {wishes.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, margin: 0 }}>Tidak ada wishes untuk filter ini.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {wishes.map((wish) => (
            <div key={wish.id} style={{ padding: 12, borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.85)", margin: 0 }}>{wish.name}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: "2px 0 0" }}>
                    {wish.order_id} • {new Date(wish.created_at).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <StatusBadge status={wish.status} />
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", lineHeight: 1.5, margin: "0 0 10px", whiteSpace: "pre-line" }}>{wish.message}</p>

              {/* Action buttons */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {wish.status !== "approved" && (
                  <button onClick={() => updateWishStatus(wish.id, "approved")} style={approveBtnStyle}>✓ Approve</button>
                )}
                {wish.status !== "rejected" && (
                  <button onClick={() => updateWishStatus(wish.id, "rejected")} style={rejectBtnStyle}>✗ Reject</button>
                )}
                <button onClick={() => deleteWish(wish.id)} style={deleteBtnStyle}>🗑 Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const approveBtnStyle: React.CSSProperties = {
  padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(16,185,129,0.30)", background: "rgba(16,185,129,0.08)", color: "rgba(16,185,129,0.9)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-inter, sans-serif)",
};

const rejectBtnStyle: React.CSSProperties = {
  padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(245,158,11,0.30)", background: "rgba(245,158,11,0.08)", color: "rgba(245,158,11,0.9)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-inter, sans-serif)",
};

const deleteBtnStyle: React.CSSProperties = {
  padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.30)", background: "rgba(239,68,68,0.08)", color: "rgba(239,68,68,0.9)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-inter, sans-serif)",
};

function StatCard({ label, value, color, active, onClick }: { label: string; value: number; color: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: 10, borderRadius: 10,
        border: active ? `1px solid ${color}` : `1px solid ${color}33`,
        background: active ? `${color}1A` : `${color}0A`,
        textAlign: "center", cursor: "pointer", transition: "all 0.2s ease",
      }}
    >
      <p style={{ fontSize: 18, fontWeight: 500, color: color, margin: "0 0 2px" }}>{value}</p>
      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", margin: 0 }}>{label}</p>
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; bg: string }> = {
    pending: { label: "Pending", color: "#F59E0B", bg: "rgba(245,158,11,0.10)" },
    approved: { label: "Approved", color: "#10B981", bg: "rgba(16,185,129,0.10)" },
    rejected: { label: "Rejected", color: "#EF4444", bg: "rgba(239,68,68,0.10)" },
  };
  const c = config[status] || config.pending;
  return (
    <span style={{ padding: "2px 8px", borderRadius: 999, background: c.bg, color: c.color, fontSize: 10, fontWeight: 500 }}>
      {c.label}
    </span>
  );
}
