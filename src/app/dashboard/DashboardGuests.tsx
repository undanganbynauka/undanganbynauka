"use client";

import React, { useState, useEffect, useCallback } from "react";

interface Guest {
  id: number;
  order_id: string;
  guest_name: string;
  guest_phone?: string;
  guest_suffix?: string;
  guest_slug: string;
  created_at: string;
}

interface Stats {
  total_rsvp: number;
  rsvp_breakdown: { hadir: number; tidak_hadir: number; ragu: number; };
  total_tamu_hadir: number;
  total_wishes: number;
  total_guests: number;
}

interface DashboardGuestsProps {
  orderId: string;
  invitationSlug?: string;
  isPremium: boolean;
}

const SITE_BASE_URL = "https://undangan-by-nauka.vercel.app";

export function DashboardGuests({ orderId, invitationSlug, isPremium }: DashboardGuestsProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [newGuest, setNewGuest] = useState({ name: "", phone: "", suffix: "" });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [guestsRes, statsRes] = await Promise.all([
        fetch(`/api/guests?order_id=${orderId}`),
        fetch(`/api/dashboard/stats?token=${localStorage.getItem("nauka_dashboard_token")}`),
      ]);
      if (guestsRes.ok) {
        const guestsJson = await guestsRes.json();
        setGuests(guestsJson.data || []);
      }
      if (statsRes.ok) {
        const statsJson = await statsRes.json();
        setStats(statsJson.data);
      }
    } catch (err) {
      console.error("[DashboardGuests] fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleAddGuest(e: React.FormEvent) {
    e.preventDefault();
    setAddError(null);
    if (!newGuest.name.trim()) { setAddError("Nama tamu wajib diisi."); return; }
    setAdding(true);
    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          guest_name: newGuest.name.trim(),
          guest_phone: newGuest.phone.trim() || undefined,
          guest_suffix: newGuest.suffix.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setAddError(data.error || "Gagal menambah tamu."); return; }
      setNewGuest({ name: "", phone: "", suffix: "" });
      fetchData();
    } catch { setAddError("Terjadi kesalahan jaringan."); }
    finally { setAdding(false); }
  }

  async function handleDeleteGuest(id: number) {
    if (!confirm("Hapus tamu ini?")) return;
    try {
      const res = await fetch(`/api/guests?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchData();
    } catch (err) { console.error("[DashboardGuests] delete error:", err); }
  }

   function getGuestLink(guest: Guest): string {
    if (!invitationSlug) return SITE_BASE_URL;
    if (isPremium) {
      // Premium: personalized slug (/slug/guest_slug)
      return `${SITE_BASE_URL}/${invitationSlug}/${guest.guest_slug}`;
    }
    // Basic: query param (/slug?to=Nama)
    return `${SITE_BASE_URL}/${invitationSlug}?to=${encodeURIComponent(guest.guest_name)}`;
  }

  async function handleCopyLink(guest: Guest) {
    try {
      await navigator.clipboard.writeText(getGuestLink(guest));
      setCopiedSlug(guest.guest_slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch { alert("Gagal menyalin link."); }
  }

  function handleShareWA(guest: Guest) {
    const link = getGuestLink(guest);
    const guestDisplay = guest.guest_suffix ? `${guest.guest_name} ${guest.guest_suffix}` : guest.guest_name;
    const message = isPremium
      ? `Assalamu'alaikum ${guestDisplay},\n\nKami mengundang Anda untuk hadir di acara pernikahan kami.\n\n${link}\n\nMerupakan kehormatan bagi kami apabila Anda berkenan hadir.\n\nTerima kasih 🙏`
      : `Assalamu'alaikum\n\nKami mengundang Anda untuk hadir di acara pernikahan kami.\n\n${link}\n\nMerupakan kehormatan bagi kami apabila Anda berkenan hadir.\n\nTerima kasih 🙏`;
    const waNumber = guest.guest_phone ? guest.guest_phone.replace(/^0/, "62").replace(/\D/g, "") : "";
    const waUrl = waNumber
      ? `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  }

  async function handleNativeShare(guest: Guest) {
    const link = getGuestLink(guest);
    const guestDisplay = guest.guest_suffix ? `${guest.guest_name} ${guest.guest_suffix}` : guest.guest_name;
    const shareData = {
      title: "Undangan Pernikahan",
      text: `Assalamu'alaikum ${guestDisplay},\n\nKami mengundang Anda untuk hadir di acara pernikahan kami.\n\n${link}\n\nMerupakan kehormatan bagi kami apabila Anda berkenan hadir.\n\nTerima kasih 🙏`,
      url: link,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: salin link ke clipboard
        await navigator.clipboard.writeText(link);
        alert("Link tersalin! Buka aplikasi tujuan, paste link.");
      }
    } catch (err) {
      // User cancel share sheet — gak perlu error
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Memuat data tamu...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Statistik RSVP */}
      {stats && (stats.total_rsvp > 0 || stats.total_guests > 0) && (
        <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(201,169,110,0.20)", background: "rgba(201,169,110,0.04)", marginBottom: 16 }}>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px" }}>Statistik RSVP</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <StatCard label="Total RSVP" value={stats.total_rsvp} color="#06B6D4" />
            <StatCard label="Hadir" value={stats.rsvp_breakdown.hadir} color="#10B981" />
            <StatCard label="Tidak Hadir" value={stats.rsvp_breakdown.tidak_hadir} color="#EF4444" />
            <StatCard label="Total Tamu Hadir" value={stats.total_tamu_hadir} color="#8B5CF6" />
          </div>
        </div>
      )}

      {/* Form Tambah Tamu */}
      <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 16 }}>
        <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 12px" }}>Tambah Tamu</p>
        <form onSubmit={handleAddGuest} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Nama Tamu *</label>
            <input type="text" required value={newGuest.name} onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })} placeholder="Misal: Budi Santoso" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Suffix (opsional)</label>
            <select value={newGuest.suffix} onChange={(e) => setNewGuest({ ...newGuest, suffix: e.target.value })} style={inputStyle}>
              <option value="">Tanpa</option>
              <option value="Dan Istri">Dan Istri</option>
              <option value="Dan Suami">Dan Suami</option>
              <option value="Dan Keluarga">Dan Keluarga</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>No. WhatsApp (opsional)</label>
            <input type="tel" value={newGuest.phone} onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })} placeholder="08xxxxxxxxxx" style={inputStyle} />
          </div>
          {addError && (
            <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,100,100,0.9)", padding: "8px 12px", background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.2)", borderRadius: 8, margin: 0 }}>{addError}</p>
          )}
          <button type="submit" disabled={adding} style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(201,169,110,0.35)", background: adding ? "rgba(201,169,110,0.03)" : "rgba(201,169,110,0.10)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, letterSpacing: "0.1em", color: adding ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.95)", cursor: adding ? "not-allowed" : "pointer", fontWeight: 500 }}>
            {adding ? "Menambah..." : "+ Tambah Tamu"}
          </button>
        </form>
      </div>

      {/* Daftar Tamu */}
      <div style={{ padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>Daftar Tamu</p>
          <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{guests.length} tamu</span>
        </div>

        {guests.length === 0 ? (
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "20px 0", margin: 0 }}>
            Belum ada tamu. Tambah tamu di atas untuk mulai mengundang.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {guests.map((guest) => {
              const guestDisplay = guest.guest_suffix ? `${guest.guest_name} ${guest.guest_suffix}` : guest.guest_name;
              return (
                <div key={guest.id} style={{ padding: 14, borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500, margin: 0 }}>{guestDisplay}</p>
                      {guest.guest_phone && <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>{guest.guest_phone}</p>}
                    </div>
                    <button onClick={() => handleDeleteGuest(guest.id)} style={{ background: "transparent", border: "none", color: "rgba(255,100,100,0.7)", cursor: "pointer", fontSize: 16, padding: 4 }} aria-label="Hapus tamu">×</button>
                  </div>
                                    {invitationSlug && (
                    <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(201,169,110,0.6)", wordBreak: "break-all", margin: "0 0 10px", padding: "6px 8px", background: "rgba(201,169,110,0.04)", borderRadius: 6 }}>{getGuestLink(guest)}</p>
                  )}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button onClick={() => handleShareWA(guest)} style={shareBtnStyle}>WhatsApp</button>
                    <button onClick={() => handleCopyLink(guest)} style={shareBtnStyle}>{copiedSlug === guest.guest_slug ? "✓ Tersalin" : "Salin Link"}</button>
                                        <button onClick={() => handleNativeShare(guest)} style={shareBtnStyle}>Share</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isPremium && (
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.35)", textAlign: "center", marginTop: 16, fontStyle: "italic", lineHeight: 1.6 }}>
            Upgrade ke <strong style={{ color: "rgba(201,169,110,0.6)" }}>Premium</strong> untuk personalized link per tamu + share ke Instagram & TikTok.
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, outline: "none", boxSizing: "border-box",
};

const shareBtnStyle: React.CSSProperties = {
  padding: "6px 12px", borderRadius: 6, border: "1px solid rgba(201,169,110,0.20)", background: "rgba(201,169,110,0.06)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(201,169,110,0.85)", cursor: "pointer",
};

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ padding: 12, borderRadius: 10, border: `1px solid ${color}33`, background: `${color}0A`, textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 20, fontWeight: 500, color: color, margin: "0 0 4px" }}>{value}</p>
      <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em", margin: 0 }}>{label}</p>
    </div>
  );
}
