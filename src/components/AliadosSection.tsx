"use client";

import { motion } from "framer-motion";

export function AliadosSection() {
  const aliados = ["WOMPI", "SUPABASE", "VERCEL", "STRIPE", "AWS", "POSTGRESQL"];

  return (
    <section id="aliados" className="w-full bg-fog text-graphite py-24 overflow-hidden border-y border-graphite">
      <div className="max-w-[1200px] mx-auto px-6 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-[48px] leading-[1.0] font-medium tracking-[-0.96px] font-[family-name:var(--font-abc-gravity-variable)] uppercase text-graphite"
        >
          ALIADOS ESTRATÉGICOS
        </motion.h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...aliados, ...aliados, ...aliados, ...aliados].map((logo, index) => (
            <div key={index} className="flex items-center text-slate font-[family-name:var(--font-die-grotesk-b)] text-[48px] mx-12 font-medium hover:text-[#E8D4A6] transition-colors cursor-pointer">
              <span>{logo}</span>
              <div className="w-[2px] h-12 bg-graphite transform rotate-[15deg] ml-24"></div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
