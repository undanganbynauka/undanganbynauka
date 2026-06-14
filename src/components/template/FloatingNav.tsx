"use client";

import React, { useState, useEffect, useCallback } from "react";

const NAV_ITEMS = [
  { id: "countdown", symbol: "\u23F3" },
  { id: "journey", symbol: "\uD83D\uDCD6" },
  { id: "mempelai", symbol: "\uD83E\uDD0D" },
  { id: "acara", symbol: "\uD83D\uDCC5" },
  { id: "rsvp", symbol: "\uD83D\uDCDD" },
  { id: "ucapan", symbol: "\uD83D\uDC8C" },
  { id: "hadiah", symbol: "\uD83C\uDF81" },
  { id: "doa", symbol: "\uD83E\uDD32" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -40% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0.75rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.375rem",
        background: "rgba(247, 243, 238, 0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(125, 110, 99, 0.1)",
        borderRadius: "28px",
        padding: "0.4rem 0.6rem",
        boxShadow: "0 2px 16px rgba(125, 110, 99, 0.1)",
      }}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollTo(item.id)}
            aria-label={item.id}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: "none",
              background: isActive
                ? "rgba(125, 110, 99, 0.08)"
                : "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              lineHeight: 1,
              transition: "all 0.25s ease",
              padding: 0,
              opacity: isActive ? 1 : 0.45,
              transform: isActive ? "scale(1.15)" : "scale(1)",
            }}
          >
            {item.symbol}
          </button>
        );
      })}
    </div>
  );
}
