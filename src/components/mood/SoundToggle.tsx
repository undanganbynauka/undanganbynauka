"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

const AMBIENT_SOUND = {
  key: "water",
  file: "/assets/sounds/water-stream.mp3",
  emoji: "💧",
};

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audio.src = AMBIENT_SOUND.file;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSoundOn) {
      fadeOut(audio, () => {
        audio.pause();
        setIsSoundOn(false);
      });
    } else {
      setIsSoundLoading(true);
      audio.load();
      audio.play().then(() => {
        setIsSoundLoading(false);
        setIsSoundOn(true);
        fadeIn(audio, 0.3);
      }).catch(() => {
        setIsSoundLoading(false);
      });
    }
  }, [isSoundOn]);

  const accent = "#7D6A52";

  return (
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
      title={isSoundOn ? "Matikan suara" : "Putar suara"}
    >
      <span style={{ fontSize: "1rem", lineHeight: 1 }}>
        {isSoundOn ? AMBIENT_SOUND.emoji : AMBIENT_SOUND.emoji}
      </span>
    </button>
  );
}
