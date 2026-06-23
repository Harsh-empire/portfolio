"use client";
import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

interface MountainLayer {
  points: { x: number; y: number }[];
  color: string;
  parallaxFactor: number;
}

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const mountainsRef = useRef<MountainLayer[]>([]);
  const scrollYRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const animationRef = useRef<number>(0);
  const lastShootingStarTime = useRef(0);

  const generateMountains = useCallback((w: number, h: number): MountainLayer[] => {
    const layers: MountainLayer[] = [];
    const configs = [
      { baseY: h * 0.72, maxPeak: h * 0.18, segments: 12, color: "#0a0a0a", parallax: 0.02 },
      { baseY: h * 0.78, maxPeak: h * 0.14, segments: 16, color: "#0d0d0d", parallax: 0.035 },
      { baseY: h * 0.84, maxPeak: h * 0.10, segments: 20, color: "#111111", parallax: 0.05 },
      { baseY: h * 0.90, maxPeak: h * 0.06, segments: 24, color: "#161616", parallax: 0.07 },
    ];

    for (const cfg of configs) {
      const points: { x: number; y: number }[] = [];
      const segWidth = (w + 200) / cfg.segments;

      points.push({ x: -100, y: h + 10 });

      for (let i = 0; i <= cfg.segments; i++) {
        const x = -100 + i * segWidth;
        // Perlin-like noise using layered sine waves for natural ridgelines
        const noise1 = Math.sin(i * 0.8 + cfg.baseY * 0.01) * 0.5;
        const noise2 = Math.sin(i * 1.6 + cfg.baseY * 0.02) * 0.25;
        const noise3 = Math.sin(i * 3.2 + cfg.baseY * 0.03) * 0.125;
        const combined = (noise1 + noise2 + noise3 + 0.875) / 1.75;
        const peakY = cfg.baseY - cfg.maxPeak * combined;

        // Add sub-peaks for jagged, realistic ridges
        if (i > 0 && i < cfg.segments) {
          const midX = x - segWidth * 0.5;
          const subNoise = Math.sin(i * 2.1 + cfg.baseY * 0.015) * 0.3;
          const midY = cfg.baseY - cfg.maxPeak * (combined * 0.7 + subNoise * 0.3);
          points.push({ x: midX, y: midY });
        }

        points.push({ x, y: peakY });
      }

      points.push({ x: w + 100, y: h + 10 });
      layers.push({ points, color: cfg.color, parallaxFactor: cfg.parallax });
    }

    return layers;
  }, []);

  const generateStars = useCallback((w: number, h: number): Star[] => {
    const stars: Star[] = [];
    const count = Math.floor((w * h) / 2500); // Density based on screen area

    for (let i = 0; i < count; i++) {
      // Weighted random: more small stars, fewer large ones
      const sizeRand = Math.random();
      let radius: number;
      if (sizeRand < 0.7) radius = Math.random() * 0.6 + 0.2;
      else if (sizeRand < 0.92) radius = Math.random() * 1.0 + 0.6;
      else radius = Math.random() * 1.5 + 1.0;

      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.75, // Stars only in upper 75%
        radius,
        opacity: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    return stars;
  }, []);

  const spawnShootingStar = useCallback((w: number, h: number): ShootingStar => {
    const angle = Math.random() * 0.4 + 0.3; // 17° - 40° downward angle
    return {
      x: Math.random() * w * 0.8,
      y: Math.random() * h * 0.3,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 12 + 8,
      angle,
      opacity: 1,
      life: 0,
      maxLife: Math.random() * 40 + 30,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = document.documentElement.scrollHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${document.documentElement.scrollHeight}px`;
      ctx.scale(dpr, dpr);

      const w = window.innerWidth;
      const h = document.documentElement.scrollHeight;
      starsRef.current = generateStars(w, h);
      mountainsRef.current = generateMountains(w, window.innerHeight);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let frame = 0;

    const draw = () => {
      const w = window.innerWidth;
      const totalH = document.documentElement.scrollHeight;
      const viewH = window.innerHeight;
      const scroll = scrollYRef.current;

      // Calculate scroll velocity for shooting star triggers
      scrollVelocityRef.current = Math.abs(scroll - lastScrollYRef.current);
      lastScrollYRef.current = scroll;

      ctx.clearRect(0, 0, w, totalH);

      // ─── Draw Stars ───
      frame++;
      for (const star of starsRef.current) {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.opacity * (0.6 + 0.4 * twinkle);
        if (alpha <= 0) continue;

        // Subtle parallax on stars based on scroll
        const parallaxY = star.y - scroll * 0.05;

        ctx.beginPath();
        ctx.arc(star.x, parallaxY, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Glow for brighter stars
        if (star.radius > 1.0) {
          ctx.beginPath();
          ctx.arc(star.x, parallaxY, star.radius * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(
            star.x, parallaxY, 0,
            star.x, parallaxY, star.radius * 3
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // ─── Spawn Shooting Stars on Scroll ───
      const now = performance.now();
      if (scrollVelocityRef.current > 3 && now - lastShootingStarTime.current > 400) {
        shootingStarsRef.current.push(spawnShootingStar(w, totalH));
        lastShootingStarTime.current = now;
      }
      // Also occasional ambient ones
      if (Math.random() < 0.003) {
        shootingStarsRef.current.push(spawnShootingStar(w, totalH));
      }

      // ─── Draw Shooting Stars ───
      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const s = shootingStarsRef.current[i];
        s.life++;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        const progress = s.life / s.maxLife;
        s.opacity = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        if (s.life >= s.maxLife) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${s.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.9})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        const headGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 0.8})`);
        headGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = headGlow;
        ctx.fill();
      }

      // ─── Draw Mountains (per viewport section) ───
      // Repeat mountains at bottom of each viewport-height section
      const sections = Math.ceil(totalH / viewH);
      for (let sec = 0; sec < sections; sec++) {
        const baseY = (sec + 1) * viewH - viewH * 0.05;
        const scrollOffset = scroll * 0.02;

        for (const layer of mountainsRef.current) {
          ctx.beginPath();
          const offsetY = baseY - viewH * 0.1;

          for (let p = 0; p < layer.points.length; p++) {
            const pt = layer.points[p];
            const drawX = pt.x - scrollOffset * layer.parallaxFactor * 100;
            const drawY = offsetY + (pt.y - viewH * 0.7);

            if (p === 0) ctx.moveTo(drawX, drawY);
            else ctx.lineTo(drawX, drawY);
          }

          ctx.closePath();
          ctx.fillStyle = layer.color;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [generateStars, generateMountains, spawnShootingStar]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ position: "fixed", top: 0, left: 0 }}
    />
  );
}
