"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const PHASES = [
  {
    label: "Ta'aruf",
    text: "Kami memulai dari proses ta'aruf, perkenalan yang dijaga dengan adab dan niat yang baik.",
  },
  {
    label: "Nadzor",
    text: "Dilanjutkan dengan nadzor, sebagai tahap saling mengenal secukupnya dalam batas yang Allah tetapkan.",
  },
  {
    label: "Khitbah",
    text: "Keluarga dipertemukan dalam proses khitbah sebagai bentuk keseriusan menuju pernikahan.",
  },
  {
    label: "Menikah",
    text: "Hingga akhirnya, dengan izin Allah dan restu keluarga, kami sampai pada akad pernikahan.",
  },
];

const TYPE_SPEED = 70; // ms per character
const PAUSE_BETWEEN = 1800; // ms pause between phases
const LABEL_REVEAL = 400; // ms for label to appear before typing starts

export function OurJourneySection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  // Each phase tracks: label visible, typed text, typing complete
  const [phaseStates, setPhaseStates] = useState<
    { labelVisible: boolean; typedText: string; typingDone: boolean }[]
  >(PHASES.map(() => ({ labelVisible: false, typedText: "", typingDone: false })));

  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const typingRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionVisible) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  // Staggered heading reveal
  useEffect(() => {
    if (!sectionVisible) return;
    const t1 = setTimeout(() => setShowHeading(true), 200);
    const t2 = setTimeout(() => setShowSubtitle(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [sectionVisible]);

  // Typewriter logic — sequential, one phase at a time
  const startTyping = useCallback(
    (phaseIndex: number) => {
      if (phaseIndex >= PHASES.length) return;
      if (typingRef.current) return;
      typingRef.current = true;

      const phase = PHASES[phaseIndex];

      // Step 1: show label
      setPhaseStates((prev) => {
        const next = [...prev];
        next[phaseIndex] = { ...next[phaseIndex], labelVisible: true };
        return next;
      });

      // Step 2: start typing after label appears
      setTimeout(() => {
        let charIndex = 0;
        const fullText = phase.text;

        const typeInterval = setInterval(() => {
          charIndex++;
          const currentSlice = fullText.slice(0, charIndex);

          setPhaseStates((prev) => {
            const next = [...prev];
            next[phaseIndex] = { ...next[phaseIndex], typedText: currentSlice };
            return next;
          });

          if (charIndex >= fullText.length) {
            clearInterval(typeInterval);
            // Mark typing done
            setPhaseStates((prev) => {
              const next = [...prev];
              next[phaseIndex] = { ...next[phaseIndex], typingDone: true };
              return next;
            });
            typingRef.current = false;

            // Pause then start next phase
            if (phaseIndex < PHASES.length - 1) {
              setTimeout(() => {
                startTyping(phaseIndex + 1);
              }, PAUSE_BETWEEN);
            }
          }
        }, TYPE_SPEED);
      }, LABEL_REVEAL);
    },
    []
  );

  // Start first typewriter after heading appears
  useEffect(() => {
    if (!showSubtitle) return;
    const t = setTimeout(() => startTyping(0), 600);
    return () => clearTimeout(t);
  }, [showSubtitle, startTyping]);

  // Calculate timeline line height
  useEffect(() => {
    const container = stepsContainerRef.current;
    if (!container) return;

    const visibleCount = phaseStates.filter((s) => s.labelVisible).length;
    if (visibleCount === 0) {
      setLineHeight(0);
      return;
    }

    const stepElements = container.querySelectorAll("[data-step]");
    if (stepElements.length === 0) return;

    let totalHeight = 0;
    for (let i = 0; i < visibleCount; i++) {
      const stepEl = stepElements[i] as HTMLElement;
      if (i < visibleCount - 1) {
        totalHeight += stepEl.offsetHeight;
      } else {
        totalHeight += 10;
      }
    }

    setLineHeight(totalHeight);
  }, [phaseStates]);

  const visibleCount = phaseStates.filter((s) => s.labelVisible).length;
  const ease = "cubic-bezier(0.25, 0.1, 0.25, 1)";

  return (
    <section
      style={{
        position: "relative",
        background: "#F8F4EE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
      }}
    >
      {/* Paper grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "256px 256px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Single Card */}
      <div
        ref={sectionRef}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "22rem",
          width: "100%",
          background: "rgba(125, 110, 99, 0.04)",
          border: "1px solid rgba(125, 110, 99, 0.12)",
          borderRadius: "20px",
          padding: "2.5rem 2rem",
        }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.125rem",
            fontWeight: 400,
            color: "#7D6E63",
            letterSpacing: "0.15em",
            textAlign: "center",
            marginBottom: "0.75rem",
            opacity: showHeading ? 1 : 0,
            transform: showHeading ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 1s ${ease}, transform 1s ${ease}`,
          }}
        >
          Our Journey
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "0.75rem",
            fontWeight: 400,
            color: "#7D6E63",
            opacity: showSubtitle ? 0.55 : 0,
            textAlign: "center",
            lineHeight: 1.8,
            maxWidth: "18rem",
            margin: "0 auto 2rem",
            transform: showSubtitle ? "translateY(0)" : "translateY(15px)",
            transition: `opacity 1s ${ease} 0.2s, transform 1s ${ease} 0.2s`,
          }}
        >
          Kami menuliskan perjalanan ini dengan penuh rasa syukur.
        </p>

        {/* Timeline Container */}
        <div
          ref={stepsContainerRef}
          style={{ position: "relative", paddingLeft: "1.5rem" }}
        >
          {/* Background line */}
          <div
            style={{
              position: "absolute",
              left: "4px",
              top: "6px",
              width: "1px",
              bottom: "6px",
              background: "rgba(125, 110, 99, 0.06)",
            }}
          />

          {/* Active line — grows vertically */}
          <div
            style={{
              position: "absolute",
              left: "4px",
              top: "6px",
              width: "1px",
              height: `${lineHeight}px`,
              background:
                visibleCount === PHASES.length
                  ? "linear-gradient(to bottom, rgba(125,110,99,0.15), rgba(184,155,106,0.35))"
                  : "rgba(125, 110, 99, 0.18)",
              transition: `height 0.8s ${ease}`,
            }}
          />

          {/* Steps */}
          {PHASES.map((phase, index) => {
            const state = phaseStates[index];
            const isLast = index === PHASES.length - 1;
            const isMenikah = index === 3;

            return (
              <div
                key={phase.label}
                data-step
                style={{
                  position: "relative",
                  paddingBottom: isLast ? 0 : "1.5rem",
                  opacity: state.labelVisible ? 1 : 0,
                  transform: state.labelVisible
                    ? "translateY(0)"
                    : "translateY(15px)",
                  transition: `opacity 0.8s ${ease}, transform 0.8s ${ease}`,
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-1.5rem",
                    top: "4px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    border: `1.5px solid ${
                      isMenikah && state.typingDone
                        ? "#B89B6A"
                        : "rgba(125, 110, 99, 0.3)"
                    }`,
                    background: state.labelVisible
                      ? isMenikah && state.typingDone
                        ? "#B89B6A"
                        : "rgba(125, 110, 99, 0.15)"
                      : "transparent",
                    transition: `all 0.8s ${ease}`,
                    transform: "translateX(-2px)",
                    boxShadow:
                      isMenikah && state.typingDone
                        ? "0 0 8px rgba(184, 155, 106, 0.25)"
                        : "none",
                  }}
                />

                {/* Label */}
                <p
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    fontSize: "0.5625rem",
                    fontWeight: 500,
                    color: "#7D6E63",
                    opacity: state.labelVisible ? 0.55 : 0.35,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "0.375rem",
                    transition: `opacity 0.6s ${ease}`,
                  }}
                >
                  {phase.label}
                </p>

                {/* Text — typewriter */}
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                    lineHeight: 1.9,
                    textShadow:
                      isMenikah && state.typingDone
                        ? "0 0 20px rgba(184, 155, 106, 0.08)"
                        : "none",
                    transition: "text-shadow 1s ease",
                    minHeight: "2.5rem",
                  }}
                >
                  {state.typedText}
                  {!state.typingDone && state.typedText.length > 0 && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "1px",
                        height: "0.85em",
                        background: "#7D6E63",
                        marginLeft: "1px",
                        animation: "nauka-blink 0.8s ease-in-out infinite",
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes nauka-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
