"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function CanvasCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let points: { x: number; y: number; age: number }[] = [];
    let mouse = { x: width / 2, y: height / 2 };
    let isMoving = false;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;
      points.push({ x: mouse.x, y: mouse.y, age: 0 });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw fluid trail
      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
          const pt = points[i];
          const prevPt = points[i - 1];
          const cx = (prevPt.x + pt.x) / 2;
          const cy = (prevPt.y + pt.y) / 2;
          ctx.quadraticCurveTo(prevPt.x, prevPt.y, cx, cy);
          
          // Age the points
          pt.age += 1;
        }

        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.stroke();
      }

      // Draw the technical crosshair head
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 16, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw crosshair lines
      ctx.beginPath();
      ctx.moveTo(mouse.x - 24, mouse.y);
      ctx.lineTo(mouse.x - 12, mouse.y);
      ctx.moveTo(mouse.x + 12, mouse.y);
      ctx.lineTo(mouse.x + 24, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - 24);
      ctx.lineTo(mouse.x, mouse.y - 12);
      ctx.moveTo(mouse.x, mouse.y + 12);
      ctx.lineTo(mouse.x, mouse.y + 24);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
      ctx.stroke();

      // Filter out old points for the trail (water effect)
      points = points.filter((p) => p.age < 20);

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-screen"
    />
  );
}
