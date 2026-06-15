"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

const AMBIENT_SOUNDS = [
  { key: "birds", label: "Burung", file: "/assets/sounds/calm-morning.mp3", emoji: "\uD83C\uDF43" },
  { key: "crickets", label: "Jangkrik", file: "/assets/sounds/soft-evening.mp3", emoji: "\uD83C\uDF19" },
  { key: "forest", label: "Hutan", file: "/assets/sounds/earth-serenity.mp3", emoji: "\uD83C\uDF3E" },
  { key: "wind", label: "Angin", file: "/assets/sounds/warm-sand.mp3", emoji: "\uD83C\uDF0D" },
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
  const [showPicker, setShowPicker] = useState(false);
  const [activeSound, setActiveSound] = useState(AMBIENT_SOUNDS[0].key);
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

    setActiveSound(soundKey);

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

    setShowPicker(false);
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
      playSound(activeSound);
    }
  }, [isSoundOn, activeSound, playSound]);

  const accent = "#7D6A52";

  return (
    <>
      {/* Main toggle button */}
      <button
        onClick={toggleSound}
        disabled={isSoundLoading}
        style={{
          position: "fixed",
          bottom: "1rem",
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
        title={isSoundOn ? "Matikan ambience" : "Putar ambience"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isSoundOn ? (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </>
          ) : (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          )}
        </svg>
      </button>

      {/* Sound picker — small expand button */}
      {isSoundOn && (
        <button
          onClick={() => setShowPicker(!showPicker)}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "3.25rem",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: `1px solid ${accent}22`,
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            zIndex: 60,
            fontSize: "0.75rem",
            color: accent,
          }}
          title="Ganti suara"
        >
          {AMBIENT_SOUNDS.find((s) => s.key === activeSound)?.emoji}
        </button>
      )}

      {/* Picker popup */}
      {showPicker && (
        <div
          style={{
            position: "fixed",
            bottom: "3.5rem",
            right: "1rem",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(125, 110, 99, 0.12)",
            borderRadius: "12px",
            padding: "0.5rem",
            zIndex: 61,
            minWidth: "120px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          {AMBIENT_SOUNDS.map((sound) => (
            <button
              key={sound.key}
              onClick={() => playSound(sound.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "0.5rem 0.625rem",
                border: "none",
                background: activeSound === sound.key ? "rgba(125, 106, 82, 0.08)" : "transparent",
                borderRadius: "8px",
                cursor: "pointer",
                fontFamily: "var(--font-jakarta)",
                fontSize: "0.6875rem",
                color: activeSound === sound.key ? "#7D6A52" : "#6F6F6F",
                fontWeight: activeSound === sound.key ? 500 : 400,
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "0.875rem" }}>{sound.emoji}</span>
              {sound.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
