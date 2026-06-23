"use client";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import { FiArrowRight } from "react-icons/fi";

const certifications = [
  { name: "oracle certified: ai foundations associate", status: "active" },
  { name: "gen ai engineering mastermind - outskill", status: "active" }
];

const simulations = [
  { name: "jpmorgan chase: software engineering", link: "#" },
  { name: "goldman sachs: operations job simulation", link: "#" }
];

export default function CommandCenter() {
  return (
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
                  <div key={i} className="flex items-center justify-between py-6 border-t border-white/5 first:border-transparent">
                    <span className="text-white/80 text-sm tracking-tight lowercase">
                      {cert.name}
                    </span>
                    <span className="text-white/40 text-[10px] tracking-widest uppercase">
                      {cert.status}
                    </span>
                  </div>
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
                  <a key={i} href={sim.link} className="group flex items-center justify-between py-6 border-t border-white/5 first:border-transparent cursor-none outline-none" data-cursor="explore">
                    <div className="flex items-center gap-4">
                      {/* Indicator Dot */}
                      <div className="w-2 h-2 rounded-full bg-white/20 transition-all duration-300 group-hover:bg-white group-hover:scale-[1.4]" />
                      <span className="text-white/80 text-sm tracking-tight lowercase group-hover:text-white transition-colors">
                        {sim.name}
                      </span>
                    </div>
                    <FiArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
