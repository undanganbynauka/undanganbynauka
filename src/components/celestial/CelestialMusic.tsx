"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * CelestialMusic — Background music toggle for celestial wedding invitation.
 * Default: OFF. Click to play/pause.
 * Volume: 30%. Loop: yes. Smooth fade in/out.
 * Song: Maher Zain — For the Rest of My Life (Vocals Only)
 */
export function CelestialMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const fadeRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio("/celestial/bgm.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setIsReady(true), { once: true });

    return () => {
      audio.pause();
      audio.src = "";
      if (fadeRef.current) clearInterval(fadeRef.current);
    };
  }, []);

  // Smooth fade in
  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const target = 0.3; // 30% volume
    const step = 0.02;
    if (fadeRef.current) clearInterval(fadeRef.current);
    fadeRef.current = setInterval(() => {
      if (!audio) { clearInterval(fadeRef.current!); return; }
      if (audio.volume < target) {
        audio.volume = Math.min(audio.volume + step, target);
      } else {
        audio.volume = target;
        clearInterval(fadeRef.current!);
      }
    }, 80);
  }, []);

  // Smooth fade out
  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const step = 0.02;
    if (fadeRef.current) clearInterval(fadeRef.current);
    fadeRef.current = setInterval(() => {
      if (!audio) { clearInterval(fadeRef.current!); return; }
      if (audio.volume > step) {
        audio.volume = Math.max(audio.volume - step, 0);
      } else {
        audio.volume = 0;
        audio.pause();
        clearInterval(fadeRef.current!);
      }
    }, 80);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isReady) return;

    if (isPlaying) {
      fadeOut();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        fadeIn();
        setIsPlaying(true);
      }).catch(() => {
        // Browser blocked autoplay — user needs to interact again
        setIsPlaying(false);
      });
    }
  }, [isPlaying, isReady, fadeIn, fadeOut]);

  return (
    <>
      {/* CSS Animations */}
      <style>{`
        @keyframes celestial-music-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201, 169, 110, 0.15), 0 1px 4px rgba(201, 169, 110, 0.08); }
          50% { box-shadow: 0 0 12px 2px rgba(201, 169, 110, 0.2), 0 1px 4px rgba(201, 169, 110, 0.08); }
        }
        @keyframes celestial-music-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .celestial-music-btn {
          animation: none;
        }
        .celestial-music-btn.playing {
          animation: celestial-music-pulse 3s ease-in-out infinite;
        }
        .celestial-music-ring {
          animation: celestial-music-ring 2s ease-out infinite;
          pointer-events: none;
        }
      `}</style>

      <button
        onClick={toggle}
        className={`celestial-music-btn ${isPlaying ? "playing" : ""}`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause Music" : "Play Music"}
        disabled={!isReady}
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "1rem",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(201, 169, 110, 0.15)",
          background: "rgba(11, 16, 38, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: isReady ? "pointer" : "default",
          zIndex: 56,
          transition: "all 0.3s ease",
          boxShadow: "0 1px 4px rgba(201, 169, 110, 0.08)",
          opacity: isReady ? 1 : 0.4,
          outline: "none",
        }}
      >
        {/* Ripple ring when playing */}
        {isPlaying && (
          <span
            className="celestial-music-ring"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px solid rgba(201, 169, 110, 0.2)",
            }}
          />
        )}

        {/* Music Note / Mute Icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C9A96E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isPlaying ? (
            <>
              {/* Music note — playing */}
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </>
          ) : (
            <>
              {/* Music note — muted */}
              <path d="M9 18V5l12-2v13" opacity="0.4" />
              <circle cx="6" cy="18" r="3" opacity="0.4" />
              <circle cx="18" cy="16" r="3" opacity="0.4" />
              {/* Mute line */}
              <line x1="3" y1="3" x2="21" y2="21" strokeWidth="1.5" opacity="0.5" />
            </>
          )}
        </svg>
      </button>
    </>
  );
}
