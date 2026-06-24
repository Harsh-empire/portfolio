"use client";

import React, { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { lerp } from 'three/src/math/MathUtils.js';

const vertexShader = `
varying vec2 vUv;
uniform float uHover;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Slight z-axis wave bulging on hover
  pos.z += sin(pos.x * 5.0 + uTime) * 0.1 * uHover;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHover;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Liquid ripple distortion based on time and hover state
  float distortion = sin(uv.y * 15.0 + uTime * 2.0) * 0.03 * uHover;
  distortion += sin(uv.x * 15.0 + uTime * 3.0) * 0.03 * uHover;
  
  vec4 color = texture2D(uTexture, uv + vec2(distortion));
  
  // Add a slight cyan neon glow tint on hover
  color.rgb += vec3(0.0, 1.0, 0.8) * uHover * 0.15;
  
  gl_FragColor = color;
}
`;

function LiquidShaderMaterial({ imageUrl, isHovered }: { imageUrl: string, isHovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageUrl);
  
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uHover: { value: 0 },
    uTime: { value: 0 }
  }), [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      // Smoothly interpolate hover state
      material.uniforms.uHover.value = lerp(
        material.uniforms.uHover.value,
        isHovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface LiquidImageProps {
  imageUrl: string;
  className?: string;
}

export default function LiquidImage({ imageUrl, className = "" }: LiquidImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas 
        camera={{ position: [0, 0, 1.5], fov: 45 }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <LiquidShaderMaterial imageUrl={imageUrl} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
