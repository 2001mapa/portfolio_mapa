"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { projectTypes, questionBanks } from "../data/pricingData";
import { PricingReactor } from "./pricing/PricingReactor";
import { PricingQuiz } from "./pricing/PricingQuiz";

export function PricingSection() {
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');
  const [selectedType, setSelectedType] = useState<typeof projectTypes[0] | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [counterValue, setCounterValue] = useState(1);
  
  const [projectiles, setProjectiles] = useState<{id: number, targetX: string | number, targetY: string | number}[]>([]);
  const [shake, setShake] = useState(false);
  const [flash, setFlash] = useState(false);
  const [solidFaces, setSolidFaces] = useState(0);

  const totalMin = (selectedType?.minPrice || 0) + answers.reduce((sum, item) => sum + (item.minPrice * (item.quantity || 1)), 0);
  const totalMax = (selectedType?.maxPrice || 0) + answers.reduce((sum, item) => sum + (item.maxPrice * (item.quantity || 1)), 0);
  
  const activeQuestions = selectedType ? questionBanks[selectedType.id as keyof typeof questionBanks] : [];
  const isFinished = selectedType && currentStep >= activeQuestions.length;

  // Calculamos un nivel de energía de 0.0 a 1.0 basado en los extras añadidos (asumiendo ~6 max)
  const powerLevel = Math.min(solidFaces / 6, 1);

  // Sincronizar estado inicial y escuchar evento de reinicio (cuando se envía el WhatsApp)
  useEffect(() => {
    // Al recargar la página, limpiamos la cotización de memoria
    localStorage.removeItem('pricingSummary');
    window.dispatchEvent(new Event('pricingUpdated'));

    const handleReset = () => {
      setSelectedType(null);
      setCurrentStep(0);
      setAnswers([]);
      setSolidFaces(0);
      setCounterValue(1);
      localStorage.removeItem('pricingSummary');
      window.dispatchEvent(new Event('pricingUpdated'));
    };

    window.addEventListener('resetPricing', handleReset);
    return () => window.removeEventListener('resetPricing', handleReset);
  }, []);

  // Guardar cuando se finaliza
  useEffect(() => {
    if (isFinished && selectedType) {
      const summary = {
        type: selectedType.label,
        totalMin,
        totalMax,
        features: answers.map(a => `${a.label} ${a.quantity > 1 ? `(x${a.quantity})` : ''}`)
      };
      localStorage.setItem('pricingSummary', JSON.stringify(summary));
      window.dispatchEvent(new Event('pricingUpdated'));
    }
  }, [isFinished, selectedType, answers, totalMin, totalMax]);

  const handleSelectProjectType = (pt: typeof projectTypes[0]) => {
    setSelectedType(pt);
    triggerImpact();
  };

  const handleAnswer = (yes: boolean, quantity: number = 1) => {
    if (yes) {
      setAnswers(prev => [...prev, { ...activeQuestions[currentStep], quantity }]);
      triggerImpact();
    }

    // Avanzar a siguiente pregunta y reiniciar contador
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setCounterValue(1);
    }, yes ? 800 : 300);
  };

  const triggerImpact = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1280;
    const newProj = { id: Date.now(), targetX: isMobile ? 0 : "40vw", targetY: isMobile ? "40vh" : 0 };
    setProjectiles(prev => [...prev, newProj]);
    
    // Impacto en 400ms (tiempo de vuelo)
    setTimeout(() => {
      setProjectiles(prev => prev.filter(p => p.id !== newProj.id));
      setShake(true);
      setFlash(true);
      setSolidFaces(prev => prev + 1);
      
      setTimeout(() => setShake(false), 300);
      setTimeout(() => setFlash(false), 500);
    }, 400);
  };

  return (
    <section id="pricing" className="relative w-full min-h-screen bg-obsidian text-bone py-12 md:py-[120px] overflow-hidden flex items-center">
      
      {/* Luz Ambiental Masiva que ilumina toda la sección y las tarjetas de preguntas */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,rgba(232,212,166,0.1)_0,transparent_70%)] rounded-full pointer-events-none z-0"
        animate={{ opacity: selectedType ? 0.05 + (powerLevel * 0.15) : 0 }}
        transition={{ duration: 1 }}
      />

      {/* Destello de Impacto Fullscreen */}
      <div 
        className="absolute inset-0 bg-white z-[5] pointer-events-none transition-opacity duration-300"
        style={{ opacity: flash ? 0.3 : 0, mixBlendMode: 'overlay' }}
      ></div>

      {/* Section H2 for SEO Outline */}
      <h2 className="sr-only">Cotizador de Proyectos y Reactor de Precios</h2>

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10 flex flex-col xl:flex-row gap-20 xl:gap-16 items-center">
        
        {/* Currency Switcher */}
        <div className="w-full flex justify-end xl:absolute xl:-top-8 xl:right-6 z-50 xl:w-auto pt-4 xl:pt-0">
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md">
            <button 
              onClick={() => setCurrency('COP')}
              className={`px-4 py-3 md:py-2 rounded-full font-[family-name:var(--font-ibm-plex-mono)] text-xs md:text-sm tracking-widest transition-all ${currency === 'COP' ? 'bg-[#E8D4A6] text-obsidian font-bold shadow-[0_0_15px_rgba(232,212,166,0.5)]' : 'text-slate md:hover:text-white active:text-white'}`}
            >
              COP $
            </button>
            <button 
              onClick={() => setCurrency('USD')}
              className={`px-4 py-3 md:py-2 rounded-full font-[family-name:var(--font-ibm-plex-mono)] text-xs md:text-sm tracking-widest transition-all ${currency === 'USD' ? 'bg-[#E8D4A6] text-obsidian font-bold shadow-[0_0_15px_rgba(232,212,166,0.5)]' : 'text-slate md:hover:text-white active:text-white'}`}
            >
              USD $
            </button>
          </div>
        </div>

        {/* PANEL IZQUIERDO: Quiz Ramificado */}
        <PricingQuiz 
          selectedType={selectedType}
          isFinished={isFinished ?? false}
          currentStep={currentStep}
          activeQuestions={activeQuestions}
          counterValue={counterValue}
          setCounterValue={setCounterValue}
          handleSelectProjectType={handleSelectProjectType}
          handleAnswer={handleAnswer}
          projectiles={projectiles}
          currency={currency}
        />

        {/* PANEL DERECHO: El Reactor Atómico */}
        <PricingReactor 
          powerLevel={powerLevel}
          shake={shake}
          flash={flash}
          solidFaces={solidFaces}
          totalMin={totalMin}
          totalMax={totalMax}
          currency={currency}
        />

      </div>
    </section>
  );
}


