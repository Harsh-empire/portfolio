"use client";

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Showcase } from './Showcase';
import { useInView } from 'framer-motion';

export default function CertificationsSection() {
  const containerRef = useRef(null);
  // Trigger animation when 20% of the section is visible
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section 
      ref={containerRef}
      id="certifications" 
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center border-t border-white/10"
    >
      <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-light tracking-[0.2em] text-white/90">
          CERTIFICATIONS
        </h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mt-4 opacity-50 blur-[2px]"></div>
        <div className="w-24 h-1 bg-cyan-400 mx-auto -mt-1"></div>
      </div>

      <div className="w-full h-full">
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 7], fov: 45 }}
        >
          <color attach="background" args={['#05050a']} />
          <fog attach="fog" args={['#05050a', 5, 20]} />
          
          <React.Suspense fallback={null}>
            <Showcase inView={isInView} />
          </React.Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-10 w-full text-center z-10 pointer-events-none opacity-50">
        <p className="text-sm tracking-widest text-cyan-200">VERIFIED CREDENTIALS // HARSH KUMAR</p>
      </div>
    </section>
  );
}
