"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-obsidian text-bone py-24 md:py-[120px]">
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
            className="object-cover object-center"
            priority
          />
        </motion.div>

        <div className="flex-1 flex flex-col gap-8">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-[40px] md:text-[60px] leading-[1.0] font-medium tracking-[-1.2px] font-[family-name:var(--font-abc-gravity-variable)] uppercase text-fog"
          >
            EL MOTOR DETRÁS DE TUS VENTAS
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-die-grotesk-b)] text-body-lg leading-body-lg max-w-[500px]"
          >
            <span className="text-slate">No me conformo con páginas web que solo son folletos digitales.</span> <span className="text-bone">Transformo tus cuellos de botella operativos en sistemas automatizados y tiendas virtuales que venden 24/7.</span> Mi objetivo es que la tecnología trabaje para ti, y no al revés.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button 
              onClick={() => {
                const section = document.getElementById('contact');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block bg-[#FF4C24] text-white font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest px-10 py-5 rounded-full font-bold shadow-[0_0_30px_rgba(255,76,36,0.3)] hover:shadow-[0_0_50px_rgba(255,76,36,0.6)] hover:bg-[#ff6436] transition-all hover:-translate-y-1"
            >
              Quiero automatizar mis ventas
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
