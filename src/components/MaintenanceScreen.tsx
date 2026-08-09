"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MaintenanceScreen() {
  const handleWhatsApp = () => {
    // El número está ofuscado en Base64 para evitar bots de scraping
    // "584246043812" -> "NTg0MjQ2MDQzODEy"
    const encodedPhone = "NTg0MjQ2MDQzODEy";
    const phone = atob(encodedPhone);
    const text = encodeURIComponent("Hola Miguel, el portafolio está en mantenimiento pero me gustaría hablar sobre un proyecto.");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#E2E2B6] flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Luces de fondo (estilo premium) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8D4A6] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center max-w-2xl"
      >
        {/* Logo */}
        <div className="w-20 h-20 md:w-28 md:h-28 relative mb-12 drop-shadow-[0_0_15px_rgba(232,212,166,0.3)]">
          <Image 
            src="/Logo_Portfolio.png" 
            alt="Logo" 
            fill 
            className="object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="font-[family-name:var(--font-die-grotesk-b)] text-4xl md:text-6xl text-white mb-6 tracking-tight">
          ACTUALIZANDO INFRAESTRUCTURA
        </h1>

        {/* Mensaje */}
        <p className="font-[family-name:var(--font-die-grotesk-b)] text-lg md:text-xl text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
          Estamos construyendo una experiencia digital de alto nivel. 
          Vuelve pronto para descubrir una nueva forma de escalar negocios en internet.
        </p>

        {/* Botón de Emergencia Encriptado */}
        <button 
          onClick={handleWhatsApp}
          className="flex items-center gap-3 bg-[#FF4C24] text-white font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest text-xs md:text-sm px-6 py-4 rounded-full mb-12 shadow-[0_0_20px_rgba(255,76,36,0.3)] hover:shadow-[0_0_40px_rgba(255,76,36,0.6)] hover:bg-[#ff6436] transition-all duration-300 active:scale-95 group border border-[#FF4C24]/50 hover:border-white/20"
        >
          <span className="font-bold">Contactar por WhatsApp</span>
          <span className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all">→</span>
        </button>

        {/* Decoración */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-white/20"></div>
          <div className="w-2 h-2 rounded-full bg-[#FF4C24] animate-pulse shadow-[0_0_15px_rgba(255,76,36,0.8)]"></div>
          <div className="w-12 h-[1px] bg-white/20"></div>
        </div>
      </motion.div>
    </div>
  );
}
