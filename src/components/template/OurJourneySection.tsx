"use client";

import React, { useState, useEffect, useRef } from "react";

const PHASES = [
  {
    label: "Ta'aruf",
    text: "Kami memulai dari proses ta'aruf, perkenalan yang dijaga dengan adab dan niat yang baik.",
    delay: 0,
  },
  {
    label: "Nadzor",
    text: "Dilanjutkan dengan nadzor, sebagai tahap saling mengenal secukupnya dalam batas yang Allah tetapkan.",
    delay: 200,
  },
  {
    label: "Khitbah",
    text: "Keluarga dipertemukan dalam proses khitbah sebagai bentuk keseriusan menuju pernikahan.",
    delay: 400,
  },
  {
    label: "Menikah",
    text: "Hingga akhirnya, dengan izin Allah dan restu keluarga, kami sampai pada akad pernikahan.",
    delay: 600,
  },
];

export function OurJourneySection() {
  const [sectionVisible, setSectionVisible] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

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

  // Stagger step appearance
  useEffect(() => {
    if (!sectionVisible) return;

    PHASES.forEach((phase, index) => {
      setTimeout(() => {
        setVisibleSteps((prev) => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, 500 + phase.delay); // 500ms base for heading to appear first
    });
  }, [sectionVisible]);

  // Calculate timeline line height based on visible steps
  useEffect(() => {
    const container = stepsContainerRef.current;
    if (!container) return;

    const visibleCount = visibleSteps.filter(Boolean).length;
    if (visibleCount === 0) {
      setLineHeight(0);
      return;
    }

    // Each step occupies 1/PHASES.length of the container
    const stepElements = container.querySelectorAll("[data-step]");
    if (stepElements.length === 0) return;

    // Calculate the height to reach the center of the last visible step's dot
    let totalHeight = 0;
    for (let i = 0; i < visibleCount; i++) {
      const stepEl = stepElements[i] as HTMLElement;
      if (i < visibleCount - 1) {
        totalHeight += stepEl.offsetHeight;
      } else {
        // For the last visible step, only go to the dot center (approx 10px from top)
        totalHeight += 10;
      }
    }

    setLineHeight(totalHeight);
  }, [visibleSteps]);

  const visibleCount = visibleSteps.filter(Boolean).length;

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
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
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
            opacity: sectionVisible ? 0.55 : 0,
            textAlign: "center",
            lineHeight: 1.8,
            maxWidth: "18rem",
            margin: "0 auto 2rem",
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          Kami menuliskan perjalanan ini dengan penuh rasa syukur.
        </p>

        {/* Timeline Container */}
        <div
          ref={stepsContainerRef}
          style={{ position: "relative", paddingLeft: "1.5rem" }}
        >
          {/* Background line (full height, very faint) */}
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
              transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* Steps */}
          {PHASES.map((phase, index) => {
            const isStepVisible = visibleSteps[index];
            const isLast = index === PHASES.length - 1;
            const isMenikah = index === 3;

            return (
              <div
                key={phase.label}
                data-step
                style={{
                  position: "relative",
                  paddingBottom: isLast ? 0 : "1.5rem",
                  opacity: isStepVisible ? 1 : 0,
                  transform: isStepVisible
                    ? "translateY(0)"
                    : "translateY(8px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
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
                      isMenikah && isStepVisible
                        ? "#B89B6A"
                        : "rgba(125, 110, 99, 0.3)"
                    }`,
                    background: isStepVisible
                      ? isMenikah
                        ? "#B89B6A"
                        : "rgba(125, 110, 99, 0.15)"
                      : "transparent",
                    transition: "all 0.5s ease",
                    transform: "translateX(-2px)",
                    boxShadow:
                      isMenikah && isStepVisible
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
                    opacity: isStepVisible ? 0.55 : 0.35,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "0.375rem",
                  }}
                >
                  {phase.label}
                </p>

                {/* Text */}
                <p
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontStyle: "italic",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    color: "#7D6E63",
                    lineHeight: 1.9,
                    textShadow:
                      isMenikah && isStepVisible
                        ? "0 0 20px rgba(184, 155, 106, 0.08)"
                        : "none",
                    transition: "text-shadow 1s ease",
                  }}
                >
                  {phase.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
