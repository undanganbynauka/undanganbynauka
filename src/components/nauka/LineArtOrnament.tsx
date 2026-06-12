"use client";

import React from "react";

interface LineArtOrnamentProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function LineArtOrnament({ position, className = "" }: LineArtOrnamentProps) {
  const positionClasses = {
    "top-left": "top-6 left-6 md:top-10 md:left-10",
    "top-right": "top-6 right-6 md:top-10 md:right-10 -scale-x-100",
    "bottom-left": "bottom-6 left-6 md:bottom-10 md:left-10 -scale-y-100",
    "bottom-right":
      "bottom-6 right-6 md:bottom-10 md:right-10 -scale-x-100 -scale-y-100",
  };

  return (
    <svg
      className={`nauka-ornament ${positionClasses[position]} ${className}`}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Delicate corner line art */}
      <path
        d="M2 2 L2 30 Q2 2 30 2"
        stroke="#B89B6A"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M2 2 L2 18 Q2 6 18 2"
        stroke="#B89B6A"
        strokeWidth="0.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Small leaf/dot accent */}
      <circle cx="6" cy="6" r="1.5" fill="#B89B6A" opacity="0.3" />
      {/* Thin extending line */}
      <path
        d="M2 30 Q2 10 10 2"
        stroke="#B89B6A"
        strokeWidth="0.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="2 3"
        opacity="0.4"
      />
    </svg>
  );
}
