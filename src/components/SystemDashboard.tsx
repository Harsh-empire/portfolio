"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Clock, Globe2, Cpu } from "lucide-react";

export function SystemDashboard() {
  const [time, setTime] = useState("");
  const [cpuUsage, setCpuUsage] = useState(12);

  useEffect(() => {
    // Clock
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }) + " IST");
    }, 1000);

    // Simulated CPU jitter
    const cpuTimer = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 15) + 10); // Random between 10-25%
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(cpuTimer);
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between font-mono">
      {/* Header */}
      <div className="flex items-center justify-between text-white/50 mb-4">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-[#00ffcc]" />
          <span className="text-xs tracking-widest uppercase">Live System</span>
        </div>
        <div className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        
        {/* Time */}
        <div className="bg-black/30 border border-white/5 rounded-lg p-3 flex flex-col justify-between">
          <Clock size={14} className="text-white/40 mb-2" />
          <div className="text-sm font-semibold text-[#00ffcc]">{time || "LOADING..."}</div>
          <div className="text-[10px] text-white/40 uppercase">Local Server Time</div>
        </div>

        {/* Location */}
        <div className="bg-black/30 border border-white/5 rounded-lg p-3 flex flex-col justify-between">
          <Globe2 size={14} className="text-white/40 mb-2" />
          <div className="text-sm text-white">20.5937° N</div>
          <div className="text-[10px] text-white/40 uppercase">INDIA (BHARAT)</div>
        </div>

        {/* CPU/Mem */}
        <div className="col-span-2 bg-black/30 border border-white/5 rounded-lg p-3 flex flex-col justify-center gap-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-white/40">
              <Cpu size={14} /> Core Load
            </div>
            <span className="text-[#00ffcc]">{cpuUsage}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${cpuUsage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full bg-[#00ffcc] shadow-[0_0_10px_#00ffcc]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
