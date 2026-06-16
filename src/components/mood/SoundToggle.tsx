"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

// Omar Esa — The Wedding Nasheed (Vocals Only)
const BGM_FILE = "/sacred/bgm.mp3";

// Fade in audio over ~1.6 seconds
function fadeIn(audio: HTMLAudioElement, targetVolume: number) {
  const steps = 20;
  const stepTime = 80;
  const volumeStep = targetVolume / steps;
  let currentStep = 0;
  const interval = setInterval(() => {
    currentStep++;
    audio.volume = Math.min(volumeStep * currentStep, targetVolume);
    if (currentStep >= steps) clearInterval(interval);
  }, stepTime);
}

// Fade out audio over ~1.2 seconds
function fadeOut(audio: HTMLAudioElement, onComplete?: () => void) {
  const steps = 15;
  const stepTime = 80;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Reuse existing audio instance from SacredHero (shared via window)
    const existing = (window as any).__sacredAudio as HTMLAudioElement | undefined;
    const audio = existing || new Audio();
    audio.loop = true;
    audio.preload = "metadata";
    audioRef.current = audio;
    (window as any).__sacredAudio = audio;
    // Check if already playing from Hero
    if (!audio.paused && audio.volume > 0) {
      setIsPlaying(true);
    }
    return () => {
      // Don't destroy audio — it's shared
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade out and pause
      fadeOut(audio, () => {
        audio.pause();
        setIsPlaying(false);
      });
    } else {
      // Play Omar Esa — The Wedding Nasheed
      audio.src = BGM_FILE;
      setIsLoading(true);
      audio.load();
      audio.play().then(() => {
        setIsLoading(false);
        setIsPlaying(true);
        fadeIn(audio, 0.3);
      }).catch(() => {
        setIsLoading(false);
      });
    }
  }, [isPlaying]);

  const accent = "#7D6A52";

  return (
    <button
      onClick={toggle}
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
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
        cursor: isLoading ? "wait" : "pointer",
        transition: "all 0.3s ease",
        zIndex: 56,
        boxShadow: isPlaying
          ? "0 0 8px rgba(125,106,82,0.25), 0 0 16px rgba(125,106,82,0.1)"
          : "0 1px 4px rgba(125, 106, 82, 0.08)",
        opacity: isLoading ? 0.6 : 1,
        animation: isPlaying ? "sacredPulse 3s ease-in-out infinite" : "none",
      }}
      title={isPlaying ? "Matikan musik" : "Putar musik"}
    >
      {isLoading ? (
        <div style={{
          width: "14px", height: "14px",
          border: `2px solid ${accent}`,
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "sacredSpin 0.8s linear infinite",
        }} />
      ) : (
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
          {isPlaying ? (
            <>
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </>
          ) : (
            <>
              <path d="M9 18V5l12-2v13" opacity="0.4" />
              <circle cx="6" cy="18" r="3" opacity="0.4" />
              <circle cx="18" cy="16" r="3" opacity="0.4" />
              <line x1="2" y1="2" x2="22" y2="22" strokeWidth="1.5" opacity="0.5" />
            </>
          )}
        </svg>
      )}

      <style>{`
        @keyframes sacredPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(125,106,82,0.25), 0 0 16px rgba(125,106,82,0.1); }
          50% { box-shadow: 0 0 12px rgba(125,106,82,0.4), 0 0 24px rgba(125,106,82,0.15); }
        }
        @keyframes sacredSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
