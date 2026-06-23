"use client";

import React, { useEffect, useRef, useState } from "react";

const WA_BASE = "6289655592925";

type Step = "pemesan" | "undangan" | "review" | "done";

const STEP_TITLES: Record<Step, string> = {
  pemesan: "Data Pemesan",
  undangan: "Data Undangan",
  review: "Konfirmasi WhatsApp",
  done: "Selesai",
};

interface LunaClaimFormProps {
  templateName?: string;
}

export function LunaClaimForm({ templateName = "Luna" }: LunaClaimFormProps) {
  const [step, setStep] = useState<Step>("pemesan");
  const [visible, setVisible] = useState(false);

  // Pemesan
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Data Undangan
  const [groomFullName, setGroomFullName] = useState("");
  const [groomFatherName, setGroomFatherName] = useState("");
  const [groomMotherName, setGroomMotherName] = useState("");
  const [brideFullName, setBrideFullName] = useState("");
  const [brideFatherName, setBrideFatherName] = useState("");
  const [brideMotherName, setBrideMotherName] = useState("");

  const [akadDate, setAkadDate] = useState("");
  const [akadStartTime, setAkadStartTime] = useState("");
  const [akadEndTime, setAkadEndTime] = useState("");
  const [akadAddress, setAkadAddress] = useState("");

  const [hasResepsi, setHasResepsi] = useState(true);
  const [resepsiDate, setResepsiDate] = useState("");
  const [resepsiStartTime, setResepsiStartTime] = useState("");
  const [resepsiEndTime, setResepsiEndTime] = useState("");
  const [resepsiAddress, setResepsiAddress] = useState("");

  const [slug, setSlug] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  // ── Validation: pemesan → undangan ──
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

  // ── Validation: undangan → review ──
  function goToReview() {
    setSubmitError(null);
    if (!groomFullName.trim() || !brideFullName.trim()) {
      setSubmitError("Nama lengkap mempelai pria dan wanita wajib diisi.");
      return;
    }
    if (!akadDate.trim() || !akadStartTime.trim() || !akadAddress.trim()) {
      setSubmitError("Tanggal, waktu, dan lokasi akad wajib diisi.");
      return;
    }
    if (hasResepsi) {
      if (!resepsiDate.trim() || !resepsiStartTime.trim() || !resepsiAddress.trim()) {
        setSubmitError("Karena resepsi diaktifkan, semua data resepsi wajib diisi.");
        return;
      }
    }
    if (!slug.trim()) {
      setSubmitError("Slug URL undangan wajib diisi (contoh: ali-lyla).");
      return;
    }
    setStep("review");
  }

  // ── Build WA URL with all data ──
  function buildWaUrl(orderIdArg?: string | null): string {
    const lines = [
      `Halo Nauka, saya ingin klaim Luna (template gratis) untuk undangan pernikahan saya.`,
    ];
    if (orderIdArg) {
      lines.push(``, `*Nomor Pesanan:* ${orderIdArg}`);
    }
    lines.push(
      ``,
      `*DATA PEMESAN*`,
      `Nama: ${customerName}`,
      `WhatsApp: ${customerPhone}`,
    );
    if (customerEmail) lines.push(`Email: ${customerEmail}`);
    lines.push(
      ``,
      `*DATA MEMPELAI*`,
      `Pria: ${groomFullName}`,
      `  Putra dari Bapak ${groomFatherName || "-"} dan Ibu ${groomMotherName || "-"}`,
      `Wanita: ${brideFullName}`,
      `  Putri dari Bapak ${brideFatherName || "-"} dan Ibu ${brideMotherName || "-"}`,
      ``,
      `*AKAD*`,
      `Tanggal: ${akadDate}`,
      `Waktu: ${akadStartTime}${akadEndTime ? ` - ${akadEndTime}` : ""}`,
      `Lokasi: ${akadAddress}`,
    );
    if (hasResepsi) {
      lines.push(``, `*RESEPSI*`,
        `Tanggal: ${resepsiDate}`,
        `Waktu: ${resepsiStartTime}${resepsiEndTime ? ` - ${resepsiEndTime}` : ""}`,
        `Lokasi: ${resepsiAddress}`,
      );
    }
    lines.push(``, `*UNDANGAN*`,
      `Slug URL: ${slug}`,
      `Mohon info lebih lanjut untuk proses pembuatan. Terima kasih.`,
    );
    return `https://wa.me/${WA_BASE}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
  }

  const inputStyle: React.CSSProperties = {
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
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
    display: "block",
    marginBottom: "6px",
  };

  function focusGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
    e.currentTarget.style.background = "rgba(201,169,110,0.03)";
  }
  function blurGold(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
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
        {/* Title */}
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

        {/* Step indicator (3 dots for free flow) */}
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
            const order: Step[] = ["pemesan", "undangan", "review", "done"];
            const currentIdx = order.indexOf(step);
            const isActive = i === currentIdx;
            const isPast = i < currentIdx;
            return (
              <div
                key={s}
                style={{
                  width: "32px",
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

        {/* ════════ STEP 1: PEMESAN ════════ */}
        {step === "pemesan" && (
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
                marginBottom: "8px",
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
                marginBottom: "28px",
                lineHeight: 1.6,
              }}
            >
              Luna gratis — tanpa biaya. Silakan isi data pemesan terlebih dahulu.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label htmlFor="cust-name" style={labelStyle}>
                  Nama <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  id="cust-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nama lengkap pemesan"
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurGold}
                />
              </div>

              <div>
                <label htmlFor="cust-phone" style={labelStyle}>
                  No. WhatsApp <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
                </label>
                <input
                  id="cust-phone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurGold}
                />
              </div>

              <div>
                <label htmlFor="cust-email" style={labelStyle}>
                  Email <span style={{ color: "rgba(255,255,255,0.30)" }}>(opsional)</span>
                </label>
                <input
                  id="cust-email"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  style={inputStyle}
                  onFocus={focusGold}
                  onBlur={blurGold}
                />
              </div>
            </div>

            {submitError && (
              <p
                style={{
                  marginTop: "16px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,150,150,0.85)",
                  textAlign: "center",
                }}
              >
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
              Lanjut ke Data Undangan
            </button>
          </div>
        )}

        {/* ════════ STEP 2: UNDANGAN ════════ */}
        {step === "undangan" && (
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
                fontSize: "11px",
                color: "rgba(255,255,255,0.40)",
                textAlign: "center",
                marginBottom: "28px",
                lineHeight: 1.6,
              }}
            >
              Isi data mempelai dan jadwal acara. Data ini akan dikirim ke Nauka untuk diproses.
            </p>

            {/* Mempelai Pria */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "13px",
                  color: "rgba(201,169,110,0.75)",
                  display: "block",
                  marginBottom: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                MEMPELAI PRIA
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Nama Lengkap <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                  <input
                    type="text"
                    value={groomFullName}
                    onChange={(e) => setGroomFullName(e.target.value)}
                    placeholder="Ali Rahman"
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nama Bapak</label>
                  <input
                    type="text"
                    value={groomFatherName}
                    onChange={(e) => setGroomFatherName(e.target.value)}
                    placeholder="Hendri"
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nama Ibu</label>
                  <input
                    type="text"
                    value={groomMotherName}
                    onChange={(e) => setGroomMotherName(e.target.value)}
                    placeholder="Ningsih"
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
              </div>
            </div>

            {/* Mempelai Wanita */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "13px",
                  color: "rgba(201,169,110,0.75)",
                  display: "block",
                  marginBottom: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                MEMPELAI WANITA
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Nama Lengkap <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                  <input
                    type="text"
                    value={brideFullName}
                    onChange={(e) => setBrideFullName(e.target.value)}
                    placeholder="Lyla Azzahra"
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nama Bapak</label>
                  <input
                    type="text"
                    value={brideFatherName}
                    onChange={(e) => setBrideFatherName(e.target.value)}
                    placeholder="Yusuf"
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Nama Ibu</label>
                  <input
                    type="text"
                    value={brideMotherName}
                    onChange={(e) => setBrideMotherName(e.target.value)}
                    placeholder="Rahayu"
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
              </div>
            </div>

            {/* Akad */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bodoni)",
                  fontSize: "13px",
                  color: "rgba(201,169,110,0.75)",
                  display: "block",
                  marginBottom: "14px",
                  letterSpacing: "0.08em",
                }}
              >
                AKAD
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Tanggal <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                  <input
                    type="date"
                    value={akadDate}
                    onChange={(e) => setAkadDate(e.target.value)}
                    style={inputStyle}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div>
                    <label style={labelStyle}>Waktu Mulai <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                    <input
                      type="time"
                      value={akadStartTime}
                      onChange={(e) => setAkadStartTime(e.target.value)}
                      style={inputStyle}
                      onFocus={focusGold}
                      onBlur={blurGold}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Waktu Selesai</label>
                    <input
                      type="time"
                      value={akadEndTime}
                      onChange={(e) => setAkadEndTime(e.target.value)}
                      style={inputStyle}
                      onFocus={focusGold}
                      onBlur={blurGold}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Lokasi <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                  <textarea
                    value={akadAddress}
                    onChange={(e) => setAkadAddress(e.target.value)}
                    placeholder="Masjid / gedung / alamat lengkap"
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical" as const }}
                    onFocus={focusGold}
                    onBlur={blurGold}
                  />
                </div>
              </div>
            </div>

            {/* Resepsi toggle */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "16px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                <input
                  type="checkbox"
                  checked={hasResepsi}
                  onChange={(e) => setHasResepsi(e.target.checked)}
                  style={{ accentColor: "rgba(201,169,110,0.7)" }}
                />
                Ada acara resepsi
              </label>

              {hasResepsi && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }}>
                  <div>
                    <label style={labelStyle}>Tanggal Resepsi <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                    <input
                      type="date"
                      value={resepsiDate}
                      onChange={(e) => setResepsiDate(e.target.value)}
                      style={inputStyle}
                      onFocus={focusGold}
                      onBlur={blurGold}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={labelStyle}>Waktu Mulai <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                      <input
                        type="time"
                        value={resepsiStartTime}
                        onChange={(e) => setResepsiStartTime(e.target.value)}
                        style={inputStyle}
                        onFocus={focusGold}
                        onBlur={blurGold}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Waktu Selesai</label>
                      <input
                        type="time"
                        value={resepsiEndTime}
                        onChange={(e) => setResepsiEndTime(e.target.value)}
                        style={inputStyle}
                        onFocus={focusGold}
                        onBlur={blurGold}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Lokasi Resepsi <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span></label>
                    <textarea
                      value={resepsiAddress}
                      onChange={(e) => setResepsiAddress(e.target.value)}
                      placeholder="Gedung / alamat lengkap"
                      rows={2}
                      style={{ ...inputStyle, resize: "vertical" as const }}
                      onFocus={focusGold}
                      onBlur={blurGold}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Slug */}
            <div
              style={{
                padding: "14px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                marginBottom: "16px",
              }}
            >
              <label style={labelStyle}>
                Slug URL Undangan <span style={{ color: "rgba(201,169,110,0.7)" }}>*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                placeholder="ali-lyla"
                style={inputStyle}
                onFocus={focusGold}
                onBlur={blurGold}
              />
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.30)",
                  marginTop: "6px",
                }}
              >
                URL undangan Anda akan menjadi: undangan-by-nauka.vercel.app/<span style={{ color: "rgba(201,169,110,0.5)" }}>{slug || "slug"}</span>
              </p>
            </div>

            {submitError && (
              <p
                style={{
                  marginTop: "8px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,150,150,0.85)",
                  textAlign: "center",
                }}
              >
                {submitError}
              </p>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={() => {
                  setSubmitError(null);
                  setStep("pemesan");
                }}
                style={{
                  flex: "0 0 auto",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "transparent",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
              >
                ← Kembali
              </button>
              <button
                onClick={goToReview}
                style={{
                  flex: 1,
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
                Lanjut ke Konfirmasi
              </button>
            </div>
          </div>
        )}

        {/* ════════ STEP 3: REVIEW + WA ════════ */}
        {step === "review" && (
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
                fontSize: "11px",
                color: "rgba(255,255,255,0.40)",
                textAlign: "center",
                marginBottom: "28px",
                lineHeight: 1.6,
              }}
            >
              Cek kembali data di bawah. Setelah yakin, klik tombol WhatsApp untuk mengirim ke Nauka.
            </p>

            <div
              style={{
                padding: "18px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.015)",
                marginBottom: "16px",
              }}
            >
              <ReviewBlock title="Pemesan">
                <ReviewRow k="Nama" v={customerName} />
                <ReviewRow k="WhatsApp" v={customerPhone} />
                {customerEmail && <ReviewRow k="Email" v={customerEmail} />}
              </ReviewBlock>

              <ReviewBlock title="Mempelai Pria">
                <ReviewRow k="Nama Lengkap" v={groomFullName} />
                <ReviewRow k="Putra dari" v={`Bapak ${groomFatherName || "-"} & Ibu ${groomMotherName || "-"}`} />
              </ReviewBlock>

              <ReviewBlock title="Mempelai Wanita">
                <ReviewRow k="Nama Lengkap" v={brideFullName} />
                <ReviewRow k="Putri dari" v={`Bapak ${brideFatherName || "-"} & Ibu ${brideMotherName || "-"}`} />
              </ReviewBlock>

              <ReviewBlock title="Akad">
                <ReviewRow k="Tanggal" v={akadDate} />
                <ReviewRow k="Waktu" v={`${akadStartTime}${akadEndTime ? ` - ${akadEndTime}` : ""}`} />
                <ReviewRow k="Lokasi" v={akadAddress} />
              </ReviewBlock>

              {hasResepsi && (
                <ReviewBlock title="Resepsi">
                  <ReviewRow k="Tanggal" v={resepsiDate} />
                  <ReviewRow k="Waktu" v={`${resepsiStartTime}${resepsiEndTime ? ` - ${resepsiEndTime}` : ""}`} />
                  <ReviewRow k="Lokasi" v={resepsiAddress} />
                </ReviewBlock>
              )}

              <ReviewBlock title="Undangan" last>
                <ReviewRow k="Slug URL" v={slug} />
                <ReviewRow
                  k="URL Final"
                  v={`undangan-by-nauka.vercel.app/${slug}`}
                />
              </ReviewBlock>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setSubmitError(null);
                  setStep("undangan");
                }}
                style={{
                  flex: "0 0 auto",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "transparent",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.55)",
                  cursor: "pointer",
                }}
              >
                ← Edit
              </button>

              <button
                onClick={async () => {
                  setSubmitError(null);
                  setSubmitting(true);
                  try {
                    // ── POST to /api/orders ──
                    // Luna = free tier, price = 0, status awal 'pending_whatsapp'
                    const weddingPayload = {
                      groomFullName, groomFatherName, groomMotherName,
                      brideFullName, brideFatherName, brideMotherName,
                      akadDate, akadStartTime, akadEndTime, akadAddress,
                      hasResepsi,
                      resepsiDate, resepsiStartTime, resepsiEndTime, resepsiAddress,
                      slug,
                    };
                    const res = await fetch("/api/orders", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        template: "luna",
                        package: "free",
                        price: 0,
                        customer_name: customerName.trim(),
                        customer_phone: customerPhone.trim(),
                        customer_email: customerEmail.trim() || undefined,
                        wedding_data: weddingPayload,
                      }),
                    });
                    const data = await res.json();
                    if (!res.ok) {
                      setSubmitError(data.error || "Gagal membuat pesanan. Silakan coba lagi.");
                      setSubmitting(false);
                      return;
                    }
                    setOrderId(data.order_id);

                    // ── Open WhatsApp in new tab ──
                    const waUrl = buildWaUrl(data.order_id);
                    window.open(waUrl, "_blank", "noopener,noreferrer");

                    // ── Move to done state ──
                    setStep("done");
                  } catch (err) {
                    console.error("[luna claim] create order error:", err);
                    setSubmitError("Terjadi kesalahan jaringan. Silakan coba lagi.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                disabled={submitting}
                style={{
                  flex: 1,
                  display: "block",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  background: submitting
                    ? "rgba(247,242,234,0.55)"
                    : "linear-gradient(180deg, rgba(247,242,234,0.96) 0%, rgba(232,226,214,0.92) 100%)",
                  color: "#3A4D3F",
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  textDecoration: "none",
                  boxShadow: "0 4px 18px rgba(247,242,234,0.10)",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                  cursor: submitting ? "not-allowed" : "pointer",
                  border: "none",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "Memproses..." : "Kirim ke WhatsApp →"}
              </button>
            </div>
            {submitError && (
              <p
                style={{
                  marginTop: "14px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,150,150,0.85)",
                  textAlign: "center",
                }}
              >
                {submitError}
              </p>
            )}
          </div>
        )}

        {/* ════════ STEP 4: DONE ════════ */}
        {step === "done" && (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1.3s ease-out 0.2s, transform 1.3s ease-out 0.2s",
              textAlign: "center",
              padding: "32px 20px",
            }}
          >
            {/* Checkmark */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(201,169,110,0.10)",
                border: "1px solid rgba(201,169,110,0.30)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
                fontSize: "28px",
                color: "rgba(201,169,110,0.85)",
              }}
            >
              ✓
            </div>

            <h3
              style={{
                fontFamily: "var(--font-bodoni)",
                fontSize: "22px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.92)",
                marginBottom: "14px",
              }}
            >
              Pesanan Luna Anda Sudah Dikirim
            </h3>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "420px",
                margin: "0 auto 24px",
              }}
            >
              Terima kasih sudah mempercayakan undangan Anda kepada Nauka. Tim kami akan menghubungi Anda melalui WhatsApp di <strong style={{ color: "rgba(201,169,110,0.85)", fontWeight: 500 }}>{customerPhone}</strong> dalam <strong style={{ color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>1×24 jam</strong> untuk konfirmasi dan proses pembuatan undangan.
            </p>

            {/* Ringkasan singkat */}
            <div
              style={{
                padding: "16px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.015)",
                marginBottom: "24px",
                textAlign: "left",
                maxWidth: "420px",
                margin: "0 auto 24px",
              }}
            >
              {orderId && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>No. Pesanan</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.85)", fontWeight: 500 }}>{orderId}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Template</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.80)" }}>Luna (Gratis)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Pemesan</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.80)" }}>{customerName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>Mempelai</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.80)" }}>{groomFullName} & {brideFullName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>URL Undangan</span>
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.75)" }}>.../{slug}</span>
              </div>
            </div>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                maxWidth: "380px",
                margin: "0 auto 28px",
                lineHeight: 1.6,
              }}
            >
              Pastikan WhatsApp Anda aktif dan dapat dihubungi. Jika belum dihubungi dalam 24 jam, jangan ragu untuk chat langsung ke kami.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "420px", margin: "0 auto" }}>
              <a
                href={buildWaUrl(orderId)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  border: "1px solid rgba(201,169,110,0.30)",
                  background: "rgba(201,169,110,0.06)",
                  color: "rgba(201,169,110,0.9)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.45)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(201,169,110,0.30)";
                  e.currentTarget.style.background = "rgba(201,169,110,0.06)";
                }}
              >
                Buka Ulang Pesan WhatsApp
              </a>

              <a
                href="/"
                style={{
                  display: "block",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "transparent",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  textDecoration: "none",
                  transition: "border-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.80)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                Kembali ke Beranda
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Small sub-components ──
function ReviewBlock({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      style={{
        marginBottom: last ? 0 : "16px",
        paddingBottom: last ? 0 : "16px",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.65)",
          display: "block",
          marginBottom: "10px",
        }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

function ReviewRow({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", marginBottom: "6px", gap: "12px" }}>
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.40)",
          flex: "0 0 90px",
        }}
      >
        {k}
      </span>
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "12px",
          color: "rgba(255,255,255,0.80)",
          flex: 1,
        }}
      >
        {v}
      </span>
    </div>
  );
}
