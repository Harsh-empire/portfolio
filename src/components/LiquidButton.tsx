"use client";
import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticPull?: number;
}

export default function LiquidButton({
  children,
  className = "",
  magneticPull = 0.3,
  ...props
}: LiquidButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect logic
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    mouseX.set(x * magneticPull);
    mouseY.set(y * magneticPull);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x: mouseX, y: mouseY }}
      className={`relative overflow-hidden group magnetic-element ${className}`}
      {...props}
    >
      {/* Liquid background fill */}
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-white rounded-[50%_50%_0_0]"
        initial={{ height: "0%", top: "100%", borderRadius: "50% 50% 0 0" }}
        animate={
          isHovered
            ? { height: "150%", top: "-25%", borderRadius: "0% 0% 0% 0%" }
            : { height: "0%", top: "100%", borderRadius: "50% 50% 0 0" }
        }
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        style={{ zIndex: 0 }}
      />
      
      {/* Text Content */}
      <motion.span 
        className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-2 w-full h-full"
        animate={{ color: isHovered ? "#000000" : "#ffffff" }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
