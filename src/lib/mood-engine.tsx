"use client";

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { MoodKey, MoodTheme, MOOD_THEMES } from "./mood-themes";

interface MoodEngineState {
  activeMood: MoodKey;
  activeTheme: MoodTheme;
  isTransitioning: boolean;
  isSoundOn: boolean;
  isSoundLoading: boolean;
}

interface MoodEngineActions {
  setMood: (mood: MoodKey) => void;
  toggleSound: () => void;
}

const MoodEngineContext = createContext<(MoodEngineState & MoodEngineActions) | null>(null);

export function useMoodEngine() {
  const ctx = useContext(MoodEngineContext);
  if (!ctx) throw new Error("useMoodEngine must be used within MoodEngineProvider");
  return ctx;
}

// Fade in audio over 2-3 seconds
function fadeIn(audio: HTMLAudioElement, targetVolume: number) {
  const steps = 30;
  const stepTime = 100;
  const volumeStep = targetVolume / steps;
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const newVol = Math.min(volumeStep * currentStep, targetVolume);
    audio.volume = newVol;
    if (currentStep >= steps) {
      clearInterval(interval);
    }
  }, stepTime);
}

// Fade out audio over 2-3 seconds
function fadeOut(audio: HTMLAudioElement, onComplete?: () => void) {
  const steps = 20;
  const stepTime = 100;
  const startVolume = audio.volume;
  const volumeStep = startVolume / steps;
  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const newVol = Math.max(startVolume - volumeStep * currentStep, 0);
    audio.volume = newVol;
    if (currentStep >= steps) {
      clearInterval(interval);
      onComplete?.();
    }
  }, stepTime);
}

export function MoodEngineProvider({ children }: { children: React.ReactNode }) {
  const [activeMood, setActiveMood] = useState<MoodKey>("calm-morning");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isSoundLoading, setIsSoundLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTheme = MOOD_THEMES[activeMood];

  // Initialize audio element
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

  // Crossfade audio helper
  const crossfadeAudio = useCallback((newSrc: string, targetVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      const currentPath = audio.src ? new URL(audio.src).pathname : "";
      if (currentPath === newSrc) {
        fadeIn(audio, targetVolume);
        return;
      }
    } catch {
      // Invalid URL, proceed with swap
    }

    fadeOut(audio, () => {
      audio.src = newSrc;
      setIsSoundLoading(true);
      audio.load();
      audio.play().then(() => {
        setIsSoundLoading(false);
        fadeIn(audio, targetVolume);
      }).catch(() => {
        setIsSoundLoading(false);
      });
    });
  }, []);

  // Set mood with transition
  const setMood = useCallback((mood: MoodKey) => {
    if (mood === activeMood || isTransitioning) return;

    setIsTransitioning(true);

    if (isSoundOn && audioRef.current) {
      const newTheme = MOOD_THEMES[mood];
      crossfadeAudio(newTheme.soundFile, 0.3);
    }

    setTimeout(() => {
      setActiveMood(mood);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 500);
  }, [activeMood, isTransitioning, isSoundOn, crossfadeAudio]);

  // Toggle sound
  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSoundOn) {
      fadeOut(audio, () => {
        audio.pause();
        setIsSoundOn(false);
      });
    } else {
      const theme = MOOD_THEMES[activeMood];
      audio.src = theme.soundFile;
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
  }, [isSoundOn, activeMood]);

  // Update audio source when mood changes
  useEffect(() => {
    if (isSoundOn && audioRef.current && !audioRef.current.paused) {
      const theme = MOOD_THEMES[activeMood];
      try {
        const currentPath = audioRef.current.src ? new URL(audioRef.current.src).pathname : "";
        if (currentPath !== theme.soundFile) {
          crossfadeAudio(theme.soundFile, 0.3);
        }
      } catch {
        // ignore
      }
    }
  }, [activeMood, isSoundOn, crossfadeAudio]);

  return (
    <MoodEngineContext.Provider
      value={{
        activeMood,
        activeTheme,
        isTransitioning,
        isSoundOn,
        isSoundLoading,
        setMood,
        toggleSound,
      }}
    >
      {children}
    </MoodEngineContext.Provider>
  );
}
