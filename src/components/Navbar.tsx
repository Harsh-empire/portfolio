"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import LiquidButton from "./LiquidButton";
import MagneticLink from "./MagneticLink";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-10 pt-6 flex items-start justify-between pointer-events-none">
      {/* Left Pill */}
      <div className="pointer-events-auto flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full pl-2 pr-6 py-2">
        <div className="relative w-8 h-8 flex items-center justify-center bg-white/5 rounded-full">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <motion.circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeDasharray="88"
              style={{ pathLength }}
            />
          </svg>
          <div className="absolute w-2 h-2 bg-white rounded-full">
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-xs font-medium tracking-tight lowercase font-readex">
            harsh kumar
          </span>
          <span className="text-white/40 text-[10px] tracking-widest uppercase font-readex">
            ai architect
          </span>
        </div>
      </div>

      {/* Center Pill */}
      <div className="hidden md:flex pointer-events-auto items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
        {["work", "brain", "experience", "skills", "contact"].map((link) => (
          <MagneticLink
            key={link}
            href={`#${link}`}
            className="text-white/60 hover:text-white text-xs font-medium px-4 py-2 uppercase tracking-wider font-readex"
          >
            {link}
          </MagneticLink>
        ))}
      </div>

      {/* Right Pill */}
      <div className="pointer-events-auto">
        <LiquidButton 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium rounded-full px-6 py-3 uppercase tracking-wider font-readex"
        >
          get started →
        </LiquidButton>
      </div>
    </nav>
  );
}
