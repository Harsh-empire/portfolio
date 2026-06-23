"use client";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import { motion } from "framer-motion";
import { BrainCircuit, Server, Database, Code2, Cloud, Layers } from "lucide-react";
import { SystemDashboard } from "@/components/SystemDashboard";

export default function SkillsMatrix() {
  return (
    <section id="skills" className="relative w-full bg-black/85 backdrop-blur-sm py-32 px-4 md:px-10 font-readex border-t border-white/5 flex justify-center overflow-hidden">
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        <StaggeredHeading
          text="skills matrix."
          className="text-white font-medium lowercase mb-4 text-center flex-wrap justify-center flex"
          style={{
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        />
        <FadeUp delay={0.2} as="p" className="mb-16">
          <span className="text-white/40 text-center block lowercase text-xs tracking-widest uppercase font-mono">
            // core competencies & technical architecture
          </span>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          
          {/* Card 1: Core AI (Large, spans 2 cols, 2 rows) */}
          <FadeUp delay={0.3} className="md:col-span-2 md:row-span-2">
            <div className="group relative w-full h-full min-h-[350px] rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-8 flex flex-col justify-end transition-all hover:border-white/20">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity duration-700">
                 <BrainCircuit className="w-40 h-40 text-white" strokeWidth={0.5} />
               </div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-0" />
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="w-2 h-2 rounded-full bg-[#27c93f] animate-pulse" />
                   <h3 className="text-white text-2xl font-medium tracking-tight lowercase">machine learning & ai</h3>
                 </div>
                 <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
                   architecting scalable neural networks, large language models, and automated inference pipelines.
                 </p>
                 <div className="flex flex-wrap gap-2">
                   {["pytorch", "tensorflow", "llms", "computer vision", "nlp"].map(tag => (
                     <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-mono uppercase tracking-widest backdrop-blur-sm">
                       {tag}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </FadeUp>

          {/* Card 2: Systems Engineering */}
          <FadeUp delay={0.4} className="md:col-span-1 lg:col-span-2">
            <div className="group relative w-full h-full rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-8 flex flex-col transition-all hover:border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-5 h-5 text-white/60" />
                <h3 className="text-white text-lg font-medium tracking-tight lowercase">backend engineering</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-grow">
                building high-performance microservices and distributed systems.
              </p>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-auto">
                 <motion.div className="h-full bg-white/40" initial={{ width: 0 }} whileInView={{ width: "95%" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} />
              </div>
            </div>
          </FadeUp>

          {/* Card 3: Data Engineering */}
          <FadeUp delay={0.5} className="md:col-span-1 lg:col-span-2">
            <div className="group relative w-full h-full rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-8 flex flex-col transition-all hover:border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-white/60" />
                <h3 className="text-white text-lg font-medium tracking-tight lowercase">data pipelines</h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                streaming architectures, etl workflows, and massive-scale lakes.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                 {["kafka", "spark", "postgres", "redis"].map(tag => (
                   <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 text-[10px] font-mono uppercase tracking-widest">
                     {tag}
                   </span>
                 ))}
              </div>
            </div>
          </FadeUp>

          {/* Card 4: Languages */}
          <FadeUp delay={0.6} className="md:col-span-2 lg:col-span-2">
            <div className="group relative w-full h-full rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-8 transition-all hover:border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <Code2 className="w-5 h-5 text-white/60" />
                <h3 className="text-white text-lg font-medium tracking-tight lowercase">languages</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                 {[
                   { name: "python", val: "95%" },
                   { name: "typescript", val: "90%" },
                   { name: "go", val: "80%" },
                   { name: "c++", val: "75%" }
                 ].map((lang, idx) => (
                   <div key={lang.name} className="flex flex-col gap-3">
                     <span className="text-white/80 text-[10px] font-mono uppercase tracking-widest">{lang.name}</span>
                     <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-white/60" initial={{ width: 0 }} whileInView={{ width: lang.val }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.6 + (idx * 0.1) }} />
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </FadeUp>

          {/* Card 5: Infrastructure */}
          <FadeUp delay={0.7} className="md:col-span-1 lg:col-span-1">
            <div className="group relative w-full h-full rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-8 flex flex-col items-start justify-between transition-all hover:border-white/20">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-2">
                  <Cloud className="w-5 h-5 text-white/60" />
                  <h3 className="text-white text-lg font-medium tracking-tight lowercase">infra</h3>
                </div>
                <p className="text-white/50 text-[10px] uppercase font-mono tracking-widest mt-2">docker • k8s</p>
              </div>
              <Layers className="w-12 h-12 text-white/5 group-hover:text-white/20 transition-colors duration-500 self-end mt-4" />
            </div>
          </FadeUp>

          {/* Card 6: Live System Dashboard */}
          <FadeUp delay={0.8} className="md:col-span-3 lg:col-span-1">
            <div className="group relative w-full h-full rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden p-6 transition-all hover:border-white/20">
              <SystemDashboard />
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
