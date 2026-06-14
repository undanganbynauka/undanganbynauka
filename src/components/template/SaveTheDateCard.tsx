"use client";

import React, { useState, useEffect, useRef } from "react";

export function SaveTheDateCard() {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const handleAddCalendar = () => {
    const event = {
      title: "Pernikahan Ali & Lyla",
      start: "20260705T080000",
      end: "20260705T140000",
      location: "Masjid Al-Ikhlas, Jakarta Selatan",
      description: "Akad Nikah 08:00–10:00 WIB | Resepsi 11:00–14:00 WIB",
    };

    // Try Google Calendar first
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;

    // Generate .ics file as fallback
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Nauka//SaveTheDate//EN",
      "BEGIN:VEVENT",
      `DTSTART:${event.start}`,
      `DTEND:${event.end}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${event.location}`,
      `DESCRIPTION:${event.description}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    // Try opening Google Calendar; if on mobile, offer .ics download
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "ali-lyla-wedding.ics";
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
    <div
      ref={cardRef}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 1.5rem 3rem",
        background: "#FAF7F2",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ${ease}, transform 0.6s ${ease}`,
      }}
    >
      <button
        onClick={handleAddCalendar}
        style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "0.5625rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#8A8A8A",
          background: "rgba(125, 110, 99, 0.03)",
          border: "1px solid rgba(125, 110, 99, 0.1)",
          borderRadius: "999px",
          padding: "0.625rem 1.75rem",
          cursor: "pointer",
          transition: "all 0.4s ease",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(125, 110, 99, 0.2)";
          e.currentTarget.style.color = "#6F6F6F";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(125, 110, 99, 0.1)";
          e.currentTarget.style.color = "#8A8A8A";
        }}
      >
        Save The Date
      </button>
    </div>
  );
}
