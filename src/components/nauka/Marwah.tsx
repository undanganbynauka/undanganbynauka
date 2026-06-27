"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import type { WeddingData } from "./NaukaFormDataUndangan";

// ════════════════════════════════════════════════════════════════
// MARWAH — Islamic Minimalist Wedding Invitation Template (FREE)
// Sacred · Hangat · Tenang · Elegan
// ════════════════════════════════════════════════════════════════

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
  quote: "Maha Suci Allah yang telah menciptakan segala sesuatu berpasang-pasangan.",
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
  darkMocha: "#4A3428",
  warmBrown: "#6B523F",
  softCream: "#F4E7D3",
  ivory: "#FBF7F0",
  goldBeige: "#C8A27A",
};

const FONT_HEADING = "var(--font-marcellus, Marcellus, Georgia, serif)";
const FONT_BODY = "var(--font-jakarta, 'Plus Jakarta Sans', system-ui, sans-serif)";
const FONT_ARABIC = "var(--font-amiri, Amiri, 'Traditional Arabic', serif)";

function formatLongDate(isoDate: string): string {
  if (!isoDate) return "-";
  try {
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

function formatTime(time: string, endTime?: string): string {
  if (!time) return "-";
  const formatted = time.replace(":", ".");
  if (endTime) {
    const endFormatted = endTime.replace(":", ".");
    return `${formatted} - ${endFormatted} WIB`;
  }
  return `${formatted} WIB`;
}

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
  if (!targetIso) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  const target = new Date(targetIso).getTime();
  if (isNaN(target)) return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
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

function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface MarwahProps {
  data?: WeddingData;
  guestName?: string | null;
}

export function Marwah({ data, guestName }: MarwahProps = {}) {
  const d: WeddingData = { ...DEFAULT_DATA, ...(data || {}) };
  const isPreview = !data;
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

  const handleOpen = useCallback(() => { setOpened(true); }, []);

  return (
    <main style={{ fontFamily: FONT_BODY, color: C.darkMocha, background: C.ivory, margin: 0, padding: 0, lineHeight: 1.6, WebkitFontSmoothing: "antialiased" }}>
            <Hero opened={opened} onOpen={handleOpen} groomName={groomDisplay} brideName={brideDisplay} akadDate={d.akadDate} bgmType={d.bgmType} isPreview={isPreview} />
      <div ref={contentRef}>
        <AyatAndCountdown countdownTarget={countdownTarget} />
        <Mempelai groomFullName={d.groomFullName} groomFatherName={d.groomFatherName} groomMotherName={d.groomMotherName} brideFullName={d.brideFullName} brideFatherName={d.brideFatherName} brideMotherName={d.brideMotherName} />
        <Acara akadDate={d.akadDate} akadTime={formatTime(d.akadStartTime, d.akadEndTime)} akadAddress={d.akadAddress} akadMapsLink={d.akadMapsLink} hasResepsi={d.hasResepsi} resepsiDate={d.resepsiDate} resepsiTime={formatTime(d.resepsiStartTime, d.resepsiEndTime)} resepsiAddress={d.resepsiAddress} resepsiMapsLink={d.resepsiMapsLink} />
        <Penutup groomName={groomDisplay} brideName={brideDisplay} akadDate={d.akadDate} />
        <NaukaFooter />
      </div>
    </main>
  );
}

function Hero({ opened, onOpen, groomName, brideName, akadDate, bgmType, isPreview }: { opened: boolean; onOpen: () => void; groomName: string; brideName: string; akadDate: string; bgmType: string; isPreview?: boolean; }) {
  const dateLabel = akadDate ? formatLongDate(akadDate) : "Sabtu, 5 Desember 2026";
  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", minHeight: "100dvh", overflow: "hidden", background: C.darkMocha }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: 'url("/marwah/couple-illustration-marwah.png")', backgroundSize: "cover", backgroundPosition: "center bottom", backgroundRepeat: "no-repeat" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(74, 52, 40, 0.85) 0%, rgba(74, 52, 40, 0.55) 25%, rgba(74, 52, 40, 0.15) 50%, transparent 70%)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: "60px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "480px", padding: "0 24px", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center" }}>
        <p style={{ fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 500, letterSpacing: "0.35em", textTransform: "uppercase", color: C.softCream, opacity: 0.8, margin: 0, animation: "marwahFadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both" }}>The Wedding Of</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: "8px", animation: "marwahFadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both" }}>
          <h1 style={{ fontFamily: FONT_HEADING, fontSize: "clamp(48px, 14vw, 64px)", fontWeight: 400, lineHeight: 1.05, color: C.softCream, letterSpacing: "0.01em", margin: 0, display: "inline-block" }}>{groomName}</h1>
          <span style={{ fontFamily: FONT_HEADING, fontSize: "clamp(22px, 6vw, 28px)", color: C.goldBeige, opacity: 0.9, display: "inline-block", verticalAlign: "middle" }}>&amp;</span>
          <h1 style={{ fontFamily: FONT_HEADING, fontSize: "clamp(48px, 14vw, 64px)", fontWeight: 400, lineHeight: 1.05, color: C.softCream, letterSpacing: "0.01em", margin: 0, display: "inline-block" }}>{brideName}</h1>
        </div>
        <p style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", textTransform: "uppercase", color: C.softCream, opacity: 0.9, margin: 0, animation: "marwahFadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) 1.0s both" }}>{dateLabel}</p>
        <div style={{ width: "60px", height: "1px", background: C.goldBeige, opacity: 0.6, margin: "4px 0", animation: "marwahFadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) 1.2s both" }} />
        <div style={{ padding: "8px 18px", borderTop: `1px solid ${C.softCream}66`, borderBottom: `1px solid ${C.softCream}66`, textAlign: "center", animation: "marwahFadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) 1.4s both" }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: "9px", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: C.softCream, opacity: 0.7, margin: 0 }}>Kepada Yth</p>
          <p style={{ fontFamily: FONT_HEADING, fontSize: "13px", color: C.softCream, marginTop: "4px", margin: "4px 0 0" }}>Bapak/Ibu/Saudara/i</p>
        </div>
        <button onClick={onOpen} aria-label="Open Invitation" style={{ padding: "12px 32px", fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 600, letterSpacing: "0.32em", textTransform: "uppercase", color: C.darkMocha, background: C.softCream, border: `1px solid ${C.softCream}`, borderRadius: "999px", cursor: "pointer", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)", transition: "background 0.3s ease, transform 0.2s ease", animation: "marwahFadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) 1.6s both" }} onMouseEnter={(e) => { e.currentTarget.style.background = C.goldBeige; e.currentTarget.style.borderColor = C.goldBeige; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = C.softCream; e.currentTarget.style.borderColor = C.softCream; e.currentTarget.style.transform = "translateY(0)"; }}>Open Invitation</button>
      </div>
      {/* Toggle audio di Hero — pojok kanan atas */}
            <AudioToggle bgmType={bgmType} isPreview={isPreview} />
      <style>{`@keyframes marwahFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}

function Section({ children, background, style }: { children: React.ReactNode; background?: string; style?: React.CSSProperties }) {
  return (
    <section style={{ position: "relative", width: "100%", padding: "80px 24px", background: background || C.ivory, boxSizing: "border-box", ...style }}>
      <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative" }}>{children}</div>
    </section>
  );
}

function AyatAndCountdown({ countdownTarget }: { countdownTarget: string }) {
  const { days, hours, minutes, seconds } = useCountdown(countdownTarget);
  const units: Array<{ label: string; value: number }> = [{ label: "Hari", value: days }, { label: "Jam", value: hours }, { label: "Menit", value: minutes }, { label: "Detik", value: seconds }];
  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "84px", background: C.ivory }}>
      <Reveal><p style={{ fontFamily: FONT_ARABIC, fontSize: "28px", fontWeight: 400, lineHeight: 1.8, color: C.darkMocha, textAlign: "center", direction: "rtl", margin: "0 0 16px" }}>سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا</p></Reveal>
      <Reveal delay={100}>
        <p style={{ fontFamily: FONT_BODY, fontSize: "13px", fontWeight: 400, lineHeight: 1.7, color: C.warmBrown, textAlign: "center", margin: "0 0 8px", fontStyle: "italic" }}>&ldquo;Maha Suci Allah yang telah menciptakan segala sesuatu berpasang-pasangan.&rdquo;</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.goldBeige, textAlign: "center", margin: "0 0 36px" }}>QS. Yasin : 36</p>
      </Reveal>
      <Reveal delay={150}><div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", margin: "0 0 36px" }}><div style={{ width: "40px", height: "1px", background: C.goldBeige, opacity: 0.5 }} /><div style={{ width: "40px", height: "1px", background: C.goldBeige, opacity: 0.5 }} /></div></Reveal>
      <Reveal delay={200}><p style={{ fontFamily: FONT_HEADING, fontSize: "14px", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase", color: C.darkMocha, textAlign: "center", margin: "0 0 24px" }}>Menuju Hari Bahagia</p></Reveal>
      <Reveal delay={280}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", maxWidth: "340px", margin: "0 auto" }}>
          {units.map((u) => (
            <div key={u.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "14px 4px", border: `1px solid ${C.goldBeige}55`, borderRadius: "10px", background: C.softCream }}>
              <span style={{ fontFamily: FONT_HEADING, fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 400, color: C.darkMocha, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{String(u.value).padStart(2, "0")}</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: "8px", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: C.warmBrown, marginTop: "6px" }}>{u.label}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function Mempelai({ groomFullName, groomFatherName, groomMotherName, brideFullName, brideFatherName, brideMotherName }: { groomFullName: string; groomFatherName: string; groomMotherName: string; brideFullName: string; brideFatherName: string; brideMotherName: string; }) {
  const groomInitial = (groomFullName.split(/\s+/)[0] || "A").charAt(0).toUpperCase();
  const brideInitial = (brideFullName.split(/\s+/)[0] || "L").charAt(0).toUpperCase();
  const groomDisplay = groomFullName || "Ali Rahman";
  const brideDisplay = brideFullName || "Lyla Azzahra";
  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "84px", background: C.softCream }}>
      <Reveal><p style={{ fontFamily: FONT_ARABIC, fontSize: "24px", fontWeight: 400, color: C.darkMocha, textAlign: "center", direction: "rtl", margin: "0 0 16px" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p></Reveal>
      <Reveal delay={80}><p style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 300, lineHeight: 1.85, color: C.warmBrown, textAlign: "center", margin: "0 0 36px", maxWidth: "320px", marginLeft: "auto", marginRight: "auto" }}>Dengan memohon rahmat dan ridha Allah Subhanahu Wa Ta&apos;ala, kami bermaksud menyelenggarakan pernikahan putra-putri kami. Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kedua mempelai.</p></Reveal>
      <Reveal delay={140}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <p style={{ fontFamily: FONT_HEADING, fontSize: "56px", fontWeight: 400, color: C.goldBeige, margin: "0 0 10px", lineHeight: 1, opacity: 0.9 }}>{groomInitial}</p>
          <h3 style={{ fontFamily: FONT_HEADING, fontSize: "22px", fontWeight: 400, color: C.darkMocha, margin: "0 0 8px", letterSpacing: "0.02em" }}>{groomDisplay}</h3>
          <p style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 400, color: C.warmBrown, margin: 0, letterSpacing: "0.05em", lineHeight: 1.6 }}>Putra dari<br />Bapak {groomFatherName || "-"} &amp; Ibu {groomMotherName || "-"}</p>
        </div>
      </Reveal>
      <Reveal delay={200}><div style={{ display: "flex", justifyContent: "center", margin: "0 0 32px" }}><span style={{ fontSize: "20px", color: C.goldBeige, opacity: 0.85 }}>♡</span></div></Reveal>
      <Reveal delay={260}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: FONT_HEADING, fontSize: "56px", fontWeight: 400, color: C.goldBeige, margin: "0 0 10px", lineHeight: 1, opacity: 0.9 }}>{brideInitial}</p>
          <h3 style={{ fontFamily: FONT_HEADING, fontSize: "22px", fontWeight: 400, color: C.darkMocha, margin: "0 0 8px", letterSpacing: "0.02em" }}>{brideDisplay}</h3>
          <p style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 400, color: C.warmBrown, margin: 0, letterSpacing: "0.05em", lineHeight: 1.6 }}>Putri dari<br />Bapak {brideFatherName || "-"} &amp; Ibu {brideMotherName || "-"}</p>
        </div>
      </Reveal>
    </Section>
  );
}

function Acara({ akadDate, akadTime, akadAddress, akadMapsLink, hasResepsi, resepsiDate, resepsiTime, resepsiAddress, resepsiMapsLink }: { akadDate: string; akadTime: string; akadAddress: string; akadMapsLink: string; hasResepsi: boolean; resepsiDate: string; resepsiTime: string; resepsiAddress: string; resepsiMapsLink: string; }) {
  const akadMapUrl = akadMapsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(akadAddress || "")}`;
  const events: Array<{ title: string; date: string; time: string; place: string; mapUrl: string }> = [{ title: "Akad Nikah", date: formatLongDate(akadDate), time: akadTime, place: akadAddress, mapUrl: akadMapUrl }];
  if (hasResepsi) {
    const resepsiMapUrl = resepsiMapsLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resepsiAddress || "")}`;
    events.push({ title: "Resepsi", date: formatLongDate(resepsiDate), time: resepsiTime, place: resepsiAddress, mapUrl: resepsiMapUrl });
  }
  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "84px", background: C.ivory }}>
      <Reveal><p style={{ fontFamily: FONT_HEADING, fontSize: "12px", fontWeight: 400, letterSpacing: "0.32em", textTransform: "uppercase", color: C.goldBeige, textAlign: "center", margin: "0 0 36px" }}>Acara</p></Reveal>
      <div style={{ maxWidth: "340px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
        {events.map((ev, i) => (
          <Reveal key={ev.title} delay={i * 120}>
            <div style={{ textAlign: "center" }}>
              <h3 style={{ fontFamily: FONT_HEADING, fontSize: "20px", fontWeight: 400, color: C.darkMocha, margin: "0 0 14px", letterSpacing: "0.02em" }}>{ev.title}</h3>
              <p style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 400, color: C.warmBrown, margin: "0 0 4px", letterSpacing: "0.05em" }}>{ev.date}</p>
              <p style={{ fontFamily: FONT_HEADING, fontSize: "14px", fontWeight: 400, color: C.darkMocha, margin: "0 0 12px" }}>{ev.time}</p>
              {ev.place && <p style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 400, color: C.warmBrown, margin: "0 0 16px", letterSpacing: "0.05em", lineHeight: 1.6 }}>{ev.place}</p>}
              <a href={ev.mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "8px 20px", fontFamily: FONT_BODY, fontSize: "9px", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase", color: C.ivory, background: C.darkMocha, border: `1px solid ${C.darkMocha}`, borderRadius: "999px", textDecoration: "none", transition: "background 0.3s ease, color 0.3s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.darkMocha; }} onMouseLeave={(e) => { e.currentTarget.style.background = C.darkMocha; e.currentTarget.style.color = C.ivory; }}>Lihat Lokasi</a>
            </div>
            {i < events.length - 1 && <div style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}><span style={{ fontSize: "14px", color: C.goldBeige, opacity: 0.7 }}>♡</span></div>}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Penutup({ groomName, brideName, akadDate }: { groomName: string; brideName: string; akadDate: string; }) {
  const dateLabel = akadDate ? formatLongDate(akadDate) : "Sabtu, 5 Desember 2026";
  const coupleLabel = `${groomName} & ${brideName}`;
  return (
    <Section style={{ paddingTop: "84px", paddingBottom: "60px", background: C.softCream }}>
      <Reveal><p style={{ fontFamily: FONT_ARABIC, fontSize: "22px", fontWeight: 400, color: C.darkMocha, textAlign: "center", direction: "rtl", margin: "0 0 16px", lineHeight: 1.8 }}>بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ</p></Reveal>
      <Reveal delay={80}><p style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 300, lineHeight: 1.85, color: C.warmBrown, textAlign: "center", margin: "0 0 18px", fontStyle: "italic" }}>&ldquo;Semoga Allah memberkahi pernikahan kami, melimpahkan keberkahan atas kami, dan menghimpun kami dalam kebaikan.&rdquo;</p></Reveal>
      <Reveal delay={140}><p style={{ fontFamily: FONT_BODY, fontSize: "12px", fontWeight: 300, lineHeight: 1.85, color: C.warmBrown, textAlign: "center", margin: "0 0 32px", maxWidth: "320px", marginLeft: "auto", marginRight: "auto" }}>Terima kasih atas doa dan restu yang diberikan. Semoga Allah membalas setiap kebaikan dengan keberkahan yang berlipat ganda.</p></Reveal>
      <Reveal delay={200}><div style={{ display: "flex", justifyContent: "center", margin: "0 0 28px" }}><svg width="14" height="8" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden style={{ opacity: 0.6 }}><circle cx="6" cy="5" r="3.5" stroke={C.goldBeige} strokeWidth="0.8" fill="none" /><circle cx="12" cy="5" r="3.5" stroke={C.goldBeige} strokeWidth="0.8" fill="none" /></svg></div></Reveal>
      <Reveal delay={260}><p style={{ fontFamily: FONT_BODY, fontSize: "10px", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase", color: C.goldBeige, textAlign: "center", margin: "0 0 14px" }}>Dengan penuh rasa syukur,</p></Reveal>
      <Reveal delay={320}><h3 style={{ fontFamily: FONT_HEADING, fontSize: "26px", fontWeight: 400, color: C.darkMocha, textAlign: "center", margin: "0 0 10px" }}>{coupleLabel}</h3></Reveal>
      <Reveal delay={380}><p style={{ fontFamily: FONT_BODY, fontSize: "11px", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: C.warmBrown, textAlign: "center", margin: 0 }}>{dateLabel}</p></Reveal>
    </Section>
  );
}

function NaukaFooter() {
  return (
    <footer style={{ background: C.darkMocha, padding: "12px 24px 14px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <img src="/nauka-logo-new.png" alt="Nauka" style={{ width: "48px", height: "auto", opacity: 0.85, filter: "brightness(0) invert(0.95) sepia(0.4) saturate(0.5) hue-rotate(350deg)" }} />
    </footer>
  );
}

function AudioToggle({ bgmType, isPreview }: { bgmType: string; isPreview?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const audio = new Audio("/marwah/wooden-fountain.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => { audio.pause(); audioRef.current = null; };
  }, []);
  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  }, [playing]);
  // Kalau bgmType === "hening", tombol tidak dirender (tidak ada musik untuk dimainkan)
    if (bgmType === "hening" && !isPreview) return null;
  return (
    <button onClick={toggle} aria-label={playing ? "Matikan suara" : "Nyalakan suara"} style={{ position: "absolute", top: "18px", right: "18px", zIndex: 5, width: "40px", height: "40px", borderRadius: "999px", background: "rgba(74, 52, 40, 0.75)", border: `1px solid ${C.softCream}66`, color: C.softCream, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", transition: "background 0.3s ease, transform 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(74, 52, 40, 0.95)"; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(74, 52, 40, 0.75)"; e.currentTarget.style.transform = "translateY(0)"; }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: playing ? 1 : 0.8 }}>
        {playing ? (<><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>) : (<><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /><line x1="3" y1="3" x2="21" y2="21" /></>)}
      </svg>
    </button>
  );
}
