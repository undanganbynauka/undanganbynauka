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
  const [activeSound, setActiveSound] = useState(AMBIENT_SOUNDS[0].key);
  const [showPicker, setShowPicker] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
        setShowPicker(false);
      });
    } else {
      // Turn on — show the picker
      setShowPicker(true);
    }
  }, [isSoundOn]);

  const accent = "#7D6A52";

  return (
    <>
      {/* Sound picker — vertical like nav */}
      {showPicker && (
        <>
          <div
            onClick={() => setShowPicker(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 55,
              background: "rgba(0,0,0,0.08)",
            }}
          />
          <div
            style={{
              position: "fixed",
              bottom: "5.5rem",
              right: "1rem",
              zIndex: 56,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              animation: "nauka-fade-in 0.3s ease-out",
            }}
          >
            {AMBIENT_SOUNDS.map((sound) => {
              const isActive = sound.key === activeSound && isSoundOn;
              return (
                <button
                  key={sound.key}
                  onClick={() => playSound(sound.key)}
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
                  {sound.emoji}
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* Main toggle button */}
      <button
        onClick={toggleSound}
        disabled={isSoundLoading}
        style={{
          position: "fixed",
          bottom: "3.5rem",
          right: "1rem",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: `1px solid rgba(125, 110, 99, 0.15)`,
          background: "rgba(255, 255, 255, 0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isSoundLoading ? "wait" : "pointer",
          transition: "all 0.3s ease",
          zIndex: 56,
          boxShadow: "0 1px 4px rgba(125, 106, 82, 0.08)",
          opacity: isSoundLoading ? 0.6 : 1,
        }}
        title={isSoundOn ? "Matikan suara" : "Putar suara"}
      >
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
    </>
  );
}
