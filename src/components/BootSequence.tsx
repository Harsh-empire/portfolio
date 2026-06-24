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
  const [hasStarted, setHasStarted] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const { playBoot } = useSound();

  const handleStart = () => {
    setHasStarted(true);
    let isMounted = true;
    
    // GUARANTEED AUTOPLAY UNLOCK: Play and pause the audio element on exact user click
    const engineAudio = document.getElementById('car-engine-audio') as HTMLAudioElement;
    if (engineAudio) {
      engineAudio.volume = 0;
      engineAudio.play().then(() => {
        engineAudio.pause();
      }).catch(e => console.warn("Audio unlock failed", e));
    }

    const runSequence = async () => {
      // Play boot sound (now guaranteed to work because it's tied to a click event)
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
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-8 bg-black font-mono"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00ffcc]/5 via-black to-black opacity-50" />
      
      {!hasStarted ? (
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 px-8 py-4 border border-[#00ffcc]/30 text-[#00ffcc] tracking-[0.3em] uppercase text-sm hover:bg-[#00ffcc]/10 hover:border-[#00ffcc] transition-all"
          style={{ textShadow: "0 0 10px rgba(0, 255, 204, 0.5)", boxShadow: "0 0 20px rgba(0, 255, 204, 0.1) inset" }}
        >
          [ Initialize Matrix ]
        </motion.button>
      ) : (
        <div className="absolute bottom-8 left-8 z-10 space-y-2 mb-12 text-[#00ffcc]">
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
      )}
    </motion.div>
  );
}
