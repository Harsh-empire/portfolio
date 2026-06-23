"use client";

import React, { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useTexture, RoundedBox, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Shield, Cpu, Code } from 'lucide-react';

export const Certificate = forwardRef(({ 
  textureUrl, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  opacity = 1,
  dataTags,
  visible = true,
  scanlineY = 2,
  showHolo = false
}: any, ref) => {
  const meshRef = useRef();
  const groupRef = useRef();
  
  useImperativeHandle(ref, () => groupRef.current);

  const texture = useTexture(textureUrl);
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: texture,
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    transmission: 0.1,
    thickness: 0.5,
    transparent: true,
    opacity: opacity,
    side: THREE.FrontSide
  }), [texture, opacity]);

  const backMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111',
    roughness: 0.8,
    metalness: 0.2,
    transparent: true,
    opacity: opacity
  }), [opacity]);

  const scanlineMaterial = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, 0.8, 1),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  }), []);

  const getIcon = (type: string) => {
    switch(type) {
      case 'shield': return <Shield size={14} />;
      case 'cpu': return <Cpu size={14} />;
      case 'code': return <Code size={14} />;
      default: return null;
    }
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale} visible={visible}>
      <RoundedBox 
        ref={meshRef}
        args={[4.5, 3.2, 0.05]} 
        radius={0.05} 
        smoothness={4}
      >
        <primitive object={material} attach="material-0" />
        <primitive object={material} attach="material-1" />
        <primitive object={material} attach="material-2" />
        <primitive object={material} attach="material-3" />
        <primitive object={material} attach="material-4" />
        <primitive object={backMaterial} attach="material-5" />
      </RoundedBox>

      <RoundedBox args={[4.55, 3.25, 0.04]} radius={0.05} position={[0, 0, -0.01]}>
        <meshBasicMaterial color="#00c8ff" transparent opacity={opacity * 0.05} blending={THREE.AdditiveBlending} />
      </RoundedBox>

      {showHolo && (
        <mesh position={[0, scanlineY, 0.03]} scale={[1, 1, 1]}>
          <planeGeometry args={[4.6, 0.05]} />
          <primitive object={scanlineMaterial} attach="material" />
        </mesh>
      )}

      {showHolo && dataTags.map((tag: any, i: number) => (
        <Html 
          key={i} 
          position={[tag.x, tag.y, 0.05]} 
          transform={false} 
          center 
          zIndexRange={[100, 0]}
        >
          <div className="flex flex-col items-start gap-3 pointer-events-none" style={{ opacity: tag.visible ? 1 : 0, transition: 'opacity 0.3s ease-out' }}>
            <div className="w-[50px] h-[1px] bg-gradient-to-r from-cyan-400 to-transparent absolute -left-[50px] top-1/2"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-900/10 border border-cyan-400/30 border-l-[3px] border-l-cyan-400 rounded backdrop-blur-md text-cyan-100 text-[11px] uppercase tracking-wider shadow-[0_0_10px_rgba(0,200,255,0.1)]">
              {getIcon(tag.icon)}
              <span>{tag.label}</span>
            </div>
          </div>
        </Html>
      ))}
    </group>
  );
});

Certificate.displayName = 'Certificate';
