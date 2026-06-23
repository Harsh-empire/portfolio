"use client";
import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";

export default function ContactTerminal() {
  const [formData, setFormData] = useState({
    callsign: "",
    origin: "",
    frequency: "",
    payload: ""
  });
  const [sent, setSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.callsign || !formData.origin || !formData.payload) return;
    setSent(true);
    setTimeout(() => {
      setFormData({ callsign: "", origin: "", frequency: "", payload: "" });
      setSent(false);
    }, 3000);
  };

  return (
    <section id="contact" className="relative w-full bg-black/85 backdrop-blur-sm py-24 px-4 md:px-10 overflow-hidden border-t border-white/5 font-readex flex justify-center">
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Main Terminal Card Container */}
        <div className="w-full bg-[#0a0a0a] rounded-[2rem] border border-white/10 p-6 md:p-12 flex flex-col">
          
          {/* Header */}
          <FadeUp delay={0.1} className="w-full mb-10">
            <div className="text-white/40 text-xs tracking-widest uppercase mb-4 font-mono">
              / CONTACT TERMINAL
            </div>
            <h2 className="text-white font-medium lowercase text-5xl md:text-7xl tracking-tighter">
              open a transmission.
            </h2>
          </FadeUp>

          {/* Grid Layout */}
          <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-12">
            
            {/* Left Side: Portrait Image with Overlay */}
            <FadeUp delay={0.2} className="w-full lg:w-5/12">
              <div className="relative w-full h-[500px] md:h-[650px] rounded-3xl overflow-hidden bg-white/5 border border-white/10 group">
                <img 
                  src="/profile.png" 
                  alt="Harsh Kumar"
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Image Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-white text-lg font-medium tracking-tight lowercase">
                      harsh kumar
                    </span>
                    <span className="text-white/50 text-[10px] tracking-widest uppercase mt-1">
                      ai architect — independent
                    </span>
                  </div>
                  <span className="text-white/30 text-[10px] tracking-widest uppercase font-mono">
                    NODE - 001
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Right Side: Terminal Form */}
            <FadeUp delay={0.3} className="w-full lg:w-7/12 flex flex-col">
              <div className="w-full h-full rounded-3xl border border-white/10 bg-[#050505] p-6 md:p-10 flex flex-col relative overflow-hidden">
                
                {/* Terminal Top Bar */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-white/30 text-[10px] tracking-widest uppercase font-mono">
                    // TRANSMISSION/NEW
                  </span>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSend} className="flex flex-col gap-8 w-full flex-grow">
                  
                  {/* Callsign */}
                  <div className="flex flex-col">
                    <label className="text-white/50 text-xs tracking-widest uppercase mb-3 font-mono flex items-center gap-2">
                      <span className="text-[#27c93f]">&gt;</span> CALLSIGN
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.callsign}
                      onChange={(e) => setFormData({ ...formData, callsign: e.target.value })}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none text-white transition-colors lowercase placeholder:text-white/20 text-sm font-mono"
                      placeholder="your name"
                    />
                  </div>

                  {/* Origin Address */}
                  <div className="flex flex-col">
                    <label className="text-white/50 text-xs tracking-widest uppercase mb-3 font-mono flex items-center gap-2">
                      <span className="text-[#27c93f]">&gt;</span> ORIGIN ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none text-white transition-colors lowercase placeholder:text-white/20 text-sm font-mono"
                      placeholder="you@domain.com"
                    />
                  </div>

                  {/* Frequency */}
                  <div className="flex flex-col">
                    <label className="text-white/50 text-xs tracking-widest uppercase mb-3 font-mono flex items-center gap-2">
                      <span className="text-[#27c93f]">&gt;</span> FREQUENCY
                    </label>
                    <input
                      type="text"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none text-white transition-colors lowercase placeholder:text-white/20 text-sm font-mono"
                      placeholder="company / project"
                    />
                  </div>

                  {/* Payload */}
                  <div className="flex flex-col flex-grow">
                    <label className="text-white/50 text-xs tracking-widest uppercase mb-3 font-mono flex items-center gap-2">
                      <span className="text-[#27c93f]">&gt;</span> PAYLOAD
                    </label>
                    <textarea
                      required
                      value={formData.payload}
                      onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                      className="w-full h-32 bg-transparent border border-white/10 rounded-xl px-4 py-3 focus:border-white/30 outline-none text-white transition-colors resize-none lowercase placeholder:text-white/20 text-sm font-mono"
                      placeholder="briefing — what are we building?"
                    />
                  </div>

                  {/* Submit Button Area */}
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-auto pt-4 gap-4">
                    <span className="text-white/20 text-[10px] tracking-widest uppercase font-mono hidden sm:block">
                      WITHIN 48H
                    </span>
                    <button
                      type="submit"
                      disabled={sent}
                      className={`w-full sm:w-auto px-8 py-3 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center justify-center gap-2 font-mono ${
                        sent
                          ? "bg-[#27c93f]/20 border border-[#27c93f]/50 text-[#27c93f] cursor-not-allowed"
                          : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      {sent ? "CHANNEL OPEN" : "execute transmission +"}
                    </button>
                  </div>

                </form>
              </div>
            </FadeUp>

          </div>
        </div>
      </div>
    </section>
  );
}
