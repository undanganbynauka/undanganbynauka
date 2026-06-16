"use client";

import React, { useState } from "react";

// ════════════════════════════════════════════════════════════════
// OUR JOURNEY — DEFAULT TEXT FROM NAUKA TEMPLATES
// (Celestial/Universal & Sacred/Syar'i)
// ════════════════════════════════════════════════════════════════

const JOURNEY_UNIVERSAL = [
  {
    stage: "Pertemuan",
    desc: "Sebuah awal sederhana yang perlahan menjadi bagian penting dari cerita kami.",
  },
  {
    stage: "Mengenal",
    desc: "Waktu membawa kami untuk saling memahami dan menemukan kenyamanan satu sama lain.",
  },
  {
    stage: "Komitmen",
    desc: "Tumbuh dari keyakinan yang sama untuk melangkah ke arah yang lebih serius.",
  },
  {
    stage: "Hari Bahagia",
    desc: "Hari ketika kami memulai perjalanan baru sebagai satu keluarga, dengan harapan yang sama untuk masa depan.",
  },
];

const JOURNEY_SYARI = [
  {
    stage: "Ta'aruf",
    desc: "Pertemuan pertama yang terasa seperti kenangan lama. Dua jiwa yang tak saling kenal, namun dunia seolah sudah mengatur jalan mereka untuk berpapasan.",
  },
  {
    stage: "Nadzor",
    desc: "Langkah kedua yang penuh kehati-hatian dan keindahan. Masing-masing melihat dengan mata hati, memastikan bahwa perasaan ini bukan sekadar ilusi.",
  },
  {
    stage: "Khitbah",
    desc: "Sebuah janji yang diucapkan dengan penuh keyakinan. Di hadapan keluarga, dua nama resmi disatukan dalam satu ikatan yang suci.",
  },
  {
    stage: "Menikah",
    desc: "Puncak dari segala doa dan harapan. Hari di mana dua jiwa akhirnya menjadi satu, di bawah rahmat dan berkat-Nya.",
  },
];

// ════════════════════════════════════════════════════════════════
// SHARED STYLE TOKENS — match existing Nauka dark cinematic theme
// ════════════════════════════════════════════════════════════════

const sectionLabel = {
  fontFamily: "var(--font-inter)",
  fontSize: "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.25)",
  display: "block",
  marginBottom: "20px",
};

const fieldLabel = {
  fontFamily: "var(--font-inter)",
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "0.04em",
  color: "rgba(255,255,255,0.45)",
  display: "block",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  fontFamily: "var(--font-inter)",
  fontSize: "13px",
  color: "rgba(255,255,255,0.85)",
  outline: "none",
  transition: "border-color 0.3s ease",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  lineHeight: 1.6,
};

const dividerStyle = {
  height: "1px",
  background: "rgba(255,255,255,0.08)",
  margin: "32px 0",
};

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════

export default function CheckoutFormPage() {
  // Template category (default Universal — user bisa pilih)
  const [templateCategory, setTemplateCategory] = useState<"universal" | "syari">("universal");

  // Determine journey stages based on category
  const journeyStages = templateCategory === "syari" ? JOURNEY_SYARI : JOURNEY_UNIVERSAL;

  // ── A. Data Pemesan ──
  const [pemesanNama, setPemesanNama] = useState("");
  const [pemesanWa, setPemesanWa] = useState("");
  const [pemesanEmail, setPemesanEmail] = useState("");

  // ── B. Data Mempelai ──
  const [mempelaiPria, setMempelaiPria] = useState("");
  const [mempelaiWanita, setMempelaiWanita] = useState("");
  const [ayahPria, setAyahPria] = useState("");
  const [ibuPria, setIbuPria] = useState("");
  const [ayahWanita, setAyahWanita] = useState("");
  const [ibuWanita, setIbuWanita] = useState("");
  const [anakKePria, setAnakKePria] = useState("");
  const [anakKeWanita, setAnakKeWanita] = useState("");

  // ── C. Data Acara ──
  const [tanggalAkad, setTanggalAkad] = useState("");
  const [waktuAkad, setWaktuAkad] = useState("");
  const [tempatAkad, setTempatAkad] = useState("");
  const [alamatAkad, setAlamatAkad] = useState("");
  const [tanggalResepsi, setTanggalResepsi] = useState("");
  const [waktuResepsi, setWaktuResepsi] = useState("");
  const [tempatResepsi, setTempatResepsi] = useState("");
  const [alamatResepsi, setAlamatResepsi] = useState("");
  const [linkMaps, setLinkMaps] = useState("");

  // ── D. Our Journey (3-4 stages, pre-filled) ──
  const [journeyData, setJourneyData] = useState(
    JOURNEY_UNIVERSAL.map((j) => ({ stage: j.stage, desc: j.desc, date: "" }))
  );
  const [useFourthStage, setUseFourthStage] = useState(true);

  // ── E. Detail Undangan ──
  const [kalimatPembuka, setKalimatPembuka] = useState("");
  const [quotes, setQuotes] = useState("");

  // ── F. Musik Latar (BGM) ──
  const [bgmChoice, setBgmChoice] = useState("acapella");
  const [bgmReferensi, setBgmReferensi] = useState("");

  // ── G. Custom URL (Premium only) ──
  const [customUrl, setCustomUrl] = useState("");

  // ── H. Rekening + Kado Fisik ──
  const [hadiahMode, setHadiahMode] = useState<"rekening" | "kado" | "both">("rekening");
  const [rekeningNomor, setRekeningNomor] = useState("");
  const [rekeningBank, setRekeningBank] = useState("");
  const [rekeningPemilik, setRekeningPemilik] = useState("");
  const [kadoAlamat, setKadoAlamat] = useState("");
  const [kadoPenerima, setKadoPenerima] = useState("");

  // ── I. Daftar Nama Tamu ──
  const [daftarTamu, setDaftarTamu] = useState("");

  // ── J. Catatan & Pertanyaan ──
  const [catatan, setCatatan] = useState("");

  // ── Submit handler (UI only — no backend) ──
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form pemesanan berhasil diisi. (Demo — backend belum diimplementasikan)");
  };

  // Update journey data when category changes
  const handleCategoryChange = (cat: "universal" | "syari") => {
    setTemplateCategory(cat);
    const newStages = cat === "syari" ? JOURNEY_SYARI : JOURNEY_UNIVERSAL;
    setJourneyData(newStages.map((j) => ({ stage: j.stage, desc: j.desc, date: "" })));
  };

  const updateJourneyField = (idx: number, field: "desc" | "date", value: string) => {
    setJourneyData((prev) => prev.map((j, i) => (i === idx ? { ...j, [field]: value } : j)));
  };

  return (
    <main
      className="nauka-grain relative"
      style={{
        background: "linear-gradient(180deg, #0B1120 0%, #080d1a 100%)",
        minHeight: "100vh",
        padding: "80px 24px",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[640px]">
        {/* ─── HEADER ─── */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(201,169,110,0.55)",
            }}
          >
            Form Pemesanan
          </span>
          <h1
            style={{
              fontFamily: "var(--font-bodoni)",
              fontSize: "28px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: "rgba(255,255,255,0.85)",
              marginTop: "12px",
            }}
          >
            Silakan Lengkapi Data
          </h1>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.35)",
              marginTop: "12px",
            }}
          >
            Isi data berikut dengan benar. Data ini akan digunakan untuk membuat undangan digital Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ════════════════════════════════════════════════ */}
          {/* A. DATA PEMESAN */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>A. Data Pemesan</span>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nama Lengkap Pemesan *</label>
              <input
                type="text"
                required
                value={pemesanNama}
                onChange={(e) => setPemesanNama(e.target.value)}
                placeholder="Masukkan nama lengkap"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nomor WhatsApp Aktif *</label>
              <input
                type="tel"
                required
                value={pemesanWa}
                onChange={(e) => setPemesanWa(e.target.value)}
                placeholder="08xxxxxxxxxx"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Email (Opsional)</label>
              <input
                type="email"
                value={pemesanEmail}
                onChange={(e) => setPemesanEmail(e.target.value)}
                placeholder="email@contoh.com"
                style={inputStyle}
              />
            </div>
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* B. DATA MEMPELAI */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>B. Data Mempelai</span>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nama Mempelai Pria *</label>
              <input
                type="text"
                required
                value={mempelaiPria}
                onChange={(e) => setMempelaiPria(e.target.value)}
                placeholder="Nama lengkap mempelai pria"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nama Mempelai Wanita *</label>
              <input
                type="text"
                required
                value={mempelaiWanita}
                onChange={(e) => setMempelaiWanita(e.target.value)}
                placeholder="Nama lengkap mempelai wanita"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nama Ayah Mempelai Pria *</label>
              <input
                type="text"
                required
                value={ayahPria}
                onChange={(e) => setAyahPria(e.target.value)}
                placeholder="Bpk. ..."
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nama Ibu Mempelai Pria *</label>
              <input
                type="text"
                required
                value={ibuPria}
                onChange={(e) => setIbuPria(e.target.value)}
                placeholder="Ibu. ..."
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nama Ayah Mempelai Wanita *</label>
              <input
                type="text"
                required
                value={ayahWanita}
                onChange={(e) => setAyahWanita(e.target.value)}
                placeholder="Bpk. ..."
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Nama Ibu Mempelai Wanita *</label>
              <input
                type="text"
                required
                value={ibuWanita}
                onChange={(e) => setIbuWanita(e.target.value)}
                placeholder="Ibu. ..."
                style={inputStyle}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={fieldLabel}>Anak ke-berapa Pria (Opsional)</label>
                <input
                  type="text"
                  value={anakKePria}
                  onChange={(e) => setAnakKePria(e.target.value)}
                  placeholder="Pertama / Kedua / ..."
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={fieldLabel}>Anak ke-berapa Wanita (Opsional)</label>
                <input
                  type="text"
                  value={anakKeWanita}
                  onChange={(e) => setAnakKeWanita(e.target.value)}
                  placeholder="Pertama / Kedua / ..."
                  style={inputStyle}
                />
              </div>
            </div>
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* C. DATA ACARA */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>C. Data Acara — Akad</span>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <label style={fieldLabel}>Tanggal Akad *</label>
                <input
                  type="date"
                  required
                  value={tanggalAkad}
                  onChange={(e) => setTanggalAkad(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={fieldLabel}>Waktu Akad *</label>
                <input
                  type="text"
                  required
                  value={waktuAkad}
                  onChange={(e) => setWaktuAkad(e.target.value)}
                  placeholder="08:00 - 10:00"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Tempat Akad *</label>
              <input
                type="text"
                required
                value={tempatAkad}
                onChange={(e) => setTempatAkad(e.target.value)}
                placeholder="Nama gedung / rumah"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={fieldLabel}>Alamat Lengkap Akad *</label>
              <textarea
                required
                value={alamatAkad}
                onChange={(e) => setAlamatAkad(e.target.value)}
                placeholder="Alamat lengkap tempat akad"
                rows={2}
                style={textareaStyle}
              />
            </div>

            <span style={sectionLabel}>C. Data Acara — Resepsi</span>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div>
                <label style={fieldLabel}>Tanggal Resepsi *</label>
                <input
                  type="date"
                  required
                  value={tanggalResepsi}
                  onChange={(e) => setTanggalResepsi(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={fieldLabel}>Waktu Resepsi *</label>
                <input
                  type="text"
                  required
                  value={waktuResepsi}
                  onChange={(e) => setWaktuResepsi(e.target.value)}
                  placeholder="11:00 - 14:00"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Tempat Resepsi *</label>
              <input
                type="text"
                required
                value={tempatResepsi}
                onChange={(e) => setTempatResepsi(e.target.value)}
                placeholder="Nama gedung / rumah"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Alamat Lengkap Resepsi *</label>
              <textarea
                required
                value={alamatResepsi}
                onChange={(e) => setAlamatResepsi(e.target.value)}
                placeholder="Alamat lengkap tempat resepsi"
                rows={2}
                style={textareaStyle}
              />
            </div>

            <div>
              <label style={fieldLabel}>Link Google Maps (Opsional)</label>
              <input
                type="url"
                value={linkMaps}
                onChange={(e) => setLinkMaps(e.target.value)}
                placeholder="https://maps.google.com/..."
                style={inputStyle}
              />
            </div>
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* D. OUR JOURNEY */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>D. Our Journey</span>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.30)",
                marginBottom: "20px",
              }}
            >
              Pilih kategori template untuk menentukan tahapan perjalanan. Deskripsi sudah diisi
              otomatis dengan teks default Nauka — Anda bisa edit atau biarkan default.
            </p>

            {/* Category selector */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
              {(["universal", "syari"] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    flex: 1,
                    padding: "12px",
                    borderRadius: "10px",
                    border:
                      templateCategory === cat
                        ? "1px solid rgba(201,169,110,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                    background:
                      templateCategory === cat ? "rgba(201,169,110,0.05)" : "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    color:
                      templateCategory === cat
                        ? "rgba(201,169,110,0.85)"
                        : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {cat === "universal" ? "Universal (Celestial)" : "Syar'i (Sacred)"}
                </button>
              ))}
            </div>

            {/* 4th stage toggle */}
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                <input
                  type="checkbox"
                  checked={useFourthStage}
                  onChange={(e) => setUseFourthStage(e.target.checked)}
                  style={{ accentColor: "rgba(201,169,110,0.6)" }}
                />
                Tampilkan stage ke-4 ({journeyStages[3].stage})
              </label>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.20)",
                  marginTop: "6px",
                  marginLeft: "24px",
                }}
              >
                Hilangkan centang jika hanya ingin 3 stage
              </p>
            </div>

            {/* Journey stages */}
            {(useFourthStage ? journeyData : journeyData.slice(0, 3)).map((stage, idx) => (
              <div
                key={idx}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.015)",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bodoni)",
                    fontSize: "16px",
                    color: "rgba(201,169,110,0.85)",
                    marginBottom: "14px",
                  }}
                >
                  Stage {idx + 1}: {stage.stage}
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={fieldLabel}>Tanggal (Opsional)</label>
                  <input
                    type="text"
                    value={stage.date}
                    onChange={(e) => updateJourneyField(idx, "date", e.target.value)}
                    placeholder="Maret 2026 / 12 Maret 2026"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={fieldLabel}>Deskripsi</label>
                  <textarea
                    value={stage.desc}
                    onChange={(e) => updateJourneyField(idx, "desc", e.target.value)}
                    rows={3}
                    style={textareaStyle}
                  />
                </div>
              </div>
            ))}
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* E. DETAIL UNDANGAN */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>E. Detail Undangan</span>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.20)",
                marginBottom: "16px",
              }}
            >
              Catatan: Kalimat pembuka hanya untuk template Universal. Sacred & Celestial memakai
              default dari template.
            </p>

            <div style={{ marginBottom: "16px" }}>
              <label style={fieldLabel}>Kalimat Pembuka (Opsional — Universal only)</label>
              <textarea
                value={kalimatPembuka}
                onChange={(e) => setKalimatPembuka(e.target.value)}
                placeholder="Dengan memohon rahmat dan ridha Allah..."
                rows={3}
                style={textareaStyle}
              />
            </div>

            <div>
              <label style={fieldLabel}>Quotes / Ayat Favorit (Opsional)</label>
              <textarea
                value={quotes}
                onChange={(e) => setQuotes(e.target.value)}
                placeholder="Dan di antara tanda-tanda kekuasaan-Nya..."
                rows={3}
                style={textareaStyle}
              />
            </div>
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* F. MUSIK LATAR (BGM) */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>F. Musik Latar (BGM)</span>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.20)",
                marginBottom: "16px",
              }}
            >
              Catatan: Nauka hanya menggunakan VOCAL ONLY (acapella, nasyid) atau suara alam.
              Tidak ada musik instrumental.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
              {[
                { value: "acapella", label: "Acapella" },
                { value: "nasyid", label: "Nasyid (vocal only)" },
                { value: "suara-alam", label: "Suara Alam" },
                { value: "tanpa-musik", label: "Tidak pakai musik" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setBgmChoice(opt.value)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border:
                      bgmChoice === opt.value
                        ? "1px solid rgba(201,169,110,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                    background:
                      bgmChoice === opt.value ? "rgba(201,169,110,0.05)" : "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "12px",
                    color: bgmChoice === opt.value ? "rgba(201,169,110,0.85)" : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "left" as const,
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div>
              <label style={fieldLabel}>Referensi Musik Sendiri (Opsional)</label>
              <input
                type="text"
                value={bgmReferensi}
                onChange={(e) => setBgmReferensi(e.target.value)}
                placeholder="Judul lagu / referensi sendiri"
                style={inputStyle}
              />
            </div>
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* G. CUSTOM URL (Premium only) */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>G. Custom URL (Premium only)</span>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.20)",
                marginBottom: "16px",
              }}
            >
              Khusus paket Premium. Basic menggunakan URL standar.
            </p>

            <label style={fieldLabel}>Request Nama URL Personal</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  padding: "0 12px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                  whiteSpace: "nowrap",
                }}
              >
                nauka.id/
              </span>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="aisyah-fauzan"
                style={{
                  ...inputStyle,
                  border: "none",
                  borderRadius: 0,
                  flex: 1,
                }}
              />
            </div>
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* H. REKENING + KADO FISIK */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>H. Data Rekening + Kado Fisik</span>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.20)",
                marginBottom: "16px",
              }}
            >
              Pilih metode hadiah untuk tamu. Bisa rekening, alamat kado, atau dua-duanya.
            </p>

            {/* Mode selector */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
              {([
                { value: "rekening", label: "Rekening" },
                { value: "kado", label: "Kado Fisik" },
                { value: "both", label: "Dua-duanya" },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setHadiahMode(opt.value)}
                  style={{
                    padding: "10px 8px",
                    borderRadius: "8px",
                    border:
                      hadiahMode === opt.value
                        ? "1px solid rgba(201,169,110,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                    background:
                      hadiahMode === opt.value ? "rgba(201,169,110,0.05)" : "rgba(255,255,255,0.02)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    color: hadiahMode === opt.value ? "rgba(201,169,110,0.85)" : "rgba(255,255,255,0.45)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Rekening fields */}
            {(hadiahMode === "rekening" || hadiahMode === "both") && (
              <div
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.015)",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "rgba(201,169,110,0.55)",
                    marginBottom: "12px",
                  }}
                >
                  REKENING BANK
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={fieldLabel}>Nomor Rekening</label>
                    <input
                      type="text"
                      value={rekeningNomor}
                      onChange={(e) => setRekeningNomor(e.target.value)}
                      placeholder="1234567890"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={fieldLabel}>Nama Bank</label>
                    <input
                      type="text"
                      value={rekeningBank}
                      onChange={(e) => setRekeningBank(e.target.value)}
                      placeholder="BCA / Mandiri / BNI"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={fieldLabel}>Nama Pemilik Rekening</label>
                  <input
                    type="text"
                    value={rekeningPemilik}
                    onChange={(e) => setRekeningPemilik(e.target.value)}
                    placeholder="A.n. Nama Lengkap"
                    style={inputStyle}
                  />
                </div>
              </div>
            )}

            {/* Kado fields */}
            {(hadiahMode === "kado" || hadiahMode === "both") && (
              <div
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "rgba(201,169,110,0.55)",
                    marginBottom: "12px",
                  }}
                >
                  ALAMAT KADO FISIK
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={fieldLabel}>Nama Penerima</label>
                  <input
                    type="text"
                    value={kadoPenerima}
                    onChange={(e) => setKadoPenerima(e.target.value)}
                    placeholder="Nama penerima kado"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={fieldLabel}>Alamat Lengkap Pengiriman</label>
                  <textarea
                    value={kadoAlamat}
                    onChange={(e) => setKadoAlamat(e.target.value)}
                    placeholder="Jl. ... No. ... RT/RW ... Kelurahan ... Kecamatan ... Kota ... Kode Pos"
                    rows={3}
                    style={textareaStyle}
                  />
                </div>
              </div>
            )}
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* I. DAFTAR NAMA TAMU */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>I. Daftar Nama Tamu</span>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.20)",
                marginBottom: "16px",
              }}
            >
              Masukkan nama tamu, satu nama per baris. Tidak dibatasi jumlahnya.
              <br />
              Format: Bapak Nama / Bang Nama / Saudara Nama / Ibu Nama / Kak Nama
            </p>

            <textarea
              value={daftarTamu}
              onChange={(e) => setDaftarTamu(e.target.value)}
              placeholder={"Bapak Andi\nBang Hendra\nSaudara Fauzan\nIbu Siti\nKak Sarah"}
              rows={6}
              style={textareaStyle}
            />
          </section>

          <div style={dividerStyle} />

          {/* ════════════════════════════════════════════════ */}
          {/* J. CATATAN & PERTANYAAN */}
          {/* ════════════════════════════════════════════════ */}
          <section>
            <span style={sectionLabel}>J. Catatan & Pertanyaan</span>

            <label style={fieldLabel}>Catatan Khusus / Pertanyaan (Opsional)</label>
            <textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Tulis request khusus atau pertanyaan untuk Nauka..."
              rows={4}
              style={textareaStyle}
            />
          </section>

          {/* ─── SUBMIT BUTTON ─── */}
          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "14px 40px",
                borderRadius: "999px",
                border: "1px solid rgba(201,169,110,0.4)",
                background: "rgba(201,169,110,0.08)",
                fontFamily: "var(--font-inter)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "rgba(201,169,110,0.95)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,169,110,0.15)";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(201,169,110,0.08)";
                e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)";
              }}
            >
              Kirim Pemesanan
            </button>

            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "10px",
                color: "rgba(255,255,255,0.15)",
                marginTop: "20px",
                letterSpacing: "0.06em",
              }}
            >
              Nauka — Form Pemesanan
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
