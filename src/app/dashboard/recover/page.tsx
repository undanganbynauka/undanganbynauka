"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface OrderInfo {
  order_id: string;
  status: string;
  template: string;
  package: string;
  slug: string;
  groom: string;
  bride: string;
  created_at?: string;
  dashboard_url: string;
  customer_name?: string;
}

export default function RecoverPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [singleOrder, setSingleOrder] = useState<OrderInfo | null>(null);
  const [orders, setOrders] = useState<OrderInfo[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Nomor WhatsApp wajib diisi.");
      return;
    }
    setLoading(true);
    setError("");
    setSingleOrder(null);
    setOrders([]);

    try {
      const res = await fetch("/api/dashboard/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim() }),
      });
      const data = await res.json();
      console.log("[recover UI] response:", data);

      // Format BARU: cek data.ok terlebih dahulu
      if (data && data.ok === true) {
        if (data.single) {
          const order: OrderInfo = {
            order_id: data.order_id || data.order?.order_id || "",
            status: data.status || data.order?.status || "",
            template: data.template || data.order?.template || "",
            package: data.package || data.order?.package || "",
            slug: data.slug || data.order?.slug || "",
            groom: data.groom || data.order?.groom || "",
            bride: data.bride || data.order?.bride || "",
            customer_name: data.customer_name || data.order?.customer_name || "",
            dashboard_url: data.dashboard_url || data.order?.dashboard_url || "",
          };
          setSingleOrder(order);
          setTimeout(() => {
            router.push(order.dashboard_url);
          }, 1500);
        } else {
          setOrders(data.orders || []);
        }
        return;
      }

      // Format LAMA (backward compat): cek data.dashboard_url langsung
      if (data && data.dashboard_url) {
        const order: OrderInfo = {
          order_id: data.order_id || "",
          status: data.status || "",
          template: data.template || "",
          package: "",
          slug: "",
          groom: "",
          bride: "",
          customer_name: data.customer_name || "",
          dashboard_url: data.dashboard_url,
        };
        setSingleOrder(order);
        setTimeout(() => {
          router.push(order.dashboard_url);
        }, 1500);
        return;
      }

      // Gagal
      setError(data?.error || "Gagal mencari order.");
    } catch (err) {
      console.error("[recover UI] error:", err);
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 28, color: "rgba(201,169,110,0.85)", margin: "0 0 8px" }}>Lupa Akses Dashboard</p>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
            Masukkan nomor WhatsApp yang dipakai checkout. Kami akan kirim link dashboard ke nomor itu.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 24, border: "1px solid rgba(255,255,255,0.08)" }}>
          <label style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 8, letterSpacing: "0.05em" }}>
            Nomor WhatsApp
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            style={{ width: "100%", padding: "12px 14px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff", fontSize: 14, fontFamily: "var(--font-inter, sans-serif)" }}
            disabled={loading}
            autoComplete="tel"
          />

          {error && (
            <p style={{ color: "rgba(255,150,150,0.9)", fontSize: 12, marginTop: 12, marginBottom: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: "100%", marginTop: 16, padding: "12px 16px", background: loading ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.85)", color: "#0B1120", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-inter, sans-serif)" }}
          >
            {loading ? "Mencari..." : "Cari Dashboard Saya"}
          </button>
        </form>

        {singleOrder && (
          <div style={{ marginTop: 24, padding: 20, background: "rgba(201,169,110,0.08)", borderRadius: 12, border: "1px solid rgba(201,169,110,0.2)", textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "rgba(201,169,110,0.85)", marginBottom: 8, letterSpacing: "0.05em" }}>DITEMUKAN</p>
            <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 20, margin: "0 0 4px" }}>
              {singleOrder.groom || singleOrder.customer_name ? `${singleOrder.groom || singleOrder.customer_name}${singleOrder.bride ? ` & ${singleOrder.bride}` : ""}` : "Order"}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Paket {singleOrder.package || "-"} - Template {singleOrder.template || "-"}
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>Mengalihkan ke dashboard...</p>
          </div>
        )}

        {orders.length > 0 && (
          <div style={{ marginTop: 24 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>
              Ditemukan {orders.length} undangan. Pilih salah satu:
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {orders.map((o) => (
                <button
                  key={o.order_id}
                  onClick={() => router.push(o.dashboard_url)}
                  style={{ textAlign: "left", padding: 16, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, cursor: "pointer", color: "#fff", fontFamily: "inherit" }}
                >
                  <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 18, margin: "0 0 4px", color: "rgba(201,169,110,0.85)" }}>
                    {o.groom} & {o.bride}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Paket {o.package} - {o.template}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12 }}>
          <Link href="/dashboard" style={{ color: "rgba(201,169,110,0.7)", textDecoration: "none" }}>
            &larr; Kembali ke Dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}
