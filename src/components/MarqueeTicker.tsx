"use client";
import { motion } from "framer-motion";

const tags = [
  "ai systems",
  "ml infra",
  "kafka",
  "rust",
  "k8s",
  "agents",
  "rag",
  "edge",
  "distributed",
];

export default function MarqueeTicker() {
  // We duplicate the tags multiple times to ensure seamless infinite scrolling
  const duplicatedTags = [...tags, ...tags, ...tags, ...tags];

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-black/50 backdrop-blur-md py-4 relative z-10 flex">
      <motion.div
        className="flex whitespace-nowrap items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedTags.map((tag, i) => (
          <div key={i} className="flex items-center">
            <span className="text-white/80 text-xs md:text-sm font-medium tracking-[0.2em] uppercase font-readex mx-8">
              {tag}
            </span>
            <span className="text-white/15 text-xs">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
