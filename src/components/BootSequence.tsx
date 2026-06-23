"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/hooks/useSound";

const BOOT_TEXTS = [
  "> INITIALIZING NODE-001...",
  "> LOADING NEURAL NETWORKS...",
  "> BYPASSING SECURITY...",
  "> ACCESS GRANTED."
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const { playBoot } = useSound();

  useEffect(() => {
    let isMounted = true;
    
    const runSequence = async () => {
      // Play boot sound (browsers may block this without interaction, but it will try)
      playBoot();

      for (let i = 0; i < BOOT_TEXTS.length; i++) {
        if (!isMounted) return;
        setLines(prev => [...prev, BOOT_TEXTS[i]]);
        await new Promise(r => setTimeout(r, 600)); // Delay between lines
      }
      
      if (!isMounted) return;
      await new Promise(r => setTimeout(r, 500)); // Hold on screen before fading
      onComplete();
    };

    runSequence();
    
    return () => { isMounted = false; };
  }, [onComplete, playBoot]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-start justify-end p-8 bg-black text-[#00ffcc] font-mono pointer-events-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ffcc]/5 via-black to-black opacity-50" />
      
      <div className="relative z-10 space-y-2 mb-12">
        {lines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm md:text-lg tracking-widest uppercase opacity-80 shadow-[#00ffcc]"
            style={{ textShadow: "0 0 10px rgba(0, 255, 204, 0.5)" }}
          >
            {line}
          </motion.div>
        ))}
        {lines.length < BOOT_TEXTS.length && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 bg-[#00ffcc] inline-block ml-2 shadow-[0_0_10px_#00ffcc]"
          />
        )}
      </div>
    </motion.div>
  );
}
