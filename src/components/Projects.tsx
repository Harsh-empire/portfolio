"use client";
import { useState } from "react";
import TiltCard from "@/components/TiltCard";
import { FadeUp, StaggeredHeading } from "@/components/FadeUp";
import { HologramModal, ModalData } from "@/components/HologramModal";
import LiquidImage from "@/components/LiquidImage";

const projects = [
  {
    title: "genai data analytics",
    company: "tata simulation",
    description: "performed risk profiling and delinquency prediction using ai-driven predictive modeling for collection strategies. synthesized complex datasets into high-impact business storytelling reports.",
    tech: ["python", "genai", "data analytics", "predictive modeling"],
    language: "python",
    image: "/projects/genai_analytics.png",
    codeSnippet: `import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def predict_delinquency(data_path: str):
    # Load enterprise customer financial dataset
    df = pd.read_csv(data_path)
    
    # Feature Engineering for Risk Profiling
    features = df[['debt_to_income', 'payment_history', 'credit_utilization']]
    labels = df['is_delinquent']
    
    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        features, labels, test_size=0.2, random_state=42
    )
    
    # AI-Driven Predictive Modeling
    model = RandomForestClassifier(n_estimators=100, max_depth=10)
    model.fit(X_train, y_train)
    
    # Generate Business Impact Report
    predictions = model.predict(X_test)
    print("Delinquency Prediction Report:")
    print(classification_report(y_test, predictions))

if __name__ == "__main__":
    predict_delinquency("customer_data_2026.csv")`
  },
  {
    title: "cyber security transformation",
    company: "deloitte simulation",
    description: "completed intensive tracks in cyber security, technology development, and data analytics. practiced enterprise-level coding standards and security-first development protocols.",
    tech: ["cyber security", "data analytics", "enterprise standards"],
    language: "python",
    image: "/projects/cyber_security.png",
    codeSnippet: `import ssl
import socket
import logging

logging.basicConfig(level=logging.INFO)

def verify_enterprise_security(hostname: str, port: int = 443):
    """
    Enterprise Security Protocol: 
    Validates TLS configuration against zero-trust architecture.
    """
    context = ssl.create_default_context()
    context.check_hostname = True
    context.verify_mode = ssl.CERT_REQUIRED
    
    # Enforce modern cipher suites
    context.set_ciphers('ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384')

    try:
        with socket.create_connection((hostname, port)) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert = ssock.getpeercert()
                logging.info(f"Security Transformation Complete: {hostname}")
                logging.info(f"Protocol: {ssock.version()}")
                logging.info(f"Cipher: {ssock.cipher()[0]}")
                return True
    except ssl.SSLError as e:
        logging.error(f"Vulnerability Detected: {e}")
        return False

# Execute Security Audit
verify_enterprise_security("secure-internal.deloitte.com")`
  },
  {
    title: "advanced software engineering",
    company: "walmart global tech simulation",
    description: "applied advanced data structures and software architecture to optimize relational database systems for enterprise scale.",
    tech: ["java", "sql", "software architecture", "data structures"],
    language: "java",
    image: "/projects/software_engineering.png",
    codeSnippet: `package com.walmart.globaltech.optimization;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

/**
 * Enterprise Scale Data Structure Optimization
 * Implements a high-throughput cache for relational database queries.
 */
public class DistributedQueryCache<K, V> {
    
    private final Map<K, V> highThroughputCache;
    private final int maxCapacity;

    public DistributedQueryCache(int capacity) {
        this.maxCapacity = capacity;
        // Optimized for multi-threaded read/write architectures
        this.highThroughputCache = new ConcurrentHashMap<>(capacity, 0.75f, 64);
    }

    public void putOptimized(K key, V value) {
        if (highThroughputCache.size() >= maxCapacity) {
            evictStaleEntries();
        }
        highThroughputCache.put(key, value);
    }

    public V fetch(K key) {
        return highThroughputCache.get(key);
    }

    private void evictStaleEntries() {
        // Implement advanced LRU/LFU eviction algorithms
        // required for enterprise-scale memory management
        System.out.println("[SYSTEM] Evicting stale cache blocks to optimize memory.");
        highThroughputCache.clear(); 
    }
}`
  }
];

export default function ProjectsSection() {
  const [modalData, setModalData] = useState<ModalData | null>(null);

  return (
    <>
      <section id="work" className="relative w-full bg-black/85 backdrop-blur-sm py-32 px-6 md:px-10 font-readex border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <StaggeredHeading
            text="project matrix."
            className="text-white font-medium lowercase mb-20"
            style={{
              fontSize: "clamp(36px, 6vw, 80px)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.1} y={40} className={i === 2 ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}>
                <button 
                  onClick={() => setModalData(project)}
                  data-cursor="view" 
                  className="block w-full text-left outline-none"
                >
                  <TiltCard className="w-full h-full">
                    <div className="bg-black/85 backdrop-blur-sm border border-white/5 rounded-3xl p-6 lg:p-8 hover:border-white/20 transition-colors h-full flex flex-col group">
                      
                      {/* WebGL Liquid Image Container */}
                      <div className="w-full h-48 md:h-64 bg-[#050505] rounded-2xl mb-8 overflow-hidden relative border border-white/5 group-hover:border-[#00ffcc]/30 transition-colors">
                        <LiquidImage imageUrl={project.image} />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-white text-xl lg:text-2xl font-medium tracking-tight lowercase">
                              {project.title}
                            </h3>
                            <span className="text-[#00ffcc]/60 group-hover:text-[#00ffcc] transition-colors whitespace-nowrap ml-4 text-xs font-mono tracking-widest mt-1">
                              [ RUN ]
                            </span>
                          </div>
                          <p className="text-white/60 text-sm leading-relaxed lowercase mb-8">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <div
                              key={tech}
                              className="px-3 py-1.5 rounded-full bg-black border border-white/5 text-white/70 text-[10px] tracking-widest uppercase font-readex"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </button>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <HologramModal 
        isOpen={!!modalData} 
        onClose={() => setModalData(null)} 
        data={modalData} 
      />
    </>
  );
}
