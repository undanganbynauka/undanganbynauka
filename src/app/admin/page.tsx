"use client";

import React, { useState, useEffect, useCallback } from "react";

// ════════════════════════════════════════════════════════════════
// NAUKA ADMIN — Dashboard pesanan undangan
// Dengan form login admin secret (localStorage-based)
// ════════════════════════════════════════════════════════════════

interface Order {
  id: number;
  order_id: string;
  template: string;
  package: "basic" | "premium" | "free";
  price: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  wedding_data: any;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending_payment: { label: "Menunggu Pembayaran", color: "#F59E0B" },
  pending_whatsapp: { label: "Menunggu WA Admin", color: "#F97316" },
  awaiting_confirmation: { label: "Menunggu Verifikasi", color: "#3B82F6" },
  paid: { label: "Sudah Bayar", color: "#10B981" },
  in_production: { label: "Dalam Pengerjaan", color: "#8B5CF6" },
  published: { label: "Published", color: "#06B6D4" },
  cancelled: { label: "Cancelled", color: "#EF4444" },
};

const STORAGE_KEY = "nauka_admin_secret";

function formatIDR(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ════════════════════════════════════════════════════════════════
// MAIN ADMIN PAGE — handle auth state
// ════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [adminSecret, setAdminSecret] = useState<string | null>(null);
  const [secretInput, setSecretInput] = useState("");
  const [authChecking, setAuthChecking] = useState(true);

  // ── Load admin secret from localStorage on mount ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAdminSecret(stored);
      }
    } catch (e) {
      // localStorage may not be available (SSR / private mode)
    }
    setAuthChecking(false);
  }, []);

  // ── Login: save secret to localStorage ──
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!secretInput.trim()) return;
    try {
      localStorage.setItem(STORAGE_KEY, secretInput.trim());
      setAdminSecret(secretInput.trim());
      setSecretInput("");
    } catch (err) {
      alert("Gagal menyimpan admin secret di browser.");
    }
  }

  // ── Logout: clear secret from localStorage & state ──
  function handleLogout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setAdminSecret(null);
    setSecretInput("");
  }

  // ── Loading state (initial check) ──
  if (authChecking) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0B1120",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: 13,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          Memuat...
        </p>
      </main>
    );
  }

  // ── Login page (no secret yet) ──
  if (!adminSecret) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0B1120",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 16px",
        }}
      >
        <div style={{ maxWidth: 380, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1
              style={{
                fontFamily: "var(--font-bodoni, Georgia, serif)",
                fontSize: 28,
                fontWeight: 400,
                margin: 0,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Nauka Admin
            </h1>
            <p
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                marginTop: 6,
              }}
            >
              Masukkan admin secret untuk melanjutkan
            </p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              autoFocus
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="Admin Secret"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.02)",
                color: "#fff",
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                marginTop: 14,
                padding: "14px 24px",
                borderRadius: 10,
                border: "1px solid rgba(201,169,110,0.4)",
                background: "rgba(201,169,110,0.1)",
                color: "rgba(201,169,110,0.95)",
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 13,
                letterSpacing: "0.1em",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Masuk
            </button>
          </form>
          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 11,
              color: "rgba(255,255,255,0.3)",
              textAlign: "center",
              marginTop: 24,
              lineHeight: 1.6,
            }}
          >
            Admin secret tersimpan di browser Anda.
            <br />
            Logout untuk menghapus dari device ini.
          </p>
        </div>
      </main>
    );
  }

  // ── Dashboard (admin secret is set) ──
  return <AdminDashboard adminSecret={adminSecret} onLogout={handleLogout} />;
}

// ════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD — visible only when admin secret is set
// ════════════════════════════════════════════════════════════════
function AdminDashboard({
  adminSecret,
  onLogout,
}: {
  adminSecret: string;
  onLogout: () => void;
}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = filter === "all" ? "/api/orders" : `/api/orders?status=${filter}`;
      const res = await fetch(url, {
        headers: {
          "x-admin-secret": adminSecret,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          // Secret salah/expired → auto logout
          onLogout();
          return;
        }
        throw new Error(data.error || "Gagal load orders");
      }
      setOrders(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filter, adminSecret, onLogout]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function updateStatus(orderId: string, newStatus: string) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          onLogout();
          return;
        }
        throw new Error(data.error);
      }
      await fetchOrders();
      if (selectedOrder?.order_id === orderId) {
        setSelectedOrder(data.data);
      }
    } catch (err: any) {
      alert("Gagal update status: " + err.message);
    }
  }

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0B1120",
        color: "#fff",
        padding: "24px 16px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header with Logout button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 32,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-bodoni, Georgia, serif)",
                fontSize: 32,
                fontWeight: 400,
                margin: 0,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              Nauka Admin
            </h1>
            <p
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                marginTop: 4,
              }}
            >
              Dashboard pesanan undangan
            </p>
          </div>
          <button
            onClick={onLogout}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,100,100,0.4)";
              e.currentTarget.style.color = "rgba(255,150,150,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              padding: "16px 14px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
                marginBottom: 6,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Total Pesanan
            </div>
            <div
              style={{
                fontFamily: "var(--font-bodoni, Georgia, serif)",
                fontSize: 24,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {orders.length}
            </div>
          </div>
          {Object.entries(STATUS_LABELS).map(([key, { label, color }]) => {
            const count = statusCounts[key] || 0;
            if (count === 0) return null;
            return (
              <div
                key={key}
                style={{
                  padding: "16px 14px",
                  borderRadius: 12,
                  border: `1px solid ${color}33`,
                  background: `${color}0A`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 6,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bodoni, Georgia, serif)",
                    fontSize: 24,
                    color,
                  }}
                >
                  {count}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setFilter("all")}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border:
                filter === "all"
                  ? "1px solid rgba(201,169,110,0.5)"
                  : "1px solid rgba(255,255,255,0.1)",
              background: filter === "all" ? "rgba(201,169,110,0.1)" : "transparent",
              color: filter === "all" ? "rgba(201,169,110,0.9)" : "rgba(255,255,255,0.5)",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 11,
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            Semua
          </button>
          {Object.entries(STATUS_LABELS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                border:
                  filter === key
                    ? "1px solid rgba(201,169,110,0.5)"
                    : "1px solid rgba(255,255,255,0.1)",
                background: filter === key ? "rgba(201,169,110,0.1)" : "transparent",
                color: filter === key ? "rgba(201,169,110,0.9)" : "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 11,
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading & Error */}
        {loading && (
          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 13,
              color: "rgba(255,255,255,0.5)",
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Memuat pesanan...
          </p>
        )}

        {error && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: 8,
              background: "rgba(255,100,100,0.08)",
              border: "1px solid rgba(255,100,100,0.2)",
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 12,
              color: "rgba(255,180,180,0.9)",
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        {/* Order list */}
        {!loading && !error && orders.length === 0 && (
          <p
            style={{
              fontFamily: "var(--font-inter, sans-serif)",
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Belum ada pesanan.
          </p>
        )}

        {!loading && orders.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {orders.map((order) => {
              const statusInfo = STATUS_LABELS[order.status] || {
                label: order.status,
                color: "#6B7280",
              };
              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    cursor: "pointer",
                    textAlign: "left",
                    color: "inherit",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-inter, sans-serif)",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.85)",
                        fontWeight: 500,
                      }}
                    >
                      {order.order_id} · {order.customer_name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-inter, sans-serif)",
                        fontSize: 11,
                        color: "rgba(255,255,255,0.4)",
                        marginTop: 4,
                      }}
                    >
                      {order.template} · {order.package} · {formatIDR(order.price)} ·{" "}
                      {formatDate(order.created_at)}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-inter, sans-serif)",
                      fontSize: 11,
                      color: statusInfo.color,
                      padding: "4px 10px",
                      borderRadius: 999,
                      border: `1px solid ${statusInfo.color}33`,
                      background: `${statusInfo.color}0A`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {statusInfo.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "20px 16px",
            overflowY: "auto",
            zIndex: 1000,
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0B1120",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "28px 24px",
              color: "#fff",
              width: "100%",
              maxWidth: 500,
              margin: "auto 0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-bodoni, Georgia, serif)",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.92)",
                    margin: 0,
                  }}
                >
                  {selectedOrder.order_id}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    marginTop: 4,
                  }}
                >
                  {formatDate(selectedOrder.created_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 22,
                  cursor: "pointer",
                  padding: "4px 8px",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <div
              style={{
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 13,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Template & Paket
                </div>
                <div>
                  {selectedOrder.template} ·{" "}
                  {selectedOrder.package === "basic"
                    ? "Basic"
                    : selectedOrder.package === "premium"
                      ? "Premium"
                      : "Free"}
                </div>
                <div
                  style={{
                    color: "rgba(201,169,110,0.85)",
                    fontFamily: "var(--font-bodoni, Georgia, serif)",
                    fontSize: 16,
                    marginTop: 4,
                  }}
                >
                  {formatIDR(selectedOrder.price)}
                </div>
              </div>

              <div
                style={{
                  marginBottom: 12,
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Data Pemesan
                </div>
                <div>{selectedOrder.customer_name}</div>
                <div style={{ color: "rgba(255,255,255,0.6)" }}>
                  {selectedOrder.customer_phone}
                </div>
                {selectedOrder.customer_email && (
                  <div style={{ color: "rgba(255,255,255,0.6)" }}>
                    {selectedOrder.customer_email}
                  </div>
                )}
              </div>

              {selectedOrder.wedding_data && (
                <div
                  style={{
                    marginBottom: 12,
                    paddingTop: 12,
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.4)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 4,
                    }}
                  >
                    Data Undangan
                  </div>
                  <div>
                    {selectedOrder.wedding_data.groomFullName} &{" "}
                    {selectedOrder.wedding_data.brideFullName}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                    Akad: {selectedOrder.wedding_data.akadDate} ·{" "}
                    {selectedOrder.wedding_data.akadStartTime}
                  </div>
                  {selectedOrder.wedding_data.akadAddress && (
                    <div style={{ color: "rgba(255,255,255,0.6)" }}>
                      {selectedOrder.wedding_data.akadAddress}
                    </div>
                  )}
                  {selectedOrder.wedding_data.hasResepsi && (
                    <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
                      Resepsi: {selectedOrder.wedding_data.resepsiDate} ·{" "}
                      {selectedOrder.wedding_data.resepsiStartTime}
                      {selectedOrder.wedding_data.resepsiAddress && (
                        <div>{selectedOrder.wedding_data.resepsiAddress}</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div
                style={{
                  paddingTop: 12,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Update Status
                </div>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => updateStatus(selectedOrder.order_id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                    color: "#fff",
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: 13,
                  }}
                >
                  {Object.entries(STATUS_LABELS).map(([key, { label }]) => (
                    <option key={key} value={key} style={{ background: "#0B1120" }}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  marginTop: 16,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <a
                  href={`https://wa.me/${selectedOrder.customer_phone
                    .replace(/^0/, "62")
                    .replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1px solid rgba(201,169,110,0.35)",
                    background: "rgba(201,169,110,0.06)",
                    color: "rgba(201,169,110,0.9)",
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Chat WhatsApp
                </a>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "transparent",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "var(--font-inter, sans-serif)",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                  }}
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
