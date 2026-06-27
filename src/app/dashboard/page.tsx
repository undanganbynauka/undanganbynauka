"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { DashboardGuests } from "./DashboardGuests";
import { DashboardAnalytics } from "./DashboardAnalytics";
interface OrderData {
  id: number;
  order_id: string;
  status: string;
  template: string;
  package: string;
  price: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  wedding_data: any;
  dashboard_token: string;
  created_at: string;
  updated_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending_payment: { label: "Menunggu Pembayaran", color: "#F59E0B" },
  pending_whatsapp: { label: "Menunggu WA Admin", color: "#F97316" },
  awaiting_confirmation: { label: "Menunggu Verifikasi", color: "#3B82F6" },
  paid: { label: "Sudah Bayar", color: "#10B981" },
  in_production: { label: "Dalam Pengerjaan", color: "#8B5CF6" },
  published: { label: "Published (Aktif)", color: "#06B6D4" },
  cancelled: { label: "Cancelled", color: "#EF4444" },
};

const TEMPLATE_NAMES: Record<string, string> = {
  luna: "Luna",
  marwah: "Marwah",
  sacred: "Sacred",
  celestial: "Celestial",
};

const SITE_BASE_URL = "https://undangan-by-nauka.vercel.app";

function formatIDR(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

export default function DashboardPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"detail" | "tamu" | "analitik">("detail");
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) {
      setToken(t);
      localStorage.setItem("nauka_dashboard_token", t);
    } else {
      const stored = localStorage.getItem("nauka_dashboard_token");
      if (stored) setToken(stored);
    }
  }, []);

  const fetchOrder = useCallback(async () => {
    if (!token) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard?token=${token}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal memuat data.");
        setOrder(null);
      } else {
        setOrder(data.data);
      }
    } catch {
      setError("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchOrder(); }, [fetchOrder]);

  function startEdit() {
    if (!order?.wedding_data) return;
    setEditData(JSON.parse(JSON.stringify(order.wedding_data)));
    setEditMode(true);
    setSaveError(null);
    setSaveSuccess(false);
  }

  function cancelEdit() {
    setEditMode(false);
    setEditData(null);
    setSaveError(null);
  }

  function updateField(field: string, value: any) {
    setEditData((prev: any) => ({ ...prev, [field]: value }));
  }

  async function saveEdit() {
    if (!token || !editData) return;
    setSaving(true);
    setSaveError(null);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/dashboard?token=${token}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wedding_data: editData }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error || "Gagal menyimpan perubahan.");
        return;
      }
      setOrder(data.data);
      setSaveSuccess(true);
      setTimeout(() => {
        setEditMode(false);
        setEditData(null);
        setSaveSuccess(false);
      }, 1500);
    } catch {
      setSaveError("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Memuat dashboard...</p>
      </main>
    );
  }

  if (!token) {
    return (
      <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <div style={{ textAlign: "center", maxWidth: 380 }}>
          <h1 style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 28, fontWeight: 400, margin: "0 0 16px", color: "rgba(255,255,255,0.92)" }}>Dashboard Nauka</h1>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 24px" }}>
            Akses dashboard melalui link yang dikirim ke WhatsApp Anda setelah checkout.
          </p>
          <Link href="/" style={{ display: "inline-block", padding: "12px 24px", borderRadius: 10, border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.06)", color: "rgba(201,169,110,0.9)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", textDecoration: "none" }}>Kembali ke Beranda</Link>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px" }}>
        <div style={{ textAlign: "center", maxWidth: 380 }}>
          <h1 style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 24, fontWeight: 400, margin: "0 0 16px", color: "rgba(255,150,150,0.85)" }}>Akses Ditolak</h1>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 24px" }}>{error || "Token tidak valid."}</p>
          <Link href="/" style={{ display: "inline-block", padding: "12px 24px", borderRadius: 10, border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.06)", color: "rgba(201,169,110,0.9)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", textDecoration: "none" }}>Kembali ke Beranda</Link>
        </div>
      </main>
    );
  }

  const statusInfo = STATUS_LABELS[order.status] || { label: order.status, color: "#6B7280" };
  const templateName = TEMPLATE_NAMES[order.template] || order.template;
  const wd = order.wedding_data || {};
  const invitationUrl = wd.slug ? `${SITE_BASE_URL}/${wd.slug}` : null;
  const canEdit = order.status === "published";

  return (
    <main style={{ minHeight: "100vh", background: "#0B1120", color: "#fff", padding: "24px 16px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 28, fontWeight: 400, margin: 0, color: "rgba(255,255,255,0.92)" }}>Dashboard Nauka</h1>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Kelola undangan Anda</p>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button
            onClick={() => setActiveTab("detail")}
            style={{
              flex: 1, padding: "10px 16px", borderRadius: 10,
              border: activeTab === "detail" ? "1px solid rgba(201,169,110,0.35)" : "1px solid rgba(255,255,255,0.08)",
              background: activeTab === "detail" ? "rgba(201,169,110,0.10)" : "transparent",
              fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em",
              color: activeTab === "detail" ? "rgba(201,169,110,0.95)" : "rgba(255,255,255,0.5)",
              cursor: "pointer", fontWeight: 500,
            }}
          >
            Detail
          </button>
          <button
            onClick={() => setActiveTab("tamu")}
            style={{
              flex: 1, padding: "10px 16px", borderRadius: 10,
              border: activeTab === "tamu" ? "1px solid rgba(201,169,110,0.35)" : "1px solid rgba(255,255,255,0.08)",
              background: activeTab === "tamu" ? "rgba(201,169,110,0.10)" : "transparent",
              fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em",
              color: activeTab === "tamu" ? "rgba(201,169,110,0.95)" : "rgba(255,255,255,0.5)",
              cursor: "pointer", fontWeight: 500,
            }}
          >
            Tamu
          </button>
                    {order.package === "premium" && (
            <button
              onClick={() => setActiveTab("analitik")}
              style={{
                flex: 1, padding: "10px 16px", borderRadius: 10,
                border: activeTab === "analitik" ? "1px solid rgba(201,169,110,0.35)" : "1px solid rgba(255,255,255,0.08)",
                background: activeTab === "analitik" ? "rgba(201,169,110,0.10)" : "transparent",
                fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em",
                color: activeTab === "analitik" ? "rgba(201,169,110,0.95)" : "rgba(255,255,255,0.5)",
                cursor: "pointer", fontWeight: 500,
              }}
            >
              Analitik
            </button>
          )}
        </div>

        {activeTab === "detail" && (
          <>
            {/* Status Card */}
            <div style={{ padding: 20, borderRadius: 12, border: `1px solid ${statusInfo.color}33`, background: `${statusInfo.color}0A`, marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Status Pesanan</p>
                <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 14, color: statusInfo.color, fontWeight: 500 }}>{statusInfo.label}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Nomor Pesanan</p>
                <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 16, color: "rgba(201,169,110,0.85)", letterSpacing: "0.04em" }}>{order.order_id}</p>
              </div>
            </div>

            {/* Invitation Link */}
            {invitationUrl && order.status === "published" && (
              <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(201,169,110,0.20)", background: "rgba(201,169,110,0.04)", marginBottom: 16 }}>
                <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>Link Undangan Anda</p>
                <p style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 14, color: "rgba(201,169,110,0.9)", wordBreak: "break-all", margin: "0 0 16px" }}>{invitationUrl}</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <a href={invitationUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: "block", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.10)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(201,169,110,0.95)", textDecoration: "none", textAlign: "center", fontWeight: 500 }}>Lihat Undangan</a>
                  <button onClick={() => { navigator.clipboard.writeText(invitationUrl).then(() => alert("Link tersalin!")); }} style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", background: "transparent", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>Salin Link</button>
                </div>
              </div>
            )}

            {/* Order Details */}
            <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px" }}>Detail Pesanan</p>
              <Row label="Template" value={templateName} />
              <Row label="Paket" value={order.package === "free" ? "Free (Gratis)" : order.package === "basic" ? "Basic" : "Premium"} />
              <Row label="Harga" value={order.price === 0 ? "GRATIS" : formatIDR(order.price)} />
              <Row label="Tanggal Pesan" value={formatDate(order.created_at)} />
            </div>

            {/* Customer Info */}
            <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 16 }}>
              <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px" }}>Data Pemesan</p>
              <Row label="Nama" value={order.customer_name} />
              <Row label="No. WhatsApp" value={order.customer_phone} />
              {order.customer_email && <Row label="Email" value={order.customer_email} />}
            </div>

            {/* Wedding Data */}
            {wd.groomFullName && (
              <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Data Undangan</p>
                  {canEdit && !editMode && (
                    <button onClick={startEdit} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.08)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, letterSpacing: "0.05em", color: "rgba(201,169,110,0.9)", cursor: "pointer" }}>✎ Edit</button>
                  )}
                </div>

                {editMode && editData ? (
                  <EditForm
                    editData={editData}
                    updateField={updateField}
                    saving={saving}
                    saveError={saveError}
                    saveSuccess={saveSuccess}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                  />
                ) : (
                  <>
                    <Row label="Mempelai Pria" value={wd.groomFullName || "-"} />
                    {wd.groomNickname && <Row label="Panggilan Pria" value={wd.groomNickname} />}
                    <Row label="Mempelai Wanita" value={wd.brideFullName || "-"} />
                    {wd.brideNickname && <Row label="Panggilan Wanita" value={wd.brideNickname} />}
                    <Row label="Tanggal Akad" value={wd.akadDate || "-"} />
                    <Row label="Waktu Akad" value={wd.akadStartTime ? `${wd.akadStartTime}${wd.akadEndTime ? ` - ${wd.akadEndTime}` : ""} WIB` : "-"} />
                    <Row label="Lokasi Akad" value={wd.akadAddress || "-"} />
                    {wd.hasResepsi && (
                      <>
                        <Row label="Tanggal Resepsi" value={wd.resepsiDate || "-"} />
                        <Row label="Waktu Resepsi" value={wd.resepsiStartTime ? `${wd.resepsiStartTime}${wd.resepsiEndTime ? ` - ${wd.resepsiEndTime}` : ""} WIB` : "-"} />
                        <Row label="Lokasi Resepsi" value={wd.resepsiAddress || "-"} />
                      </>
                    )}
                    {wd.quote && <Row label="Quote" value={wd.quote} />}
                    <Row label="BGM" value={wd.bgmType === "hening" ? "Hening" : wd.bgmType === "sound_alam" ? "Sound Alam" : wd.bgmType} />
                    <Row label="Slug" value={wd.slug ? `/${wd.slug}` : "-"} />
                    {!canEdit && (
                      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 12, fontStyle: "italic" }}>
                        Edit akan tersedia setelah undangan aktif (published).
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "tamu" && (
          <DashboardGuests
            orderId={order.order_id}
            invitationSlug={wd.slug}
            isPremium={order.package === "premium"}
          />
        )}

        {/* Help */}
        <div style={{ padding: 16, borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", marginBottom: 16, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>
            Butuh bantuan? Hubungi kami di <strong style={{ color: "rgba(201,169,110,0.7)" }}>+6289655592925</strong>
          </p>
        </div>

        {/* Logout */}
        <button onClick={() => { localStorage.removeItem("nauka_dashboard_token"); window.location.href = "/"; }} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,100,100,0.20)", background: "transparent", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,150,150,0.7)", cursor: "pointer", textTransform: "uppercase" }}>
          Keluar
        </button>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, gap: 16 }}>
      <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.50)", flexShrink: 0 }}>{label}</span>
      <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.85)", textAlign: "right", wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

function EditForm({
  editData,
  updateField,
  saving,
  saveError,
  saveSuccess,
  onSave,
  onCancel,
}: {
  editData: any;
  updateField: (field: string, value: any) => void;
  saving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div>
      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "12px 0 8px" }}>Mempelai Pria</p>
      <EditInput label="Nama Lengkap" value={editData.groomFullName || ""} onChange={(v) => updateField("groomFullName", v)} placeholder="Muhammad Ali Akbar" />
      <EditInput label="Nama Panggilan" value={editData.groomNickname || ""} onChange={(v) => updateField("groomNickname", v)} placeholder="Ali" />
      <EditInput label="Nama Ayah" value={editData.groomFatherName || ""} onChange={(v) => updateField("groomFatherName", v)} placeholder="Ahmad Akbar" />
      <EditInput label="Nama Ibu" value={editData.groomMotherName || ""} onChange={(v) => updateField("groomMotherName", v)} placeholder="Siti Aminah" />

      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "16px 0 8px" }}>Mempelai Wanita</p>
      <EditInput label="Nama Lengkap" value={editData.brideFullName || ""} onChange={(v) => updateField("brideFullName", v)} placeholder="Lyla Azzahra" />
      <EditInput label="Nama Panggilan" value={editData.brideNickname || ""} onChange={(v) => updateField("brideNickname", v)} placeholder="Lyla" />
      <EditInput label="Nama Ayah" value={editData.brideFatherName || ""} onChange={(v) => updateField("brideFatherName", v)} placeholder="Yusuf Rahman" />
      <EditInput label="Nama Ibu" value={editData.brideMotherName || ""} onChange={(v) => updateField("brideMotherName", v)} placeholder="Khadijah" />

      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "16px 0 8px" }}>Akad Nikah</p>
      <EditInput label="Tanggal" type="date" value={editData.akadDate || ""} onChange={(v) => updateField("akadDate", v)} />
      <EditInput label="Waktu Mulai" type="time" value={editData.akadStartTime || ""} onChange={(v) => updateField("akadStartTime", v)} />
      <EditInput label="Waktu Selesai" type="time" value={editData.akadEndTime || ""} onChange={(v) => updateField("akadEndTime", v)} placeholder="Opsional" />
      <EditInput label="Alamat" value={editData.akadAddress || ""} onChange={(v) => updateField("akadAddress", v)} placeholder="Masjid Al-Hidayah, Jakarta" />
      <EditInput label="Kota" value={editData.akadCity || ""} onChange={(v) => updateField("akadCity", v)} placeholder="Jakarta Selatan" />

      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "16px 0 8px" }}>Resepsi</p>
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
        <input type="checkbox" checked={!!editData.hasResepsi} onChange={(e) => updateField("hasResepsi", e.target.checked)} style={{ cursor: "pointer" }} />
        <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Ada acara resepsi</span>
      </label>
      {editData.hasResepsi && (
        <>
          <EditInput label="Tanggal" type="date" value={editData.resepsiDate || ""} onChange={(v) => updateField("resepsiDate", v)} />
          <EditInput label="Waktu Mulai" type="time" value={editData.resepsiStartTime || ""} onChange={(v) => updateField("resepsiStartTime", v)} />
          <EditInput label="Waktu Selesai" type="time" value={editData.resepsiEndTime || ""} onChange={(v) => updateField("resepsiEndTime", v)} placeholder="Opsional" />
          <EditInput label="Alamat" value={editData.resepsiAddress || ""} onChange={(v) => updateField("resepsiAddress", v)} placeholder="Gedung Serbaguna, Jakarta" />
          <EditInput label="Kota" value={editData.resepsiCity || ""} onChange={(v) => updateField("resepsiCity", v)} placeholder="Jakarta Selatan" />
        </>
      )}

      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "16px 0 8px" }}>Konfigurasi</p>
      <EditInput label="Quote" value={editData.quote || ""} onChange={(v) => updateField("quote", v)} placeholder="Dan di antara jutaan kemungkinan..." />
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>BGM (Background Music)</label>
        <select
          value={editData.bgmType || "hening"}
          onChange={(e) => updateField("bgmType", e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, outline: "none" }}
        >
          <option value="hening">Hening (tanpa musik)</option>
          <option value="sound_alam">Sound Alam</option>
        </select>
      </div>

      {saveError && (
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,100,100,0.9)", textAlign: "center", padding: "10px 14px", background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.2)", borderRadius: 8, margin: "12px 0" }}>
          {saveError}
        </p>
      )}
      {saveSuccess && (
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(100,255,150,0.9)", textAlign: "center", padding: "10px 14px", background: "rgba(100,255,150,0.08)", border: "1px solid rgba(100,255,150,0.2)", borderRadius: 8, margin: "12px 0" }}>
          ✓ Perubahan berhasil disimpan!
        </p>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        <button
          onClick={onCancel}
          disabled={saving}
          style={{ flex: 1, padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.10)", background: "transparent", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", cursor: saving ? "not-allowed" : "pointer" }}
        >
          Batal
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          style={{ flex: 2, padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(201,169,110,0.35)", background: saving ? "rgba(201,169,110,0.03)" : "rgba(201,169,110,0.10)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", color: saving ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.95)", cursor: saving ? "not-allowed" : "pointer", fontWeight: 500 }}
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

function EditInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, outline: "none", boxSizing: "border-box" }}
      />
    </div>
  );
}
