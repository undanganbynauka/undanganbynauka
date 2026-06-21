"use client";

import React, { useState } from "react";

interface FormDataUndanganProps {
  template: "sacred" | "celestial";
  /** Dipanggil saat user klik submit dengan data yang sudah tervalidasi. */
  onSubmit: (data: WeddingData) => void;
  /** Label tombol submit. Default: "Lanjut ke Ringkasan". */
  submitLabel?: string;
  /** Parent sedang memproses POST order (untuk disabled state). */
  submitting?: boolean;
}

// ── Default journey berdasarkan template ──
const SACRED_JOURNEY_DEFAULT = [
  { title: "Ta'aruf", date: "Maret 2026", desc: "Pertemuan pertama yang terasa seperti kenangan lama. Dua jiwa yang tak saling kenal, namun dunia seolah sudah mengatur jalan mereka untuk berpapasan." },
  { title: "Nadzor", date: "Maret 2026", desc: "Langkah kedua yang penuh kehati-hatian dan keindahan. Masing-masing melihat dengan mata hati, memastikan bahwa perasaan ini bukan sekadar ilusi." },
  { title: "Khitbah", date: "Juni 2026", desc: "Sebuah janji yang diucapkan dengan penuh keyakinan. Di hadapan keluarga, dua nama resmi disatukan dalam satu ikatan yang suci." },
  { title: "Menikah", date: "Desember 2026", desc: "Puncak dari segala doa dan harapan. Hari di mana dua jiwa akhirnya menjadi satu, di bawah rahmat dan berkat-Nya." },
];

const CELESTIAL_JOURNEY_DEFAULT = [
  { title: "Pertemuan", desc: "Sebuah awal sederhana yang perlahan menjadi bagian penting dari cerita kami." },
  { title: "Mengenal", desc: "Waktu membawa kami untuk saling memahami dan menemukan kenyamanan satu sama lain." },
  { title: "Komitmen", desc: "Tumbuh dari keyakinan yang sama untuk melangkah ke arah yang lebih serius." },
  { title: "Hari Bahagia", desc: "Hari ketika kami memulai perjalanan baru sebagai satu keluarga, dengan harapan yang sama untuk masa depan." },
];

const BGM_OPTIONS = [
  { value: "vocal_only", label: "Nasyid/lagu tanpa musik (vocal only)" },
  { value: "acapella", label: "Acapella" },
  { value: "sound_alam", label: "Sound alam" },
  { value: "hening", label: "Hening (tidak ada musik)" },
];

type BgmType = "vocal_only" | "acapella" | "sound_alam" | "hening";

interface JourneyPhase {
  title: string;
  date?: string;
  desc: string;
}

interface TimelineEvent {
  date: string;
  event: string;
}

export interface WeddingData {
  // Section B: Mempelai
  groomFullName: string;
  groomNickname: string;
  groomFatherName: string;
  groomMotherName: string;
  groomBirthOrder: string;
  brideFullName: string;
  brideNickname: string;
  brideFatherName: string;
  brideMotherName: string;
  brideBirthOrder: string;

  // Section C: Akad
  akadDate: string;
  akadStartTime: string;
  akadEndTime: string;
  akadAddress: string;
  akadMapsLink: string;
  akadCity: string;

  // Section D: Resepsi
  hasResepsi: boolean;
  resepsiDate: string;
  resepsiStartTime: string;
  resepsiEndTime: string;
  resepsiAddress: string;
  resepsiMapsLink: string;
  resepsiCity: string;

  // Section E: Konfigurasi
  slug: string;
  quote: string;
  openingMessage: string;
  bgmType: BgmType;
  bgmVocalOnlyNote: string;

  // Section F: Konfigurasi tambahan
  journey: JourneyPhase[];
  timelineEvents: TimelineEvent[];

  // Section G: Catatan
  adminNote: string;
  additionalRequest: string;

  // Section H: Kado
  groomBank: string;
  groomRekening: string;
  groomAn: string;
  brideBank: string;
  brideRekening: string;
  brideAn: string;
  giftRecipientName: string;
  giftAddress: string;
}

const initialData: WeddingData = {
  groomFullName: "",
  groomNickname: "",
  groomFatherName: "",
  groomMotherName: "",
  groomBirthOrder: "",
  brideFullName: "",
  brideNickname: "",
  brideFatherName: "",
  brideMotherName: "",
  brideBirthOrder: "",
  akadDate: "",
  akadStartTime: "",
  akadEndTime: "",
  akadAddress: "",
  akadMapsLink: "",
  akadCity: "",
  hasResepsi: false,
  resepsiDate: "",
  resepsiStartTime: "",
  resepsiEndTime: "",
  resepsiAddress: "",
  resepsiMapsLink: "",
  resepsiCity: "",
  slug: "",
  quote: "",
  openingMessage: "",
  bgmType: "hening",
  bgmVocalOnlyNote: "",
  journey: [],
  timelineEvents: [],
  adminNote: "",
  additionalRequest: "",
  groomBank: "",
  groomRekening: "",
  groomAn: "",
  brideBank: "",
  brideRekening: "",
  brideAn: "",
  giftRecipientName: "",
  giftAddress: "",
};

// ───────────────────────────────────────────────────────────────
// Reusable input components
// ───────────────────────────────────────────────────────────────
function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label
      style={{
        fontFamily: "var(--font-inter)",
        fontSize: "11px",
        color: "rgba(255,255,255,0.55)",
        display: "block",
        marginBottom: "6px",
      }}
    >
      {children} {required && <span style={{ color: "rgba(201,169,110,0.8)" }}>*</span>}
    </label>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { style, ...rest } = props;
  return (
    <input
      {...rest}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        fontFamily: "var(--font-inter)",
        fontSize: "12px",
        color: "rgba(255,255,255,0.85)",
        outline: "none",
        transition: "border-color 0.3s ease, background 0.3s ease",
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
        e.currentTarget.style.background = "rgba(201,169,110,0.03)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        props.onBlur?.(e);
      }}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { style, ...rest } = props;
  return (
    <textarea
      {...rest}
      style={{
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.02)",
        fontFamily: "var(--font-inter)",
        fontSize: "12px",
        color: "rgba(255,255,255,0.85)",
        outline: "none",
        transition: "border-color 0.3s ease, background 0.3s ease",
        resize: "vertical",
        minHeight: "70px",
        ...style,
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "rgba(201,169,110,0.25)";
        e.currentTarget.style.background = "rgba(201,169,110,0.03)";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        props.onBlur?.(e);
      }}
    />
  );
}

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(201,169,110,0.6)",
          display: "block",
          marginBottom: "4px",
        }}
      >
        Section {number}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-bodoni)",
          fontSize: "16px",
          fontWeight: 400,
          letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {title}
      </h3>
    </div>
  );
}

function SectionDivider() {
  return (
    <div
      style={{
        height: "1px",
        background: "rgba(255,255,255,0.06)",
        margin: "32px 0",
      }}
    />
  );
}

// ───────────────────────────────────────────────────────────────
// Main component
// ───────────────────────────────────────────────────────────────
export function NaukaFormDataUndangan({
  template,
  onSubmit,
  submitLabel = "Lanjut ke Ringkasan",
  submitting = false,
}: FormDataUndanganProps) {
  const [data, setData] = useState<WeddingData>({
    ...initialData,
    journey: template === "sacred" ? SACRED_JOURNEY_DEFAULT.map((p) => ({ ...p })) : CELESTIAL_JOURNEY_DEFAULT.map((p) => ({ ...p })),
  });
  // `submitting` sekarang prop dari parent — parent yang tahu kapan
  // POST /api/orders sedang berlangsung (transisi Review → Pembayaran).
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [useDefaultJourney, setUseDefaultJourney] = useState(true);

  function update<K extends keyof WeddingData>(key: K, value: WeddingData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function updateJourneyPhase(index: number, field: keyof JourneyPhase, value: string) {
    setData((prev) => {
      const newJourney = [...prev.journey];
      newJourney[index] = { ...newJourney[index], [field]: value };
      return { ...prev, journey: newJourney };
    });
  }

  function addTimelineEvent() {
    setData((prev) => ({
      ...prev,
      timelineEvents: [...prev.timelineEvents, { date: "", event: "" }],
    }));
  }

  function removeTimelineEvent(index: number) {
    setData((prev) => ({
      ...prev,
      timelineEvents: prev.timelineEvents.filter((_, i) => i !== index),
    }));
  }

  function updateTimelineEvent(index: number, field: keyof TimelineEvent, value: string) {
    setData((prev) => {
      const newEvents = [...prev.timelineEvents];
      newEvents[index] = { ...newEvents[index], [field]: value };
      return { ...prev, timelineEvents: newEvents };
    });
  }

  function resetJourneyToDefault() {
    const defaultJourney = template === "sacred" ? SACRED_JOURNEY_DEFAULT : CELESTIAL_JOURNEY_DEFAULT;
    setData((prev) => ({ ...prev, journey: defaultJourney.map((p) => ({ ...p })) }));
    setUseDefaultJourney(true);
  }

  // ── Validation ──
  function validate(): string | null {
    if (!data.groomFullName.trim()) return "Nama lengkap mempelai pria wajib diisi.";
    if (!data.brideFullName.trim()) return "Nama lengkap mempelai wanita wajib diisi.";
    if (!data.akadDate) return "Tanggal akad wajib diisi.";
    if (!data.akadStartTime) return "Waktu mulai akad wajib diisi.";
    if (!data.akadAddress.trim()) return "Alamat lokasi akad wajib diisi.";
    if (!data.slug.trim()) return "Slug undangan wajib diisi.";
    if (!/^[a-z0-9-]+$/.test(data.slug.trim())) return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
    return null;
  }

  // ── Submit ──
  // Catatan: Tidak ada lagi PATCH ke /api/orders/[id] di sini.
  // Data dikirim ke parent (NaukaCheckout) yang akan menyertakannya
  // saat POST /api/orders pada transisi Review → Pembayaran.
  // Pembukaan WhatsApp juga dipindahkan ke step "done" di parent,
  // dipicu eksplisit oleh user lewat tombol, bukan auto-open.
  async function handleSubmit() {
    setSubmitError(null);
    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      // Kirim snapshot data ke parent. Parent yang menentukan langkah
      // berikutnya (POST order, pindah ke step review, dst).
      // Clone agar parent tidak bisa mutate state internal form ini.
      onSubmit({ ...data, journey: data.journey.map((p) => ({ ...p })), timelineEvents: data.timelineEvents.map((e) => ({ ...e })) });
    } catch (err) {
      console.error("[form data] submit error:", err);
      setSubmitError("Terjadi kesalahan. Silakan coba lagi.");
    }
  }

  // ─────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        marginTop: "32px",
        padding: "28px 24px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.015)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h3
          style={{
            fontFamily: "var(--font-bodoni)",
            fontSize: "18px",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          Data Undangan
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            color: "rgba(255,255,255,0.40)",
            marginTop: "6px",
            lineHeight: 1.6,
          }}
        >
          Isi data berikut untuk dipublikasikan di undangan Anda. Field bertanda * wajib diisi.
        </p>
      </div>

      {/* ──────────────── SECTION B: DATA MEMPELAI ──────────────── */}
      <SectionTitle number="B" title="Data Mempelai" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Mempelai Pria</p>
        <div>
          <FieldLabel required>Nama lengkap (bin ...)</FieldLabel>
          <TextInput value={data.groomFullName} onChange={(e) => update("groomFullName", e.target.value)} placeholder="Muhammad Ali Akbar bin Ahmad Akbar" />
        </div>
        <div>
          <FieldLabel>Nama panggilan</FieldLabel>
          <TextInput value={data.groomNickname} onChange={(e) => update("groomNickname", e.target.value)} placeholder="Ali" />
        </div>
        <div>
          <FieldLabel>Nama ayah</FieldLabel>
          <TextInput value={data.groomFatherName} onChange={(e) => update("groomFatherName", e.target.value)} placeholder="Ahmad Akbar" />
        </div>
        <div>
          <FieldLabel>Nama ibu</FieldLabel>
          <TextInput value={data.groomMotherName} onChange={(e) => update("groomMotherName", e.target.value)} placeholder="Fatimah" />
        </div>
        <div>
          <FieldLabel>Urutan anak</FieldLabel>
          <TextInput value={data.groomBirthOrder} onChange={(e) => update("groomBirthOrder", e.target.value)} placeholder="Putra ke-2" />
        </div>

        <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "8px" }}>Mempelai Wanita</p>
        <div>
          <FieldLabel required>Nama lengkap (binti ...)</FieldLabel>
          <TextInput value={data.brideFullName} onChange={(e) => update("brideFullName", e.target.value)} placeholder="Lyla Azzahra binti Yusuf Rahman" />
        </div>
        <div>
          <FieldLabel>Nama panggilan</FieldLabel>
          <TextInput value={data.brideNickname} onChange={(e) => update("brideNickname", e.target.value)} placeholder="Lyla" />
        </div>
        <div>
          <FieldLabel>Nama ayah</FieldLabel>
          <TextInput value={data.brideFatherName} onChange={(e) => update("brideFatherName", e.target.value)} placeholder="Yusuf Rahman" />
        </div>
        <div>
          <FieldLabel>Nama ibu</FieldLabel>
          <TextInput value={data.brideMotherName} onChange={(e) => update("brideMotherName", e.target.value)} placeholder="Khadijah" />
        </div>
        <div>
          <FieldLabel>Urutan anak</FieldLabel>
          <TextInput value={data.brideBirthOrder} onChange={(e) => update("brideBirthOrder", e.target.value)} placeholder="Putri ke-1" />
        </div>
      </div>

      <SectionDivider />

      {/* ──────────────── SECTION C: ACARA AKAD ──────────────── */}
      <SectionTitle number="C" title="Acara Akad" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <FieldLabel required>Tanggal akad</FieldLabel>
          <TextInput type="date" value={data.akadDate} onChange={(e) => update("akadDate", e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <FieldLabel required>Waktu mulai</FieldLabel>
            <TextInput type="time" value={data.akadStartTime} onChange={(e) => update("akadStartTime", e.target.value)} />
          </div>
          <div>
            <FieldLabel>Waktu selesai</FieldLabel>
            <TextInput type="time" value={data.akadEndTime} onChange={(e) => update("akadEndTime", e.target.value)} />
          </div>
        </div>
        <div>
          <FieldLabel required>Alamat lokasi akad</FieldLabel>
          <TextArea value={data.akadAddress} onChange={(e) => update("akadAddress", e.target.value)} placeholder="Masjid Al-Hijri, Jl. Cendana No. 12, Jakarta" />
        </div>
        <div>
          <FieldLabel>Link Google Maps akad</FieldLabel>
          <TextInput type="url" value={data.akadMapsLink} onChange={(e) => update("akadMapsLink", e.target.value)} placeholder="https://maps.app.goo.gl/xxx" />
        </div>
        <div>
          <FieldLabel>Kota akad</FieldLabel>
          <TextInput value={data.akadCity} onChange={(e) => update("akadCity", e.target.value)} placeholder="Jakarta Selatan" />
        </div>
      </div>

      <SectionDivider />

      {/* ──────────────── SECTION D: ACARA RESEPSI ──────────────── */}
      <SectionTitle number="D" title="Acara Resepsi (opsional)" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            padding: "12px 14px",
            borderRadius: "8px",
            border: data.hasResepsi ? "1px solid rgba(201,169,110,0.20)" : "1px solid rgba(255,255,255,0.08)",
            background: data.hasResepsi ? "rgba(201,169,110,0.03)" : "transparent",
            transition: "border-color 0.3s ease, background 0.3s ease",
          }}
        >
          <input
            type="checkbox"
            checked={data.hasResepsi}
            onChange={(e) => update("hasResepsi", e.target.checked)}
            style={{ cursor: "pointer" }}
          />
          <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
            Ada acara resepsi
          </span>
        </label>

        {data.hasResepsi && (
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "8px", paddingLeft: "4px", borderLeft: "2px solid rgba(201,169,110,0.10)" }}>
            <div>
              <FieldLabel>Tanggal resepsi</FieldLabel>
              <TextInput type="date" value={data.resepsiDate} onChange={(e) => update("resepsiDate", e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <FieldLabel>Waktu mulai</FieldLabel>
                <TextInput type="time" value={data.resepsiStartTime} onChange={(e) => update("resepsiStartTime", e.target.value)} />
              </div>
              <div>
                <FieldLabel>Waktu selesai</FieldLabel>
                <TextInput type="time" value={data.resepsiEndTime} onChange={(e) => update("resepsiEndTime", e.target.value)} />
              </div>
            </div>
            <div>
              <FieldLabel>Alamat lokasi resepsi</FieldLabel>
              <TextArea value={data.resepsiAddress} onChange={(e) => update("resepsiAddress", e.target.value)} placeholder="Ballroom Hotel Aston, Jl. Sudirman, Jakarta" />
            </div>
            <div>
              <FieldLabel>Link Google Maps resepsi</FieldLabel>
              <TextInput type="url" value={data.resepsiMapsLink} onChange={(e) => update("resepsiMapsLink", e.target.value)} placeholder="https://maps.app.goo.gl/yyy" />
            </div>
            <div>
              <FieldLabel>Kota resepsi</FieldLabel>
              <TextInput value={data.resepsiCity} onChange={(e) => update("resepsiCity", e.target.value)} placeholder="Jakarta Selatan" />
            </div>
          </div>
        )}
      </div>

      <SectionDivider />

      {/* ──────────────── SECTION E: KONFIGURASI UNDANGAN ──────────────── */}
      <SectionTitle number="E" title="Konfigurasi Undangan" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <FieldLabel required>Slug undangan</FieldLabel>
          <TextInput value={data.slug} onChange={(e) => update("slug", e.target.value.toLowerCase())} placeholder="ali-lyla" />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.30)", marginTop: "4px" }}>
            URL undangan: undanganbynauka.vercel.app/{data.slug || "[slug]"}
          </p>
        </div>
        <div>
          <FieldLabel>Quote / ayat utama</FieldLabel>
          <TextArea value={data.quote} onChange={(e) => update("quote", e.target.value)} placeholder="Dan di antara tanda-tanda kekuasaan-Nya..." />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.30)", marginTop: "4px" }}>
            Kosongkan untuk pakai default template.
          </p>
        </div>
        <div>
          <FieldLabel>Pesan opening</FieldLabel>
          <TextArea value={data.openingMessage} onChange={(e) => update("openingMessage", e.target.value)} placeholder="Dengan memohon rahmat dan ridha Allah..." />
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.30)", marginTop: "4px" }}>
            Kosongkan untuk pakai default template.
          </p>
        </div>
        <div>
          <FieldLabel>BGM / musik latar</FieldLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {BGM_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: data.bgmType === opt.value ? "1px solid rgba(201,169,110,0.20)" : "1px solid rgba(255,255,255,0.08)",
                  background: data.bgmType === opt.value ? "rgba(201,169,110,0.03)" : "transparent",
                  transition: "border-color 0.3s ease, background 0.3s ease",
                }}
              >
                <input
                  type="radio"
                  name="bgm"
                  checked={data.bgmType === opt.value}
                  onChange={() => update("bgmType", opt.value as BgmType)}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ fontFamily: "var(--font-inter)", fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
        {data.bgmType === "vocal_only" && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "8px",
              border: "1px dashed rgba(201,169,110,0.20)",
              background: "rgba(201,169,110,0.03)",
            }}
          >
            <FieldLabel>Referensi lagu (vocal only)</FieldLabel>
            <TextArea value={data.bgmVocalOnlyNote} onChange={(e) => update("bgmVocalOnlyNote", e.target.value)} placeholder="Sebutkan referensi lagu/nasyid yang diinginkan (misal: 'Mawlaya - Maher Zain', 'For the Rest of My Life', dll). Kami akan carikan versi vocal only yang sesuai." />
          </div>
        )}
      </div>

      <SectionDivider />

      {/* ──────────────── SECTION F: KISAH PERJALANAN ──────────────── */}
      <SectionTitle number="F" title={`Kisah Perjalanan (${template === "sacred" ? "Syar'i" : "Universal"})`} />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div
          style={{
            padding: "10px 12px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            fontSize: "11px",
            fontFamily: "var(--font-inter)",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
          }}
        >
          Journey sudah diisi dengan default template. Anda bisa edit tiap phase, atau reset ke default.
        </div>

        <button
          onClick={resetJourneyToDefault}
          disabled={useDefaultJourney}
          style={{
            alignSelf: "flex-start",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(201,169,110,0.15)",
            background: "transparent",
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            color: useDefaultJourney ? "rgba(201,169,110,0.3)" : "rgba(201,169,110,0.7)",
            cursor: useDefaultJourney ? "default" : "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Reset ke default template
        </button>

        {data.journey.map((phase, i) => (
          <div
            key={i}
            style={{
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(201,169,110,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "10px" }}>
              Phase {i + 1}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div>
                <FieldLabel>Judul phase</FieldLabel>
                <TextInput
                  value={phase.title}
                  onChange={(e) => {
                    updateJourneyPhase(i, "title", e.target.value);
                    setUseDefaultJourney(false);
                  }}
                  placeholder="Judul phase (mis. Ta'aruf)"
                />
              </div>
              {template === "sacred" && (
                <div>
                  <FieldLabel>Tanggal / bulan-tahun</FieldLabel>
                  <TextInput
                    value={phase.date || ""}
                    onChange={(e) => {
                      updateJourneyPhase(i, "date", e.target.value);
                      setUseDefaultJourney(false);
                    }}
                    placeholder="Maret 2026"
                  />
                </div>
              )}
              <div>
                <FieldLabel>Deskripsi</FieldLabel>
                <TextArea
                  value={phase.desc}
                  onChange={(e) => {
                    updateJourneyPhase(i, "desc", e.target.value);
                    setUseDefaultJourney(false);
                  }}
                  placeholder="Deskripsi singkat phase ini..."
                />
              </div>
            </div>
          </div>
        ))}

        {/* Timeline events (optional) */}
        <div style={{ marginTop: "8px" }}>
          <FieldLabel>Tanggal-tanggal penting (opsional)</FieldLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {data.timelineEvents.map((evt, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: "8px", alignItems: "start" }}>
                <TextInput type="date" value={evt.date} onChange={(e) => updateTimelineEvent(i, "date", e.target.value)} />
                <TextInput value={evt.event} onChange={(e) => updateTimelineEvent(i, "event", e.target.value)} placeholder="Event (mis. Pertama bertemu)" />
                <button
                  onClick={() => removeTimelineEvent(i)}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid rgba(220,100,100,0.20)",
                    background: "transparent",
                    color: "rgba(220,100,100,0.7)",
                    cursor: "pointer",
                    fontFamily: "var(--font-inter)",
                    fontSize: "11px",
                  }}
                >
                  Hapus
                </button>
              </div>
            ))}
            <button
              onClick={addTimelineEvent}
              style={{
                alignSelf: "flex-start",
                padding: "8px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(201,169,110,0.15)",
                background: "transparent",
                fontFamily: "var(--font-inter)",
                fontSize: "11px",
                color: "rgba(201,169,110,0.7)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              + Tambah tanggal penting
            </button>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* ──────────────── SECTION G: CATATAN ──────────────── */}
      <SectionTitle number="G" title="Catatan Tambahan" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <FieldLabel>Catatan khusus untuk admin</FieldLabel>
          <TextArea value={data.adminNote} onChange={(e) => update("adminNote", e.target.value)} placeholder="Mohon pakai bahasa lebih formal, dll." />
        </div>
        <div>
          <FieldLabel>Request tambahan</FieldLabel>
          <TextArea value={data.additionalRequest} onChange={(e) => update("additionalRequest", e.target.value)} placeholder="Tambahkan section doa restu, dll." />
        </div>
      </div>

      <SectionDivider />

      {/* ──────────────── SECTION H: KADO ──────────────── */}
      <SectionTitle number="H" title="Kado Digital & Fisik" />

      <p style={{ fontFamily: "var(--font-inter)", fontSize: "11px", color: "rgba(201,169,110,0.7)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Kado Digital (rekening mempelai)</p>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.30)", marginTop: "4px", marginBottom: "12px" }}>
        Keduanya opsional. Bisa isi 1 atau 2 rekening yang ditampilkan di undangan.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Rekening mempelai pria</p>
        <div>
          <FieldLabel>Bank</FieldLabel>
          <TextInput value={data.groomBank} onChange={(e) => update("groomBank", e.target.value)} placeholder="BCA" />
        </div>
        <div>
          <FieldLabel>No. rekening</FieldLabel>
          <TextInput value={data.groomRekening} onChange={(e) => update("groomRekening", e.target.value)} placeholder="1234567890" />
        </div>
        <div>
          <FieldLabel>Atas nama</FieldLabel>
          <TextInput value={data.groomAn} onChange={(e) => update("groomAn", e.target.value)} placeholder="Muhammad Ali Akbar" />
        </div>

        <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "8px" }}>Rekening mempelai wanita</p>
        <div>
          <FieldLabel>Bank</FieldLabel>
          <TextInput value={data.brideBank} onChange={(e) => update("brideBank", e.target.value)} placeholder="Mandiri" />
        </div>
        <div>
          <FieldLabel>No. rekening</FieldLabel>
          <TextInput value={data.brideRekening} onChange={(e) => update("brideRekening", e.target.value)} placeholder="0987654321" />
        </div>
        <div>
          <FieldLabel>Atas nama</FieldLabel>
          <TextInput value={data.brideAn} onChange={(e) => update("brideAn", e.target.value)} placeholder="Lyla Azzahra" />
        </div>

        <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "8px" }}>Kado Fisik</p>
        <div>
          <FieldLabel>Nama penerima</FieldLabel>
          <TextInput value={data.giftRecipientName} onChange={(e) => update("giftRecipientName", e.target.value)} placeholder="Nama penerima kado fisik" />
        </div>
        <div>
          <FieldLabel>Alamat lengkap</FieldLabel>
          <TextArea value={data.giftAddress} onChange={(e) => update("giftAddress", e.target.value)} placeholder="Alamat lengkap untuk pengiriman kado fisik" />
        </div>
      </div>

      <SectionDivider />

      {/* ──────────────── SUBMIT BUTTON ──────────────── */}
      {submitError && (
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            color: "rgba(220, 100, 100, 0.85)",
            textAlign: "center",
            marginBottom: "14px",
            padding: "10px 14px",
            borderRadius: "8px",
            background: "rgba(220, 100, 100, 0.06)",
            border: "1px solid rgba(220, 100, 100, 0.15)",
          }}
        >
          {submitError}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          width: "100%",
          padding: "16px 24px",
          borderRadius: "12px",
          border: "1px solid rgba(201,169,110,0.20)",
          background: submitting ? "rgba(201,169,110,0.03)" : "rgba(201,169,110,0.06)",
          fontFamily: "var(--font-inter)",
          fontSize: "13px",
          fontWeight: 400,
          letterSpacing: "0.1em",
          color: submitting ? "rgba(201,169,110,0.4)" : "rgba(201,169,110,0.85)",
          cursor: submitting ? "not-allowed" : "pointer",
          transition: "border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
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
        {submitting ? "Memproses..." : submitLabel}
      </button>

      <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", color: "rgba(255,255,255,0.30)", textAlign: "center", marginTop: "10px", lineHeight: 1.6 }}>
        Data undangan akan ikut tersimpan saat pesanan dibuat di langkah pembayaran.
      </p>
    </div>
  );
}
