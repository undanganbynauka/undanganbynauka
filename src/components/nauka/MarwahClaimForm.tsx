"use client";

import React, { useEffect, useRef, useState } from "react";
import { NaukaFreeForm, type WeddingData } from "./NaukaFreeForm";

// ════════════════════════════════════════════════════════════════
// MARWAH CLAIM FORM — Khusus Marwah Free (TANPA opsi Basic/Premium)
//
// Flow simpel:
//   1. Data Pemesan
//   2. Data Undangan (pakai NaukaFreeForm)
//   3. Ringkasan
//   4. Selesai (dengan link undangan)
//
// Tidak ada:
//   - Step pilih paket (karena cuma Free)
//   - Step pembayaran (karena gratis)
//   - Opsi Basic/Premium di UI manapun
// ════════════════════════════════════════════════════════════════

interface MarwahClaimFormProps {
  templateName?: string;
}

const WA_BASE = "6289655592925";
const SITE_BASE_URL = "https://undangan-by-nauka.vercel.app";

type Step = "pemesan" | "undangan" | "review" | "done";

const STEP_TITLES: Record<Step, string> = {
  pemesan: "Data Pemesan",
  undangan: "Data Undangan",
  review: "Ringkasan Pesanan",
  done: "Selesai",
};

// ── Helper: build WhatsApp URL untuk SHARE UNDANGAN Marwah free ──
function buildMarwahShareWaUrl(invitationUrl: string, data: WeddingData): string {
  let dateLabel = "";
  if (data.akadDate) {
    try {
      const d = new Date(`${data.akadDate}T00:00:00+07:00`);
      dateLabel = d.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      });
    } catch {
      dateLabel = data.akadDate;
    }
  }

  const lines = [
    `Assalamu'alaikum warahmatullahi wabarakatuh`,
    ``,
    `Kami mengundang Anda dengan penuh sukacita untuk hadir dalam acara pernikahan kami.`,
    ``,
    `${data.groomFullName} & ${data.brideFullName}`,
    dateLabel,
    ``,
    `📎 Buka undangan Anda di:`,
    invitationUrl,
    ``,
    `Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.`,
    ``,
    `Terima kasih 🙏✨`,
  ];

  return `https://wa.me/?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function MarwahClaimForm({ templateName = "Marwah" }: MarwahClaimFormProps = {}) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<Step>("pemesan");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [invitationUrl, setInvitationUrl] = useState<string | null>(null);
  const [dashboardUrl, setDashboardUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  function goToUndangan() {
    setSubmitError(null);
    if (!customerName.trim()) {
      setSubmitError("Nama pemesan wajib diisi.");
      return;
    }
    if (!customerPhone.trim()) {
      setSubmitError("No. WhatsApp pemesan wajib diisi.");
      return;
    }
    setStep("undangan");
  }

  function handleUndanganSubmit(data: WeddingData) {
    setWeddingData(data);
    setStep("review");
  }

  async function createOrder() {
    setSubmitError(null);
    if (!weddingData) {
      setSubmitError("Data undangan belum lengkap. Silakan kembali ke step Data Undangan.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: "marwah",
          package: "free",
          price: 0,
          customer_name: customerName.trim(),
          customer_phone: customerPhone.trim(),
          customer_email: customerEmail.trim() || undefined,
          wedding_data: weddingData,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Gagal membuat pesanan. Silakan coba lagi.");
        return;
      }
      setOrderId(data.order_id);
      if (data.invitation_url) {
        setInvitationUrl(data.invitation_url);
      }
      // Simpan dashboard_url (magic link login untuk user dashboard)
      if (data.dashboard_url) {
        setDashboardUrl(data.dashboard_url);
      }
      setStep("done");
    } catch (err) {
      console.error("[marwah-claim] create order error:", err);
      setSubmitError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyInvitationLink() {
    if (!invitationUrl) return;
    try {
      await navigator.clipboard.writeText(invitationUrl);
      alert("Link undangan berhasil disalin!");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = invitationUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Link undangan berhasil disalin!");
    }
  }

  return (
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
        padding: "80px 24px",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: visible
            ? "linear-gradient(135deg, rgba(201,169,110,0.02) 0%, transparent 40%)"
            : "none",
          transition: "background 1.8s ease",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[520px]">
        <h2
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
          }}
          className="md:!text-[22px]"
        >
          {STEP_TITLES[step]}
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "16px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.4s ease-out 0.1s",
          }}
        >
          {(["pemesan", "undangan", "review", "done"] as Step[]).map((s, i) => {
            const stepOrder = ["pemesan", "undangan", "review", "done"];
            const currentIdx = stepOrder.indexOf(step);
            const isActive = i === currentIdx;
            const isPast = i < currentIdx;
            return (
              <div
                key={s}
                style={{
                  width: "36px",
                  height: "2px",
                  borderRadius: "2px",
                  background: isActive
                    ? "rgba(201,169,110,0.7)"
                    : isPast
                      ? "rgba(201,169,110,0.3)"
                      : "rgba(255,255,255,0.08)",
                  transition: "background 0.4s ease",
                }}
              />
            );
          })}
        </div>

        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "36px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.15s",
          }}
        />

        {/* STEP 1: PEMESAN */}
        {step === "pemesan" && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.2s, transform 1.3s ease-out 0.2s",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: "8px",
                  lineHeight: 1.6,
                }}
              >
                Cukup isi beberapa hal kecil di bawah. Tenang, data ini hanya untuk membuat undangan kamu.
              </p>
            </div>

            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(201,169,110,0.20)",
                background: "rgba(201,169,110,0.04)",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Template</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.72)" }}>{templateName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Paket</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)" }}>Free (Gratis)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-bodoni)", fontSize: "13px", color: "rgba(201,169,110,0.85)" }}>GRATIS</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label htmlFor="marwah-name" style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "6px" }}>
                  Nama <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  id="marwah-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama lengkap pemesan"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.85)", outline: "none" }}
                />
              </div>

              <div>
                <label htmlFor="marwah-phone" style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "6px" }}>
                  No. WhatsApp <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  id="marwah-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.85)", outline: "none" }}
                />
              </div>

              <div>
                <label htmlFor="marwah-email" style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)", display: "block", marginBottom: "6px" }}>
                  Email <span style={{ color: "rgba(255,255,255,0.30)" }}>(opsional)</span>
                </label>
                <input
                  id="marwah-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  style={{ width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.85)", outline: "none" }}
                />
              </div>
            </div>

            {submitError && (
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(220, 100, 100, 0.85)", textAlign: "center", marginTop: "16px", padding: "10px 14px", borderRadius: "8px", background: "rgba(220, 100, 100, 0.06)", border: "1px solid rgba(220, 100, 100, 0.15)" }}>
                {submitError}
              </p>
            )}

            <button
              onClick={goToUndangan}
              style={{
                width: "100%",
                marginTop: "32px",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1px solid rgba(201,169,110,0.20)",
                background: "rgba(201,169,110,0.06)",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                letterSpacing: "0.1em",
                color: "rgba(201,169,110,0.85)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Lanjut ke Data Undangan
            </button>
          </div>
        )}

        {/* STEP 2: UNDANGAN */}
        {step === "undangan" && (
          <div>
            <button
              onClick={() => setStep("pemesan")}
              style={{ padding: "10px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.55)", cursor: "pointer", marginBottom: "20px" }}
            >
              ← Kembali ke Data Pemesan
            </button>

            <NaukaFreeForm
              template="marwah"
              onSubmit={handleUndanganSubmit}
              submitLabel="Lanjut ke Ringkasan"
              submitting={false}
            />
          </div>
        )}

        {/* STEP 3: REVIEW */}
        {step === "review" && weddingData && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.2s, transform 1.3s ease-out 0.2s",
            }}
          >
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.45)", textAlign: "center", marginBottom: "24px", lineHeight: 1.6 }}>
              Mohon periksa kembali semua data di bawah. Setelah klik <strong style={{ color: "rgba(201,169,110,0.85)" }}>Kirim Pesanan</strong>, undangan kamu akan langsung aktif.
            </p>

            <ReviewSection title="Pesanan">
              <ReviewRow label="Template" value={templateName} />
              <ReviewRow label="Paket" value="Free (Gratis)" highlight />
              <ReviewRow label="Total" value="GRATIS" bold />
            </ReviewSection>

            <ReviewSection title="Data Pemesan">
              <ReviewRow label="Nama" value={customerName} />
              <ReviewRow label="No. WhatsApp" value={customerPhone} />
              {customerEmail && <ReviewRow label="Email" value={customerEmail} />}
            </ReviewSection>

            <ReviewSection title="Data Mempelai">
              <ReviewRow label="Mempelai Pria" value={weddingData.groomFullName} />
              {weddingData.groomNickname && <ReviewRow label="Panggilan Pria" value={weddingData.groomNickname} />}
              <ReviewRow label="Mempelai Wanita" value={weddingData.brideFullName} />
              {weddingData.brideNickname && <ReviewRow label="Panggilan Wanita" value={weddingData.brideNickname} />}
            </ReviewSection>

            <ReviewSection title="Akad">
              <ReviewRow label="Tanggal" value={weddingData.akadDate} />
              <ReviewRow label="Waktu" value={`${weddingData.akadStartTime}${weddingData.akadEndTime ? ` - ${weddingData.akadEndTime}` : ""}`} />
              <ReviewRow label="Lokasi" value={weddingData.akadAddress} />
              {weddingData.akadCity && <ReviewRow label="Kota" value={weddingData.akadCity} />}
            </ReviewSection>

            {weddingData.hasResepsi && (
              <ReviewSection title="Resepsi">
                <ReviewRow label="Tanggal" value={weddingData.resepsiDate || "-"} />
                <ReviewRow label="Waktu" value={`${weddingData.resepsiStartTime || "-"}${weddingData.resepsiEndTime ? ` - ${weddingData.resepsiEndTime}` : ""}`} />
                <ReviewRow label="Lokasi" value={weddingData.resepsiAddress || "-"} />
                {weddingData.resepsiCity && <ReviewRow label="Kota" value={weddingData.resepsiCity} />}
              </ReviewSection>
            )}

            <ReviewSection title="Konfigurasi Undangan">
              <ReviewRow label="Slug" value={`/${weddingData.slug}`} />
              <ReviewRow label="BGM" value={weddingData.bgmType === "hening" ? "Hening (tanpa musik)" : weddingData.bgmType} />
              {weddingData.quote && <ReviewRow label="Quote" value={weddingData.quote} />}
            </ReviewSection>

            {submitError && (
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(220, 100, 100, 0.85)", textAlign: "center", marginTop: "16px", padding: "10px 14px", borderRadius: "8px", background: "rgba(220, 100, 100, 0.06)", border: "1px solid rgba(220, 100, 100, 0.15)" }}>
                {submitError}
              </p>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", marginTop: "32px" }}>
              <button
                onClick={() => setStep("undangan")}
                disabled={submitting}
                style={{ padding: "16px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.08)", background: "transparent", fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.55)", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.5 : 1 }}
              >
                Kembali
              </button>
              <button
                onClick={createOrder}
                disabled={submitting}
                style={{ padding: "16px 24px", borderRadius: "12px", border: "1px solid rgba(201,169,110,0.20)", background: submitting ? "rgba(201,169,110,0.03)" : "rgba(201,169,110,0.06)", fontFamily: "var(--font-inter)", fontSize: "13px", letterSpacing: "0.1em", color: submitting ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.85)", cursor: submitting ? "not-allowed" : "pointer" }}
              >
                {submitting ? "Sedang merangkai undangan kamu..." : "Kirim Pesanan (Gratis)"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DONE */}
        {step === "done" && orderId && weddingData && (
          <div style={{ opacity: 1, transform: "translateY(0)", transition: "opacity 0.6s ease-out, transform 0.6s ease-out", textAlign: "center" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", borderRadius: "50%", border: "1px solid rgba(201,169,110,0.25)", background: "rgba(201,169,110,0.05)", marginBottom: "24px" }}>
              <span style={{ fontFamily: "var(--font-bodoni)", fontSize: "28px", color: "rgba(201,169,110,0.85)" }}>✓</span>
            </div>

            <h3 style={{ fontFamily: "var(--font-bodoni)", fontSize: "22px", fontWeight: 400, letterSpacing: "0.04em", color: "rgba(255,255,255,0.85)", marginBottom: "12px" }}>
              Undangan Kamu Sudah Siap
            </h3>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "24px", maxWidth: "380px", margin: "0 auto 24px" }}>
              Pesanan <strong style={{ color: "rgba(201,169,110,0.85)" }}>{orderId}</strong> telah kami terima.
              <br /><br />
              Undangan kamu sudah otomatis aktif. Kamu bisa langsung membagikannya ke orang-orang tersayang.
            </p>

            {invitationUrl && (
              <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(201,169,110,0.20)", background: "rgba(201,169,110,0.04)", marginBottom: "20px" }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)", marginBottom: "10px" }}>
                  Link Undangan Kamu
                </p>
                <p style={{ fontFamily: "var(--font-bodoni)", fontSize: "14px", color: "rgba(201,169,110,0.9)", wordBreak: "break-all", margin: 0 }}>
                  {invitationUrl}
                </p>
              </div>
            )}

            <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", textAlign: "left", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Nomor Pesanan</span>
                <span style={{ fontFamily: "var(--font-bodoni)", fontSize: "13px", color: "rgba(201,169,110,0.85)", letterSpacing: "0.04em" }}>{orderId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Template</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.72)" }}>{templateName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Paket</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)" }}>Free (Gratis)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Mempelai</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.72)" }}>{weddingData.groomFullName} &amp; {weddingData.brideFullName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Status</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)" }}>Published (Aktif)</span>
              </div>
            </div>

            {/* ── TOMBOL BUKA DASHBOARD (untuk semua order: free & berbayar) ── */}
            {dashboardUrl && (
              <div style={{ padding: "16px 20px", borderRadius: "12px", border: "1px dashed rgba(201,169,110,0.25)", background: "rgba(201,169,110,0.03)", marginBottom: "20px", textAlign: "left" }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", letterSpacing: "0.04em", color: "rgba(255,255,255,0.65)", margin: "0 0 12px 0", lineHeight: 1.6 }}>
                  Simpan link dashboard untuk melihat status &amp; mengelola undangan kamu kapan saja.
                </p>
                                <a href={`https://wa.me/?text=${encodeURIComponent("Halo, ini link dashboard undangan saya: " + dashboardUrl)}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 20px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.10)", background: "transparent", fontFamily: "var(--font-inter)", fontSize: "12px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", textDecoration: "none", textAlign: "center", transition: "all 0.3s ease" }}>
                  Kirim Link ke WhatsApp
                </a>
              </div>
            )}

            {invitationUrl && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                <a href={invitationUrl} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "16px 24px", borderRadius: "12px", border: "1px solid rgba(201,169,110,0.35)", background: "rgba(201,169,110,0.10)", fontFamily: "var(--font-inter)", fontSize: "13px", letterSpacing: "0.1em", color: "rgba(201,169,110,0.95)", textDecoration: "none", fontWeight: 500 }}>
                  Lihat Undangan
                </a>
                <a href={buildMarwahShareWaUrl(invitationUrl, weddingData)} target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "14px 24px", borderRadius: "12px", border: "1px solid rgba(201,169,110,0.20)", background: "transparent", fontFamily: "var(--font-inter)", fontSize: "12px", letterSpacing: "0.1em", color: "rgba(201,169,110,0.85)", textDecoration: "none" }}>
                  Bagikan ke WhatsApp
                </a>
                <button onClick={copyInvitationLink} style={{ padding: "14px 24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.10)", background: "transparent", fontFamily: "var(--font-inter)", fontSize: "12px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>
                  Salin Link
                </button>
              </div>
            )}

            <p style={{ fontFamily: "var(--font-bodoni)", fontSize: "14px", fontStyle: "italic", color: "rgba(201,169,110,0.7)", marginTop: "28px", lineHeight: 1.6, maxWidth: "340px", marginLeft: "auto", marginRight: "auto" }}>
              Semoga undangan ini menjadi bagian dari momen indah kalian.
            </p>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.30)", marginTop: "24px", lineHeight: 1.6 }}>
              Simpan nomor pesanan Anda untuk referensi.
              <br />
              Butuh bantuan? Hubungi kami di <strong style={{ color: "rgba(255,255,255,0.45)" }}>+{WA_BASE}</strong>.
            </p>
          </div>
        )}

        {step === "done" && !orderId && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
              Terjadi kesalahan. Silakan refresh halaman.
            </p>
          </div>
        )}

        {step === "review" && !weddingData && (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
              Data undangan belum lengkap.{" "}
              <button onClick={() => setStep("undangan")} style={{ background: "transparent", border: "none", color: "rgba(201,169,110,0.85)", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit", textDecoration: "underline" }}>
                Kembali ke Data Undangan
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "18px 20px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", marginBottom: "14px" }}>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)", marginBottom: "12px" }}>
        {title}
      </p>
      {children}
    </div>
  );
}

function ReviewRow({
  label,
  value,
  highlight,
  bold,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  bold?: boolean;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", gap: "16px" }}>
      <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.50)", flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontFamily: bold ? "var(--font-bodoni)" : "var(--font-inter)", fontSize: bold ? "16px" : "12px", color: highlight ? "rgba(201,169,110,0.85)" : "rgba(255,255,255,0.85)", textAlign: "right", wordBreak: "break-word" }}>
        {value}
      </span>
    </div>
  );
}
