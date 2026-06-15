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
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  };

  const accent = "#7D6A52";

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 55,
            background: "rgba(0,0,0,0.1)",
          }}
        />
      )}

      {/* Vertical nav items */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "4.5rem",
            right: "1rem",
            zIndex: 56,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            animation: "nauka-fade-in 0.3s ease-out",
          }}
        >
          {NAV_ITEMS.map(({ id, emoji }) => {
            const isActive = id === activeSection;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  border: isActive
                    ? "1px solid rgba(125, 106, 82, 0.25)"
                    : "1px solid rgba(125, 110, 99, 0.08)",
                  background: isActive
                    ? "rgba(125, 106, 82, 0.08)"
                    : "rgba(255, 255, 255, 0.55)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                  opacity: isActive ? 1 : 0.55,
                }}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(125, 110, 99, 0.15)",
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 56,
          transition: "all 0.3s ease",
          boxShadow: "0 1px 4px rgba(125, 106, 82, 0.08)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={accent} strokeWidth="1.2" strokeLinecap="round">
          {isOpen ? (
            <>
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </>
          ) : (
            <>
              <circle cx="5" cy="5" r="1.2" />
              <circle cx="11" cy="5" r="1.2" />
              <circle cx="5" cy="11" r="1.2" />
              <circle cx="11" cy="11" r="1.2" />
              <circle cx="8" cy="8" r="1.2" />
            </>
          )}
        </svg>
      </button>
    </>
  );
}
