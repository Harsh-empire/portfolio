"use client";

import { useEffect, useRef, useState } from "react";
import { useVelocity, useMotionValueEvent, MotionValue } from "framer-motion";

export function useCarAudio(scrollYProgress: MotionValue<number>, inView: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollVelocity = useVelocity(scrollYProgress);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Initialize audio only on client
    if (!audioRef.current) {
      const audio = new Audio("/sounds/car-engine.mp3");
      audio.loop = true;
      audio.volume = 0; // Start at 0 volume to avoid abrupt pops
      audio.playbackRate = 0.8; // Idle rate
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  // Handle Ignition when entering view
  useEffect(() => {
    if (inView && !hasStarted && audioRef.current) {
      setHasStarted(true);
      const audio = audioRef.current;
      
      // Start ignition sequence
      audio.currentTime = 0;
      audio.volume = 0.6;
      audio.playbackRate = 1.0;
      
      // Browsers may block auto-play, so we catch the promise
      audio.play().catch(err => {
        console.warn("Audio autoplay blocked by browser until user interaction.", err);
      });
    } else if (!inView && hasStarted && audioRef.current) {
      // Fade out if out of view
      audioRef.current.volume = 0;
      audioRef.current.pause();
      setHasStarted(false);
    }
  }, [inView, hasStarted]);

  // Handle Revving based on scroll velocity
  useMotionValueEvent(scrollVelocity, "change", (latestVelocity) => {
    if (!audioRef.current || !hasStarted) return;
    
    const audio = audioRef.current;
    
    // Convert velocity to an absolute speed value
    const speed = Math.abs(latestVelocity);
    
    // Map speed (0 to ~10) to playbackRate (0.8 idle to 2.5 redline)
    // and volume (0.4 idle to 1.0 full throttle)
    const normalizedSpeed = Math.min(speed / 5, 1); // Cap at 1
    
    // Smoothly adjust parameters
    const targetRate = 0.8 + (normalizedSpeed * 1.5); // Range: 0.8 to 2.3
    const targetVolume = 0.4 + (normalizedSpeed * 0.6); // Range: 0.4 to 1.0
    
    audio.playbackRate = targetRate;
    audio.volume = targetVolume;
  });
}
