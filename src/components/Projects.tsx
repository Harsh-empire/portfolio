"use client";
import { useState } from "react";
import TiltCard from "@/components/TiltCard";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import { HologramModal, ModalData } from "@/components/HologramModal";
import LiquidImage from "@/components/LiquidImage";

const projects = [
  {
    title: "genai data analytics",
    company: "tata simulation",
    description: "performed risk profiling and delinquency prediction using ai-driven predictive modeling for collection strategies. synthesized complex datasets into high-impact business storytelling reports.",
    tech: ["python", "genai", "data analytics", "predictive modeling"],
    language: "python",
    image: "/projects/genai_analytics.png",
    keyFeatures: [
      "Built random forest and gradient boosting models",
      "Engineered 50+ risk profile features",
      "Synthesized business storytelling dashboards"
    ],
    accomplishments: [
      { metric: "15%", label: "reduction in delinquency" },
      { metric: "98%", label: "model accuracy" },
      { metric: "1.2M+", label: "customers profiled" },
      { metric: "4x", label: "faster reporting" }
    ]
  },
  {
    title: "cyber security transformation",
    company: "deloitte simulation",
    description: "completed intensive tracks in cyber security, technology development, and data analytics. practiced enterprise-level coding standards and security-first development protocols.",
    tech: ["cyber security", "data analytics", "enterprise standards"],
    language: "python",
    image: "/projects/cyber_security.png",
    keyFeatures: [
      "Audited TLS configurations and zero-trust protocols",
      "Analyzed malware behavior and attack vectors",
      "Drafted enterprise security incident reports"
    ],
    accomplishments: [
      { metric: "0-Day", label: "vulnerabilities patched" },
      { metric: "100%", label: "compliance achieved" },
      { metric: "Tier 1", label: "security protocols" },
      { metric: "24/7", label: "threat monitoring" }
    ]
  },
  {
    title: "advanced software engineering",
    company: "walmart global tech simulation",
    description: "applied advanced data structures and software architecture to optimize relational database systems for enterprise scale.",
    tech: ["java", "sql", "software architecture", "data structures"],
    language: "java",
    image: "/projects/software_engineering.png",
    keyFeatures: [
      "Implemented concurrent hash maps for caching",
      "Designed distributed SQL database schemas",
      "Optimized enterprise JVM heap configurations"
    ],
    accomplishments: [
      { metric: "60%", label: "faster query times" },
      { metric: "10k+", label: "requests per second" },
      { metric: "O(1)", label: "cache access time" },
      { metric: "99.9%", label: "system uptime" }
    ]
  }
];

export default function ProjectsSection() {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  return (
    <>
      <section id="work" className="relative w-full bg-black/85 backdrop-blur-sm py-32 px-6 md:px-10 font-readex border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <StaggeredHeading
            text="project matrix."
            className="text-white font-medium lowercase mb-20"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.1} y={40} className={i === 2 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}>
                <button 
                  onClick={() => setModalData(project)}
                  data-cursor="view" 
                  className="block w-full text-left outline-none"
                >
                  <TiltCard className="w-full h-full">
                    <div className="bg-black/85 backdrop-blur-sm border border-white/5 rounded-3xl p-6 lg:p-8 hover:border-white/20 transition-colors h-full flex flex-col group">
                      
                      {/* WebGL Liquid Image Container */}
                      <div className="w-full h-48 md:h-64 bg-[#050505] rounded-2xl mb-8 overflow-hidden relative border border-white/5 group-hover:border-[#00ffcc]/30 transition-colors">
                        <LiquidImage imageUrl={project.image} />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-white text-xl lg:text-2xl font-medium tracking-tight lowercase">
                              {project.title}
                            </h3>
                            <span className="text-[#00ffcc]/60 group-hover:text-[#00ffcc] transition-colors whitespace-nowrap ml-4 text-xs font-mono tracking-widest mt-1">
                              [ RUN ]
                            </span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed lowercase mb-8">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <div
                              key={tech}
                              className="px-3 py-1.5 rounded-full bg-black border border-white/5 text-white/70 text-[10px] tracking-widest uppercase font-readex"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </button>
              </FadeUp>
            ))}
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
