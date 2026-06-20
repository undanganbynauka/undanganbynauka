"use client";

import React, { useState, useEffect, useRef } from "react";

interface Props {
  templateName: string;
  templateId: string;
}

type Step = "paket" | "pemesan" | "undangan" | "review" | "done";

const PRICING = {
  basic: 75000,
  premium: 99000,
};

const WA_NUMBER = "6289655592925";

interface WeddingData {
  groomFullName: string;
  brideFullName: string;
  akadDate: string;
  akadStartTime: string;
  akadEndTime: string;
  akadAddress: string;
  hasResepsi: boolean;
  resepsiDate: string;
  resepsiStartTime: string;
  resepsiEndTime: string;
  resepsiAddress: string;
}

const EMPTY_WEDDING: WeddingData = {
  groomFullName: "",
  brideFullName: "",
  akadDate: "",
  akadStartTime: "",
  akadEndTime: "",
  akadAddress: "",
  hasResepsi: true,
  resepsiDate: "",
  resepsiStartTime: "",
  resepsiEndTime: "",
  resepsiAddress: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.02)",
  color: "#fff",
  fontFamily: "var(--font-inter, sans-serif)",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const backBtnStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.08)",
  background: "transparent",
  color: "rgba(255,255,255,0.5)",
  fontFamily: "var(--font-inter, sans-serif)",
  fontSize: 12,
  cursor: "pointer",
};

const nextBtnStyle: React.CSSProperties = {
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid rgba(201,169,110,0.20)",
  background: "rgba(201,169,110,0.06)",
  color: "rgba(201,169,110,0.85)",
  fontFamily: "var(--font-inter, sans-serif)",
  fontSize: 12,
  letterSpacing: "0.1em",
  cursor: "pointer",
};

function formatIDR(n: number): string {
  return "Rp" + n.toLocaleString("id-ID");
}

function buildWhatsAppMessage(
  templateName: string,
  selectedPackage: "basic" | "premium",
  price: number,
  customerName: string,
  customerPhone: string,
  customerEmail: string,
  data: WeddingData
): string {
  const lines: string[] = [
    "Halo Nauka, saya ingin konfirmasi pesanan.",
    "",
    `*Template:* ${templateName}`,
    `*Paket:* ${selectedPackage === "basic" ? "Basic" : "Premium"}`,
    `*Harga:* ${formatIDR(price)}`,
    "",
    "*DATA PEMESAN*",
    `Nama: ${customerName}`,
    `WhatsApp: ${customerPhone}`,
  ];
  if (customerEmail) lines.push(`Email: ${customerEmail}`);
  lines.push(
    "",
    "*DATA MEMPELAI*",
    `Pria: ${data.groomFullName}`,
    `Wanita: ${data.brideFullName}`,
    "",
    "*AKAD*",
    `Tanggal: ${data.akadDate}`,
    `Waktu: ${data.akadStartTime}${data.akadEndTime ? ` - ${data.akadEndTime}` : ""}`,
    `Lokasi: ${data.akadAddress}`
  );
  if (data.hasResepsi) {
    lines.push(
      "",
      "*RESEPSI*",
      `Tanggal: ${data.resepsiDate}`,
      `Waktu: ${data.resepsiStartTime}${data.resepsiEndTime ? ` - ${data.resepsiEndTime}` : ""}`,
      `Lokasi: ${data.resepsiAddress}`
    );
  }
  return lines.join("\n");
}

export const NaukaCheckout: React.FC<Props> = ({ templateName, templateId }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("paket");
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "premium">("premium");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [weddingData, setWeddingData] = useState<WeddingData>(EMPTY_WEDDING);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, open]);

  const price = selectedPackage === "basic" ? PRICING.basic : PRICING.premium;

  function handlePaketNext() {
    setError(null);
    setStep("pemesan");
  }

  function handlePemesanNext() {
    if (!customerName.trim()) { setError("Nama pemesan wajib diisi."); return; }
    if (!customerPhone.trim()) { setError("No. WhatsApp pemesan wajib diisi."); return; }
    setError(null);
    setStep("undangan");
  }

  function handleUndanganNext() {
    const d = weddingData;
    if (!d.groomFullName.trim()) { setError("Nama mempelai pria wajib diisi."); return; }
    if (!d.brideFullName.trim()) { setError("Nama mempelai wanita wajib diisi."); return; }
    if (!d.akadDate) { setError("Tanggal akad wajib diisi."); return; }
    if (!d.akadStartTime) { setError("Waktu akad wajib diisi."); return; }
    if (!d.akadAddress.trim()) { setError("Lokasi akad wajib diisi."); return; }
    if (d.hasResepsi) {
      if (!d.resepsiDate) { setError("Tanggal resepsi wajib diisi."); return; }
      if (!d.resepsiStartTime) { setError("Waktu resepsi wajib diisi."); return; }
      if (!d.resepsiAddress.trim()) { setError("Lokasi resepsi wajib diisi."); return; }
    }
    setError(null);
    setStep("review");
  }

  function handleSubmit() {
    setSubmitting(true);
    const msg = encodeURIComponent(
      buildWhatsAppMessage(
        templateName, selectedPackage, price,
        customerName, customerPhone, customerEmail,
        weddingData
      )
    );
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${msg}`;
    window.open(waUrl, "_blank");
    setSubmitting(false);
    setStep("done");
  }

  function reset() {
    setStep("paket");
    setSelectedPackage("premium");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setWeddingData(EMPTY_WEDDING);
    setError(null);
    setOpen(false);
  }

  if (!open) {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "14px 36px",
            borderRadius: "999px",
            border: "1px solid rgba(201,169,110,0.35)",
            background: "rgba(201,169,110,0.06)",
            color: "rgba(201,169,110,0.95)",
            fontFamily: "var(--font-inter, sans-serif)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.1em",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Checkout {templateName}
        </button>
      </div>
    );
  }

  const stepNum = step === "paket" ? 1 : step === "pemesan" ? 2 : step === "undangan" ? 3 : step === "review" ? 4 : 5;

  return (
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
    >
      <div
        ref={scrollRef}
        style={{
          background: "#0B1120",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "32px 24px",
          color: "#fff",
          width: "100%",
          maxWidth: 480,
          margin: "auto 0",
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              Step {stepNum} dari 5
            </span>
            <button onClick={reset} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 22, cursor: "pointer", padding: "4px 8px", lineHeight: 1 }}>×</button>
          </div>
          <h3 style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 24, fontWeight: 400, color: "rgba(255,255,255,0.92)", margin: 0 }}>
            {step === "paket" && "Pilih Paket"}
            {step === "pemesan" && "Data Pemesan"}
            {step === "undangan" && "Data Undangan"}
            {step === "review" && "Ringkasan Pesanan"}
            {step === "done" && "Pesanan Terkirim"}
          </h3>
          <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6 }}>
            {templateName} · {selectedPackage === "basic" ? "Basic" : "Premium"}
          </p>
        </div>
                {step === "paket" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <button
                onClick={() => setSelectedPackage("basic")}
                style={{
                  padding: "20px 12px",
                  borderRadius: 12,
                  border: selectedPackage === "basic" ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(255,255,255,0.06)",
                  background: selectedPackage === "basic" ? "rgba(255,255,255,0.04)" : "transparent",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <span style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: selectedPackage === "basic" ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)" }}>
                  Basic
                </span>
                <span style={{ display: "block", fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 22, fontWeight: 400, color: selectedPackage === "basic" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)", marginTop: 8 }}>
                  75rb
                </span>
              </button>
              <button
                onClick={() => setSelectedPackage("premium")}
                style={{
                  padding: "20px 12px",
                  borderRadius: 12,
                  border: selectedPackage === "premium" ? "1px solid rgba(201,169,110,0.25)" : "1px solid rgba(255,255,255,0.06)",
                  background: selectedPackage === "premium" ? "rgba(201,169,110,0.04)" : "transparent",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                <span style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: selectedPackage === "premium" ? "rgba(201,169,110,0.75)" : "rgba(255,255,255,0.35)" }}>
                  Premium
                </span>
                <span style={{ display: "block", fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 22, fontWeight: 400, color: selectedPackage === "premium" ? "rgba(201,169,110,0.8)" : "rgba(255,255,255,0.35)", marginTop: 8 }}>
                  99rb
                </span>
              </button>
            </div>

            <div style={{ padding: "14px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 20, color: "rgba(255,255,255,0.85)" }}>{formatIDR(price)}</span>
              </div>
            </div>

            <button
              onClick={handlePaketNext}
              style={{ width: "100%", ...nextBtnStyle, padding: "16px 24px", fontSize: 13 }}
            >
              Lanjut ke Data Pemesan
            </button>
          </div>
        )}

        {step === "pemesan" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                  Nama <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama lengkap pemesan"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                  WhatsApp <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                  Email (opsional)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
              <button onClick={() => setStep("paket")} style={backBtnStyle}>← Kembali</button>
              <button onClick={handlePemesanNext} style={nextBtnStyle}>Lanjut ke Data Undangan</button>
            </div>
          </div>
        )}

        {step === "undangan" && (
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                  Nama Mempelai Pria <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={weddingData.groomFullName}
                  onChange={(e) => setWeddingData({ ...weddingData, groomFullName: e.target.value })}
                  placeholder="Nama lengkap pria"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
                  Nama Mempelai Wanita <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  type="text"
                  value={weddingData.brideFullName}
                  onChange={(e) => setWeddingData({ ...weddingData, brideFullName: e.target.value })}
                  placeholder="Nama lengkap wanita"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginTop: 8, marginBottom: 4, fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                Akad
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <input type="date" value={weddingData.akadDate} onChange={(e) => setWeddingData({ ...weddingData, akadDate: e.target.value })} style={inputStyle} />
                <input type="time" value={weddingData.akadStartTime} onChange={(e) => setWeddingData({ ...weddingData, akadStartTime: e.target.value })} style={inputStyle} />
              </div>
              <input type="text" value={weddingData.akadAddress} onChange={(e) => setWeddingData({ ...weddingData, akadAddress: e.target.value })} placeholder="Lokasi akad" style={inputStyle} />

              <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,255,255,0.7)", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={weddingData.hasResepsi}
                  onChange={(e) => setWeddingData({ ...weddingData, hasResepsi: e.target.checked })}
                />
                Ada resepsi
              </label>

              {weddingData.hasResepsi && (
                <>
                  <div style={{ marginTop: 8, marginBottom: 4, fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                    Resepsi
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <input type="date" value={weddingData.resepsiDate} onChange={(e) => setWeddingData({ ...weddingData, resepsiDate: e.target.value })} style={inputStyle} />
                    <input type="time" value={weddingData.resepsiStartTime} onChange={(e) => setWeddingData({ ...weddingData, resepsiStartTime: e.target.value })} style={inputStyle} />
                  </div>
                  <input type="text" value={weddingData.resepsiAddress} onChange={(e) => setWeddingData({ ...weddingData, resepsiAddress: e.target.value })} placeholder="Lokasi resepsi" style={inputStyle} />
                </>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
              <button onClick={() => setStep("pemesan")} style={backBtnStyle}>← Kembali</button>
              <button onClick={handleUndanganNext} style={nextBtnStyle}>Lanjut ke Ringkasan</button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div>
            <div style={{ padding: "16px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.015)", marginBottom: 20, fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Template</span>
                <span>{templateName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Paket</span>
                <span>{selectedPackage === "basic" ? "Basic" : "Premium"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>Total</span>
                <span style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 18, color: "rgba(255,255,255,0.85)" }}>{formatIDR(price)}</span>
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Data Pemesan</div>
                <div>{customerName}</div>
                <div style={{ color: "rgba(255,255,255,0.5)" }}>{customerPhone}</div>
                {customerEmail && <div style={{ color: "rgba(255,255,255,0.5)" }}>{customerEmail}</div>}
              </div>
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Data Undangan</div>
                <div>{weddingData.groomFullName} &amp; {weddingData.brideFullName}</div>
                <div style={{ color: "rgba(255,255,255,0.5)" }}>
                  Akad: {weddingData.akadDate} · {weddingData.akadStartTime}
                </div>
                {weddingData.hasResepsi && (
                  <div style={{ color: "rgba(255,255,255,0.5)" }}>
                    Resepsi: {weddingData.resepsiDate} · {weddingData.resepsiStartTime}
                  </div>
                )}
              </div>
            </div>

            <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 11, color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: 16, lineHeight: 1.6 }}>
              Klik "Kirim via WhatsApp" — Anda akan diarahkan ke WhatsApp dengan pesan otomatis berisi data pesanan di atas.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
              <button onClick={() => setStep("undangan")} style={backBtnStyle}>← Kembali</button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  ...nextBtnStyle,
                  background: "rgba(201,169,110,0.15)",
                  borderColor: "rgba(201,169,110,0.5)",
                  color: "rgba(201,169,110,0.95)",
                }}
              >
                {submitting ? "Memproses..." : "Kirim via WhatsApp →"}
              </button>
            </div>
          </div>
        )}

        {step === "done" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16, color: "rgba(201,169,110,0.8)" }}>✓</div>
            <h4 style={{ fontFamily: "var(--font-bodoni, Georgia, serif)", fontSize: 22, fontWeight: 400, color: "rgba(255,255,255,0.92)", margin: "0 0 12px" }}>
              Pesanan Terkirim
            </h4>
            <p style={{ fontFamily: "var(--font-inter, sans-serif)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 24 }}>
              Terima kasih! Pesanan Anda telah dikirim ke WhatsApp Nauka. Tim kami akan menghubungi Anda untuk konfirmasi pembayaran dan proses selanjutnya.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "12px 24px",
                borderRadius: "999px",
                border: "1px solid rgba(201,169,110,0.35)",
                background: "rgba(201,169,110,0.06)",
                color: "rgba(201,169,110,0.85)",
                fontFamily: "var(--font-inter, sans-serif)",
                fontSize: 12,
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              Tutup
            </button>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 16, padding: "10px 12px", borderRadius: 8, background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.2)", fontFamily: "var(--font-inter, sans-serif)", fontSize: 12, color: "rgba(255,180,180,0.9)" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
