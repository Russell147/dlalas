"use client";

import { useEffect, useRef } from "react";

type SandColor = readonly [number, number, number];

const SAND_COLORS: SandColor[] = [
  [201, 169, 106],
  [184, 146, 82],
  [222, 196, 140],
  [160, 125, 70],
];

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  vx: number;
  vy: number;
  phase: number;
  color: SandColor;
}

export default function SandParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = mediaQuery.matches;
    let particles: Particle[] = [];
    let gustStrength = 0;
    let animationFrame = 0;
    let lastScrollY = window.scrollY;

    const createParticle = (width: number, height: number): Particle => {
      const color = SAND_COLORS[Math.floor(Math.random() * SAND_COLORS.length)];
      const radius = Number((Math.random() * (2.3 - 0.6) + 0.6).toFixed(2));
      const opacity = Number((Math.random() * (0.75 - 0.3) + 0.3).toFixed(2));
      const baseSpeed = Number((Math.random() * (0.95 - 0.25) + 0.25).toFixed(2));

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        opacity,
        vx: baseSpeed,
        vy: Number((Math.random() * 0.6 + 0.18).toFixed(2)),
        phase: Math.random() * Math.PI * 2,
        color,
      };
    };

    const setCanvasSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.max(Math.floor((width * height) / 7000), 1), 220);
      particles = Array.from({ length: count }, () => createParticle(width, height));
    };

    const drawStatic = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        context.beginPath();
        context.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.opacity})`;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const animate = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      const now = performance.now();

      context.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const wobble = Math.sin(now * 0.0015 + particle.phase) * 1.2;
        particle.x += particle.vx + gustStrength * 0.8;
        particle.y += particle.vy + gustStrength * 0.25 + 0.12;

        if (particle.x > width + particle.radius) particle.x = -particle.radius;
        if (particle.x < -particle.radius) particle.x = width + particle.radius;
        if (particle.y > height + particle.radius) particle.y = -particle.radius;
        if (particle.y < -particle.radius) particle.y = height + particle.radius;

        context.beginPath();
        context.fillStyle = `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.opacity})`;
        context.arc(particle.x + wobble, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      gustStrength *= 0.94;
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      gustStrength = Math.min(gustStrength + scrollDelta * 0.02 + 0.2, 2.4);
    };

    const handleResize = () => {
      setCanvasSize();
      if (reducedMotion) drawStatic();
    };

    setCanvasSize();

    if (reducedMotion) {
      drawStatic();
    } else {
      animationFrame = window.requestAnimationFrame(animate);
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
