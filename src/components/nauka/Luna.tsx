"use client";

import React, { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────
// LUNA — Free Universal Wedding Invitation Template
// Minimalist sage theme · Monogram-based · No photos · Mobile-first
// ─────────────────────────────────────────────────────────────────

interface LunaData {
  // Mempelai
  groomFullName: string;
  brideFullName: string;
  groomInitial: string;
  brideInitial: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;

  // Acara
  weddingDate: string; // ISO date for countdown
  akadDate: string;
  akadTime: string;
  resepsiDate: string;
  resepsiTime: string;
  venue: string;
  venueAddress: string;
  mapUrl: string;

  // Optional
  bgmUrl?: string;
}

const DEFAULT_DATA: LunaData = {
  groomFullName: "Ali Rahman",
  brideFullName: "Lyla Azzahra",
  groomInitial: "A",
  brideInitial: "L",
  groomFather: "Bapak Hendri",
  groomMother: "Ibu Ningsih",
  brideFather: "Bapak Yusuf",
  brideMother: "Ibu Rahayu",
  weddingDate: "2026-12-05T08:00:00+07:00",
  akadDate: "Sabtu, 5 Desember 2026",
  akadTime: "08.00 WIB – selesai",
  resepsiDate: "Sabtu, 5 Desember 2026",
  resepsiTime: "09.00 WIB – selesai",
  venue: "Tanah Abang 1",
  venueAddress: "Jakarta Pusat",
  mapUrl: "https://maps.google.com/?q=Tanah+Abang+Jakarta",
};

// ── Theme tokens ──────────────────────────────────────────────
const C = {
  bg: "#E8EEE7",
  surface: "#F5F7F3",
  text: "#4E5B50",
  accent: "#73826F",
  textSoft: "rgba(78, 91, 80, 0.60)",
  textMuted: "rgba(78, 91, 80, 0.40)",
  border: "rgba(115, 130, 111, 0.18)",
  borderSoft: "rgba(115, 130, 111, 0.10)",
};

const FONT_SERIF = "var(--font-bodoni)";
const FONT_SANS = "var(--font-inter)";

// ── Countdown hook ─────────────────────────────────────────────
function useCountdown(targetIso: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetIso).getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, isPast: diff === 0 };
}

// ── Visibility hook (for fade-in on scroll) ────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
export function Luna({ data = DEFAULT_DATA }: { data?: LunaData }) {
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (soundOn) {
      audioRef.current.pause();
      setSoundOn(false);
    } else {
      audioRef.current.play().catch(() => {});
      setSoundOn(true);
    }
  };

  return (
    <main
      style={{
        background: C.bg,
        color: C.text,
        fontFamily: FONT_SANS,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Sound toggle — minimal, top-right */}
      <SoundToggle on={soundOn} onClick={toggleSound} />

      {/* Hidden audio element */}
      {data.bgmUrl && (
        <audio ref={audioRef} src={data.bgmUrl} loop preload="none" />
      )}

      <Hero data={data} />
      <WaveDivider />
      <Mempelai data={data} />
      <Acara data={data} />
      <Penutup data={data} />
    </main>
  );
}

// ════════════════════════════════════════════════════════════════
// HERO + COUNTDOWN (Layer 1)
// ════════════════════════════════════════════════════════════════
function Hero({ data }: { data: LunaData }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const cd = useCountdown(data.weddingDate);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "100px 24px 60px",
        textAlign: "center",
        background: C.bg,
        overflow: "hidden",
      }}
    >
      {/* Arch ornament behind monogram */}
      <ArchOrnament />

      {/* "Our Wedding" label */}
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: "11px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: C.accent,
          margin: 0,
          marginBottom: "32px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
        }}
      >
        Our Wedding
      </p>

      {/* Monogram — main focus */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 1.4s ease-out 0.2s, transform 1.4s ease-out 0.2s",
        }}
      >
        <div
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "84px",
            fontWeight: 300,
            letterSpacing: "0.08em",
            color: C.text,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
          className="md:!text-[120px]"
        >
          <span>{data.groomInitial}</span>
          <span
            style={{
              fontSize: "0.5em",
              color: C.accent,
              fontWeight: 300,
            }}
          >
            ♡
          </span>
          <span>{data.brideInitial}</span>
        </div>
      </div>

      {/* Names */}
      <div
        style={{
          marginTop: "40px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1.4s ease-out 0.4s, transform 1.4s ease-out 0.4s",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "26px",
            fontWeight: 400,
            color: C.text,
            margin: 0,
            letterSpacing: "0.02em",
            lineHeight: 1.4,
          }}
          className="md:!text-[32px]"
        >
          {data.groomFullName}
        </p>
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "20px",
            fontWeight: 300,
            color: C.accent,
            margin: "6px 0",
            fontStyle: "italic",
          }}
          className="md:!text-[24px]"
        >
          &amp;
        </p>
        <p
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "26px",
            fontWeight: 400,
            color: C.text,
            margin: 0,
            letterSpacing: "0.02em",
            lineHeight: 1.4,
          }}
          className="md:!text-[32px]"
        >
          {data.brideFullName}
        </p>
      </div>

      {/* Date */}
      <p
        style={{
          marginTop: "32px",
          fontFamily: FONT_SANS,
          fontSize: "13px",
          fontWeight: 400,
          letterSpacing: "0.18em",
          color: C.textSoft,
          opacity: visible ? 1 : 0,
          transition: "opacity 1.4s ease-out 0.6s",
        }}
      >
        {data.akadDate}
      </p>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "40px",
          background: C.border,
          margin: "32px auto",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.4s ease-out 0.7s",
        }}
      />

      {/* Countdown */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 1.4s ease-out 0.8s, transform 1.4s ease-out 0.8s",
        }}
      >
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: C.textMuted,
            margin: 0,
            marginBottom: "20px",
          }}
        >
          {cd.isPast ? "Hari Bahagia Telah Tiba" : "Menyambut Hari Bahagia"}
        </p>
        <CountdownGrid cd={cd} />
      </div>
    </section>
  );
}

function CountdownGrid({
  cd,
}: {
  cd: ReturnType<typeof useCountdown>;
}) {
  const items = [
    { label: "Hari", value: cd.days },
    { label: "Jam", value: cd.hours },
    { label: "Mnt", value: cd.minutes },
    { label: "Dtk", value: cd.seconds },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "10px",
        maxWidth: "320px",
        margin: "0 auto",
      }}
    >
      {items.map((it) => (
        <div
          key={it.label}
          style={{
            padding: "14px 8px",
            background: C.surface,
            borderRadius: "10px",
            border: `1px solid ${C.borderSoft}`,
          }}
        >
          <div
            style={{
              fontFamily: FONT_SERIF,
              fontSize: "24px",
              fontWeight: 400,
              color: C.text,
              lineHeight: 1,
            }}
          >
            {String(it.value).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: FONT_SANS,
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: C.textMuted,
              marginTop: "6px",
            }}
          >
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// Arch ornament (SVG curve behind monogram)
function ArchOrnament() {
  return (
    <svg
      aria-hidden
      width="280"
      height="320"
      viewBox="0 0 280 320"
      style={{
        position: "absolute",
        top: "80px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1,
        opacity: 0.5,
        pointerEvents: "none",
      }}
      className="md:!w-[360px] md:!h-[420px]"
    >
      <path
        d="M 20 300 Q 20 30 140 30 Q 260 30 260 300"
        fill="none"
        stroke={C.accent}
        strokeWidth="1"
        opacity="0.4"
      />
      <path
        d="M 40 300 Q 40 50 140 50 Q 240 50 240 300"
        fill="none"
        stroke={C.accent}
        strokeWidth="0.5"
        opacity="0.25"
      />
      {/* Minimal floral dots */}
      <circle cx="140" cy="30" r="2" fill={C.accent} opacity="0.6" />
      <circle cx="20" cy="300" r="1.5" fill={C.accent} opacity="0.4" />
      <circle cx="260" cy="300" r="1.5" fill={C.accent} opacity="0.4" />
    </svg>
  );
}
// ════════════════════════════════════════════════════════════════
// WAVE DIVIDER — Transisi Layer 1 → Layer 2
// ════════════════════════════════════════════════════════════════
function WaveDivider() {
  return (
    <div
      style={{
        background: C.bg,
        lineHeight: 0,
        marginTop: "-20px",
      }}
    >
      <svg
        viewBox="0 0 375 60"
        width="100%"
        height="60"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <path
          d="M 0 30 Q 94 0 187 30 T 375 30 L 375 60 L 0 60 Z"
          fill={C.surface}
        />
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// MEMPELAI (Layer 2)
// ════════════════════════════════════════════════════════════════
function Mempelai({ data }: { data: LunaData }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      style={{
        background: C.surface,
        padding: "60px 24px 80px",
        textAlign: "center",
      }}
    >
      {/* Intro paragraph */}
      <p
        style={{
          maxWidth: "420px",
          margin: "0 auto 48px",
          fontFamily: FONT_SANS,
          fontSize: "13px",
          lineHeight: 1.85,
          color: C.textSoft,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
        }}
      >
        Dengan penuh rasa syukur dan kebahagiaan, kami mengundang
        Bapak/Ibu/Saudara/i untuk menjadi bagian dari hari istimewa kami.
        Perkenankan kami memperkenalkan kedua mempelai.
      </p>

      {/* Two balanced blocks */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "32px",
          maxWidth: "480px",
          margin: "0 auto",
        }}
        className="md:!grid-cols-2 md:!gap-6"
      >
        <MempelaiBlock
          initial={data.groomInitial}
          name={data.groomFullName}
          role="Groom"
          father={data.groomFather}
          mother={data.groomMother}
          visible={visible}
          delay={0.2}
        />
        <MempelaiBlock
          initial={data.brideInitial}
          name={data.brideFullName}
          role="Bride"
          father={data.brideFather}
          mother={data.brideMother}
          visible={visible}
          delay={0.35}
        />
      </div>
    </section>
  );
}

function MempelaiBlock({
  initial,
  name,
  role,
  father,
  mother,
  visible,
  delay,
}: {
  initial: string;
  name: string;
  role: string;
  father: string;
  mother: string;
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        padding: "32px 24px",
        background: C.bg,
        borderRadius: "16px",
        border: `1px solid ${C.borderSoft}`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1.4s ease-out ${delay}s, transform 1.4s ease-out ${delay}s`,
      }}
    >
      {/* Big initial as decoration */}
      <div
        style={{
          fontFamily: FONT_SERIF,
          fontSize: "72px",
          fontWeight: 300,
          color: C.accent,
          lineHeight: 1,
          marginBottom: "16px",
          opacity: 0.85,
        }}
      >
        {initial}
      </div>

      {/* Role */}
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: C.textMuted,
          margin: 0,
          marginBottom: "10px",
        }}
      >
        {role}
      </p>

      {/* Name */}
      <p
        style={{
          fontFamily: FONT_SERIF,
          fontSize: "22px",
          fontWeight: 400,
          color: C.text,
          margin: 0,
          marginBottom: "18px",
          letterSpacing: "0.02em",
        }}
      >
        {name}
      </p>

      {/* Thin divider */}
      <div
        style={{
          width: "32px",
          height: "1px",
          background: C.border,
          margin: "0 auto 18px",
        }}
      />

      {/* Parents */}
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: C.textMuted,
          margin: 0,
          marginBottom: "6px",
        }}
      >
        Putra dari
      </p>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: "13px",
          color: C.text,
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        {father}
        <br />
        {mother}
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ACARA — 3 cards (Akad, Resepsi, Lokasi) + Lihat Lokasi
// ════════════════════════════════════════════════════════════════
function Acara({ data }: { data: LunaData }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      style={{
        background: C.bg,
        padding: "80px 24px",
      }}
    >
      {/* Section title */}
      <h2
        style={{
          fontFamily: FONT_SANS,
          fontSize: "11px",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: C.accent,
          textAlign: "center",
          margin: 0,
          marginBottom: "12px",
          fontWeight: 400,
        }}
      >
        Acara
      </h2>
      <div
        style={{
          width: "32px",
          height: "1px",
          background: C.border,
          margin: "0 auto 40px",
        }}
      />

      {/* Cards container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "440px",
          margin: "0 auto",
        }}
      >
        <AcaraCard
          icon="♡"
          label="Akad Nikah"
          lines={[data.akadDate, data.akadTime]}
          visible={visible}
          delay={0.1}
        />
        <AcaraCard
          icon="♡"
          label="Resepsi"
          lines={[data.resepsiDate, data.resepsiTime]}
          visible={visible}
          delay={0.2}
        />
        <AcaraCard
          icon="⌖"
          label="Lokasi"
          lines={[data.venue, data.venueAddress]}
          visible={visible}
          delay={0.3}
          action={{
            label: "Lihat Lokasi",
            href: data.mapUrl,
          }}
        />
      </div>
    </section>
  );
}
function AcaraCard({
  icon,
  label,
  lines,
  visible,
  delay,
  action,
}: {
  icon: string;
  label: string;
  lines: string[];
  visible: boolean;
  delay: number;
  action?: { label: string; href: string };
}) {
  return (
    <div
      style={{
        padding: "24px 22px",
        background: C.surface,
        borderRadius: "14px",
        border: `1px solid ${C.borderSoft}`,
        boxShadow: "0 2px 12px rgba(78, 91, 80, 0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 1.4s ease-out ${delay}s, transform 1.4s ease-out ${delay}s`,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            color: C.accent,
            lineHeight: 1,
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: "11px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: C.accent,
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      </div>

      {/* Lines */}
      {lines.map((line, i) => (
        <p
          key={i}
          style={{
            fontFamily: i === 0 ? FONT_SERIF : FONT_SANS,
            fontSize: i === 0 ? "17px" : "13px",
            fontWeight: i === 0 ? 400 : 400,
            color: i === 0 ? C.text : C.textSoft,
            margin: 0,
            marginBottom: i === 0 ? "4px" : 0,
            lineHeight: 1.6,
            letterSpacing: i === 0 ? "0.01em" : "0",
          }}
        >
          {line}
        </p>
      ))}

      {/* Action button */}
      {action && (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "16px",
            padding: "9px 18px",
            background: "transparent",
            border: `1px solid ${C.accent}`,
            borderRadius: "999px",
            fontFamily: FONT_SANS,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: C.accent,
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.accent;
            e.currentTarget.style.color = C.surface;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = C.accent;
          }}
        >
          {action.label}
          <span style={{ fontSize: "13px", lineHeight: 1 }}>→</span>
        </a>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// PENUTUP — Closing paragraph + monogram
// ════════════════════════════════════════════════════════════════
function Penutup({ data }: { data: LunaData }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      style={{
        background: C.surface,
        padding: "80px 24px 100px",
        textAlign: "center",
      }}
    >
      {/* Wave top divider */}
      <div
        style={{
          lineHeight: 0,
          marginBottom: "60px",
          marginTop: "-100px",
        }}
      >
        <svg
          viewBox="0 0 375 60"
          width="100%"
          height="60"
          preserveAspectRatio="none"
          style={{ display: "block", transform: "scaleY(-1)" }}
        >
          <path
            d="M 0 30 Q 94 0 187 30 T 375 30 L 375 60 L 0 60 Z"
            fill={C.surface}
          />
        </svg>
      </div>

      {/* Closing paragraph */}
      <p
        style={{
          maxWidth: "420px",
          margin: "0 auto 24px",
          fontFamily: FONT_SANS,
          fontSize: "13px",
          lineHeight: 1.85,
          color: C.textSoft,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1.4s ease-out, transform 1.4s ease-out",
        }}
      >
        Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa dan restu
        untuk perjalanan baru kami.
      </p>
      <p
        style={{
          maxWidth: "420px",
          margin: "0 auto 60px",
          fontFamily: FONT_SANS,
          fontSize: "13px",
          lineHeight: 1.85,
          color: C.textSoft,
          fontStyle: "italic",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1.4s ease-out 0.15s, transform 1.4s ease-out 0.15s",
        }}
      >
        Atas kehadiran dan doa restunya, kami ucapkan terima kasih.
      </p>

      {/* Closing monogram */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: FONT_SERIF,
          fontSize: "48px",
          fontWeight: 300,
          color: C.text,
          letterSpacing: "0.08em",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1.4s ease-out 0.3s, transform 1.4s ease-out 0.3s",
        }}
      >
        <span>{data.groomInitial}</span>
        <span
          style={{
            fontSize: "0.5em",
            color: C.accent,
            fontWeight: 300,
          }}
        >
          ♡
        </span>
        <span>{data.brideInitial}</span>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// SOUND TOGGLE — minimal, top-right, default OFF
// ════════════════════════════════════════════════════════════════
function SoundToggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={on ? "Matikan suara" : "Nyalakan suara"}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 100,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: C.surface,
        border: `1px solid ${C.border}`,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.accent,
        fontSize: "16px",
        transition: "all 0.3s ease",
        boxShadow: "0 2px 8px rgba(78, 91, 80, 0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = C.accent;
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = C.border;
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {on ? "♪" : "♪̸"}
    </button>
  );
}
