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
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {/* FAB Button — fixed bottom right */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Navigasi"
        style={{
          position: "fixed",
          bottom: "1.25rem",
          right: "1.25rem",
          zIndex: 40,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(125, 110, 99, 0.2)",
          background: isOpen
            ? "rgba(247, 243, 238, 0.98)"
            : "rgba(247, 243, 238, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 2px 12px rgba(125, 110, 99, 0.12)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          padding: 0,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transition: "transform 0.3s ease",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          {isOpen ? (
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="#7D6E63"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          ) : (
            <>
              <circle cx="4" cy="4" r="1.25" fill="#7D6E63" opacity="0.5" />
              <circle cx="8" cy="4" r="1.25" fill="#7D6E63" opacity="0.7" />
              <circle cx="12" cy="4" r="1.25" fill="#7D6E63" opacity="0.5" />
              <circle cx="4" cy="8" r="1.25" fill="#7D6E63" opacity="0.7" />
              <circle cx="8" cy="8" r="1.25" fill="#7D6E63" />
              <circle cx="12" cy="8" r="1.25" fill="#7D6E63" opacity="0.7" />
              <circle cx="4" cy="12" r="1.25" fill="#7D6E63" opacity="0.5" />
              <circle cx="8" cy="12" r="1.25" fill="#7D6E63" opacity="0.7" />
              <circle cx="12" cy="12" r="1.25" fill="#7D6E63" opacity="0.5" />
            </>
          )}
        </svg>
      </button>

      {/* Nav Panel — expands from FAB, symbols only */}
      <div
        style={{
          position: "fixed",
          bottom: "4rem",
          right: "1.25rem",
          zIndex: 39,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <div
          style={{
            background: "rgba(247, 243, 238, 0.97)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "16px",
            padding: "0.5rem",
            boxShadow: "0 4px 20px rgba(125, 110, 99, 0.1)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.25rem",
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
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive
                    ? "rgba(125, 110, 99, 0.08)"
                    : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                  lineHeight: 1,
                  padding: 0,
                  opacity: isActive ? 1 : 0.5,
                  transition: "all 0.2s ease",
                  transform: isActive ? "scale(1.1)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(125, 110, 99, 0.04)";
                    e.currentTarget.style.opacity = "0.75";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.opacity = "0.5";
                  }
                }}
              >
                {item.symbol}
              </button>
            );
          })}
        </div>
      </div>

      {/* Backdrop — close on tap outside */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 38,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
