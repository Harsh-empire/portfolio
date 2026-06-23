"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const fullText = "Initializing HarshOS...\nLoading Neural Systems...\nAuthenticating User...\nConnecting Intelligence Layer...\nAccess Granted.";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#030305] flex flex-col items-center justify-center font-mono"
    >
      <div className="w-full max-w-2xl px-6">
        <pre className="text-sm md:text-lg whitespace-pre-wrap text-[#00f0ff]">{text}<span className="animate-pulse">_</span></pre>
      </div>
    </motion.div>
  );
}
