"use client";
import { useState } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import DigitalBrainSection from "@/components/DigitalBrain";
import TimelineSection from "@/components/Timeline";
import ProjectsSection from "@/components/Projects";
import CommandCenter from "@/components/CommandCenter";
import SkillsMatrix from "@/components/SkillsMatrix";
import ContactTerminal from "@/components/ContactTerminal";
import FixedVideoBackground from "@/components/FixedVideoBackground";
import Navbar from "@/components/Navbar";
import MarqueeTicker from "@/components/MarqueeTicker";
import { BootSequence } from "@/components/BootSequence";
import { AIChatTerminal } from "@/components/AIChatTerminal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isBooted, setIsBooted] = useState(false);

  return (
    <main className="min-h-screen bg-black">
      {!isBooted && <BootSequence onComplete={() => setIsBooted(true)} />}
      
      {isBooted && loading && <Loader onComplete={() => setLoading(false)} />}
      
      {isBooted && !loading && (
        <>
          <FixedVideoBackground />
          <Navbar />
          <div className="w-full relative" style={{ zIndex: 1 }}>
            <Hero />
            <MarqueeTicker />
            <div className="relative">
              <DigitalBrainSection />
              <TimelineSection />
              <ProjectsSection />
              <CommandCenter />
              <SkillsMatrix />
              <ContactTerminal />
              
              {/* Footer */}
              <footer className="w-full py-8 text-center text-white/30 text-xs font-readex border-t border-white/5">
                © 2026 ai architect — designed in the dark.
              </footer>
            </div>
          </div>
          <AIChatTerminal />
        </>
      )}
    </main>
  );
}
