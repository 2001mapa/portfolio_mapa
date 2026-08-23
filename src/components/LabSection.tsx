"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const labProjects = [
  {
    title: "AI FINANCE BOT",
    description: "Chatbot de Telegram que registra y clasifica mis gastos analizando notas de voz.",
    tags: ["Telegram API", "IA", "Base de Datos"],
    icon: "🎙️",
    link: "#" // Se actualizará cuando el usuario proporcione el contenido
  },
  {
    title: "YT TO MP3 CONVERTER",
    description: "Convertidor ultrarrápido y sin publicidad, hecho a medida para mi mamá.",
    tags: ["Multimedia", "API", "React"],
    icon: "🎵",
    link: "#" // Se actualizará cuando el usuario proporcione el contenido
  }
];

export function LabSection() {
  return (
    <section id="lab" className="w-full bg-obsidian text-bone py-12 md:py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-end gap-6"
        >
          <div>
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-caption uppercase tracking-widest text-[#E8D4A6] mb-4 block">
              Side Projects & Experimentos
            </span>
            <h2 className="text-[40px] md:text-[64px] leading-[1.0] font-medium tracking-tight text-slate font-[family-name:var(--font-abc-gravity-variable)] uppercase">
              LABORATORIO
            </h2>
          </div>
          <p className="font-[family-name:var(--font-die-grotesk-b)] text-slate max-w-sm pb-2 text-sm md:text-base">
            Proyectos personales donde pruebo nuevas tecnologías, integro Inteligencia Artificial y resuelvo problemas reales del día a día.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {labProjects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-2xl p-8 md:hover:bg-white/10 md:hover:border-[#E8D4A6]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Radial gradient background to avoid blur GPU overdraw */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(232,212,166,0.05)_0,transparent_70%)] pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-100"></div>
              
              <div className="text-4xl mb-6 relative z-10">{project.icon}</div>
              
              <h3 className="font-[family-name:var(--font-die-grotesk-b)] text-2xl md:text-3xl uppercase text-white mb-3 relative z-10">
                {project.title}
              </h3>
              <p className="text-slate font-[family-name:var(--font-die-grotesk-b)] mb-8 h-auto min-h-[3rem] relative z-10">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-[family-name:var(--font-ibm-plex-mono)] text-[#E8D4A6] bg-[#E8D4A6]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="relative z-10 inline-block">
                <a 
                  href={project.link}
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-sm uppercase tracking-widest text-slate md:hover:text-[#E8D4A6] transition-colors active:scale-95 active:text-[#E8D4A6]"
                >
                  Ver Proyecto <span className="text-lg">↗</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
