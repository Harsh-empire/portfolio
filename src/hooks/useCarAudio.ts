"use client";

import { useEffect, useRef, useState } from "react";
import { useVelocity, useMotionValueEvent, MotionValue, useSpring } from "framer-motion";

export function useCarAudio(scrollYProgress: MotionValue<number>, inView: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rawVelocity = useVelocity(scrollYProgress);
  // Apply a spring to the velocity so the engine revs up and down smoothly
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 400
  });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Initialize audio only on client
    if (!audioRef.current) {
      const audio = new Audio("/sounds/car-engine.mp3");
      audio.loop = true;
      audio.volume = 0; // Start at 0 volume to avoid abrupt pops
      audio.playbackRate = 0.8; // Idle rate
      audio.preload = "auto";
      
      // Cross-browser pitch shifting (disable pitch preservation so revving sounds real)
      audio.preservesPitch = false;
      // @ts-ignore - Vendor prefixes
      if (audio.mozPreservesPitch !== undefined) audio.mozPreservesPitch = false;
      // @ts-ignore - Vendor prefixes
      if (audio.webkitPreservesPitch !== undefined) audio.webkitPreservesPitch = false;
      
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

  // Handle Revving based on smooth scroll velocity
  useMotionValueEvent(smoothVelocity, "change", (latestVelocity) => {
    if (!audioRef.current || !hasStarted) return;
    
    const audio = audioRef.current;
    
    // Convert velocity to an absolute speed value
    const speed = Math.abs(latestVelocity);
    
    // scrollYProgress velocity is usually very small (0.1 to 2.0).
    // We multiply it aggressively so normal scrolling hits high revs.
    const normalizedSpeed = Math.min(speed * 3.0, 1); // Much more sensitive
    
    // Smoothly adjust parameters
    const targetRate = 0.8 + (normalizedSpeed * 1.5); // Range: 0.8 to 2.3
    const targetVolume = 0.4 + (normalizedSpeed * 0.6); // Range: 0.4 to 1.0
    
    audio.playbackRate = targetRate;
    audio.volume = targetVolume;
  });
}
