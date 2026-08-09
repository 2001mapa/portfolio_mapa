"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProjectTypeData, QuestionData, projectTypes, formatCurrency } from "../../data/pricingData";

interface PricingQuizProps {
  selectedType: ProjectTypeData | null;
  isFinished: boolean;
  currentStep: number;
  activeQuestions: QuestionData[];
  counterValue: number;
  setCounterValue: (val: number) => void;
  handleSelectProjectType: (pt: ProjectTypeData) => void;
  handleAnswer: (yes: boolean, quantity?: number) => void;
  projectiles: { id: number; targetX: string | number; targetY: string | number }[];
  currency: 'COP' | 'USD';
}

export function PricingQuiz({
  selectedType,
  isFinished,
  currentStep,
  activeQuestions,
  counterValue,
  setCounterValue,
  handleSelectProjectType,
  handleAnswer,
  projectiles,
  currency
}: PricingQuizProps) {
  return (
    <div className="w-full xl:w-[50%] flex flex-col gap-2 xl:gap-8 min-h-[120px] xl:min-h-[550px] justify-center relative">


      <div className="relative w-full flex-1">
        <AnimatePresence mode="wait">
          
          {/* ESTADO 1: Elegir Núcleo Base */}
          {selectedType === null && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col gap-6"
            >
              <h3 className="font-[family-name:var(--font-die-grotesk-b)] text-[32px] md:text-[48px] leading-[1.1] text-white">
                ¿Qué tipo de solución digital necesitas construir?
              </h3>
              
              <div className="flex flex-col gap-4 mt-4 xl:mt-auto">
                {projectTypes.map(pt => (
                  <button 
                    key={pt.id}
                    onClick={() => handleSelectProjectType(pt)}
                    className="flex flex-col items-center justify-center bg-white/5 border border-white/10 hover:border-[#E8D4A6]/50 hover:bg-[#E8D4A6]/10 p-5 rounded-xl transition-all duration-300 group text-center"
                  >
                    <span className="font-[family-name:var(--font-die-grotesk-b)] text-[22px] md:text-2xl text-white group-hover:text-[#E8D4A6] transition-colors mb-1">
                      {pt.label}
                    </span>
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-sm text-[#E8D4A6] mb-2">
                      Desde {formatCurrency(pt.minPrice, currency)}
                    </span>
                    <p className="font-[family-name:var(--font-die-grotesk-b)] text-slate text-sm md:text-base max-w-[90%]">
                      {pt.desc}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ESTADO 2: Preguntas */}
          {selectedType !== null && !isFinished && activeQuestions[currentStep] && (
            <motion.div
              key={`step-${currentStep + 1}`}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col gap-6"
            >
              <div className="text-[#E8D4A6] font-[family-name:var(--font-ibm-plex-mono)] tracking-widest text-sm uppercase">
                Módulo: {activeQuestions[currentStep].title}
              </div>
              <h3 className="font-[family-name:var(--font-die-grotesk-b)] text-[32px] md:text-[48px] leading-[1.1] text-white">
                {activeQuestions[currentStep].label}
              </h3>
              <p className="font-[family-name:var(--font-die-grotesk-b)] text-body-lg text-slate">
                {activeQuestions[currentStep].desc}
              </p>
              
              {activeQuestions[currentStep].type === "counter" ? (
                <div className="flex flex-col sm:flex-row gap-4 mt-4 xl:mt-auto xl:pt-6">
                  <div className="flex items-center justify-between gap-4 bg-white/5 border border-graphite rounded-xl p-2 w-full sm:w-auto">
                    <button onClick={() => setCounterValue(Math.max(1, counterValue - 1))} className="w-12 h-12 flex justify-center items-center text-white text-2xl hover:bg-white/10 rounded-lg transition-colors">-</button>
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-white text-2xl font-bold w-12 text-center">{counterValue}</span>
                    <button onClick={() => setCounterValue(counterValue + 1)} className="w-12 h-12 flex justify-center items-center text-white text-2xl hover:bg-white/10 rounded-lg transition-colors">+</button>
                  </div>
                  
                  <button 
                    onClick={() => handleAnswer(true, counterValue)}
                    className="flex-1 flex flex-col items-center justify-center bg-white text-obsidian py-4 px-2 rounded-xl hover:bg-[#E8D4A6] transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(232,212,166,0.4)]"
                  >
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest font-bold">Añadir {counterValue} {counterValue === 1 ? 'Pág.' : 'Págs.'}</span>
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs opacity-70 mt-1">+ {formatCurrency(activeQuestions[currentStep].minPrice * counterValue, currency)}</span>
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)}
                    className="flex-none bg-transparent border border-graphite text-slate px-6 py-4 rounded-xl hover:bg-graphite hover:text-white transition-colors duration-300"
                  >
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest">Omitir</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 mt-4 xl:mt-auto xl:pt-6">
                  <button 
                    onClick={() => handleAnswer(true)}
                    className="flex-1 flex flex-col items-center justify-center bg-white text-obsidian py-4 rounded-xl hover:bg-[#E8D4A6] transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(232,212,166,0.4)]"
                  >
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest font-bold">Sí, Añadir</span>
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-xs opacity-70 mt-1">+ {formatCurrency(activeQuestions[currentStep].minPrice, currency)}</span>
                  </button>
                  <button 
                    onClick={() => handleAnswer(false)}
                    className="flex-1 flex flex-col items-center justify-center bg-transparent border border-graphite text-slate py-4 rounded-xl hover:bg-graphite hover:text-white transition-colors duration-300"
                  >
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest">Omitir</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ESTADO 3: Finalizado */}
          {isFinished && selectedType && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full flex flex-col gap-6 justify-center"
            >
              <h3 className="font-[family-name:var(--font-die-grotesk-b)] text-[40px] md:text-[56px] leading-[1.0] text-[#E8D4A6]">
                NÚCLEO ESTABILIZADO
              </h3>
              <p className="font-[family-name:var(--font-die-grotesk-b)] text-body-lg text-slate">
                Tu sistema "{selectedType.label}" está completamente energizado y cotizado. <strong className="text-white">Pongamos este sistema a facturar.</strong>
              </p>
              <button 
                onClick={() => {
                   const section = document.getElementById('contact');
                   if (section) section.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-[#FF4C24] text-white font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest py-4 rounded-xl font-bold mt-4 shadow-[0_0_30px_rgba(255,76,36,0.3)] hover:shadow-[0_0_50px_rgba(255,76,36,0.6)] transition-all hover:bg-[#ff6436]"
              >
                Iniciar Desarrollo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Proyectiles Voladores (Electrones de Energía) */}
      {projectiles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0.5 }}
          animate={{ x: p.targetX, y: p.targetY, scale: 1.5 }} // Vuela hacia el núcleo
          transition={{ duration: 0.4, ease: "easeIn" }}
          className="absolute bottom-12 left-1/4 w-8 h-8 pointer-events-none z-50 flex items-center justify-center"
        >
          <div className="w-full h-full bg-white rounded-full shadow-[0_0_30px_white,0_0_60px_#E8D4A6]"></div>
        </motion.div>
      ))}
    </div>
  );
}
