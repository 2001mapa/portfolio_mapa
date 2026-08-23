"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { habilidades } from "../data/servicesData";

export function ServicesSection() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  const toggleSkill = (index: number) => {
    setActiveSkill(activeSkill === index ? null : index);
  };

  return (
    <section id="services" className="relative w-full bg-[#151310] text-[#e8e4db] py-12 md:py-[120px] overflow-hidden">
      
      {/* Luz tenue focal */}
      <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(197,166,124,0.05)_0,transparent_70%)] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-end mb-8 border-b border-[#2a261a] pb-6 md:pb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[48px] md:text-[80px] leading-[1.0] font-medium tracking-[-2px] text-[#e8e4db] font-[family-name:var(--font-abc-gravity-variable)] uppercase select-none relative z-20"
          >
            HABILIDADES
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="md:max-w-[400px] relative z-20"
          >
            <p className="font-[family-name:var(--font-die-grotesk-b)] text-body-lg leading-body-lg text-[#a39481]">
              Haz clic en cualquier habilidad para descubrir cómo impactará directamente en tus métricas y ventas.
            </p>
          </motion.div>
        </div>

        {/* Accordion List */}
        <div className="w-full flex flex-col font-[family-name:var(--font-die-grotesk-b)]">
          {habilidades.map((hab, index) => {
            const isActive = activeSkill === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-[#2a261a] overflow-hidden"
              >
                <button
                  onClick={() => toggleSkill(index)}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 group text-left gap-4 md:gap-0"
                >
                  <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto">
                    <span className={`font-[family-name:var(--font-ibm-plex-mono)] text-sm tracking-widest transition-colors duration-300 ${isActive ? 'text-[#c5a67c]' : 'text-[#a39481] md:group-hover:text-[#c5a67c]'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 
                      className={`text-[28px] md:text-[56px] leading-[1.0] font-medium uppercase transition-colors duration-300 font-[family-name:var(--font-abc-gravity-variable)] tracking-tight ${isActive ? 'text-[#e8e4db]' : 'text-[#e8e4db]/50 md:group-hover:text-[#e8e4db]'}`}
                    >
                      {hab.title}
                    </h3>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-[#2a261a] md:group-hover:border-[#c5a67c] transition-colors duration-300">
                    <motion.span 
                      animate={{ rotate: isActive ? 180 : 0 }}
                      className="text-[#c5a67c]"
                    >
                      ↓
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="pb-6 md:pb-12 md:pl-[84px] max-w-[800px] flex flex-col gap-6">
                        <p className="text-xl md:text-2xl text-[#c5a67c] font-medium">
                          {hab.desc}
                        </p>
                        <p className="text-lg text-[#a39481] leading-relaxed">
                          {hab.benefits}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


