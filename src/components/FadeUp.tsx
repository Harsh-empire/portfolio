"use client";
import { motion } from "framer-motion";
import { CSSProperties, ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "span" | "h1" | "h2" | "h3" | "p" | "nav";
  once?: boolean;
};

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  className,
  style,
  as = "div",
  once = true,
}: FadeUpProps) {
  const Tag = motion[as] as any;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

// Animated heading that reveals word-by-word
export function StaggeredHeading({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 32 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
  };

  return (
    <motion.h2
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em", ...style }}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex pb-2 -mb-2">
          <motion.span variants={item}>{word}</motion.span>
        </span>
      ))}
    </motion.h2>
  );
}
