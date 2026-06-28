"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RecoverPage() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    dashboard_url: string;
    order_id: string;
    customer_name: string;
    template: string;
    status: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!phone.trim()) {
      setError("Nomor WhatsApp wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/dashboard/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal mencari pesanan.");
        return;
      }
      setResult(data);
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ maxWidth: 400, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 28, fontWeight: 400, margin: "0 0 8px", color: "rgba(255,255,255,0.92)" }}>Lupa Akses Dashboard?</h1>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>
            Masukkan nomor WhatsApp yang Anda pakai saat checkout. Kami akan mencari link dashboard Anda.
          </p>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Nomor WhatsApp *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                style={{ width: "100%", padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.02)", color: "#fff", fontFamily: "var(--font-inter, sans-serif)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {error && (
              <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,180,180,0.9)", padding: "10px 14px", background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.2)", borderRadius: 8, margin: "0 0 16px", lineHeight: 1.6 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "14px 24px", borderRadius: 10, border: "1px solid rgba(201,169,110,0.35)", background: loading ? "rgba(201,169,110,0.03)" : "rgba(201,169,110,0.10)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, letterSpacing: "0.1em", color: loading ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.95)", cursor: loading ? "not-allowed" : "pointer", fontWeight: 500, transition: "all 0.3s ease" }}
            >
              {loading ? "Mencari..." : "Cari Dashboard Saya"}
            </button>
          </form>
        ) : (
          <div style={{ padding: 24, borderRadius: 12, border: "1px solid rgba(201,169,110,0.20)", background: "rgba(201,169,110,0.04)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(201,169,110,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px" }}>Dashboard Ditemukan!</p>
            <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 18, color: "rgba(255,255,255,0.92)", margin: "0 0 4px" }}>{result.customer_name}</p>
            <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "0 0 20px" }}>{result.order_id} • {result.template}</p>

            <a
              href={result.dashboard_url}
              style={{ display: "block", padding: "14px 24px", borderRadius: 10, border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.10)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, letterSpacing: "0.1em", color: "rgba(201,169,110,0.95)", textDecoration: "none", textAlign: "center", fontWeight: 500, marginBottom: 12 }}
            >
              Buka Dashboard
            </a>

            <button
              onClick={() => { navigator.clipboard.writeText(result.dashboard_url).then(() => alert("Link tersalin!")); }}
              style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", background: "transparent", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}
            >
              Salin Link
            </button>

            <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 16, lineHeight: 1.6 }}>
              💡 Simpan link ini di catatan atau bookmark agar tidak hilang lagi.
            </p>
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/" style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>← Kembali ke Beranda</Link>
        </div>
      </div>
    </main>
  );
}
