"use client";

import React, { useState, useEffect, useRef } from "react";

interface SaveTheDateCardProps {
  groomName?: string;
  brideName?: string;
  akadDate?: string;
  akadStartTime?: string;
  resepsiEndTime?: string;
  akadAddress?: string;
}

function formatDateForCalendar(isoDate: string, time: string): string {
  if (!isoDate || !time) return "20260705T080000";
  const d = new Date(`${isoDate}T${time}:00+07:00`);
  if (isNaN(d.getTime())) return "20260705T080000";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}${mm}${dd}T${hh}${min}00`;
}

export function SaveTheDateCard({ groomName = "Ali", brideName = "Lyla", akadDate = "2026-12-05", akadStartTime = "08:00", resepsiEndTime = "14:00", akadAddress = "Jakarta" }: SaveTheDateCardProps = {}) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !visible) setVisible(true); }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const coupleName = `${groomName} & ${brideName}`;

  const handleAddCalendar = () => {
    const event = {
      title: `Pernikahan ${coupleName}`,
      start: formatDateForCalendar(akadDate, akadStartTime),
      end: formatDateForCalendar(akadDate, resepsiEndTime),
      location: akadAddress,
      description: `Akad ${akadStartTime} WIB | Resepsi s/d ${resepsiEndTime} WIB`,
    };

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;

    const icsContent = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Nauka//SaveTheDate//EN",
      "BEGIN:VEVENT", `DTSTART:${event.start}`, `DTEND:${event.end}`,
      `SUMMARY:${event.title}`, `LOCATION:${event.location}`, `DESCRIPTION:${event.description}`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${groomName.toLowerCase()}-${brideName.toLowerCase()}-wedding.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      window.open(googleUrl, "_blank");
    }
  };

  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <div ref={cardRef} style={{ display: "flex", justifyContent: "center", padding: "0 1.5rem 3rem", background: "#FAF7F2", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}` }}>
      <button onClick={handleAddCalendar} style={{ fontFamily: "var(--font-jakarta)", fontSize: "0.5625rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#8A8A8A", background: "rgba(125, 110, 99, 0.03)", border: "1px solid rgba(125, 110, 99, 0.1)", borderRadius: "999px", padding: "0.625rem 1.75rem", cursor: "pointer", transition: "all 0.4s ease", outline: "none" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(125, 110, 99, 0.2)"; e.currentTarget.style.color = "#6F6F6F"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(125, 110, 99, 0.1)"; e.currentTarget.style.color = "#8A8A8A"; }}>
        Save The Date
      </button>
    </div>
  );
}
