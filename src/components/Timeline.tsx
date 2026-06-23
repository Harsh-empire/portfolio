"use client";
import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import { useCarAudio } from "@/hooks/useCarAudio";

function SpiralCar3D({ scrollYProgress }: { scrollYProgress: any }) {
  const carRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const supercarShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.0, 0.1); 
    s.lineTo(0.9, 0.1); 
    s.quadraticCurveTo(1.0, 0.1, 1.0, 0.15);
    s.lineTo(0.4, 0.25);
    s.lineTo(0.1, 0.45);
    s.lineTo(-0.3, 0.45);
    s.lineTo(-0.8, 0.3);
    s.lineTo(-1.0, 0.32);
    s.lineTo(-1.0, 0.1);
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.8,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.05,
    bevelThickness: 0.05
  }), []);

  useFrame(() => {
    const p = scrollYProgress.get();
    
    // Perspective viewport calculation
    const startY = viewport.height / 2 + 1.5;
    const endY = -viewport.height / 2 - 1.5;
    const y = startY + (endY - startY) * p;
    
    const loops = 5;
    const angle = p * Math.PI * 2 * loops;
    const radius = 1.2; 
    
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    
    if (carRef.current) {
      carRef.current.position.set(x, y, z);
      
      const nextAngle = (p + 0.005) * Math.PI * 2 * loops;
      const nextX = Math.sin(nextAngle) * radius;
      const nextY = startY + (endY - startY) * (p + 0.005);
      const nextZ = Math.cos(nextAngle) * radius;
      
      carRef.current.lookAt(nextX, nextY, nextZ);
      
      const bank = Math.cos(angle) * 0.3;
      carRef.current.rotateZ(-bank);
    }
  });

  return (
    // Supercar Geometry
    <group ref={carRef} scale={0.5}>
      {/* Sleek Extruded Hypercar Body */}
      <group rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0, -0.4]}>
          <extrudeGeometry args={[supercarShape, extrudeSettings]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Dark Windshield */}
      <mesh position={[0, 0.36, 0.25]} rotation={[-0.4, 0, 0]}>
         <boxGeometry args={[0.7, 0.3, 0.05]} />
         <meshStandardMaterial color="#000000" metalness={1.0} roughness={0.0} />
      </mesh>
      {/* Dark Rear window */}
      <mesh position={[0, 0.36, -0.55]} rotation={[0.4, 0, 0]}>
         <boxGeometry args={[0.6, 0.4, 0.05]} />
         <meshStandardMaterial color="#000000" metalness={1.0} roughness={0.0} />
      </mesh>

      {/* Wheels with Glowing Rims */}
      {[-0.45, 0.45].map(wx => 
        [-0.6, 0.6].map(wz => (
          <mesh key={`${wx}-${wz}`} position={[wx, 0.15, wz]} rotation={[0, 0, Math.PI/2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.2, 32]} />
            <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
            {/* Glowing Rim detail */}
            <mesh position={[0, wx > 0 ? 0.11 : -0.11, 0]} rotation={[Math.PI/2, 0, 0]}>
              <ringGeometry args={[0.1, 0.15, 16]} />
              <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>
          </mesh>
        ))
      )}

      {/* Aggressive Headlights */}
      <mesh position={[-0.3, 0.16, 1.01]}>
        <boxGeometry args={[0.2, 0.02, 0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, 0.16, 1.01]}>
        <boxGeometry args={[0.2, 0.02, 0.05]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Aggressive Taillights */}
      <mesh position={[-0.3, 0.25, -1.02]}>
        <boxGeometry args={[0.25, 0.03, 0.05]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>
      <mesh position={[0.3, 0.25, -1.02]}>
        <boxGeometry args={[0.25, 0.03, 0.05]} />
        <meshBasicMaterial color="#ff0000" />
      </mesh>

      {/* Main Exhaust Fire / Smoke Trail - Bright White */}
      <Trail width={0.6} color="#ffffff" length={12} decay={2.5} local={false}>
        <mesh position={[0, 0.1, -1.0]} visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
      </Trail>

      {/* Tire Tracks - Ghostly white/silver trails */}
      <Trail width={0.15} color="#aaaaaa" length={30} decay={1.5} local={false}>
        <mesh position={[-0.45, 0.05, -0.7]} visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
      </Trail>
      <Trail width={0.15} color="#aaaaaa" length={30} decay={1.5} local={false}>
        <mesh position={[0.45, 0.05, -0.7]} visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
      </Trail>
    </group>
  );
}

const experiences = [
  {
    role: "ai intern",
    company: "machine learning & nlp operations",
    year: "jan 2026 - present",
    body: "engineered predictive models using scikit-learn and pandas to enhance data-driven decision-making. developed nlp pipelines for sentiment analysis and text classification via nltk and spacy libraries. deployed model endpoints via restful apis using the flask framework.",
  },
  {
    role: "java developer intern",
    company: "backend systems development",
    year: "jul 2025 - dec 2025",
    body: "architected real-time client-server chat applications using java sockets for multi-client concurrency. implemented recommendation engines with apache mahout, utilizing pearson similarity for personalization. optimized system maintainability by applying robust oop principles and clean coding standards.",
  }
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useCarAudio(scrollYProgress, isInView);

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // Dynamic z-index: When the car is in the back half of the spiral (cos < 0), put canvas behind the line!
  const canvasZIndex = useTransform(scrollYProgress, (p) => {
    const loops = 5;
    const angle = p * Math.PI * 2 * loops;
    return Math.cos(angle) < 0 ? 5 : 30;
  });
  
  return (
    <section id="experience" ref={containerRef} className="relative w-full bg-black/85 backdrop-blur-sm py-32 px-6 md:px-10 font-readex border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col items-center md:items-start">
        
        <StaggeredHeading
          text="neural timeline."
          className="text-white font-medium lowercase mb-20 text-center md:text-left w-full"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        />

        <div className="relative w-full pl-8 md:pl-16">
          {/* The empty track line (z-10) */}
          <div className="absolute top-0 bottom-0 left-3 md:left-4 w-px bg-white/10 z-10" />
          
          {/* The dynamic fill line (z-20) */}
          <motion.div
            className="absolute top-0 left-3 md:left-4 w-[2px] bg-white origin-top z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ height: fillHeight }}
          />

          {/* Full 3D Canvas Overlay for the Mountain Spiral */}
          <motion.div 
            className="absolute top-0 bottom-0 left-3 md:left-4 w-0 pointer-events-none"
            style={{ zIndex: canvasZIndex }}
          >
            <div className="sticky top-0 w-[800px] h-[100vh] -ml-[400px]">
              {/* Changed to PerspectiveCamera for real 3D depth illusion */}
              <Canvas camera={{ fov: 45, position: [0, 0, 8] }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={1.5} />
                <SpiralCar3D scrollYProgress={scrollYProgress} />
              </Canvas>
            </div>
          </motion.div>

          <div className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <div key={i} className="relative w-full max-w-2xl group">
                {/* The Node */}
                <div className="absolute top-6 -left-[45px] md:-left-[61px] w-6 h-6 bg-black border-2 border-white rounded-full flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-125">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>

                {/* The Entry Card */}
                <FadeUp delay={0.1} y={30} as="div">
                  <div className="bg-neutral-900/90 border border-white/5 rounded-2xl p-8 hover:border-white/20 transition-colors cursor-default backdrop-blur-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-white text-lg md:text-xl font-medium lowercase tracking-tight">
                        {exp.role}
                      </h3>
                      <span className="text-white/40 text-xs tracking-widest uppercase bg-black/50 px-3 py-1 rounded-full border border-white/5">
                        {exp.year}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed lowercase">
                      {exp.body}
                    </p>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
