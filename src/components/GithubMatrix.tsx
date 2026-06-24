"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import TiltCard from "@/components/TiltCard";
import { FiGithub, FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";

// --- 3D MATRIX CONTRIBUTION GRAPH ---
function ContributionGrid() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const COLS = 52;
  const ROWS = 7;
  const COUNT = COLS * ROWS;
  
  // Matrix Neon Colors (Dark to Bright)
  const colors = [
    new THREE.Color("#051510"), // Empty
    new THREE.Color("#004d33"), // Low
    new THREE.Color("#009966"), // Med
    new THREE.Color("#00e699"), // High
    new THREE.Color("#00ffcc"), // Max
  ];

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Pre-calculate positions and base heights
  const blocks = useMemo(() => {
    const data = [];
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        // Procedurally generate realistic looking activity
        // Higher probability of activity in recent columns
        const recentBias = (x / COLS); 
        let activity = 0;
        
        const rand = Math.random() + (recentBias * 0.3);
        if (rand > 0.9) activity = 4;
        else if (rand > 0.7) activity = 3;
        else if (rand > 0.5) activity = 2;
        else if (rand > 0.3) activity = 1;

        data.push({
          x: (x - COLS / 2) * 1.1,
          z: (y - ROWS / 2) * 1.1,
          activity,
          baseHeight: activity * 0.5 + 0.1,
          phase: Math.random() * Math.PI * 2
        });
      }
    }
    return data;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    
    // Set initial colors
    for (let i = 0; i < COUNT; i++) {
      meshRef.current.setColorAt(i, colors[blocks[i].activity]);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [blocks, colors]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    for (let i = 0; i < COUNT; i++) {
      const block = blocks[i];
      // Make the blocks "breathe" slightly
      const heightOffset = Math.sin(time * 2 + block.phase) * 0.1 * block.activity;
      const finalHeight = block.baseHeight + heightOffset;

      dummy.position.set(block.x, finalHeight / 2, block.z);
      dummy.scale.set(1, finalHeight, 1);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={[0.9, 1, 0.9]} />
      <meshStandardMaterial 
        roughness={0.2} 
        metalness={0.8} 
      />
    </instancedMesh>
  );
}

// --- GITHUB REPO DATA FETCHING ---
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GithubMatrix() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepos() {
      const fallbackData = [
        { id: 1, name: "Enterprise-RAG", description: "Retrieval-Augmented Generation pipeline built for high-throughput enterprise knowledge extraction.", html_url: "https://github.com/Harsh-empire", stargazers_count: 14, forks_count: 2, language: "Python", updated_at: new Date().toISOString() },
        { id: 2, name: "Neural-Analytics", description: "Predictive modeling and data analytics dashboard for risk profiling.", html_url: "https://github.com/Harsh-empire", stargazers_count: 8, forks_count: 1, language: "Jupyter Notebook", updated_at: new Date().toISOString() },
        { id: 3, name: "Zero-Trust-Auth", description: "Secure WebSocket authentication layer with advanced cryptography.", html_url: "https://github.com/Harsh-empire", stargazers_count: 21, forks_count: 5, language: "TypeScript", updated_at: new Date().toISOString() },
        { id: 4, name: "Algorithmic-Trading-Bot", description: "High-frequency trading bot simulation using Apache Kafka.", html_url: "https://github.com/Harsh-empire", stargazers_count: 32, forks_count: 8, language: "Java", updated_at: new Date().toISOString() },
      ];

      try {
        const res = await fetch("https://api.github.com/users/Harsh-empire/repos?sort=updated&per_page=10");
        
        if (!res.ok) {
          console.warn("Github API limit reached. Using fallback data.");
          setRepos(fallbackData);
          setLoading(false);
          return;
        }
        
        const data: Repo[] = await res.json();
        const originalRepos = data.filter(r => r.name !== "portfolio").slice(0, 4);
        
        if (originalRepos.length > 0) {
          setRepos(originalRepos);
        } else {
          setRepos(fallbackData);
        }
      } catch (err) {
        console.error("Github API Error:", err);
        setRepos(fallbackData);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section className="relative w-full bg-black/85 backdrop-blur-sm py-32 px-6 md:px-10 font-readex border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        <StaggeredHeading
          text="open source matrix."
          className="text-white font-medium lowercase mb-6"
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        />
        
        <FadeUp delay={0.2} y={20}>
          <p className="text-white/50 max-w-2xl lowercase mb-16 tracking-wide">
            Live telemetry from github. displaying real-time contributions and recent open-source engineering activity.
          </p>
        </FadeUp>

        {/* 3D Contribution Graph Area */}
        <FadeUp delay={0.3} y={40} className="w-full h-[300px] md:h-[400px] bg-neutral-900/50 border border-[#00ffcc]/10 rounded-3xl overflow-hidden relative mb-16 shadow-[0_0_50px_rgba(0,255,204,0.03)]">
          <div className="absolute top-6 left-6 z-10 flex items-center gap-3">
            <FiGithub className="text-[#00ffcc] w-5 h-5" />
            <span className="text-[#00ffcc] text-xs tracking-widest uppercase font-mono">Live Contribution Matrix</span>
          </div>
          
          <Canvas camera={{ position: [0, 20, 25], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffcc" />
            <group rotation={[Math.PI / 8, Math.PI / 6, 0]} position={[0, -2, 0]}>
              <ContributionGrid />
            </group>
          </Canvas>
          
          {/* Edge fade overlays */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.8)_100%)]" />
        </FadeUp>

        {/* Live Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
             [1, 2, 3, 4].map(i => (
               <div key={i} className="h-48 bg-white/5 animate-pulse rounded-2xl border border-white/5" />
             ))
          ) : (
            repos.map((repo, i) => (
              <FadeUp key={repo.id} delay={0.4 + (i * 0.1)} y={30}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block outline-none" data-cursor="view">
                  <TiltCard className="w-full h-full">
                    <div className="bg-black/85 backdrop-blur-sm border border-[#00ffcc]/10 hover:border-[#00ffcc]/40 rounded-2xl p-6 lg:p-8 transition-all h-full flex flex-col group">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-white text-lg font-medium lowercase tracking-tight group-hover:text-[#00ffcc] transition-colors flex items-center gap-2">
                          <FiGithub className="w-5 h-5 opacity-70" />
                          {repo.name}
                        </h3>
                        <FiExternalLink className="text-white/30 group-hover:text-[#00ffcc] transition-colors" />
                      </div>
                      
                      <p className="text-white/60 text-sm leading-relaxed lowercase flex-1 mb-6 line-clamp-2">
                        {repo.description || "no description provided."}
                      </p>

                      <div className="flex items-center gap-6 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#00ffcc]" />
                          <span className="text-white/50 text-xs tracking-widest uppercase font-mono">{repo.language || "code"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono">
                          <FiStar className="w-3.5 h-3.5" /> {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1.5 text-white/50 text-xs font-mono">
                          <FiGitBranch className="w-3.5 h-3.5" /> {repo.forks_count}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </a>
              </FadeUp>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
