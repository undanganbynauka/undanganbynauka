"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type { WeddingData } from "./NaukaFormDataUndangan";

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// LUNA â€” Universal Free Wedding Invitation Template
// Elegant Â· Romantic Â· Minimalist Â· Universal Â· Premium Â· Mobile First
//
// Support 2 mode:
//   1. PREVIEW mode (tanpa data) â€” pakai hardcoded Ali & Lyla
//   2. LIVE mode (dengan data dari Supabase) â€” render dari props
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€ Data default untuk preview mode (halaman /luna) â”€â”€
const DEFAULT_DATA: WeddingData = {
  groomFullName: "Ali Rahman",
  groomNickname: "Ali",
  groomFatherName: "Hendri",
  groomMotherName: "Ningsih",
  groomBirthOrder: "",
  brideFullName: "Lyla Azzahra",
  brideNickname: "Lyla",
  brideFatherName: "Yusuf",
  brideMotherName: "Rahayu",
  brideBirthOrder: "",
  akadDate: "2026-12-05",
  akadStartTime: "09:00",
  akadEndTime: "",
  akadAddress: "Tanah Abang 1, Jakarta Pusat",
  akadMapsLink: "",
  akadCity: "Jakarta Pusat",
  hasResepsi: true,
  resepsiDate: "2026-12-05",
  resepsiStartTime: "10:00",
  resepsiEndTime: "",
  resepsiAddress: "Tanah Abang 1, Jakarta Pusat",
  resepsiMapsLink: "",
  resepsiCity: "Jakarta Pusat",
  slug: "ali-lyla",
  quote:
    "Dan di antara jutaan kemungkinan, takdir mempertemukan dua hati untuk berjalan menuju masa depan yang sama.",
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

const C = {
  primary: "#F7F2EA",
  secondary: "#E8DCCF",
  accent: "#DCCFBE",
  contentBg: "#8B876A",
  buttonBg: "#6B6B4E",
  buttonBgHover: "#5A5A40",
  buttonBorder: "#F7F2EA",
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
  textShadowSoft: "0 1px 2px rgba(0, 0, 0, 0.10)",
  cardSurface: "rgba(247, 242, 234, 0.06)",
  cardBorder: "rgba(220, 207, 190, 0.35)",
  hairline: "rgba(220, 207, 190, 0.45)",
};

const FONT_SERIF = "var(--font-playfair)";
const FONT_SANS = "var(--font-jakarta)";

// â”€â”€ Helper: format tanggal ISO "2026-12-05" â†’ "Sabtu, 5 Desember 2026" â”€â”€
function formatLongDate(isoDate: string): string {
  if (!isoDate) return "-";
  try {
    // Tambah waktu supaya parsing konsisten di semua timezone
    const d = new Date(`${isoDate}T00:00:00+07:00`);
    if (isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    });
  } catch {
    return isoDate;
  }
}

// â”€â”€ Helper: format waktu "09:00" â†’ "09.00 WIB" â”€â”€
function formatTime(time: string, endTime?: string): string {
  if (!time) return "-";
  const formatted = time.replace(":", ".");
  if (endTime) {
    const endFormatted = endTime.replace(":", ".");
    return `${formatted} - ${endFormatted} WIB`;
  }
  return `${formatted} WIB`;
}

// â”€â”€ Helper: build ISO target untuk countdown â”€â”€
function buildCountdownTarget(date: string, time: string): string {
  if (!date || !time) return "";
  return `${date}T${time}:00+07:00`;
}

function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!targetIso) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const target = new Date(targetIso).getTime();
  if (isNaN(target)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, isPast: diff === 0 };
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition:
          "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface LunaProps {
  /** Data undangan dari Supabase. Kalau kosong, pakai default Ali & Lyla (preview mode). */
  data?: WeddingData;
  /** Nama tamu untuk personalized greeting (Premium only). */
  guestName?: string | null;
}

export function Luna({ data, guestName }: LunaProps = {}) {
    const d: WeddingData = { ...DEFAULT_DATA, ...(data || {}) };
  // Preview mode = tidak ada data dari Supabase (pakai DEFAULT_DATA)
  // Di preview, toggle audio selalu muncul biar tamu bisa denger preview musiknya
  const isPreview = !data;

  // Nama yang tampil di hero: pakai nickname kalau ada, fallback ke first name dari fullName
  const groomDisplay = d.groomNickname.trim() || d.groomFullName.split(/\s+/)[0] || "Pria";
  const brideDisplay = d.brideNickname.trim() || d.brideFullName.split(/\s+/)[0] || "Wanita";

  const countdownTarget = buildCountdownTarget(d.akadDate, d.akadStartTime);
  const [opened, setOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
    if (!opened) {
      // Lock scroll lebih robust untuk iOS Safari & Android Chrome
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      requestAnimationFrame(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
    };
  }, [opened]);

  const handleOpen = useCallback(() => {
    setOpened(true);
  }, []);

  return (
    <main
      style={{
        fontFamily: FONT_SANS,
        color: C.primary,
        background: C.contentBg,
        margin: 0,
        padding: 0,
        lineHeight: 1.6,
        WebkitFontSmoothing: "antialiased",
      }}
    >
                  <Hero
        opened={opened}
        onOpen={handleOpen}
        groomName={groomDisplay}
        brideName={brideDisplay}
        akadDate={d.akadDate}
        bgmType={d.bgmType}
        isPreview={isPreview}
      />
      <div ref={contentRef}>
        <QuoteAndCountdown quote={d.quote} countdownTarget={countdownTarget} />
        <Pembuka />
        <ProfilMempelai
          groomFullName={d.groomFullName}
          groomFatherName={d.groomFatherName}
          groomMotherName={d.groomMotherName}
          brideFullName={d.brideFullName}
          brideFatherName={d.brideFatherName}
          brideMotherName={d.brideMotherName}
        />
        <Acara
          akadDate={d.akadDate}
          akadTime={formatTime(d.akadStartTime, d.akadEndTime)}
          akadAddress={d.akadAddress}
          akadMapsLink={d.akadMapsLink}
          hasResepsi={d.hasResepsi}
          resepsiDate={d.resepsiDate}
          resepsiTime={formatTime(d.resepsiStartTime, d.resepsiEndTime)}
          resepsiAddress={d.resepsiAddress}
          resepsiMapsLink={d.resepsiMapsLink}
        />
        <Penutup groomName={groomDisplay} brideName={brideDisplay} akadDate={d.akadDate} />
        <NaukaFooter />
      </div>
    </main>
  );
}

function Hero({
  opened,
  onOpen,
  groomName,
  brideName,
  akadDate,
  bgmType,
  isPreview,
}: {
  opened: boolean;
  onOpen: () => void;
  groomName: string;
  brideName: string;
  akadDate: string;
  bgmType: string;
  isPreview: boolean;
}) {
  const dateLabel = akadDate ? formatLongDate(akadDate) : "Sabtu, 5 Desember 2026";

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        minHeight: "100dvh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "13vh",
        paddingBottom: "5vh",
        boxSizing: "border-box",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: 'url("/nauka/couple-illustration-sage.png")',
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#3A4D3F",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: C.primary,
            margin: 0,
            textShadow: C.textShadowSoft,
            animation: "lunaFadeUp 0.9s ease-out 0.1s both",
          }}
        >
          The Wedding Of
        </p>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(64px, 18vw, 96px)",
            fontWeight: 500,
            lineHeight: 1.02,
            color: C.primary,
            margin: "18px 0 4px",
            textShadow: C.textShadow,
            letterSpacing: "0.01em",
            animation: "lunaFadeUp 0.9s ease-out 0.3s both",
          }}
        >
          {groomName}
        </h1>
        <span
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(28px, 7vw, 40px)",
            color: C.primary,
            margin: "2px 0",
            textShadow: C.textShadowSoft,
            opacity: 0.85,
            animation: "lunaFadeUp 0.9s ease-out 0.5s both",
          }}
        >
          &amp;
        </span>
        <h1
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(64px, 18vw, 96px)",
            fontWeight: 500,
            lineHeight: 1.02,
            color: C.primary,
            margin: "4px 0 0",
            textShadow: C.textShadow,
            letterSpacing: "0.01em",
            animation: "lunaFadeUp 0.9s ease-out 0.7s both",
          }}
        >
          {brideName}
        </h1>
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "16px",
          animation: "lunaFadeUp 0.9s ease-out 1.0s both",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.primary,
            margin: 0,
            textShadow: C.textShadowSoft,
          }}
        >
          {dateLabel}
        </p>
        <div
          style={{
            padding: "6px 16px",
            borderTop: `1px solid ${C.hairline}`,
            borderBottom: `1px solid ${C.hairline}`,
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "8px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.primary,
              margin: 0,
              opacity: 0.8,
              textShadow: C.textShadowSoft,
            }}
          >
            Kepada Yth
          </p>
          <p
            style={{
              fontFamily: FONT_SERIF,
              fontSize: "13px",
              fontWeight: 500,
              color: C.primary,
              margin: "4px 0 0",
              textShadow: C.textShadowSoft,
            }}
          >
            Bapak/Ibu/Saudara/i
          </p>
        </div>
        <button
          onClick={onOpen}
          aria-label="Open Invitation"
          style={{
            padding: "12px 32px",
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: C.primary,
            background: C.buttonBg,
            border: `1px solid ${C.buttonBorder}`,
            borderRadius: "999px",
            cursor: "pointer",
            transition: "background 0.3s ease, transform 0.2s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.18)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.buttonBgHover;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.buttonBg;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
                    Open Invitation
        </button>
      </div>
            {/* Toggle audio di Hero — pojok kanan atas */}
      <AudioToggle bgmType={bgmType} isPreview={isPreview} />
      <style>{`
        @keyframes lunaFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

function Section({
  children,
  background,
  style,
}: {
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        padding: "80px 24px",
        background: background || C.contentBg,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>
        {children}
      </div>
    </section>
  );
}

function QuoteAndCountdown({
  quote,
  countdownTarget,
}: {
  quote: string;
  countdownTarget: string;
}) {
  const { days, hours, minutes, seconds } = useCountdown(countdownTarget);
  const units: Array<{ label: string; value: number }> = [
    { label: "Hari", value: days },
    { label: "Jam", value: hours },
    { label: "Menit", value: minutes },
    { label: "Detik", value: seconds },
  ];

  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "84px" }}>
      <Reveal>
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "clamp(15px, 4vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.55,
            color: C.primary,
            textAlign: "center",
            maxWidth: "300px",
            margin: "0 auto 48px",
          }}
        >
          &ldquo;{quote || "Dan di antara jutaan kemungkinan, takdir mempertemukan dua hati untuk berjalan menuju masa depan yang sama."}&rdquo;
        </p>
      </Reveal>
      <Reveal delay={120}>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: C.accent,
            textAlign: "center",
            margin: "0 0 32px",
          }}
        >
          Menuju Hari Bahagia
        </p>
      </Reveal>
      <Reveal delay={200}>
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: C.secondary,
            textAlign: "center",
            margin: "0 0 24px",
          }}
        >
          Save The Date
        </p>
      </Reveal>
      <Reveal delay={280}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            maxWidth: "340px",
            margin: "0 auto",
          }}
        >
          {units.map((u) => (
            <div
              key={u.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 4px",
                border: `1px solid ${C.cardBorder}`,
                borderRadius: "10px",
                background: C.cardSurface,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: "clamp(18px, 5vw, 24px)",
                  fontWeight: 500,
                  color: C.primary,
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(u.value).padStart(2, "0")}
              </span>
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "8px",
                  fontWeight: 500,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: C.accent,
                  marginTop: "6px",
                }}
              >
                {u.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Pembuka() {
  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "0" }}>
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: "320px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: C.secondary,
              margin: "0 0 18px",
            }}
          >
            Dengan penuh rasa syukur dan kebahagiaan, kami mengundang
            Bapak/Ibu/Saudara/i untuk hadir dan menjadi bagian dari momen
            istimewa dalam perjalanan hidup kami.
          </p>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: C.secondary,
              margin: 0,
            }}
          >
            Kehadiran serta doa restu yang diberikan akan menjadi kebahagiaan dan
            kehormatan bagi kami.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function ProfilMempelai({
  groomFullName,
  groomFatherName,
  groomMotherName,
  brideFullName,
  brideFatherName,
  brideMotherName,
}: {
  groomFullName: string;
  groomFatherName: string;
  groomMotherName: string;
  brideFullName: string;
  brideFatherName: string;
  brideMotherName: string;
}) {
  // Ambil first name untuk inisial
  const groomInitial = (groomFullName.split(/\s+/)[0] || "A").charAt(0).toUpperCase();
  const brideInitial = (brideFullName.split(/\s+/)[0] || "L").charAt(0).toUpperCase();

  // Display name: prefer fullName, fallback ke default
  const groomDisplay = groomFullName || "Ali Rahman";
  const brideDisplay = brideFullName || "Lyla Azzahra";

  return (
    <Section style={{ paddingTop: "40px", paddingBottom: "84px" }}>
      <Reveal>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: C.accent,
            textAlign: "center",
            margin: "0 0 36px",
          }}
        >
          Mempelai
        </p>
      </Reveal>
      <Reveal delay={120}>
        <div
          style={{
            maxWidth: "340px",
            margin: "0 auto",
            padding: "40px 28px",
            border: `1px solid ${C.cardBorder}`,
            borderRadius: "12px",
            background: C.cardSurface,
            textAlign: "center",
          }}
        >
          {/* Groom */}
          <div>
            <p
              style={{
                fontFamily: FONT_SERIF,
                fontSize: "44px",
                fontWeight: 500,
                color: C.accent,
                margin: "0 0 10px",
                lineHeight: 1,
                opacity: 0.9,
              }}
            >
              {groomInitial}
            </p>
            <h3
              style={{
                fontFamily: FONT_SERIF,
                fontSize: "20px",
                fontWeight: 500,
                color: C.primary,
                margin: "0 0 8px",
                letterSpacing: "0.02em",
              }}
            >
              {groomDisplay}
            </h3>
            {(groomFatherName || groomMotherName) && (
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "11px",
                  fontWeight: 400,
                  color: C.secondary,
                  margin: 0,
                  letterSpacing: "0.05em",
                  lineHeight: 1.6,
                }}
              >
                Putra dari
                <br />
                {groomFatherName && `Bapak ${groomFatherName}`}
                {groomFatherName && groomMotherName && " dan "}
                {groomMotherName && `Ibu ${groomMotherName}`}
              </p>
            )}
          </div>
          {/* Divider */}
          <div
            aria-hidden
            style={{
              margin: "22px auto",
              width: "56%",
              height: "1px",
              background: C.hairline,
            }}
          />
          {/* Bride */}
          <div>
            <p
              style={{
                fontFamily: FONT_SERIF,
                fontSize: "44px",
                fontWeight: 500,
                color: C.accent,
                margin: "0 0 10px",
                lineHeight: 1,
                opacity: 0.9,
              }}
            >
              {brideInitial}
            </p>
            <h3
              style={{
                fontFamily: FONT_SERIF,
                fontSize: "20px",
                fontWeight: 500,
                color: C.primary,
                margin: "0 0 8px",
                letterSpacing: "0.02em",
              }}
            >
              {brideDisplay}
            </h3>
            {(brideFatherName || brideMotherName) && (
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "11px",
                  fontWeight: 400,
                  color: C.secondary,
                  margin: 0,
                  letterSpacing: "0.05em",
                  lineHeight: 1.6,
                }}
              >
                Putri dari
                <br />
                {brideFatherName && `Bapak ${brideFatherName}`}
                {brideFatherName && brideMotherName && " dan "}
                {brideMotherName && `Ibu ${brideMotherName}`}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function Acara({
  akadDate,
  akadTime,
  akadAddress,
  akadMapsLink,
  hasResepsi,
  resepsiDate,
  resepsiTime,
  resepsiAddress,
  resepsiMapsLink,
}: {
  akadDate: string;
  akadTime: string;
  akadAddress: string;
  akadMapsLink: string;
  hasResepsi: boolean;
  resepsiDate: string;
  resepsiTime: string;
  resepsiAddress: string;
  resepsiMapsLink: string;
}) {
  const akadMapUrl =
    akadMapsLink ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(akadAddress || "")}`;

  const events: Array<{ title: string; date: string; time: string; place: string; mapUrl: string }> = [
    {
      title: "Akad Nikah",
      date: formatLongDate(akadDate),
      time: akadTime,
      place: akadAddress,
      mapUrl: akadMapUrl,
    },
  ];

  if (hasResepsi) {
    const resepsiMapUrl =
      resepsiMapsLink ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resepsiAddress || "")}`;
    events.push({
      title: "Resepsi",
      date: formatLongDate(resepsiDate),
      time: resepsiTime,
      place: resepsiAddress,
      mapUrl: resepsiMapUrl,
    });
  }

  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "84px" }}>
      <Reveal>
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: C.accent,
            textAlign: "center",
            margin: "0 0 36px",
          }}
        >
          Acara
        </p>
      </Reveal>
      <div
        style={{
          maxWidth: "340px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {events.map((ev, i) => (
          <Reveal key={ev.title} delay={i * 120}>
            <div
              style={{
                padding: "26px 22px",
                border: `1px solid ${C.cardBorder}`,
                borderRadius: "12px",
                background: C.cardSurface,
                textAlign: "center",
              }}
            >
              <h3
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: "18px",
                  fontWeight: 500,
                  color: C.primary,
                  margin: "0 0 14px",
                  letterSpacing: "0.02em",
                }}
              >
                {ev.title}
              </h3>
              <p
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "12px",
                  fontWeight: 400,
                  color: C.secondary,
                  margin: "0 0 4px",
                  letterSpacing: "0.05em",
                }}
              >
                {ev.date}
              </p>
              <p
                style={{
                  fontFamily: FONT_SERIF,
                  fontSize: "14px",
                  fontWeight: 500,
                  color: C.primary,
                  margin: "0 0 12px",
                }}
              >
                {ev.time}
              </p>
              {ev.place && (
                <p
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: "11px",
                    fontWeight: 400,
                    color: C.accent,
                    margin: "0 0 20px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {ev.place}
                </p>
              )}
              <a
                href={ev.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  fontFamily: FONT_SANS,
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: C.primary,
                  background: "transparent",
                  border: `1px solid ${C.accent}`,
                  borderRadius: "999px",
                  textDecoration: "none",
                  transition: "background 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = C.accent;
                  e.currentTarget.style.color = "#3A4D3F";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = C.primary;
                }}
              >
                Lihat Lokasi
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function TwoRingsDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        margin: "0 0 28px",
        opacity: 0.85,
      }}
    >
      <div style={{ width: "28px", height: "1px", background: C.hairline }} />
      <svg
        width="18"
        height="10"
        viewBox="0 0 18 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <circle cx="6" cy="5" r="3.5" stroke={C.accent} strokeWidth="0.8" fill="none" />
        <circle cx="12" cy="5" r="3.5" stroke={C.accent} strokeWidth="0.8" fill="none" />
      </svg>
      <div style={{ width: "28px", height: "1px", background: C.hairline }} />
    </div>
  );
}

function Penutup({
  groomName,
  brideName,
  akadDate,
}: {
  groomName: string;
  brideName: string;
  akadDate: string;
}) {
  const dateLabel = akadDate ? formatLongDate(akadDate) : "Sabtu, 5 Desember 2026";
  const coupleLabel = `${groomName} & ${brideName}`;

  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "72px" }}>
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: "320px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: C.secondary,
              margin: "0 0 18px",
            }}
          >
            Semoga hari ini menjadi awal dari kisah yang penuh kebahagiaan, cinta,
            dan kenangan indah yang akan terus tumbuh seiring waktu.
          </p>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: C.secondary,
              margin: "0 0 32px",
            }}
          >
            Terima kasih atas kehadiran, doa, dan segala kebaikan yang diberikan
            kepada kami.
          </p>
          <TwoRingsDivider />
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: C.accent,
              margin: "0 0 14px",
            }}
          >
            Dengan penuh rasa syukur,
          </p>
          <h3
            style={{
              fontFamily: FONT_SERIF,
              fontSize: "26px",
              fontWeight: 500,
              color: C.primary,
              margin: "0 0 10px",
            }}
          >
            {coupleLabel}
          </h3>
          <p
            style={{
              fontFamily: FONT_SANS,
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.secondary,
              margin: 0,
            }}
          >
            {dateLabel}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function NaukaFooter() {
  return (
    <footer
      style={{
        background: C.contentBg,
        padding: "28px 24px 40px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/nauka-logo-new.png"
        alt="Nauka"
        style={{
          width: "64px",
          height: "auto",
          opacity: 0.85,
          filter: "brightness(0) invert(0.97) sepia(0.12) saturate(0.6)",
        }}
      />
    </footer>
  );
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// AUDIO TOGGLE â€” Floating music button
// For Free: default OFF (hening)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function AudioToggle({ bgmType, isPreview }: { bgmType: string; isPreview?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
    // Selalu load birds-morning.mp3
    const audio = new Audio("/nauka/birds-morning.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [playing]);

    // Tombol selalu muncul, default OFF
    // Kalau bgmType === "hening" dan BUKAN preview mode, tombol tidak dirender
  if (bgmType === "hening" && !isPreview) return null;
  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Matikan suara" : "Nyalakan suara"}
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        zIndex: 5,
        width: "44px",
        height: "44px",
        borderRadius: "999px",
        background: "rgba(107, 107, 78, 0.85)",
        border: `1px solid ${C.buttonBorder}`,
        color: C.primary,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(4px)",
        transition: "background 0.3s ease, transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(90, 90, 64, 0.95)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(107, 107, 78, 0.85)";
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: playing ? 1 : 0.6 }}
      >
        {playing ? (
          <>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </>
        ) : (
          <>
            <path d="M9 18V5l12-2v13" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </>
        )}
      </svg>
    </button>
  );
}
