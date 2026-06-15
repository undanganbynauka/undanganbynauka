"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * CelestialSectionReveal
 * Wraps a section to add scroll-reveal entrance animation.
 * Uses IntersectionObserver — section fades in from below
 * when it enters the viewport.
 */
export function CelestialSectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.08 } // Trigger early — when 8% visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`cel-reveal${revealed ? " cel-revealed" : ""}`}
    >
      {children}
    </div>
  );
}
