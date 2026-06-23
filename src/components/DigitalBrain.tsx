"use client";
import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import { useScroll, MotionValue } from "framer-motion";

const technologies = [
  "java", "python", "ai/ml", "kafka", "docker", "react", "aws", "rust"
];

function SatelliteNode({ tech, position, index }: { tech: string; position: THREE.Vector3; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<any>(null);
  const { mouse, raycaster, camera } = useThree();

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const points = useMemo(() => [new THREE.Vector3(0, 0, 0), position], [position]);

  useFrame(() => {
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, target);

    if (meshRef.current && lineRef.current) {
      const d = position.distanceTo(target);
      const intensity = Math.max(0.1, 1 - d / 3.5);

      const scale = 1 + intensity * 1.5;
      meshRef.current.scale.setScalar(scale);

      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = intensity * 2;

      const lineMat = lineRef.current.material;
      lineMat.opacity = intensity;
    }
  });

  return (
    <group>
      <Line ref={lineRef} points={points} color="white" lineWidth={1} transparent opacity={0.1} />
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

function CubeSwarmGlobe({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const numCubes = 3000;
  
  // Create organic noise-based scattered positions and colors
  const { formedPositions, scatteredPositions, startColors, endColors } = useMemo(() => {
    const fPos = new Float32Array(numCubes * 3);
    const sPos = new Float32Array(numCubes * 3);
    const sCol = new Float32Array(numCubes * 3);
    const eCol = new Float32Array(numCubes * 3);

    const icosa = new THREE.IcosahedronGeometry(1.6, 5);
    const sphere = new THREE.SphereGeometry(1.55, 32, 32);

    const icosaPos = icosa.attributes.position.array;
    const spherePos = sphere.attributes.position.array;

    const raOneColors = [
      new THREE.Color("#2a0a0a"), // Very dark red/black
      new THREE.Color("#cc1111"), // Bright deep red
      new THREE.Color("#ff2200"), // Glowing neon orange/red
      new THREE.Color("#050505"), // Almost Pure Black
      new THREE.Color("#ff0000")  // Pure Red
    ];

    for (let i = 0; i < numCubes; i++) {
      // Formed End Position
      const isOuter = i % 3 !== 0; 
      const arr = isOuter ? icosaPos : spherePos;
      const pointIdx = Math.floor(Math.random() * (arr.length / 3)) * 3;
      
      const noise = 0.02 * (Math.random() - 0.5);
      const fx = arr[pointIdx] + noise;
      const fy = arr[pointIdx+1] + noise;
      const fz = arr[pointIdx+2] + noise;
      
      fPos[i*3] = fx;
      fPos[i*3+1] = fy;
      fPos[i*3+2] = fz;

      // Pseudo-random organic turbulence (simulating Simplex noise)
      const length = Math.sqrt(fx*fx + fy*fy + fz*fz);
      const nx = fx / length;
      const ny = fy / length;
      const nz = fz / length;
      
      const turbulence = 4 + Math.sin(fx * 4) + Math.cos(fy * 4) + Math.sin(fz * 4);
      const pushOut = radius => radius * turbulence * 1.5;

      sPos[i*3] = nx * pushOut(10) + (Math.random() - 0.5) * 5;
      sPos[i*3+1] = ny * pushOut(10) + (Math.random() - 0.5) * 5;
      sPos[i*3+2] = nz * pushOut(10) + (Math.random() - 0.5) * 5;

      // Assign the Ra.One permanent color to this cube
      const c = raOneColors[Math.floor(Math.random() * raOneColors.length)];
      
      sCol[i*3] = c.r;
      sCol[i*3+1] = c.g;
      sCol[i*3+2] = c.b;

      eCol[i*3] = c.r;
      eCol[i*3+1] = c.g;
      eCol[i*3+2] = c.b;
    }
    
    return { formedPositions: fPos, scatteredPositions: sPos, startColors: sCol, endColors: eCol };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  
  // Track hover state for explosive animation
  const hoverProgressRef = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Scroll progress (forms the globe)
    const rawProgress = scrollProgress.get();
    const scrollT = Math.min(Math.max(rawProgress * 1.5, 0), 1);
    const formedProgress = scrollT < 0.5 ? 2 * scrollT * scrollT : -1 + (4 - 2 * scrollT) * scrollT; // easeInOut

    // Hover explosion progress (scatters it back out smoothly)
    const targetHover = isHovered ? 1 : 0;
    hoverProgressRef.current += (targetHover - hoverProgressRef.current) * 8 * delta; // Spring-like ease
    
    // Final progress: 1 means fully formed. 0 means scattered.
    // When hovered, progress drops towards 0 (scattered)
    const finalProgress = formedProgress * (1 - hoverProgressRef.current);

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
    }

    for (let i = 0; i < numCubes; i++) {
      const idx = i * 3;
      
      // Interpolate position from Scattered -> Formed
      dummy.position.set(
        THREE.MathUtils.lerp(scatteredPositions[idx], formedPositions[idx], finalProgress),
        THREE.MathUtils.lerp(scatteredPositions[idx+1], formedPositions[idx+1], finalProgress),
        THREE.MathUtils.lerp(scatteredPositions[idx+2], formedPositions[idx+2], finalProgress)
      );

      dummy.rotation.x = (1 - finalProgress) * (state.clock.elapsedTime * 2 + i);
      dummy.rotation.y = (1 - finalProgress) * (state.clock.elapsedTime * 2 + i);
      
      const s = THREE.MathUtils.lerp(0.12, 0.06, finalProgress);
      dummy.scale.setScalar(s);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      tempColor.setRGB(
        THREE.MathUtils.lerp(startColors[idx], endColors[idx], finalProgress),
        THREE.MathUtils.lerp(startColors[idx+1], endColors[idx+1], finalProgress),
        THREE.MathUtils.lerp(startColors[idx+2], endColors[idx+2], finalProgress)
      );
      meshRef.current.setColorAt(i, tempColor);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <mesh visible={false}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <instancedMesh ref={meshRef} args={[undefined, undefined, numCubes]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          roughness={0.3} 
          metalness={0.5} 
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </instancedMesh>
    </group>
  );
}

function NeuralNetwork({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const nodes = useMemo(() => {
    return technologies.map((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / technologies.length);
      const theta = Math.sqrt(technologies.length * Math.PI) * phi;
      const radius = 2.7;
      return {
        position: new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        ),
        label: tech,
      };
    });
  }, []);

  return (
    <group>
      <CubeSwarmGlobe scrollProgress={scrollProgress} />
      {nodes.map((node, i) => (
        <SatelliteNode key={i} tech={node.label} position={node.position} index={i} />
      ))}
    </group>
  );
}

export default function DigitalBrainSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  return (
    <section ref={containerRef} id="brain" className="relative w-full min-h-screen bg-black/85 backdrop-blur-sm border-t border-white/5 flex flex-col lg:flex-row items-center font-readex py-32 px-6 md:px-10 max-w-7xl mx-auto gap-12">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
        <FadeUp as="div" className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 bg-white/5 mb-6">
          <span className="text-white/60 text-[10px] uppercase tracking-widest font-readex">architecture</span>
        </FadeUp>
        
        <StaggeredHeading
          text="the digital brain."
          className="text-white font-medium lowercase"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        />
        
        <FadeUp delay={0.6} as="p" y={24} className="mt-8">
          <span className="text-white/60 text-sm md:text-base leading-relaxed lowercase max-w-md block">
            this dynamic neural model represents my core technical stack. each node is a foundational skill, orbiting a central architecture of distributed systems and scalable engineering.
          </span>
        </FadeUp>

        <FadeUp delay={0.8} as="div" className="mt-12 flex flex-wrap gap-3 max-w-lg">
          {technologies.map((tech) => (
            <div key={tech} className="px-4 py-2 rounded-full border border-white/10 bg-black/50 text-white/70 text-xs font-readex uppercase tracking-widest backdrop-blur-md">
              {tech}
            </div>
          ))}
        </FadeUp>
      </div>

      {/* Right Canvas */}
      <div className="w-full lg:w-1/2 h-[600px] lg:h-[800px] relative z-20 cursor-grab active:cursor-grabbing" data-cursor="drag">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#a3a3a3" />
          <NeuralNetwork scrollProgress={scrollYProgress} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} dampingFactor={0.05} />
        </Canvas>
      </div>
    </section>
  );
}
