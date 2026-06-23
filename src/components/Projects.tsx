"use client";
import TiltCard from "@/components/TiltCard";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";

const projects = [
  {
    title: "genai data analytics",
    description: "tata: performed risk profiling and delinquency prediction using ai-driven predictive modeling for collection strategies. synthesized complex datasets into high-impact business storytelling reports.",
    tech: ["python", "genai", "data analytics", "predictive modeling"],
    link: "#",
  },
  {
    title: "cyber security transformation",
    description: "deloitte: completed intensive tracks in cyber security, technology development, and data analytics. practiced enterprise-level coding standards and security-first development protocols.",
    tech: ["cyber security", "data analytics", "enterprise standards"],
    link: "#",
  },
  {
    title: "advanced software engineering",
    description: "walmart global tech: applied advanced data structures and software architecture to optimize relational database systems for enterprise scale.",
    tech: ["java", "sql", "software architecture", "data structures"],
    link: "#",
  }
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
