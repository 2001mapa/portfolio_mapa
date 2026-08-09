"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

// Componente para animar el contador
function PriceCounter({ value, currency }: { value: number; currency: 'COP' | 'USD' }) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      let numericVal = latest;
      let code = 'COP';
      let locale = 'es-CO';
      
      if (currency === 'USD') {
        numericVal = latest / 4000;
        code = 'USD';
        locale = 'en-US';
      }

      setDisplayValue(
        new Intl.NumberFormat(locale, {
          style: 'currency',
          currency: code,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(numericVal)
      );
    });
    return () => unsubscribe();
  }, [springValue]);

  return <motion.span>{displayValue}</motion.span>;
}

export function PricingReactor({
  powerLevel,
  shake,
  flash,
  solidFaces,
  totalMin,
  totalMax,
  currency
}: {
  powerLevel: number;
  shake: boolean;
  flash: boolean;
  solidFaces: number;
  totalMin: number;
  totalMax: number;
  currency: 'COP' | 'USD';
}) {
  return (
    <div className="w-full xl:w-[50%] h-[220px] xl:h-[600px] flex flex-col justify-center items-center relative z-10 pb-16 xl:pb-0">
      
      {/* Pedestal de luz bajo el átomo */}
      <motion.div 
        className="absolute bottom-[10%] w-[300px] h-[50px] rounded-full pointer-events-none"
        animate={{ 
          backgroundColor: powerLevel > 0 ? 'rgba(232,212,166,0.2)' : 'rgba(232,212,166,0.0)',
          filter: `blur(${30 + powerLevel * 20}px)` 
        }}
      />

      {/* Temblor Aplicado a este contenedor al impactar */}
      <motion.div 
        className="relative w-full h-[220px] xl:h-[500px] flex justify-center items-center scale-75 xl:scale-100"
        animate={shake ? { x: [-15, 15, -15, 15, -8, 8, 0], y: [-8, 8, -8, 8, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* El Reactor Atómico */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: 1500 }}>
          
          {/* Contenedor rotatorio maestro del átomo */}
          <motion.div 
            className="relative flex items-center justify-center w-full h-full"
            animate={{ rotateZ: 360, rotateX: [10, 20, 10] }}
            transition={{ 
              rotateZ: { duration: 60 - powerLevel * 30, repeat: Infinity, ease: "linear" }, // Rota más rápido a mayor energía
              rotateX: { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            
            {/* EL AGUJERO NEGRO EN VERDADERO 3D */}
            <div className="relative flex items-center justify-center w-full h-full" style={{ transformStyle: "preserve-3d" }}>
              
              {/* 1. LENTE GRAVITACIONAL (Halo Trasero) */}
              <motion.div 
                className="absolute rounded-[50%] border-[4px] mix-blend-screen pointer-events-none"
                style={{ 
                  width: 'min(45vw, 200px)', height: 'min(65vw, 320px)',
                  borderColor: `rgba(232,212,166, ${0.1 + powerLevel * 0.7})`,
                  boxShadow: `0 0 ${20 + powerLevel * 50}px rgba(232,212,166,${0.3 + powerLevel * 0.5})`,
                  transform: 'translateZ(-1px)' // Detrás
                }}
                animate={{ opacity: 0.3 + powerLevel * 0.7 }}
              />

              {/* 2. HORIZONTE DE SUCESOS (La Esfera Negra) */}
              <motion.div 
                className="absolute z-10 flex items-center justify-center rounded-full bg-[#020617]"
                style={{ 
                  width: 'min(35vw, 140px)', height: 'min(35vw, 140px)',
                  transform: 'translateZ(0px)', // En el eje Z 0 para permitir intersecciones
                  boxShadow: `0 0 ${40 + powerLevel * 100}px rgba(232,212,166,${0.2 + powerLevel * 0.8})`,
                  border: `1px solid rgba(232,212,166,${0.2 + powerLevel * 0.8})`
                }}
                animate={{ scale: 1 + (powerLevel * 0.1) }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(232,212,166,0.8)] opacity-60" />
                <motion.div 
                  className="absolute w-64 h-64 bg-white rounded-full mix-blend-screen blur-[50px] pointer-events-none"
                  animate={{ opacity: flash ? 1 : 0.0, scale: flash ? 1.5 : 0.2 }}
                  transition={{ duration: flash ? 0.1 : 0.8 }}
                />
              </motion.div>

              {/* 3. DISCO DE ACRECIÓN CAÓTICO */}
              {[
                { rx: 78, ry: -10, size: 'min(45vw, 200px)', border: '4px' },
                { rx: 82, ry: 10, size: 'min(50vw, 220px)', border: '6px' },
                { rx: 75, ry: 0, size: 'min(55vw, 240px)', border: '8px' }
              ].map((disk, i) => (
                <motion.div 
                  key={`disk-${i}`}
                  className="absolute rounded-full pointer-events-none"
                  style={{ 
                    width: disk.size, height: disk.size,
                    borderTopWidth: '2px', borderBottomWidth: '2px', borderLeftWidth: disk.border, borderRightWidth: disk.border,
                    borderColor: `rgba(232,212,166, ${0.2 + powerLevel * 0.8})`,
                    boxShadow: `0 0 20px rgba(232,212,166,${0.5 + powerLevel * 0.5}), inset 0 0 20px rgba(232,212,166,${0.5 + powerLevel * 0.5})`,
                    transformStyle: "preserve-3d"
                  }}
                  initial={{ rotateX: disk.rx, rotateY: disk.ry, rotateZ: 0 }}
                  animate={{ rotateX: disk.rx, rotateY: disk.ry, rotateZ: 360 }} 
                  transition={{ duration: 2 + i - powerLevel * 1.5, repeat: Infinity, ease: "linear" }}
                />
              ))}

              {/* 4. ÓRBITAS DE ELECTRONES */}
              {[
                { rx: 75, ry: 0 },
                { rx: 75, ry: 60 },
                { rx: 75, ry: 120 }
              ].map((ring, i) => (
                <motion.div 
                  key={`orbit-${i}`}
                  className="absolute rounded-full border"
                  style={{ 
                    width: 'min(85vw, 400px)', height: 'min(85vw, 400px)',
                    borderColor: `rgba(232,212,166, ${0.1 + powerLevel * 0.4})`,
                    transformStyle: "preserve-3d" 
                  }}
                  initial={{ rotateX: ring.rx, rotateY: ring.ry, rotateZ: 0 }}
                  animate={{ rotateX: ring.rx, rotateY: ring.ry, rotateZ: 360 }} 
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: solidFaces }).map((_, globalIndex) => {
                    if (globalIndex % 3 !== i) return null;
                    
                    return (
                      <motion.div
                        key={globalIndex}
                        className="absolute inset-0"
                        initial={{ rotateZ: 0 }}
                        animate={{ rotateZ: 360 }} 
                        transition={{ 
                          duration: 3 + (i * 0.5) - (powerLevel * 1.5), 
                          repeat: Infinity, 
                          ease: "linear",
                          delay: -(globalIndex * 0.8) 
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <div className="absolute top-0 left-1/2 w-8 h-8 -ml-4 -mt-4" style={{ transformStyle: "preserve-3d" }}>
                          <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_white,0_0_50px_#E8D4A6]"></div>
                          <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_white,0_0_50px_#E8D4A6]" style={{ transform: "rotateX(90deg)" }}></div>
                          <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_white,0_0_50px_#E8D4A6]" style={{ transform: "rotateY(90deg)" }}></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}

            </div>

          </motion.div>
        </div>
      </motion.div>

      {/* Precio Flotante Abajo */}
      <div className="absolute bottom-0 w-full text-center z-10">
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-caption uppercase tracking-widest text-slate block mb-2">Valor Total del Núcleo</span>
        
        {totalMin === 0 ? (
          <div className="font-[family-name:var(--font-abc-gravity-variable)] text-[40px] md:text-[56px] leading-none text-graphite/50 tracking-[-2px]">
            $0 {currency}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <div className="font-[family-name:var(--font-abc-gravity-variable)] text-[32px] md:text-[48px] leading-none text-bone tracking-[-1px] drop-shadow-md flex items-end justify-center gap-3">
              <span className="text-[#E8D4A6] text-[16px] md:text-[20px] mb-1">MÍN</span> 
              <PriceCounter value={totalMin} currency={currency} />
            </div>
            <div className="font-[family-name:var(--font-abc-gravity-variable)] text-[32px] md:text-[48px] leading-none text-bone tracking-[-1px] drop-shadow-md flex items-end justify-center gap-3">
              <span className="text-[#E8D4A6] text-[16px] md:text-[20px] mb-1">MÁX</span> 
              <PriceCounter value={totalMax} currency={currency} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
