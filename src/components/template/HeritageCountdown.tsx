"use client";

import React, { useState, useEffect } from "react";
import { useHeritageEntrance } from "./useHeritageEntrance";

interface HeritageCountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const now = new Date().getTime();
  const diff = target.getTime() - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function HeritageCountdown({ targetDate }: HeritageCountdownProps) {
  const { ref, visible } = useHeritageEntrance();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate);
    const update = () => setTimeLeft(calcTimeLeft(target));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const displayTime = mounted ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return (
    <section
      ref={ref}
      className="heritage-section heritage-countdown-section relative"
    >
      <div
        className={`heritage-entrance relative z-10 mx-auto w-full max-w-md ${
          visible ? "visible" : ""
        }`}
      >
        <div className="heritage-countdown-card">
          <div className="relative z-10">
            <h2
              className="heritage-countdown-title"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Menuju Hari Bahagia
            </h2>
            <p
              className="heritage-countdown-quote"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Setiap detik adalah langkah menuju takdir yang Allah siapkan.
            </p>

            <div className="heritage-divider mt-6 mb-8">
              <span className="heritage-divider-dot" />
              <span className="heritage-divider-line" />
              <span className="heritage-divider-dot" />
            </div>

            {mounted && timeLeft === null ? (
              <div className="heritage-countdown-expired">
                <p
                  className="heritage-countdown-expired-text"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  Alhamdulillah, hari bahagia telah tiba
                </p>
              </div>
            ) : (
              <div className="heritage-countdown-grid">
                <div className="heritage-countdown-unit">
                  <span
                    className="heritage-countdown-number"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {pad(displayTime?.days ?? 0)}
                  </span>
                  <span className="heritage-countdown-label">Hari</span>
                </div>
                <span className="heritage-countdown-separator">:</span>
                <div className="heritage-countdown-unit">
                  <span
                    className="heritage-countdown-number"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {pad(displayTime?.hours ?? 0)}
                  </span>
                  <span className="heritage-countdown-label">Jam</span>
                </div>
                <span className="heritage-countdown-separator">:</span>
                <div className="heritage-countdown-unit">
                  <span
                    className="heritage-countdown-number"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {pad(displayTime?.minutes ?? 0)}
                  </span>
                  <span className="heritage-countdown-label">Menit</span>
                </div>
                <span className="heritage-countdown-separator">:</span>
                <div className="heritage-countdown-unit">
                  <span
                    className="heritage-countdown-number"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {pad(displayTime?.seconds ?? 0)}
                  </span>
                  <span className="heritage-countdown-label">Detik</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
