"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Certificate } from './Certificate';

gsap.registerPlugin(useGSAP);

export const Showcase = ({ inView }: { inView: boolean }) => {
  const { camera } = useThree();
  
  const containerRef = useRef<any>();
  const cert1Ref = useRef<any>();
  const cert2Ref = useRef<any>();
  const cert3Ref = useRef<any>();
  const cameraGroupRef = useRef<any>();

  const [dataTags1, setDataTags1] = useState([
    { id: 1, x: 2.5, y: 1.0, label: 'ORACLE AI FOUNDATIONS', icon: 'shield', visible: false },
    { id: 2, x: 2.5, y: 0.0, label: 'ISSUED: 2025', icon: 'shield', visible: false },
    { id: 3, x: 2.5, y: -1.0, label: 'VALIDATED', icon: 'shield', visible: false }
  ]);
  const [dataTags2, setDataTags2] = useState([
    { id: 1, x: 2.5, y: 1.0, label: 'GEN AI MASTERMIND', icon: 'cpu', visible: false },
    { id: 2, x: 2.5, y: 0.0, label: 'ISSUED: 2025', icon: 'cpu', visible: false },
    { id: 3, x: 2.5, y: -1.0, label: 'VALIDATED', icon: 'cpu', visible: false }
  ]);
  const [dataTags3, setDataTags3] = useState([
    { id: 1, x: 2.5, y: 1.0, label: 'JPMORGAN & CHASE', icon: 'code', visible: false },
    { id: 2, x: 2.5, y: 0.0, label: 'SOFTWARE SIMULATION', icon: 'code', visible: false },
    { id: 3, x: 2.5, y: -1.0, label: 'VALIDATED', icon: 'code', visible: false }
  ]);

  const [scan1, setScan1] = useState({ y: 2.5, show: false });
  const [scan2, setScan2] = useState({ y: 2.5, show: false });
  const [scan3, setScan3] = useState({ y: 2.5, show: false });

  // GSAP Timeline reference
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    camera.position.set(0, 0, 7);
    
    // Create timeline but pause it initially
    tl.current = gsap.timeline({ paused: true });

    const triggerScan = (setScan: any, setTags: any, tags: any) => {
      setScan({ y: 2.0, show: true });
      gsap.to(setScan, {
        y: -2.0,
        duration: 2, // Sped up
        ease: "linear",
        onUpdate: function() {
          setScan((prev: any) => ({ ...prev, y: this.targets()[0].y }));
          const currentY = this.targets()[0].y;
          setTags((prev: any) => prev.map((t: any) => ({ ...t, visible: t.visible || currentY < t.y })));
        },
        onComplete: () => setScan((prev: any) => ({ ...prev, show: false }))
      });
    };

    // --- SCENE 1: Cyber Cert --- (Total ~10s)
    tl.current.to(cert1Ref.current.position, { z: 1, duration: 1.5, ease: "power2.out" }, "cert1_start")
      .to(cert1Ref.current.rotation, { 
        y: Math.PI * 2, 
        duration: 6, // Reduced from 8
        ease: "power1.inOut" 
      }, "cert1_start")
      .to(cert1Ref.current.rotation, { x: 0.2, duration: 1.5, yoyo: true, repeat: 1 }, "cert1_start+=1.5")
      .call(() => triggerScan(setScan1, setDataTags1, dataTags1), null, "cert1_start+=1.5")
      .to(cert1Ref.current.position, { x: -4, scale: 0.5, duration: 1.5, ease: "power2.inOut" }, "cert1_end")
      .to(cert1Ref.current.material, { opacity: 0.3, duration: 1.5 }, "cert1_end") 

    // --- SCENE 2: AI Cert --- (Total ~10s)
    tl.current.fromTo(cert2Ref.current.position, 
        { x: 4, y: 0, z: -2, scale: 0.5 },
        { x: 0, y: 0, z: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }, 
        "cert1_end-=0.5" 
      )
      .fromTo(cert2Ref.current, { visible: false }, { visible: true, duration: 0.1 }, "cert1_end-=0.5")
      .to(cert2Ref.current.rotation, { 
        y: Math.PI * 2, 
        duration: 6, 
        ease: "power1.inOut" 
      }, "cert2_start")
      .to(cert2Ref.current.rotation, { x: 0.2, duration: 1.5, yoyo: true, repeat: 1 }, "cert2_start+=1.5")
      .call(() => triggerScan(setScan2, setDataTags2, dataTags2), null, "cert2_start+=1.5")
      .to(cert2Ref.current.position, { x: -4, y: -0.5, scale: 0.5, duration: 1.5, ease: "power2.inOut" }, "cert2_end")

    // --- SCENE 3: Backend Cert --- (Total ~10s)
    tl.current.fromTo(cert3Ref.current.position, 
        { x: 4, y: 0, z: -2, scale: 0.5 },
        { x: 0, y: 0, z: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }, 
        "cert2_end-=0.5"
      )
      .fromTo(cert3Ref.current, { visible: false }, { visible: true, duration: 0.1 }, "cert2_end-=0.5")
      .to(cert3Ref.current.rotation, { 
        y: Math.PI * 2, 
        duration: 6, 
        ease: "power1.inOut" 
      }, "cert3_start")
      .to(cert3Ref.current.rotation, { x: 0.2, duration: 1.5, yoyo: true, repeat: 1 }, "cert3_start+=1.5")
      .call(() => triggerScan(setScan3, setDataTags3, dataTags3), null, "cert3_start+=1.5")
      
    // --- FINAL HERO SHOT --- (Total ~5s)
    tl.current.to([cert1Ref.current.position, cert2Ref.current.position, cert3Ref.current.position], {
        x: (i) => [-1.5, 0, 1.5][i], 
        y: 1,
        z: (i) => [-1, 0, 1][i],
        duration: 2,
        ease: "power3.inOut"
      }, "hero_start")
      .to([cert1Ref.current.rotation, cert2Ref.current.rotation, cert3Ref.current.rotation], {
        x: 0.2,
        y: (i) => [-0.2, 0, 0.2][i],
        z: (i) => [0.1, 0, -0.1][i],
        duration: 2,
        ease: "power3.inOut"
      }, "hero_start")
      .to([cert1Ref.current.scale, cert2Ref.current.scale, cert3Ref.current.scale], {
        x: 0.8, y: 0.8, z: 0.8, duration: 2
      }, "hero_start")
      .to(camera.position, { y: 2, z: 8, duration: 3, ease: "power2.inOut" }, "hero_start")
      .to(camera.rotation, { x: -0.1, duration: 3, ease: "power2.inOut" }, "hero_start")
      .to(cameraGroupRef.current.rotation, {
        y: Math.PI * 0.5,
        duration: 8,
        ease: "power1.inOut"
      }, "hero_start+=1");

  }, { scope: containerRef });

  // Play timeline when in view
  useEffect(() => {
    if (inView && tl.current) {
      tl.current.play();
    }
  }, [inView]);

  return (
    <group ref={containerRef}>
      <ambientLight intensity={0.5} color="#4488ff" />
      <directionalLight position={[-5, 5, 5]} intensity={2} color="#ffffff" castShadow />
      <spotLight position={[5, 5, 2]} intensity={5} angle={0.5} penumbra={1} color="#00c8ff" />
      
      <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.3} color="#00c8ff" />
      
      <group ref={cameraGroupRef}>
        <Certificate 
          ref={cert1Ref} 
          textureUrl="/cert1.png" 
          position={[0, 0, -2]} 
          dataTags={dataTags1}
          showHolo={scan1.show}
          scanlineY={scan1.y}
        />
        <Certificate 
          ref={cert2Ref} 
          textureUrl="/cert2.png" 
          position={[0, 0, -2]} 
          dataTags={dataTags2}
          showHolo={scan2.show}
          scanlineY={scan2.y}
          visible={false}
        />
        <Certificate 
          ref={cert3Ref} 
          textureUrl="/cert3.png" 
          position={[0, 0, -2]} 
          dataTags={dataTags3}
          showHolo={scan3.show}
          scanlineY={scan3.y}
          visible={false}
        />
      </group>

      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.2}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#05050a"
          metalness={0.5}
        />
      </mesh>

      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
      </EffectComposer>
    </group>
  );
};
