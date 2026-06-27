"use client";

import React, { useState, useEffect } from "react";

interface AnalyticsData {
  order_id: string;
  total_views: number;
  unique_visitors: number;
  rsvp_count: number;
  wish_count: number;
  rsvp_conversion: string;
  wish_conversion: string;
}

export function DashboardAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("nauka_dashboard_token");
    if (!token) { setLoading(false); return; }
    fetch(`/api/analytics?token=${token}`)
      .then(res => res.ok ? res.json() : null)
      .then(json => { if (json?.data) setData(json.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.5)", fontSize: 13 }}>Memuat analitik...</p>;
  }

  if (!data) {
    return <p style={{ padding: 40, textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Belum ada data analitik.</p>;
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <BigStatCard label="Total Views" value={data.total_views} color="#06B6D4" icon="👁" />
        <BigStatCard label="Unique Visitors" value={data.unique_visitors} color="#8B5CF6" icon="👤" />
        <BigStatCard label="Total RSVP" value={data.rsvp_count} color="#10B981" icon="✓" />
        <BigStatCard label="Total Wishes" value={data.wish_count} color="#F59E0B" icon="💌" />
      </div>

      {/* Conversion Rate */}
      <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(201,169,110,0.20)", background: "rgba(201,169,110,0.04)", marginBottom: 16 }}>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px" }}>Conversion Rate</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>RSVP per Visitor</span>
          <span style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 16, color: "rgba(201,169,110,0.9)" }}>{data.rsvp_conversion}%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Wish per Visitor</span>
          <span style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 16, color: "rgba(201,169,110,0.9)" }}>{data.wish_conversion}%</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: 16, borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, margin: 0 }}>
          Data diperbarui secara real-time. Unique visitor dihitung berdasarkan browser tamu (1x per 30 menit).
        </p>
      </div>
    </div>
  );
}

function BigStatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div style={{ padding: 16, borderRadius: 12, border: `1px solid ${color}33`, background: `${color}0A`, textAlign: "center" }}>
      <p style={{ fontSize: 18, margin: "0 0 4px" }}>{icon}</p>
      <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 28, fontWeight: 400, color: color, margin: "0 0 4px" }}>{value}</p>
      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em", margin: 0 }}>{label}</p>
    </div>
  );
      }
