"use client";
import TiltCard from "@/components/TiltCard";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";

const projects = [
  {
    title: "securify core",
    description: "enterprise-grade access management system built with rust and kafka. processes millions of authentication events per second with zero-trust architecture.",
    tech: ["rust", "kafka", "postgres", "redis"],
    link: "#",
  },
  {
    title: "neural engine",
    description: "distributed training pipeline for large language models. orchestrates gpu clusters via kubernetes to reduce training time by 40%.",
    tech: ["python", "pytorch", "k8s", "aws"],
    link: "#",
  },
  {
    title: "data sentinel",
    description: "anomaly detection engine for unstructured data streams. uses advanced ml techniques to flag security breaches in real-time.",
    tech: ["python", "tensorflow", "spark", "gcp"],
    link: "#",
  },
  {
    title: "nexus gateway",
    description: "high-performance api gateway handling edge routing and rate limiting. built entirely from scratch in go for maximum throughput.",
    tech: ["go", "grpc", "docker", "edge"],
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
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
            <FadeUp key={i} delay={0.1 + i * 0.1} y={40}>
              <a href={project.link} data-cursor="view" className="block outline-none">
                <TiltCard className="w-full h-full">
                  <div className="bg-black/85 backdrop-blur-sm border border-white/5 rounded-3xl p-8 lg:p-12 hover:border-white/20 transition-colors h-full flex flex-col justify-between group">
                    <div>
                      <div className="flex items-start justify-between mb-6">
                        <h3 className="text-white text-2xl font-medium tracking-tight lowercase">
                          {project.title}
                        </h3>
                        <span className="text-white/40 group-hover:text-white transition-colors">
                          ↗
                        </span>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed lowercase mb-12">
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
                </TiltCard>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
