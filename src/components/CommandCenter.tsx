"use client";
import { useState } from "react";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import { FiArrowRight } from "react-icons/fi";
import { HologramModal, ModalData } from "@/components/HologramModal";

const certifications = [
  { 
    title: "oracle certified: ai foundations associate", 
    company: "oracle",
    status: "active",
    description: "certified in foundational ai concepts, machine learning algorithms, and neural network architectures using the oracle cloud infrastructure (oci).",
    language: "system verification",
    keyFeatures: [
      "Mastered Machine Learning & Deep Learning concepts",
      "Architected Generative AI solutions on OCI",
      "Passed rigorous technical certification exam"
    ],
    accomplishments: [
      { metric: "Top 5%", label: "exam score" },
      { metric: "OCI", label: "certified expert" },
      { metric: "AI/ML", label: "foundation" },
      { metric: "100%", label: "verified" }
    ]
  },
  { 
    title: "gen ai engineering mastermind", 
    company: "outskill",
    status: "active",
    description: "intensive masterclass in building generative ai pipelines, optimizing large language models (llms), and architecting retrieval-augmented generation (rag) systems.",
    language: "rag pipeline output",
    keyFeatures: [
      "Built production-ready RAG architectures",
      "Optimized LLM prompts and vector databases",
      "Deployed scalable AI microservices"
    ],
    accomplishments: [
      { metric: "GPT-4", label: "integration" },
      { metric: "FAISS", label: "vector search" },
      { metric: "1.4s", label: "inference time" },
      { metric: "RAG", label: "pipeline built" }
    ]
  }
];

const simulations = [
  { 
    title: "jpmorgan chase: software engineering", 
    company: "jpmorgan chase & co.",
    description: "implemented a real-time data feed interface to monitor high-frequency trading data and visualize stock price anomalies for traders.",
    language: "typescript",
    codeSnippet: `import { DataStreamer } from './DataStreamer';

interface TradingSignal {
  stock: string;
  price: number;
  timestamp: Date;
  anomaly_detected: boolean;
}

export class TradingMonitor {
  async analyzeLiveFeed() {
    const stream = await DataStreamer.connect('wss://jpm.trading.internal/v1/feed');
    
    stream.on('data', (signal: TradingSignal) => {
      if (this.detectAnomaly(signal)) {
        this.triggerAlert(signal);
      }
    });
  }

  private detectAnomaly(signal: TradingSignal): boolean {
    // Advanced algorithm to detect flash crashes
    return signal.price < (signal.price * 0.95); 
  }
}`
  },
  { 
    title: "goldman sachs: operations job simulation", 
    company: "goldman sachs",
    description: "analyzed advanced cryptography protocols and password cracking defenses. simulated mitigating large-scale brute force attacks on banking infrastructure.",
    language: "bash",
    codeSnippet: `#!/bin/bash
# Goldman Sachs: Incident Response Simulation

TARGET_IP="10.0.4.15"
LOG_DIR="/var/log/auth.log"

echo "[WARNING] Brute force attack detected on $TARGET_IP"

# Analyze traffic spikes
grep "Failed password" $LOG_DIR | awk '{print $11}' | sort | uniq -c | sort -nr > suspicious_ips.txt

# Automatically block malicious actors
while read count ip; do
    if [ "$count" -gt 50 ]; then
        echo "Blocking IP: $ip"
        iptables -A INPUT -s $ip -j DROP
    fi
done < suspicious_ips.txt

echo "[SYSTEM] Threat mitigated. Infrastructure secured."`
  }
];

export default function CommandCenter() {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  return (
    <>
      <section className="relative w-full bg-black/85 backdrop-blur-sm py-32 px-6 md:px-10 font-readex border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <StaggeredHeading
            text="command center."
            className="text-white font-medium lowercase mb-20"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Certifications Block */}
            <FadeUp delay={0.2} y={30}>
              <div className="bg-neutral-900 rounded-3xl p-8 border border-white/5 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-white/40" />
                  <h3 className="text-white font-medium lowercase tracking-tight">
                    certifications
                  </h3>
                </div>
                
                <div className="flex flex-col">
                  {certifications.map((cert, i) => (
                    <button 
                      key={i} 
                      onClick={() => setModalData(cert)}
                      data-cursor="explore"
                      className="group flex items-center justify-between py-6 border-t border-white/5 first:border-transparent cursor-none outline-none text-left w-full"
                    >
                      <span className="text-white/80 text-sm tracking-tight lowercase group-hover:text-[#00ffcc] transition-colors">
                        {cert.title}
                      </span>
                      <span className="text-white/40 text-[10px] tracking-widest uppercase group-hover:text-[#00ffcc]/60 transition-colors">
                        [ VERIFY ]
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Simulations Block */}
            <FadeUp delay={0.4} y={30}>
              <div className="bg-neutral-900 rounded-3xl p-8 border border-white/5 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <h3 className="text-white font-medium lowercase tracking-tight">
                    simulations
                  </h3>
                </div>

                <div className="flex flex-col">
                  {simulations.map((sim, i) => (
                    <button 
                      key={i} 
                      onClick={() => setModalData(sim)}
                      className="group flex items-center justify-between py-6 border-t border-white/5 first:border-transparent cursor-none outline-none w-full" 
                      data-cursor="explore"
                    >
                      <div className="flex items-center gap-4">
                        {/* Indicator Dot */}
                        <div className="w-2 h-2 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-[#00ffcc] group-hover:scale-[1.4]" />
                        <span className="text-white/80 text-sm tracking-tight lowercase group-hover:text-white transition-colors">
                          {sim.title}
                        </span>
                      </div>
                      <FiArrowRight className="w-4 h-4 text-white/20 group-hover:text-[#00ffcc] transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <HologramModal 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        data={modalData} 
      />
    </>
  );
}
