"use client";

import { motion, useScroll, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function FloatingCTA() {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // Mostrar solo si ha bajado más de 500px
      if (latest > 500) {
        setIsVisible(true);
        controls.start({ opacity: 1, y: 0, scale: 1 });
      } else {
        setIsVisible(false);
        controls.start({ opacity: 0, y: 20, scale: 0.9 });
      }
    });
    return () => unsubscribe();
  }, [scrollY, controls]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={controls}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-12 md:right-12 w-[calc(100%-3rem)] md:w-auto flex justify-center z-50 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <button
        onClick={scrollToContact}
        className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#FF4C24] text-white font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-xs md:text-sm px-6 py-4 rounded-full shadow-[0_0_20px_rgba(255,76,36,0.3)] active:bg-[#ff6436] md:hover:shadow-[0_0_40px_rgba(255,76,36,0.6)] md:hover:bg-[#ff6436] transition-all duration-300 active:scale-95 group border border-[#FF4C24]/50 md:hover:border-white/20"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <span className="font-bold">HABLEMOS</span>
        <span className="text-white/50 md:group-hover:text-white md:group-hover:translate-x-1 transition-all">→</span>
      </button>
    </motion.div>
  );
}
