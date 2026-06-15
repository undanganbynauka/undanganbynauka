"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

const AMBIENT_SOUNDS = [
  { key: "water", file: "/assets/sounds/water-stream.mp3", emoji: "💧" },
  { key: "birds", file: "/assets/sounds/morning-birds.mp3", emoji: "🌤️" },
  { key: "crickets", file: "/assets/sounds/night-crickets.mp3", emoji: "🌕" },
];

// Fade in audio over ~2 seconds
function fadeIn(audio: HTMLAudioElement, targetVolume: number) {
  const steps = 20;
  const stepTime = 100;
  const volumeStep = targetVolume / steps;
  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    audio.volume = Math.min(volumeStep * currentStep, targetVolume);
    if (currentStep >= steps) clearInterval(interval);
  }, stepTime);
}

// Fade out audio over ~2 seconds
function fadeOut(audio: HTMLAudioElement, onComplete?: () => void) {
  const steps = 15;
  const stepTime = 100;
  const startVolume = audio.volume;
  const volumeStep = startVolume / steps;
  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    audio.volume = Math.max(startVolume - volumeStep * currentStep, 0);
    if (currentStep >= steps) {
      clearInterval(interval);
      onComplete?.();
    }
  }, stepTime);
}

export function SoundToggle() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isSoundLoading, setIsSoundLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const playSound = useCallback((soundKey: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    const sound = AMBIENT_SOUNDS.find((s) => s.key === soundKey);
    if (!sound) return;

    const startPlay = () => {
      audio.src = sound.file;
      setIsSoundLoading(true);
      audio.load();
      audio.play().then(() => {
        setIsSoundLoading(false);
        setIsSoundOn(true);
        fadeIn(audio, 0.3);
      }).catch(() => {
        setIsSoundLoading(false);
      });
    };

    if (isSoundOn && !audio.paused) {
      fadeOut(audio, () => {
        audio.pause();
        startPlay();
      });
    } else {
      startPlay();
    }
  }, [isSoundOn]);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSoundOn) {
      fadeOut(audio, () => {
        audio.pause();
        setIsSoundOn(false);
      });
    } else {
      playSound(AMBIENT_SOUNDS[activeIndex].key);
    }
  }, [isSoundOn, activeIndex, playSound]);

  // Long press / double click to cycle sound
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const nextIndex = (activeIndex + 1) % AMBIENT_SOUNDS.length;
    setActiveIndex(nextIndex);
    setCycleCount((c) => c + 1);
    if (isSoundOn) {
      playSound(AMBIENT_SOUNDS[nextIndex].key);
    }
  }, [activeIndex, isSoundOn, playSound]);

  const accent = "#7D6A52";
  const currentEmoji = AMBIENT_SOUNDS[activeIndex].emoji;

  return (
    <button
      onClick={toggleSound}
      onContextMenu={handleContextMenu}
      disabled={isSoundLoading}
      style={{
        position: "fixed",
        bottom: "3.5rem",
        right: "1rem",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: `1px solid ${accent}33`,
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isSoundLoading ? "wait" : "pointer",
        transition: "all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        zIndex: 60,
        boxShadow: isSoundOn
          ? `0 2px 10px rgba(125, 106, 82, 0.15)`
          : "0 1px 3px rgba(0,0,0,0.04)",
        opacity: isSoundLoading ? 0.6 : 1,
      }}
      title={isSoundOn ? "Matikan suara" : "Putar suara"}
    >
      {/* Music note icon with slash when OFF */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
        {!isSoundOn && (
          <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2" />
        )}
      </svg>
    </button>
  );
}
