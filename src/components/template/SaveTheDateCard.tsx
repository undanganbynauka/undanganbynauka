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

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;

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

  // Staggered letter animation helper
  const renderLetters = (
    text: string,
    baseDelay: number,
    delayPerChar: number = 0.035
  ) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        style={{
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(12px)",
          transition: `opacity 0.5s ${ease} ${baseDelay + i * delayPerChar}s, transform 0.5s ${ease} ${baseDelay + i * delayPerChar}s`,
          whiteSpace: char === " " ? "pre" : undefined,
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div
      ref={cardRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2.5rem 1.5rem 3rem",
        background: "#FAF7F2",
        gap: "1.25rem",
      }}
    >
      {/* Decorative thin line */}
      <div
        style={{
          width: visible ? "3rem" : "0rem",
          height: "1px",
          background: "rgba(125, 110, 99, 0.25)",
          transition: `width 0.8s ${ease} 0.1s`,
        }}
      />

      {/* "Save The Date" — staggered letter reveal */}
      <p
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.125rem",
          fontWeight: 400,
          fontStyle: "italic",
          letterSpacing: "0.12em",
          color: "#8E7E72",
          margin: 0,
          textAlign: "center",
        }}
      >
        {renderLetters("Save The Date", 0.15)}
      </p>

      {/* Names — staggered, more dramatic */}
      <p
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "1.5rem",
          fontWeight: 500,
          color: "#2E2E2E",
          letterSpacing: "0.04em",
          margin: 0,
          textAlign: "center",
        }}
      >
        {renderLetters("Ali & Lyla", 0.6, 0.04)}
      </p>

      {/* Date — soft fade-in after names */}
      <p
        style={{
          fontFamily: "var(--font-jakarta)",
          fontSize: "0.625rem",
          fontWeight: 400,
          letterSpacing: "0.1em",
          color: "#8A8A8A",
          margin: 0,
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: `opacity 0.7s ${ease} 1.1s, transform 0.7s ${ease} 1.1s`,
        }}
      >
        Ahad, 5 Juli 2026
      </p>

      {/* Decorative thin line */}
      <div
        style={{
          width: visible ? "3rem" : "0rem",
          height: "1px",
          background: "rgba(125, 110, 99, 0.25)",
          transition: `width 0.8s ${ease} 1.3s`,
        }}
      />

      {/* Add to Calendar button */}
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
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
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
        Add to Calendar
      </button>
    </div>
  );
}
