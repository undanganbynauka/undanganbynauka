"use client";

import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "home", emoji: "🏠" },
  { id: "mempelai", emoji: "💍" },
  { id: "acara", emoji: "🗓️" },
  { id: "rsvp", emoji: "✍🏻" },
  { id: "hadiah", emoji: "🎁" },
  { id: "closing", emoji: "💌" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0.75rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "0.25rem",
        padding: "0.375rem 0.5rem",
        borderRadius: "9999px",
        border: "1px solid rgba(125, 110, 99, 0.1)",
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        zIndex: 60,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {NAV_ITEMS.map(({ id, emoji }) => {
        const isActive = id === activeSection;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              background: isActive ? "rgba(125, 106, 82, 0.12)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              transform: isActive ? "scale(1.1)" : "scale(1)",
              opacity: isActive ? 1 : 0.5,
            }}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}
