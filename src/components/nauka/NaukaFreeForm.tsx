"use client";

import React, { useState, useMemo } from "react";
import type { WeddingData } from "./NaukaFormDataUndangan";

// â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
// NAUKA FREE FORM â€” Form simpel untuk template FREE (Luna & future)
//
// Filosofi: "System + Feeling" â€” otomatis tapi tetap manusiawi
// Field: hanya yang relevan untuk Free (Hero, Countdown, Mempelai, Acara, Penutup)
// Slug: auto-generate dari nickname mempelai
// â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�

interface FreeFormProps {
  template: "luna" | string;
  /** Dipanggil saat user klik submit dengan data yang sudah tervalidasi. */
  onSubmit: (data: WeddingData) => void;
  /** Label tombol submit. Default: "Lanjut ke Ringkasan". */
  submitLabel?: string;
  /** Parent sedang memproses POST order (untuk disabled state). */
  submitting?: boolean;
}

// â”€â”€ BGM options (Free hanya 2: hening atau sound alam) â”€â”€
const BGM_OPTIONS_FREE = [
  { value: "hening", label: "Hening (tanpa musik)" },
  { value: "sound_alam", label: "Sound alam" },
];

type BgmType = "vocal_only" | "acapella" | "sound_alam" | "hening";

// â”€â”€ Quote default untuk Free â”€â”€
const DEFAULT_QUOTE =
  "Dan di antara jutaan kemungkinan, takdir mempertemukan dua hati untuk berjalan menuju masa depan yang sama.";

// â”€â”€ Helper: sanitize string jadi slug-friendly â”€â”€
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // hapus karakter non alfanumerik
    .replace(/\s+/g, "-") // spasi â†’ tanda hubung
    .replace(/-+/g, "-") // multiple dash â†’ single dash
    .replace(/^-|-$/g, ""); // trim dash di awal/akhir
}

// â”€â”€ Helper: ambil first name dari fullName (sebelum "bin/binti") â”€â”€
function getFirstName(fullName: string): string {
  if (!fullName.trim()) return "";
  // Hapus "bin/binti" dan ambil kata pertama
  const cleaned = fullName.replace(/\s+(bin|binti)\s+.*/i, "").trim();
  return cleaned.split(/\s+/)[0] || "";
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
  quote: DEFAULT_QUOTE,
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

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Reusable input components
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function FieldLabel({
  children,
  required,
  hint,
}: {
  children: React.ReactNode;
  required?: boolean;
  hint?: string;
}) {
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
      {hint && (
        <span
          style={{
            display: "block",
            marginTop: "4px",
            fontSize: "10px",
            color: "rgba(255,255,255,0.30)",
            fontWeight: 400,
          }}
        >
          {hint}
        </span>
      )}
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

// â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
// MAIN COMPONENT
// â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
export function NaukaFreeForm({
  template,
  onSubmit,
  submitLabel = "Lanjut ke Ringkasan",
  submitting = false,
}: FreeFormProps) {
  const [data, setData] = useState<WeddingData>({ ...initialData });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [slugEdited, setSlugEdited] = useState(false);

  // â”€â”€ Auto-generate slug dari nickname (atau first name dari fullName) â”€â”€
  const autoSlug = useMemo(() => {
    const groomPart = data.groomNickname.trim() || getFirstName(data.groomFullName);
    const bridePart = data.brideNickname.trim() || getFirstName(data.brideFullName);
    if (!groomPart && !bridePart) return "";
    return slugify(`${groomPart}-${bridePart}`);
  }, [data.groomNickname, data.groomFullName, data.brideNickname, data.brideFullName]);

  // Slug yang dipakai: kalau user udah edit manual, pakai data.slug. Kalau belum, pakai autoSlug.
  const effectiveSlug = slugEdited ? data.slug : autoSlug;

  function update<K extends keyof WeddingData>(key: K, value: WeddingData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleSlugChange(value: string) {
    setSlugEdited(true);
    update("slug", value);
  }

  // â”€â”€ Validation â”€â”€
  function validate(): string | null {
    if (!data.groomFullName.trim()) return "Nama lengkap mempelai pria wajib diisi.";
    if (!data.brideFullName.trim()) return "Nama lengkap mempelai wanita wajib diisi.";
    if (!data.akadDate) return "Tanggal akad wajib diisi.";
    if (!data.akadStartTime) return "Waktu mulai akad wajib diisi.";
    if (!data.akadAddress.trim()) return "Alamat lokasi akad wajib diisi.";
    if (!effectiveSlug) return "Slug undangan gagal di-generate. Isi nama panggilan kalian.";
    if (!/^[a-z0-9-]+$/.test(effectiveSlug))
      return "Slug hanya boleh huruf kecil, angka, dan tanda hubung.";
    return null;
  }

  // â”€â”€ Submit â”€â”€
  async function handleSubmit() {
    setSubmitError(null);
    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      // Pastikan slug selalu terisi (auto atau manual)
      const finalData: WeddingData = {
        ...data,
        slug: effectiveSlug,
      };
      onSubmit({
        ...finalData,
        journey: [], // Free gak punya journey
        timelineEvents: [], // Free gak punya timeline
      });
    } catch (err) {
      console.error("[free form] submit error:", err);
      setSubmitError("Terjadi kesalahan. Silakan coba lagi.");
    }
  }

  // â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
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
      {/* â”€â”€ Header dengan human touch â”€â”€ */}
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
            maxWidth: "320px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Cukup isi beberapa hal kecil di bawah. Tenang, data ini hanya untuk membuat undangan
          kamu.
        </p>
      </div>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SECTION B: DATA MEMPELAI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <SectionTitle number="B" title="Siapa nama kalian berdua?" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            color: "rgba(201,169,110,0.7)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Mempelai Pria
        </p>
        <div>
          <FieldLabel required hint="Contoh: Muhammad Ali Akbar bin Ahmad Akbar">
            Nama lengkap
          </FieldLabel>
          <TextInput
            value={data.groomFullName}
            onChange={(e) => update("groomFullName", e.target.value)}
            placeholder="Muhammad Ali Akbar bin Ahmad Akbar"
          />
        </div>
        <div>
          <FieldLabel hint="Nama yang tampil besar di undangan">Nama panggilan</FieldLabel>
          <TextInput
            value={data.groomNickname}
            onChange={(e) => update("groomNickname", e.target.value)}
            placeholder="Ali"
          />
        </div>
        <div>
          <FieldLabel>Nama ayah</FieldLabel>
          <TextInput
            value={data.groomFatherName}
            onChange={(e) => update("groomFatherName", e.target.value)}
            placeholder="Ahmad Akbar"
          />
        </div>
        <div>
          <FieldLabel>Nama ibu</FieldLabel>
          <TextInput
            value={data.groomMotherName}
            onChange={(e) => update("groomMotherName", e.target.value)}
            placeholder="Fatimah"
          />
        </div>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "11px",
            color: "rgba(201,169,110,0.7)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginTop: "8px",
          }}
        >
          Mempelai Wanita
        </p>
        <div>
          <FieldLabel required hint="Contoh: Lyla Azzahra binti Yusuf Rahman">
            Nama lengkap
          </FieldLabel>
          <TextInput
            value={data.brideFullName}
            onChange={(e) => update("brideFullName", e.target.value)}
            placeholder="Lyla Azzahra binti Yusuf Rahman"
          />
        </div>
        <div>
          <FieldLabel hint="Nama yang tampil besar di undangan">Nama panggilan</FieldLabel>
          <TextInput
            value={data.brideNickname}
            onChange={(e) => update("brideNickname", e.target.value)}
            placeholder="Lyla"
          />
        </div>
        <div>
          <FieldLabel>Nama ayah</FieldLabel>
          <TextInput
            value={data.brideFatherName}
            onChange={(e) => update("brideFatherName", e.target.value)}
            placeholder="Yusuf Rahman"
          />
        </div>
        <div>
          <FieldLabel>Nama ibu</FieldLabel>
          <TextInput
            value={data.brideMotherName}
            onChange={(e) => update("brideMotherName", e.target.value)}
            placeholder="Khadijah"
          />
        </div>
      </div>

      <SectionDivider />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SECTION C: ACARA AKAD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <SectionTitle number="C" title="Kapan hari bahagia itu akan dilaksanakan?" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <FieldLabel required>Tanggal akad</FieldLabel>
          <TextInput
            type="date"
            value={data.akadDate}
            onChange={(e) => update("akadDate", e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <FieldLabel required>Waktu mulai</FieldLabel>
            <TextInput
              type="time"
              value={data.akadStartTime}
              onChange={(e) => update("akadStartTime", e.target.value)}
            />
          </div>
          <div>
            <FieldLabel>Waktu selesai</FieldLabel>
            <TextInput
              type="time"
              value={data.akadEndTime}
              onChange={(e) => update("akadEndTime", e.target.value)}
            />
          </div>
        </div>
        <div>
          <FieldLabel required>Alamat lokasi akad</FieldLabel>
          <TextArea
            value={data.akadAddress}
            onChange={(e) => update("akadAddress", e.target.value)}
            placeholder="Masjid Al-Hijri, Jl. Cendana No. 12, Jakarta"
          />
        </div>
        <div>
          <FieldLabel hint="Opsional â€” biar tamu gampang nyari">Link Google Maps akad</FieldLabel>
          <TextInput
            type="url"
            value={data.akadMapsLink}
            onChange={(e) => update("akadMapsLink", e.target.value)}
            placeholder="https://maps.app.goo.gl/xxx"
          />
        </div>
        <div>
          <FieldLabel>Kota akad</FieldLabel>
          <TextInput
            value={data.akadCity}
            onChange={(e) => update("akadCity", e.target.value)}
            placeholder="Jakarta Selatan"
          />
        </div>
      </div>

      <SectionDivider />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SECTION D: RESEPSI (opsional) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <SectionTitle number="D" title="Acara Resepsi" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            fontFamily: "var(--font-inter)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <input
            type="checkbox"
            checked={data.hasResepsi}
            onChange={(e) => update("hasResepsi", e.target.checked)}
            style={{ accentColor: "rgba(201,169,110,0.6)" }}
          />
          Ada acara resepsi
        </label>

        {data.hasResepsi && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              paddingTop: "8px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginTop: "8px",
            }}
          >
            <div>
              <FieldLabel>Tanggal resepsi</FieldLabel>
              <TextInput
                type="date"
                value={data.resepsiDate}
                onChange={(e) => update("resepsiDate", e.target.value)}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <FieldLabel>Waktu mulai</FieldLabel>
                <TextInput
                  type="time"
                  value={data.resepsiStartTime}
                  onChange={(e) => update("resepsiStartTime", e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Waktu selesai</FieldLabel>
                <TextInput
                  type="time"
                  value={data.resepsiEndTime}
                  onChange={(e) => update("resepsiEndTime", e.target.value)}
                />
              </div>
            </div>
            <div>
              <FieldLabel>Alamat lokasi resepsi</FieldLabel>
              <TextArea
                value={data.resepsiAddress}
                onChange={(e) => update("resepsiAddress", e.target.value)}
                placeholder="Gedung Serbaguna, Jl. Mawar No. 5, Jakarta"
              />
            </div>
            <div>
              <FieldLabel hint="Opsional">Link Google Maps resepsi</FieldLabel>
              <TextInput
                type="url"
                value={data.resepsiMapsLink}
                onChange={(e) => update("resepsiMapsLink", e.target.value)}
                placeholder="https://maps.app.goo.gl/xxx"
              />
            </div>
            <div>
              <FieldLabel>Kota resepsi</FieldLabel>
              <TextInput
                value={data.resepsiCity}
                onChange={(e) => update("resepsiCity", e.target.value)}
                placeholder="Jakarta Selatan"
              />
            </div>
          </div>
        )}
      </div>

      <SectionDivider />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SECTION E: KONFIGURASI â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <SectionTitle number="E" title="Sentuhan Terakhir" />

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <FieldLabel hint="Kalimat pembuka di undangan, sudah diisi default â€” bisa kamu ubah">
            Quote undangan
          </FieldLabel>
          <TextArea
            value={data.quote}
            onChange={(e) => update("quote", e.target.value)}
            placeholder={DEFAULT_QUOTE}
          />
        </div>
        <div>
          <FieldLabel hint="Bisa diubah kapan saja sebelum publish">Musik latar</FieldLabel>
          <select
            value={data.bgmType}
            onChange={(e) => update("bgmType", e.target.value as BgmType)}
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
              cursor: "pointer",
            }}
          >
            {BGM_OPTIONS_FREE.map((opt) => (
              <option key={opt.value} value={opt.value} style={{ background: "#0B1120" }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Slug preview */}
        <div>
          <FieldLabel hint="Otomatis dari nama panggilan. Bisa diubah kalau mau.">
            Link undangan kamu
          </FieldLabel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              fontFamily: "var(--font-inter)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.6)",
              gap: "6px",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.35)" }}>undangan-by-nauka.vercel.app/</span>
            <input
              type="text"
              value={effectiveSlug}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="ali-lyla"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontFamily: "var(--font-inter)",
                fontSize: "12px",
                color: "rgba(201,169,110,0.9)",
                padding: 0,
              }}
            />
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ SUBMIT BUTTON â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
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

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "10px",
          color: "rgba(255,255,255,0.30)",
          textAlign: "center",
          marginTop: "10px",
          lineHeight: 1.6,
        }}
      >
        Data undangan akan tersimpan saat pesanan dibuat. Kamu bisa ubah kapan saja sebelum
        publish.
      </p>
    </div>
  );
}
