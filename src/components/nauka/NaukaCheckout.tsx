"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NaukaFormDataUndangan, type WeddingData } from "./NaukaFormDataUndangan";

interface CheckoutProps {
  templateName: string;
  templateId: string;
  basicPrice: number;
  premiumPrice: number;
  /** Tampilkan opsi paket Free (gratis, tanpa QRIS). Default: false. */
  freeAvailable?: boolean;
}

const WA_BASE = "6289655592925";

type Step = "paket" | "pemesan" | "undangan" | "review" | "pembayaran" | "done";

const STEP_TITLES: Record<Step, string> = {
  paket: "Pilih Paket",
  pemesan: "Data Pemesan",
  undangan: "Data Undangan",
  review: "Ringkasan Pesanan",
  pembayaran: "Pembayaran",
  done: "Selesai",
};

// ── Helper: format Rupiah dari harga (basicPrice/premiumPrice dalam ribuan) ──
function formatRupiah(priceInRb: number): string {
  return `Rp${priceInRb.toLocaleString("id-ID")}rb`;
}

// ── Helper: build WhatsApp URL dengan data lengkap ──
function buildWaUrl(
  orderId: string,
  templateName: string,
  packageName: "free" | "basic" | "premium",
  data: WeddingData
): string {
  const packageLabel = packageName === "free" ? "Free (GRATIS)" : packageName === "basic" ? "Basic" : "Premium";
  const lines = [
    `Halo Nauka, saya ingin konfirmasi pesanan.`,
    ``,
    `*Nomor Pesanan:* ${orderId}`,
    `*Template:* ${templateName}`,
    `*Paket:* ${packageLabel}`,
    ``,
    `*DATA MEMPELAI*`,
    `Pria: ${data.groomFullName}`,
    `Wanita: ${data.brideFullName}`,
    ``,
    `*AKAD*`,
    `Tanggal: ${data.akadDate}`,
    `Waktu: ${data.akadStartTime}${data.akadEndTime ? ` - ${data.akadEndTime}` : ""}`,
    `Lokasi: ${data.akadAddress}`,
    ``,
  ];

  if (data.hasResepsi) {
    lines.push(
      `*RESEPSI*`,
      `Tanggal: ${data.resepsiDate || "-"}`,
      `Waktu: ${data.resepsiStartTime || "-"}${data.resepsiEndTime ? ` - ${data.resepsiEndTime}` : ""}`,
      `Lokasi: ${data.resepsiAddress || "-"}`,
      ``,
    );
  }

  lines.push(
    `*UNDANGAN*`,
    `Slug: ${data.slug}`,
  );

  if (packageName === "free") {
    lines.push(`Pesanan GRATIS — tidak perlu pembayaran QRIS.`);
  } else {
    lines.push(`Saya sudah melakukan pembayaran QRIS sesuai nominal.`);
  }

  if (data.groomRekening || data.brideRekening) {
    lines.push(``, `*KADO DIGITAL*`);
    if (data.groomRekening) lines.push(`${data.groomBank} - ${data.groomRekening} a.n ${data.groomAn}`);
    if (data.brideRekening) lines.push(`${data.brideBank} - ${data.brideRekening} a.n ${data.brideAn}`);
  }

  if (data.giftRecipientName || data.giftAddress) {
    lines.push(``, `*KADO FISIK*`);
    if (data.giftRecipientName) lines.push(`Penerima: ${data.giftRecipientName}`);
    if (data.giftAddress) lines.push(`Alamat: ${data.giftAddress}`);
  }

  if (data.adminNote.trim()) {
    lines.push(``, `*CATATAN:* ${data.adminNote}`);
  }

  lines.push(``, `Terima kasih.`);

  return `https://wa.me/${WA_BASE}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function NaukaCheckout({ templateName, templateId, basicPrice, premiumPrice, freeAvailable = false }: CheckoutProps) {
  const [selected, setSelected] = useState<"free" | "basic" | "premium">("premium");
  const [visible, setVisible] = useState(false);

  // ── Step state ──
  const [step, setStep] = useState<Step>("paket");

  // ── Customer info (Step 2) ──
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // ── Wedding data (Step 3) ──
  const [weddingData, setWeddingData] = useState<WeddingData | null>(null);

  // ── Order (created at Review → Pembayaran transition) ──
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderDbId, setOrderDbId] = useState<number | null>(null);

  // ── Submission state ──
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Scroll to top saat step berubah (UX: user selalu lihat header step baru)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const price = selected === "free" ? 0 : selected === "basic" ? basicPrice : premiumPrice;
  const packageName = selected === "free" ? "Free" : selected === "basic" ? "Basic" : "Premium";
  const priceInIdr = price * 1000;
  const isFree = selected === "free";

  // ════════════════════════════════════════════════════════════════
  // Handlers
  // ════════════════════════════════════════════════════════════════

  // ── Step 2 → Step 3: validate customer info ──
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

  // ── Step 3 → Step 4: FormDataUndangan submit ──
  function handleUndanganSubmit(data: WeddingData) {
    setWeddingData(data);
    setStep("review");
  }

  // ── Step 4 → Step 5: POST /api/orders ──
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
          template: templateId,
          package: selected,
          price: priceInIdr,
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
      setOrderDbId(data.id);
      // Free package: skip pembayaran, langsung ke done.
      // API sudah set status='awaiting_confirmation' untuk free.
      if (isFree) {
        setStep("done");
      } else {
        setStep("pembayaran");
      }
    } catch (err) {
      console.error("[checkout] create order error:", err);
      setSubmitError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  // ── Step 5 → Step 6: POST /api/orders/[id]/confirm-payment ──
  async function confirmPayment() {
    setSubmitError(null);
    if (!orderId) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/orders/${orderId}/confirm-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Gagal mengkonfirmasi pembayaran. Silakan coba lagi.");
        return;
      }
      setStep("done");
    } catch (err) {
      console.error("[checkout] confirm payment error:", err);
      setSubmitError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  // ════════════════════════════════════════════════════════════════
  // Render
  // ════════════════════════════════════════════════════════════════
  return (
    <section
      ref={ref}
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #111827 100%)",
        padding: "80px 24px",
      }}
    >
      {/* Ambient glow */}
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
        {/* ─── TITLE (dynamic per step) ─── */}
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

        {/* ─── STEP INDICATOR (1/6, 2/6, ...) ─── */}
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
          {(["paket", "pemesan", "undangan", "review", "pembayaran", "done"] as Step[]).map((s, i) => {
            const stepOrder = ["paket", "pemesan", "undangan", "review", "pembayaran", "done"];
            const currentIdx = stepOrder.indexOf(step);
            const isActive = i === currentIdx;
            const isPast = i < currentIdx;
            return (
              <div
                key={s}
                style={{
                  width: "24px",
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

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "rgba(255,255,255,0.10)",
            margin: "36px 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 1.2s ease-out 0.15s",
          }}
        />

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP 1: PAKET — pilih Free/Basic/Premium                        */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === "paket" && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.2s, transform 1.3s ease-out 0.2s",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bodoni)",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.85)",
                display: "block",
                textAlign: "center",
              }}
            >
              {templateName}
            </span>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.40)",
                textAlign: "center",
                marginTop: "8px",
                lineHeight: 1.6,
              }}
            >
              Pilih paket yang sesuai kebutuhan Anda. Perubahan paket masih bisa dilakukan nanti di step Ringkasan.
            </p>

            {/* Package toggle — 2 kolom default, 3 kolom kalau freeAvailable */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: freeAvailable ? "1fr 1fr 1fr" : "1fr 1fr",
                gap: "12px",
                marginTop: "28px",
              }}
            >
              {/* Free option (hanya kalau freeAvailable) */}
              {freeAvailable && (
                <button
                  onClick={() => setSelected("free")}
                  style={{
                    padding: "16px 8px",
                    borderRadius: "12px",
                    border: selected === "free" ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.06)",
                    background: selected === "free" ? "rgba(201,169,110,0.04)" : "transparent",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: selected === "free" ? "rgba(201,169,110,0.75)" : "rgba(255,255,255,0.35)",
                      display: "block",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Free
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-bodoni)",
                      fontSize: "20px",
                      fontWeight: 400,
                      color: selected === "free" ? "rgba(201,169,110,0.8)" : "rgba(255,255,255,0.35)",
                      display: "block",
                      marginTop: "8px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    GRATIS
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "9px",
                      color: "rgba(255,255,255,0.30)",
                      display: "block",
                      marginTop: "6px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    tanpa QRIS
                  </span>
                </button>
              )}

              {/* Basic option */}
              <button
                onClick={() => setSelected("basic")}
                style={{
                  padding: "16px 12px",
                  borderRadius: "12px",
                  border: selected === "basic" ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(255,255,255,0.06)",
                  background: selected === "basic" ? "rgba(255,255,255,0.04)" : "transparent",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: selected === "basic" ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
                    display: "block",
                    transition: "color 0.3s ease",
                  }}
                >
                  Basic
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bodoni)",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: selected === "basic" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
                    display: "block",
                    marginTop: "8px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {basicPrice}rb
                </span>
              </button>

              {/* Premium option */}
              <button
                onClick={() => setSelected("premium")}
                style={{
                  padding: "16px 12px",
                  borderRadius: "12px",
                  border: selected === "premium" ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.06)",
                  background: selected === "premium" ? "rgba(201,169,110,0.04)" : "transparent",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: selected === "premium" ? "rgba(201,169,110,0.75)" : "rgba(255,255,255,0.35)",
                    display: "block",
                    transition: "color 0.3s ease",
                  }}
                >
                  Premium
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bodoni)",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: selected === "premium" ? "rgba(201,169,110,0.8)" : "rgba(255,255,255,0.35)",
                    display: "block",
                    marginTop: "8px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {premiumPrice}rb
                </span>
              </button>
            </div>

            {/* Total */}
            <div
              style={{
                marginTop: "28px",
                padding: "16px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(255,255,255,0.50)" }}>Total</span>
                <span
                  style={{
                    fontFamily: "var(--font-bodoni)",
                    fontSize: "20px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  {formatRupiah(price)}
                </span>
              </div>
            </div>

            {/* CTA: Lanjut ke Data Pemesan */}
            <button
              onClick={() => {
                setSubmitError(null);
                setStep("pemesan");
              }}
              style={{
                width: "100%",
                marginTop: "32px",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1px solid rgba(201,169,110,0.20)",
                background: "rgba(201,169,110,0.06)",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                color: "rgba(201,169,110,0.85)",
                cursor: "pointer",
                transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                e.currentTarget.style.background = "rgba(201,169,110,0.10)";
                e.currentTarget.style.color = "rgba(201,169,110,0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.20)";
                e.currentTarget.style.background = "rgba(201,169,110,0.06)";
                e.currentTarget.style.color = "rgba(201,169,110,0.85)";
              }}
            >
              Lanjut ke Data Pemesan
            </button>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP 2: PEMESAN — nama, WA, email                              */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === "pemesan" && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.2s, transform 1.3s ease-out 0.2s",
            }}
          >
            {/* Recap ringkas: template + paket yang dipilih */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.015)",
                marginBottom: "24px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Template</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.72)" }}>{templateName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Paket</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: selected === "premium" || selected === "free" ? "rgba(201,169,110,0.7)" : "rgba(255,255,255,0.72)" }}>{packageName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-bodoni)", fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>{isFree ? "GRATIS" : formatRupiah(price)}</span>
              </div>
            </div>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label
                  htmlFor="cust-name"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Nama <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  id="cust-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama lengkap pemesan"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.85)",
                    outline: "none",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
                    e.currentTarget.style.background = "rgba(201,169,110,0.03)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="cust-phone"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  No. WhatsApp <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  id="cust-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.85)",
                    outline: "none",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
                    e.currentTarget.style.background = "rgba(201,169,110,0.03)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="cust-email"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.45)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Email <span style={{ color: "rgba(255,255,255,0.30)" }}>(opsional)</span>
                </label>
                <input
                  id="cust-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.85)",
                    outline: "none",
                    transition: "border-color 0.3s ease, background 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
                    e.currentTarget.style.background = "rgba(201,169,110,0.03)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  }}
                />
              </div>
            </div>

            {submitError && (
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(220, 100, 100, 0.85)",
                  textAlign: "center",
                  marginTop: "16px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(220, 100, 100, 0.06)",
                  border: "1px solid rgba(220, 100, 100, 0.15)",
                }}
              >
                {submitError}
              </p>
            )}

            {/* Buttons: Kembali + Lanjut */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", marginTop: "32px" }}>
              <button
                onClick={() => setStep("paket")}
                style={{
                  padding: "16px 18px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                Kembali
              </button>
              <button
                onClick={goToUndangan}
                style={{
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.10)";
                  e.currentTarget.style.color = "rgba(201,169,110,0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.20)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.06)";
                  e.currentTarget.style.color = "rgba(201,169,110,0.85)";
                }}
              >
                Lanjut ke Data Undangan
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP 3: UNDANGAN — form panjang (render FormDataUndangan)       */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === "undangan" && (
          <div>
            {/* Kembali button di atas */}
            <button
              onClick={() => setStep("pemesan")}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.55)",
                cursor: "pointer",
                marginBottom: "20px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              }}
            >
              ← Kembali ke Data Pemesan
            </button>

            <NaukaFormDataUndangan
              template={templateId as "sacred" | "celestial"}
              onSubmit={handleUndanganSubmit}
              submitLabel="Lanjut ke Ringkasan"
              submitting={false}
            />
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP 4: REVIEW — ringkasan semua data sebelum create order      */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === "review" && weddingData && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.2s, transform 1.3s ease-out 0.2s",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                color: "rgba(255,255,255,0.45)",
                textAlign: "center",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}
            >
              Mohon periksa kembali semua data di bawah. Setelah klik <strong style={{ color: "rgba(201,169,110,0.85)" }}>{isFree ? "Kirim Pesanan" : "Lanjut ke Pembayaran"}</strong>, pesanan akan dibuat dengan nomor <code style={{ color: "rgba(201,169,110,0.85)" }}>NAUKA-{new Date().getFullYear()}-...</code> dan tidak dapat diubah.
            </p>

            {/* Card: Pesanan */}
            <ReviewSection title="Pesanan">
              <ReviewRow label="Template" value={templateName} />
              <ReviewRow label="Paket" value={packageName} highlight={selected === "premium" || selected === "free"} />
              <ReviewRow label="Total" value={isFree ? "GRATIS" : formatRupiah(price)} bold />
            </ReviewSection>

            {/* Card: Pemesan */}
            <ReviewSection title="Data Pemesan">
              <ReviewRow label="Nama" value={customerName} />
              <ReviewRow label="No. WhatsApp" value={customerPhone} />
              {customerEmail && <ReviewRow label="Email" value={customerEmail} />}
            </ReviewSection>

            {/* Card: Mempelai */}
            <ReviewSection title="Data Mempelai">
              <ReviewRow label="Mempelai Pria" value={weddingData.groomFullName} />
              {weddingData.groomNickname && <ReviewRow label="Panggilan Pria" value={weddingData.groomNickname} />}
              <ReviewRow label="Mempelai Wanita" value={weddingData.brideFullName} />
              {weddingData.brideNickname && <ReviewRow label="Panggilan Wanita" value={weddingData.brideNickname} />}
            </ReviewSection>

            {/* Card: Akad */}
            <ReviewSection title="Akad">
              <ReviewRow label="Tanggal" value={weddingData.akadDate} />
              <ReviewRow label="Waktu" value={`${weddingData.akadStartTime}${weddingData.akadEndTime ? ` - ${weddingData.akadEndTime}` : ""}`} />
              <ReviewRow label="Lokasi" value={weddingData.akadAddress} />
              {weddingData.akadCity && <ReviewRow label="Kota" value={weddingData.akadCity} />}
            </ReviewSection>

            {/* Card: Resepsi (hanya kalau ada) */}
            {weddingData.hasResepsi && (
              <ReviewSection title="Resepsi">
                <ReviewRow label="Tanggal" value={weddingData.resepsiDate || "-"} />
                <ReviewRow label="Waktu" value={`${weddingData.resepsiStartTime || "-"}${weddingData.resepsiEndTime ? ` - ${weddingData.resepsiEndTime}` : ""}`} />
                <ReviewRow label="Lokasi" value={weddingData.resepsiAddress || "-"} />
                {weddingData.resepsiCity && <ReviewRow label="Kota" value={weddingData.resepsiCity} />}
              </ReviewSection>
            )}

            {/* Card: Konfigurasi Undangan */}
            <ReviewSection title="Konfigurasi Undangan">
              <ReviewRow label="Slug" value={`/detail/${weddingData.slug}`} />
              <ReviewRow label="BGM" value={weddingData.bgmType === "hening" ? "Hening (tanpa musik)" : weddingData.bgmType} />
              {weddingData.quote && <ReviewRow label="Quote" value={weddingData.quote} />}
            </ReviewSection>

            {submitError && (
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(220, 100, 100, 0.85)",
                  textAlign: "center",
                  marginTop: "16px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(220, 100, 100, 0.06)",
                  border: "1px solid rgba(220, 100, 100, 0.15)",
                }}
              >
                {submitError}
              </p>
            )}

            {/* Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "10px", marginTop: "32px" }}>
              <button
                onClick={() => setStep("undangan")}
                disabled={submitting}
                style={{
                  padding: "16px 18px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.55)",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.5 : 1,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (submitting) return;
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                Kembali
              </button>
              <button
                onClick={createOrder}
                disabled={submitting}
                style={{
                  padding: "16px 24px",
                  borderRadius: "12px",
                  border: "1px solid rgba(201,169,110,0.20)",
                  background: submitting ? "rgba(201,169,110,0.03)" : "rgba(201,169,110,0.06)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  color: submitting ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.85)",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (submitting) return;
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.10)";
                  e.currentTarget.style.color = "rgba(201,169,110,0.95)";
                }}
                onMouseLeave={(e) => {
                  if (submitting) return;
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.20)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.06)";
                  e.currentTarget.style.color = "rgba(201,169,110,0.85)";
                }}
              >
                {submitting ? "Membuat pesanan..." : isFree ? "Kirim Pesanan (Gratis)" : "Lanjut ke Pembayaran"}
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP 5: PEMBAYARAN — QRIS + order_id + tombol "saya sudah bayar" */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === "pembayaran" && orderId && (
          <div
            style={{
              opacity: 1,
              transform: "translateY(0)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            {/* Status badge */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  borderRadius: "999px",
                  border: "1px solid rgba(201,169,110,0.20)",
                  background: "rgba(201,169,110,0.05)",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(201,169,110,0.7)",
                    boxShadow: "0 0 8px rgba(201,169,110,0.5)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(201,169,110,0.75)",
                  }}
                >
                  Menunggu Pembayaran
                </span>
              </div>
            </div>

            {/* Order ID — prominent */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "8px",
                }}
              >
                Nomor Pesanan
              </p>
              <p
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "24px",
                  fontWeight: 400,
                  letterSpacing: "0.08em",
                  color: "rgba(201,169,110,0.9)",
                }}
              >
                {orderId}
              </p>
            </div>

            {/* Total */}
            <div
              style={{
                padding: "16px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(201,169,110,0.15)",
                background: "rgba(201,169,110,0.02)",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "6px",
                }}
              >
                Total Pembayaran
              </p>
              <p
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "26px",
                  fontWeight: 400,
                  color: "rgba(201,169,110,0.9)",
                }}
              >
                {formatRupiah(price)}
              </p>
            </div>

            {/* QR Code card */}
            <div
              style={{
                padding: "28px 24px",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.025)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.2), 0 0 80px rgba(201,169,110,0.02)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "0 auto",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  background: "#ffffff",
                  padding: "12px",
                }}
              >
                <Image
                  src="/qris.png"
                  alt="QRIS Payment"
                  fill
                  sizes="200px"
                  className="object-contain"
                  style={{ borderRadius: "8px" }}
                  priority
                />
              </div>

              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.60)",
                  display: "block",
                  marginTop: "18px",
                }}
              >
                QRIS
              </span>

              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.28)",
                  marginTop: "8px",
                }}
              >
                Dapat dibayar melalui semua aplikasi pembayaran &amp; mobile banking
              </p>
            </div>

            {/* Info proses */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px 18px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.015)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                Setelah pembayaran berhasil di aplikasi Anda, klik tombol di bawah. Admin akan verifikasi pembayaran dan memulai pengerjaan undangan Anda.
              </p>
            </div>

            {submitError && (
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(220, 100, 100, 0.85)",
                  textAlign: "center",
                  marginTop: "16px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  background: "rgba(220, 100, 100, 0.06)",
                  border: "1px solid rgba(220, 100, 100, 0.15)",
                }}
              >
                {submitError}
              </p>
            )}

            {/* CTA: Saya sudah bayar */}
            <button
              onClick={confirmPayment}
              disabled={submitting}
              style={{
                width: "100%",
                marginTop: "32px",
                padding: "16px 24px",
                borderRadius: "12px",
                border: "1px solid rgba(201,169,110,0.20)",
                background: submitting ? "rgba(201,169,110,0.03)" : "rgba(201,169,110,0.06)",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                letterSpacing: "0.1em",
                color: submitting ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.85)",
                cursor: submitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (submitting) return;
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                e.currentTarget.style.background = "rgba(201,169,110,0.10)";
                e.currentTarget.style.color = "rgba(201,169,110,0.95)";
              }}
              onMouseLeave={(e) => {
                if (submitting) return;
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.20)";
                e.currentTarget.style.background = "rgba(201,169,110,0.06)";
                e.currentTarget.style.color = "rgba(201,169,110,0.85)";
              }}
            >
              {submitting ? "Memproses..." : "Saya sudah bayar"}
            </button>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.30)", textAlign: "center", marginTop: "12px", lineHeight: 1.6 }}>
              Simpan nomor pesanan <strong style={{ color: "rgba(201,169,110,0.7)" }}>{orderId}</strong> untuk referensi.
            </p>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════ */}
        {/* STEP 6: DONE — Terima kasih + WA konfirmasi                     */}
        {/* ════════════════════════════════════════════════════════════ */}
        {step === "done" && orderId && weddingData && (
          <div
            style={{
              opacity: 1,
              transform: "translateY(0)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
              textAlign: "center",
            }}
          >
            {/* Success icon */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: "1px solid rgba(201,169,110,0.25)",
                background: "rgba(201,169,110,0.05)",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "28px",
                  color: "rgba(201,169,110,0.85)",
                }}
              >
                ✓
              </span>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-bodoni)",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.85)",
                marginBottom: "12px",
              }}
            >
              Terima Kasih
            </h3>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: "24px",
                maxWidth: "380px",
                margin: "0 auto 24px",
              }}
            >
              Pesanan Anda <strong style={{ color: "rgba(201,169,110,0.85)" }}>{orderId}</strong> telah kami terima bersama seluruh data undangan.
              <br />
              <br />
              {isFree ? (
                <>Pesanan <strong style={{ color: "rgba(201,169,110,0.85)" }}>Free (Gratis)</strong> Anda akan segera diproses oleh admin tanpa perlu pembayaran. Tidak ada QRIS yang perlu dipindai.</>
              ) : (
                <>Konfirmasi pembayaran Anda telah tercatat dengan status <em>menunggu verifikasi admin</em>. Pengerjaan undangan akan dimulai setelah admin memverifikasi pembayaran.</>
              )}
            </p>

            {/* Recap card */}
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
                textAlign: "left",
                marginBottom: "24px",
              }}
            >
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
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)" }}>{packageName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Mempelai</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.72)" }}>{weddingData.groomFullName} &amp; {weddingData.brideFullName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Status</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)" }}>{isFree ? "Menunggu review admin" : "Menunggu verifikasi admin"}</span>
              </div>
            </div>

            {/* WA konfirmasi — explicit, tidak auto-open */}
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                textAlign: "center",
                marginBottom: "16px",
                lineHeight: 1.6,
              }}
            >
              Selanjutnya, kirim konfirmasi ke admin via WhatsApp dengan data pesanan sudah ter-prefill:
            </p>

            <a
              href={buildWaUrl(orderId, templateName, selected, weddingData)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                borderRadius: "10px",
                border: "1px solid rgba(201,169,110,0.20)",
                background: "rgba(201,169,110,0.06)",
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                color: "rgba(201,169,110,0.8)",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.35)";
                e.currentTarget.style.background = "rgba(201,169,110,0.10)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.20)";
                e.currentTarget.style.background = "rgba(201,169,110,0.06)";
              }}
            >
              Konfirmasi via WhatsApp
            </a>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                color: "rgba(255,255,255,0.30)",
                marginTop: "24px",
                lineHeight: 1.6,
              }}
            >
              Simpan nomor pesanan Anda untuk referensi.
              <br />
              Jika WhatsApp tidak terbuka, hubungi kami manual di <strong style={{ color: "rgba(255,255,255,0.45)" }}>+{WA_BASE}</strong>.
            </p>
          </div>
        )}

        {/* Fallback: state tidak valid (seharusnya tidak tercapai) */}
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
              <button
                onClick={() => setStep("undangan")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(201,169,110,0.85)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  textDecoration: "underline",
                }}
              >
                Kembali ke Data Undangan
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// Helper components for Review step
// ════════════════════════════════════════════════════════════════

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "18px 20px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
        marginBottom: "14px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.6)",
          marginBottom: "12px",
        }}
      >
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
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "12px",
          color: "rgba(255,255,255,0.50)",
          flexShrink: 0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: bold ? "var(--font-bodoni)" : "var(--font-inter)",
          fontSize: bold ? "16px" : "12px",
          color: highlight ? "rgba(201,169,110,0.85)" : "rgba(255,255,255,0.85)",
          textAlign: "right",
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}
