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
  const [shootingStars, setShootingStars] = useState<Array<{ id: number; top: number; left: number; angle: number }>>([]);

  useEffect(() => {
    let counter = 0;
    const scheduleNext = () => {
      const delay = 6000 + Math.random() * 9000; // 6-15 seconds
      return setTimeout(() => {
        counter++;
        const star = {
          id: counter,
          top: 5 + Math.random() * 35,
          left: 10 + Math.random() * 50,
          angle: 25 + Math.random() * 20, // 25-45 degree angle
        };
        setShootingStars((prev) => [...prev, star]);
        // Remove after animation ends
        setTimeout(() => {
          setShootingStars((prev) => prev.filter((s) => s.id !== star.id));
        }, 1500);
        scheduleNext();
      }, delay);
    };
    const timeout = scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10, overflow: "hidden" }}>
      {shootingStars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            top: `${star.top}%`,
            left: `${star.left}%`,
          }}
        >
          <div
            style={{
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "#fff",
              boxShadow:
                "0 0 8px 3px rgba(255,255,255,0.7), " +
                "-20px 0 12px 1px rgba(201,169,110,0.3), " +
                "-40px 0 20px 1px rgba(255,255,255,0.2), " +
                "-60px 0 28px 0px rgba(255,255,255,0.1)",
              animation: `cel-shooting 1.5s linear forwards`,
              transform: `rotate(${star.angle}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
