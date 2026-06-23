"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiquidButton from "@/components/LiquidButton";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-end pb-32 font-readex"
    >
      <motion.div
        style={{ y, scale, opacity, filter: blur }}
        className="px-6 md:px-10 max-w-7xl mx-auto w-full flex flex-col items-start gap-8 z-10 pt-48"
      >
        {/* Availability Badge */}
        <FadeUp delay={0.1}>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-white/60 text-xs tracking-widest uppercase">
              available for select engagements — 2026
            </span>
          </div>
        </FadeUp>

        {/* Massive Heading */}
        <div className="max-w-5xl">
          <StaggeredHeading
            text="build the future with ai and engineering."
            className="text-white font-light tracking-tighter lowercase leading-[0.9]"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
          />
        </div>

        {/* Subhead */}
        <FadeUp delay={0.9} y={24} as="p" className="text-white/60 text-sm md:text-base max-w-md leading-relaxed">
          we construct end-to-end ai automation systems and high-performance neural architecture.
        </FadeUp>

        {/* CTAs */}
        <FadeUp delay={1.1} y={24} className="flex flex-wrap items-center gap-6 mt-4">
          <LiquidButton className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full text-sm font-medium uppercase tracking-wider">
            view selected work
          </LiquidButton>
          <a href="#brain" className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider border-b border-transparent hover:border-white pb-1" data-cursor="view">
            explore the brain
          </a>
        </FadeUp>
      </motion.div>

      {/* Metrics Footer */}
      <div className="absolute bottom-10 left-6 right-6 md:left-10 md:right-10 border-t border-white/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10">
        <div className="flex flex-wrap items-center gap-8 md:gap-16 w-full">
          {[
            { value: "+5", label: "enterprise projects" },
            { value: "100%", label: "project success" },
            { value: "+3", label: "internships shipped" },
          ].map((metric, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16">
              <FadeUp delay={1.3 + i * 0.1}>
                <div className="flex flex-col">
                  <span className="text-white text-2xl font-light">{metric.value}</span>
                  <span className="text-white/40 text-xs uppercase tracking-widest mt-1">
                    {metric.label}
                  </span>
                </div>
              </FadeUp>
              {i < 2 && (
                <div className="hidden md:block w-px h-12 bg-white/20 rotate-[-20deg]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
