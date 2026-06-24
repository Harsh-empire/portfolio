"use client";

import { useEffect, useRef, useState } from "react";
import { useVelocity, useMotionValueEvent, MotionValue, useSpring } from "framer-motion";

export function useCarAudio(scrollYProgress: MotionValue<number>, inView: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rawVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(rawVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  // Use a ref instead of state to prevent stale closures during 60FPS scroll events!
  const hasStartedRef = useRef(false);
  const inViewRef = useRef(inView);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    // Attach to the global audio element
    const audio = document.getElementById('car-engine-audio') as HTMLAudioElement;
    if (audio && !audioRef.current) {
      audio.volume = 0;
      audio.playbackRate = 0.8;
      audio.preservesPitch = false;
      // @ts-ignore
      if (audio.mozPreservesPitch !== undefined) audio.mozPreservesPitch = false;
      // @ts-ignore
      if (audio.webkitPreservesPitch !== undefined) audio.webkitPreservesPitch = false;
      
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle Ignition when entering view
  useEffect(() => {
    if (inView && !hasStartedRef.current && audioRef.current) {
      hasStartedRef.current = true;
      const audio = audioRef.current;
      
      audio.currentTime = 0;
      audio.volume = 0.6;
      audio.playbackRate = 1.0;
      
      audio.play().catch(err => {
        console.warn("Audio autoplay blocked.", err);
      });
    } else if (!inView && hasStartedRef.current && audioRef.current) {
      // Fade out if out of view
      audioRef.current.volume = 0;
      audioRef.current.pause();
      hasStartedRef.current = false;
    }
  }, [inView]);

  // Handle Revving based on smooth scroll velocity
  useMotionValueEvent(smoothVelocity, "change", (latestVelocity) => {
    if (!audioRef.current || !inViewRef.current) return;
    
    const audio = audioRef.current;

    // Fallback: If inView didn't trigger, but we are scrolling, start the engine!
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      audio.currentTime = 0;
      audio.volume = 0.6;
      audio.playbackRate = 1.0;
    }
    
    if (audio.paused) {
      audio.play().catch(() => {});
    }
    
    const speed = Math.abs(latestVelocity);
    const normalizedSpeed = Math.min(speed * 3.0, 1);
    
    const targetRate = 0.8 + (normalizedSpeed * 1.5);
    const targetVolume = 0.4 + (normalizedSpeed * 0.6);
    
    audio.playbackRate = targetRate;
    audio.volume = targetVolume;
  });
}
