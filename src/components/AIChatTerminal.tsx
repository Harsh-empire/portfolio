"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Terminal } from "lucide-react";
import { useSound } from "@/hooks/useSound";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function AIChatTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Harsh AI Core online. How can I assist you? Ask about my skills, experience, or contact info." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playClick, playHover } = useSound();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playClick();
    const userMessage = input.trim().toLowerCase();
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");

    // Simulate AI thinking delay
    setTimeout(() => {
      let response = "Command not recognized. Try asking about my 'skills', 'experience', or how to 'contact' me.";
      
      if (userMessage.includes("skill") || userMessage.includes("tech") || userMessage.includes("stack")) {
        response = "My core competencies include AI Architecture, Machine Learning pipelines, Full-Stack Next.js engineering, and complex systems design.";
      } else if (userMessage.includes("experience") || userMessage.includes("work") || userMessage.includes("background")) {
        response = "I have engineered scalable architectures, built hyper-optimized Web3 interfaces, and deployed robust, enterprise-grade backends.";
      } else if (userMessage.includes("hire") || userMessage.includes("contact") || userMessage.includes("email")) {
        response = "You can initiate a secure transmission via the Contact Terminal section, or email me directly at harahkr2004@gmail.com.";
      } else if (userMessage.includes("hello") || userMessage.includes("hi") || userMessage.includes("hey")) {
        response = "Greetings. I am the AI representation of Harsh Kumar. How may I direct your inquiry?";
      }

      setMessages(prev => [...prev, { role: "ai", content: response }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => { playClick(); setIsOpen(true); }}
            onMouseEnter={playHover}
            className="fixed bottom-6 right-6 z-40 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:border-white/30 transition-all duration-300"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 h-[500px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-[#00ffcc]" />
                <span className="font-mono text-sm tracking-widest text-white/80">HARSH_AI_CORE</span>
              </div>
              <button 
                onClick={() => { playClick(); setIsOpen(false); }}
                onMouseEnter={playHover}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user" 
                        ? "bg-white/10 text-white rounded-tr-none" 
                        : "bg-[#00ffcc]/10 text-[#00ffcc] border border-[#00ffcc]/20 rounded-tl-none shadow-[0_0_10px_rgba(0,255,204,0.1)]"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter command..."
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 font-mono text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ffcc]/50 transition-colors"
              />
              <button 
                type="submit"
                onMouseEnter={playHover}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
