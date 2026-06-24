"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiTerminal } from "react-icons/fi";

export type ModalData = {
  title: string;
  company: string;
  description: string;
  codeSnippet?: string;
  outputLog?: string;
  image?: string;
  githubUrl?: string;
  language?: string;
  accomplishments?: { metric: string; label: string }[];
  keyFeatures?: string[];
};

interface HologramModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

export function HologramModal({ isOpen, onClose, data }: HologramModalProps) {
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm cursor-[url('/cursor-close.png'),_pointer]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-[5%] right-[5%] top-[10%] bottom-[10%] md:left-[10%] md:right-[10%] md:top-[10%] md:bottom-[10%] z-[101] bg-black/90 border border-[#00ffcc]/30 shadow-[0_0_50px_rgba(0,255,204,0.1)] rounded-xl overflow-hidden flex flex-col font-mono"
            style={{ pointerEvents: "auto" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#00ffcc]/20 bg-[#00ffcc]/5">
              <div className="flex items-center gap-3">
                <FiTerminal className="w-5 h-5 text-[#00ffcc]" />
                <div>
                  <h3 className="text-white text-lg font-medium tracking-wide lowercase">{data.title}</h3>
                  <p className="text-[#00ffcc]/60 text-xs tracking-widest uppercase">{data.company}</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col xl:flex-row gap-10 relative custom-scrollbar">
              {/* Left Column: Description & Actions */}
              <div className="flex-1 space-y-8 z-10 xl:max-w-md">
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/80 text-base leading-relaxed font-sans lowercase">
                    {data.description}
                  </p>
                </div>

                {data.keyFeatures && (
                  <div className="space-y-4">
                    <h4 className="text-[#00ffcc] text-xs tracking-widest uppercase mb-4">Core Deliverables</h4>
                    <ul className="space-y-3">
                      {data.keyFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-white/70 text-sm font-sans lowercase">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00ffcc]/50 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.githubUrl && (
                  <a 
                    href={data.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#00ffcc]/30 text-[#00ffcc] hover:bg-[#00ffcc]/10 transition-colors uppercase tracking-widest text-xs mt-8"
                  >
                    <FiGithub className="w-4 h-4" />
                    View Repository
                    <FiExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>

              {/* Right Column: Output / Image / Accomplishments */}
              <div className="flex-[1.5] flex flex-col border border-[#00ffcc]/20 rounded-xl overflow-hidden bg-[#050505] z-10 relative shadow-[0_0_30px_rgba(0,255,204,0.05)]">
                {/* Header bar for output */}
                <div className="flex items-center px-4 py-3 border-b border-[#00ffcc]/20 bg-[#00ffcc]/5 absolute top-0 left-0 right-0 z-20">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <span className="ml-4 text-xs text-[#00ffcc]/60 uppercase tracking-widest">
                    {data.accomplishments ? "project impact & achievements" : data.image ? "system visual output" : (data.language || "system output")}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto mt-12 p-6 md:p-8">
                  {data.accomplishments ? (
                    <div className="h-full flex flex-col justify-center gap-6">
                      <div className="grid grid-cols-2 gap-6">
                        {data.accomplishments.map((acc, idx) => (
                          <div key={idx} className="bg-white/5 border border-[#00ffcc]/20 rounded-lg p-6 hover:bg-[#00ffcc]/5 transition-colors">
                            <div className="text-3xl md:text-5xl font-light text-white mb-2" style={{ textShadow: "0 0 15px rgba(0,255,204,0.3)" }}>
                              {acc.metric}
                            </div>
                            <div className="text-[#00ffcc]/70 text-xs tracking-widest uppercase">
                              {acc.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : data.image ? (
                    <div className="w-full h-full flex items-center justify-center p-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={data.image} 
                        alt="Output" 
                        className="max-w-full max-h-full object-contain rounded-lg border border-[#00ffcc]/20 shadow-[0_0_20px_rgba(0,255,204,0.1)]"
                      />
                    </div>
                  ) : data.outputLog ? (
                    <div className="text-xs md:text-sm text-[#00ffcc]/90 font-mono leading-relaxed whitespace-pre" style={{ textShadow: "0 0 5px rgba(0,255,204,0.3)" }}>
                      {data.outputLog}
                    </div>
                  ) : data.codeSnippet ? (
                    <div className="text-xs md:text-sm text-[#00ffcc]/80 font-mono leading-relaxed whitespace-pre">
                      <code>{data.codeSnippet}</code>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_51%)] bg-[length:100%_4px] opacity-50 z-0" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
