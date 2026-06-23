"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth out mouse position
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  
  // Velocity tracking
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  
  // Smooth out velocity
  const smoothVelocityX = useSpring(velocityX, { damping: 20, stiffness: 200 });
  const smoothVelocityY = useSpring(velocityY, { damping: 20, stiffness: 200 });
  
  // Transform velocity into stretch scale
  // Fast movement creates a long, stretched ellipse
  const scaleX = useTransform(smoothVelocityX, [-2000, 0, 2000], [1.8, 1, 1.8]);
  const scaleY = useTransform(smoothVelocityY, [-2000, 0, 2000], [0.6, 1, 0.6]);
  
  // Angle for rotation based on velocity direction
  const angle = useMotionValue(0);
  const smoothAngle = useSpring(angle, { damping: 20, stiffness: 200 });

  const lastPos = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    let animationFrame: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, .magnetic-element") || window.getComputedStyle(target).cursor === "pointer";
      setIsHovering(!!isInteractive);
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Velocity loop
    const trackVelocity = (time: number) => {
      if (lastPos.current.time) {
        const dt = time - lastPos.current.time;
        if (dt > 0) {
          const dx = mouseX.get() - lastPos.current.x;
          const dy = mouseY.get() - lastPos.current.y;
          
          const vx = (dx / dt) * 1000;
          const vy = (dy / dt) * 1000;
          
          velocityX.set(vx);
          velocityY.set(vy);
          
          // Calculate angle for the stretch rotation
          if (Math.abs(vx) > 50 || Math.abs(vy) > 50) {
            const rad = Math.atan2(vy, vx);
            angle.set(rad * (180 / Math.PI));
          } else {
            // Decay velocity to 0 when stopped
            velocityX.set(0);
            velocityY.set(0);
          }
        }
      }
      
      lastPos.current = { x: mouseX.get(), y: mouseY.get(), time };
      animationFrame = requestAnimationFrame(trackVelocity);
    };
    
    animationFrame = requestAnimationFrame(trackVelocity);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [mouseX, mouseY, velocityX, velocityY, angle]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      style={{
        x: useTransform(cursorX, v => v - 20),
        y: useTransform(cursorY, v => v - 20)
      }}
    >
      {/* Layer 3: Glowing halo that pulses on hover */}
      <motion.div
        className="absolute w-12 h-12 rounded-full bg-white blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0.15 : 0, scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Layer 2: Velocity-stretched outer ring */}
      <motion.div
        className="absolute w-full h-full border border-white/30 rounded-full"
        animate={{ opacity: isHovering ? 0 : 1 }}
        style={{
          scaleX,
          scaleY,
          rotate: smoothAngle
        }}
      />

      {/* Hover State: Target Lock Crosshair */}
      <motion.div
        className="absolute w-full h-full text-[#ff3300]"
        initial={{ scale: 2, opacity: 0, rotate: -45 }}
        animate={{ 
          scale: isHovering ? 1 : 2, 
          opacity: isHovering ? 1 : 0,
          rotate: isHovering ? 0 : -45
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <path d="M 4 20 L 12 20 M 36 20 L 28 20 M 20 4 L 20 12 M 20 36 L 20 28" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </motion.div>

      {/* Layer 1: Rotating dashed SVG ring with corner brackets */}
      <motion.div
        className="absolute w-full h-full"
        animate={{ 
          rotate: 360,
          scale: isHovering ? 0.6 : 1,
          opacity: isHovering ? 0.5 : 1 
        }}
        transition={{ 
          rotate: { duration: 10, ease: "linear", repeat: Infinity },
          scale: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      >
        <svg viewBox="0 0 40 40" className="w-full h-full text-white/50">
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          <path d="M 8 12 L 8 8 L 12 8" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 32 12 L 32 8 L 28 8" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 8 28 L 8 32 L 12 32" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M 32 28 L 32 32 L 28 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Layer 4: Click pulse dot */}
      <motion.div
        className="absolute w-2 h-2 bg-white rounded-full"
        animate={{ 
          scale: isClicking ? 4 : isHovering ? 0 : 1,
          opacity: isClicking ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
      
      {/* Persistent center dot */}
      <div className="absolute w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
}
