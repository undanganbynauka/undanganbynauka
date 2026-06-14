"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useMoodEngine } from "@/lib/mood-engine";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  targetOpacity: number;
  phase: number;
  phaseSpeed: number;
}

export function AmbientLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const { activeTheme } = useMoodEngine();

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 25000), 40);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const [minOp, maxOp] = activeTheme.particleOpacity;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: 0,
        targetOpacity: minOp + Math.random() * (maxOp - minOp),
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.005 + Math.random() * 0.01,
      });
    }
    particlesRef.current = particles;
  }, [activeTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      for (const p of particles) {
        p.phase += p.phaseSpeed * activeTheme.animSpeed;
        p.x += p.speedX * activeTheme.animSpeed;
        p.y += p.speedY * activeTheme.animSpeed;

        // Breathing opacity
        p.opacity += (p.targetOpacity * (0.5 + 0.5 * Math.sin(p.phase)) - p.opacity) * 0.02;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (activeTheme.particleType === "firefly") {
          // Firefly: soft glow dot
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, activeTheme.particleColor);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeTheme.particleType === "leaf") {
          // Leaf: small elongated shape
          ctx.fillStyle = activeTheme.particleColor;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 2, p.size * 0.8, p.phase, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeTheme.particleType === "sand") {
          // Sand: tiny grain dots
          ctx.fillStyle = activeTheme.particleColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Dust: soft floating dots (default)
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          gradient.addColorStop(0, activeTheme.particleColor);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [activeTheme, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
