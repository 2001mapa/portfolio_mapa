"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { MouseEvent, useRef } from "react";

export function AboutSection() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Efecto magnético sutil
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const titleWords = "AI-DRIVEN PRODUCT ENGINEER".split(" ");

  return (
    <section id="about" className="w-full bg-obsidian text-bone py-12 md:py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full md:flex-1 aspect-[3/4] max-w-[400px] bg-graphite rounded-[14.4px] overflow-hidden shadow-2xl shadow-black/50"
        >
          <Image 
            src="/foto-perfil.jpeg" 
            alt="Miguel Albornoz Portrait" 
            fill 
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center"
            priority
          />
        </motion.div>

        <div className="flex-1 flex flex-col gap-8">
          <motion.h1 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {}
            }}
            className="text-[40px] md:text-[60px] leading-[1.0] font-medium tracking-[-1.2px] font-[family-name:var(--font-abc-gravity-variable)] uppercase text-fog flex flex-wrap gap-x-4"
          >
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-[family-name:var(--font-die-grotesk-b)] text-body-lg leading-body-lg max-w-[500px]"
          >
            <span className="text-slate">Especialista en Next.js, React y ecosistemas Serverless.</span> <span className="text-bone">Mi enfoque es la orquestación de Inteligencia Artificial para construir arquitecturas completas y escalables de extremo a extremo.</span> Diseño, conecto y despliego código listo para producción.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
          >
            <motion.button 
              ref={btnRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              onClick={() => {
                window.open('https://github.com/2001mapa', '_blank');
              }}
              className="inline-block bg-[#FF4C24] text-white font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(255,76,36,0.3)] active:bg-[#ff6436] md:hover:shadow-[0_0_50px_rgba(255,76,36,0.6)] md:hover:bg-[#ff6436] transition-colors"
            >
              Ver mi GitHub
            </motion.button>

            <button 
              onClick={() => {
                const section = document.getElementById('work');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block px-8 py-5 text-slate active:text-white md:hover:text-white font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest transition-colors"
            >
              Ver Arquitectura
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
