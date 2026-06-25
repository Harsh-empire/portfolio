"use client";
import React, { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;

  constructor(x: number, y: number, isClick: boolean) {
    this.x = x;
    this.y = y;
    if (isClick) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.maxLife = Math.random() * 40 + 20;
      this.size = Math.random() * 4 + 1.5;
    } else {
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.maxLife = Math.random() * 30 + 15;
      this.size = Math.random() * 2.5 + 0.5;
    }
    this.life = this.maxLife;
    this.color = '0, 255, 204'; // Neon cyan
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    // Add slight gravity/drag if desired, or just linear
    this.vx *= 0.95;
    this.vy *= 0.95;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = `rgba(${this.color}, ${alpha * 0.8})`;
    ctx.fill();
    ctx.shadowBlur = 0; // Reset for performance
  }
}

export default function ParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const lastMousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Spawn particles based on distance moved (prevents clumps when slow, fills gaps when fast)
      if (distance > 5) {
        particles.current.push(new Particle(e.clientX, e.clientY, false));
        lastMousePos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      // Spawn explosion
      for (let i = 0; i < 20; i++) {
        particles.current.push(new Particle(e.clientX, e.clientY, true));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseClick);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.update();
        if (p.life <= 0) {
          particles.current.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
    />
  );
}
