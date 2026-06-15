"use client";

import React, { useState, useEffect } from "react";

export function StarField() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generated);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            background: star.size > 1.5 ? "rgba(201, 169, 110, 0.8)" : "rgba(255, 255, 255, 0.7)",
            animation: `cel-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            boxShadow: star.size > 1.5 ? "0 0 4px rgba(201, 169, 110, 0.4)" : "none",
          }}
        />
      ))}
    </div>
  );
}

export function ShootingStar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 1500);
    }, 8000 + Math.random() * 7000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: `${10 + Math.random() * 30}%`,
        left: `${5 + Math.random() * 40}%`,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "2px",
          height: "2px",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 0 6px 2px rgba(255,255,255,0.6), -30px 0 15px 1px rgba(255,255,255,0.2), -60px 0 25px 1px rgba(255,255,255,0.1)",
          animation: "cel-shooting 1.5s linear forwards",
        }}
      />
    </div>
  );
}
