"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, useRef, useState, useEffect } from "react";

// Formateador de moneda COP (copiado de PricingSection)
const formatCOP = (val: number) => {
  if (val >= 1000000) {
    return `$${(val / 1000000).toFixed(1)}M`;
  }
  return `$${(val / 1000).toFixed(0)}k`;
};

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pricingSummary, setPricingSummary] = useState<any>(null);

  // 🛡️ OFUSCACIÓN DE CONTACTO
  // El número base64 es "584246043812" y la URL es "https://wa.me/"
  // Esto evita que los robots de scraping lean tu número en el código fuente.
  const ENCODED_PHONE = "NTg0MjQ2MDQzODEy";
  const ENCODED_URL = "aHR0cHM6Ly93YS5tZS8=";

  useEffect(() => {
    const loadSummary = () => {
      const data = localStorage.getItem('pricingSummary');
      if (data) {
        setPricingSummary(JSON.parse(data));
      }
    };
    loadSummary();
    window.addEventListener('pricingUpdated', loadSummary);
    return () => window.removeEventListener('pricingUpdated', loadSummary);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🛡️ SHADOW SAVE: Guardado Oculto
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          message: formState.message,
          pricingSummary: pricingSummary
        })
      });
    } catch (err) {
      console.error("Shadow save failed", err);
    }

    let waMessage = `Hola Miguel, mi nombre es ${formState.name}.\n\n`;

    if (pricingSummary) {
      waMessage += `*ESTADO DEL REACTOR (Cotización)*\n`;
      waMessage += `Tipo: ${pricingSummary.type}\n`;
      waMessage += `Rango Base: $${(pricingSummary.totalMin / 1000000).toFixed(1)}M - $${(pricingSummary.totalMax / 1000000).toFixed(1)}M COP\n`;
      
      if (pricingSummary.features && pricingSummary.features.length > 0) {
        waMessage += `Módulos:\n`;
        pricingSummary.features.forEach((f: string) => {
          waMessage += `  - ${f}\n`;
        });
      }
      waMessage += `\n*Mi mensaje adicional:*\n`;
    }

    waMessage += formState.message;

    // Desencriptar en tiempo de ejecución (invisible para los bots)
    const baseUrl = typeof window !== 'undefined' ? window.atob(ENCODED_URL) : '';
    const phone = typeof window !== 'undefined' ? window.atob(ENCODED_PHONE) : '';
    const waUrl = `${baseUrl}${phone}?text=${encodeURIComponent(waMessage)}`;
    
    window.open(waUrl, "_blank");

    // Limpiar toda la cotización de memoria y reiniciar el formulario
    window.dispatchEvent(new Event('resetPricing'));
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: "", message: "" });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="relative w-full bg-obsidian text-bone py-12 md:py-[150px] overflow-hidden">
      
      {/* Background Abstract Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,rgba(232,212,166,0.1)_0,transparent_70%)] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,transparent_70%)] rounded-full pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col gap-16 md:gap-24">
        
        {/* Massive Header */}
        <div className="w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[8vw] md:text-[10vw] md:text-[120px] leading-[0.85] font-medium tracking-[-4px] md:tracking-[-6px] font-[family-name:var(--font-abc-gravity-variable)] uppercase max-w-[1000px]"
          >
            ¿LISTO PARA <br />
            <span className="text-[#E8D4A6]">CONSTRUIR ALGO INCREÍBLE?</span>
          </motion.h2>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 justify-between">
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col gap-12 lg:w-1/3 order-2 lg:order-1"
          >
            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-caption uppercase tracking-widest text-[#E8D4A6] mb-4">Línea Directa</p>
              <div className="font-[family-name:var(--font-die-grotesk-b)] text-body-lg md:text-[32px] leading-tight text-white flex items-center gap-3">
                Hablemos de código y arquitectura
              </div>
            </div>

            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-caption uppercase tracking-widest text-slate mb-4">Redes Sociales</p>
              <div className="flex flex-col gap-4">
                <MagneticLink href="https://www.linkedin.com/in/miguel-alejandro-paz-albornoz">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  LinkedIn
                </MagneticLink>
                <MagneticLink href="https://github.com/2001mapa">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  GitHub
                </MagneticLink>
              </div>
            </div>
          </motion.div>

          {/* Right: The Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-full lg:w-2/3 max-w-[700px] order-1 lg:order-2"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              
              {/* Pricing Summary Integration */}
              {pricingSummary && (
                <div className="w-full bg-white/5 border border-[#E8D4A6]/50 p-6 rounded-xl backdrop-blur-md mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-[family-name:var(--font-ibm-plex-mono)] text-[#E8D4A6] uppercase tracking-widest text-sm font-bold">Resumen del Reactor</h4>
                    <span className="font-[family-name:var(--font-die-grotesk-b)] text-white bg-white/10 px-3 py-1 rounded-full text-sm">
                      {formatCOP(pricingSummary.totalMin)} - {formatCOP(pricingSummary.totalMax)} COP
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-die-grotesk-b)] text-white text-lg mb-2">
                    Proyecto: <span className="text-slate">{pricingSummary.type}</span>
                  </p>
                  {pricingSummary.features && pricingSummary.features.length > 0 && (
                    <div className="mt-4">
                      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-slate text-xs uppercase tracking-widest mb-2">Módulos Seleccionados:</p>
                      <ul className="flex flex-wrap gap-2">
                        {pricingSummary.features.map((f: string, i: number) => (
                          <li key={i} className="text-xs font-[family-name:var(--font-die-grotesk-b)] bg-white/10 text-slate px-3 py-1 rounded-md">
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-xs text-slate mt-6 italic">*Esta información se adjuntará automáticamente a tu mensaje de WhatsApp.</p>
                </div>
              )}

              {/* Name Input */}
              <div className="relative group">
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="block w-full bg-transparent border-b border-graphite/50 py-4 text-body-lg font-[family-name:var(--font-die-grotesk-b)] focus:outline-none focus:border-[#E8D4A6] transition-colors peer"
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-0 top-4 text-slate text-body-lg font-[family-name:var(--font-die-grotesk-b)] transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#E8D4A6] peer-valid:-top-6 peer-valid:text-sm peer-valid:text-slate pointer-events-none"
                >
                  ¿Cuál es tu nombre?
                </label>
              </div>

              {/* Message Input */}
              <div className="relative group">
                <textarea 
                  name="message" 
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="block w-full bg-transparent border-b border-graphite/50 py-4 text-body-lg font-[family-name:var(--font-die-grotesk-b)] focus:outline-none focus:border-[#E8D4A6] transition-colors peer resize-none"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-0 top-4 text-slate text-body-lg font-[family-name:var(--font-die-grotesk-b)] transition-all duration-300 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-[#E8D4A6] peer-valid:-top-6 peer-valid:text-sm peer-valid:text-slate pointer-events-none"
                >
                  Háblame sobre tu equipo o vacante...
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <MagneticSubmitButton isSubmitting={isSubmitting} />
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// Subcomponente: Enlace Magnético para Redes Sociales
function MagneticLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) return; // Disable on touch devices

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-flex items-center gap-3 font-[family-name:var(--font-die-grotesk-b)] text-body-lg text-bone md:hover:text-[#E8D4A6] active:text-[#E8D4A6] w-fit transition-all duration-300 active:scale-95"
    >
      {children}
    </motion.a>
  );
}

// Subcomponente: Botón Magnético de Envío
function MagneticSubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    if (typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches) return; // Disable on touch devices

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Movimiento magnético más sutil para botones grandes
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`relative overflow-hidden w-full md:w-auto px-12 py-6 rounded-full font-[family-name:var(--font-ibm-plex-mono)] font-semibold tracking-widest uppercase transition-all duration-500 bg-[#FF4C24] text-white active:bg-[#ff6436] md:hover:bg-[#ff6436] md:hover:shadow-[0_0_40px_rgba(255,76,36,0.5)] active:scale-95`}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-4">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          REDIRIGIENDO...
        </span>
      ) : (
        "ENVIAR A WHATSAPP"
      )}
    </motion.button>
  );
}
