"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";

function CursorScrollAura() {
  const [isScrolling, setIsScrolling] = useState(false);
  
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Spring for the horizontal scanline
  const scanlineY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });
  
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Radial Spotlight Aura */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9997]"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle 300px at ${x}px ${y}px, rgba(255,255,255,0.15), transparent)`
          ),
          opacity: isScrolling ? 1 : 0.4
        }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[9999]"
      style={{ 
        scaleX,
        boxShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.4)"
      }}
    />
  );
}

export default function ScrollFX() {
  return (
    <>
      <CursorScrollAura />
      <ScrollProgressBar />
    </>
  );
}
