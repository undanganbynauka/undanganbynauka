"use client";

import React from "react";

interface SectionEdgeOrnamentProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function SectionEdgeOrnament({ position }: SectionEdgeOrnamentProps) {
  const posClass = {
    "top-left": "top-4 left-4 md:top-6 md:left-6",
    "top-right": "top-4 right-4 md:top-6 md:right-6",
    "bottom-left": "bottom-4 left-4 md:bottom-6 md:left-6",
    "bottom-right": "bottom-4 right-4 md:bottom-6 md:right-6",
  }[position];

  const flipClass = {
    "top-left": "",
    "top-right": "scale-x-[-1]",
    "bottom-left": "scale-y-[-1]",
    "bottom-right": "scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      className={`nauka-edge-ornament ${posClass} ${flipClass}`}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Thin L-shape corner line */}
      <path
        d="M1 1 L1 20"
        stroke="#B89B6A"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M1 1 L20 1"
        stroke="#B89B6A"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Small accent dot */}
      <circle cx="4" cy="4" r="1" fill="#B89B6A" opacity="0.5" />
      {/* Tiny inner curve */}
      <path
        d="M1 12 Q1 1 12 1"
        stroke="#B89B6A"
        strokeWidth="0.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
