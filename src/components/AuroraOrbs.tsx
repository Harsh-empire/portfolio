"use client";
import { motion } from "framer-motion";

export default function AuroraOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Orb 1: Top Left */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-white blur-[120px] mix-blend-screen"
        style={{ opacity: 0.05 }}
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-10%", "15%", "-10%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Orb 2: Bottom Right */}
      <motion.div
        className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-white blur-[120px] mix-blend-screen"
        style={{ opacity: 0.04 }}
        animate={{
          x: ["10%", "-15%", "10%"],
          y: ["10%", "-10%", "10%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      {/* Orb 3: Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white blur-[120px] mix-blend-screen"
        style={{ opacity: 0.06 }}
        animate={{
          scale: [1, 1.1, 1],
          x: ["-50%", "-40%", "-50%"],
          y: ["-50%", "-60%", "-50%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
