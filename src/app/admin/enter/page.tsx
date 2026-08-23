'use client';

import { useState, useEffect } from 'react';
import { Scan, Delete } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [shake, setShake] = useState(false);

  // Handle number click
  const handleNumber = (num: number) => {
    if (pin.length < 4 && !isPending) {
      setPin(prev => prev + num);
      setError(null);
    }
  };

  // Handle delete click
  const handleDelete = () => {
    if (pin.length > 0 && !isPending) {
      setPin(prev => prev.slice(0, -1));
      setError(null);
    }
  };

  // Auto-submit when 4 digits are entered
  useEffect(() => {
    const submitPin = async () => {
      if (pin.length === 4) {
        setIsPending(true);
        try {
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin }),
          });
          
          const result = await res.json();
          
          if (!res.ok || result.error) {
            setError(result.error || 'Error de autenticación');
            setPin('');
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setIsPending(false);
          } else if (result.success) {
            window.location.href = '/admin';
          }
        } catch (err: any) {
          setError(err?.message || 'Error del servidor al iniciar sesión');
          setPin('');
          setIsPending(false);
        }
      }
    };
    
    submitPin();
  }, [pin]);

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-bone font-[family-name:var(--font-ibm-plex-mono)]">
      <motion.div 
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <div className="flex justify-center mb-6 relative">
          {/* Cyber scanner ring */}
          <motion.div
            animate={{ rotate: isPending ? 360 : 0 }}
            transition={{ duration: 2, repeat: isPending ? Infinity : 0, ease: "linear" }}
            className={`absolute inset-0 rounded-full border-t-2 border-r-2 ${isPending ? 'border-ember' : 'border-transparent'} w-16 h-16`}
          />
          <motion.div 
            animate={{ 
              rotateY: isPending ? [0, 360] : 0,
            }}
            transition={{ duration: 1, repeat: isPending ? Infinity : 0, ease: "easeInOut" }}
            className={`w-16 h-16 rounded-full bg-[#141210] border border-white/5 flex items-center justify-center ${isPending ? 'text-ember shadow-[0_0_15px_rgba(255,68,0,0.5)]' : 'text-slate'}`}
          >
            <Scan size={28} />
          </motion.div>
        </div>
        
        <h1 className="text-xl text-center mb-1 font-[family-name:var(--font-die-grotesk-b)] tracking-tight uppercase">Autenticación</h1>
        <p className="text-slate text-center text-xs mb-10 tracking-[0.3em] uppercase">
          {isPending ? 'Verificando...' : 'Sistema Bloqueado'}
        </p>

        {/* PIN Lines */}
        <motion.div 
          className="flex gap-4 mb-8"
          animate={shake ? { 
            x: [-10, 10, -10, 10, -5, 5, 0],
            skewX: [0, -20, 20, -10, 10, 0],
            filter: ['invert(0)', 'invert(1)', 'invert(0)', 'invert(1)', 'invert(0)']
          } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="relative w-8 h-1 bg-white/10 overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-bone"
                initial={{ x: '-100%' }}
                animate={{ x: pin.length > index ? '0%' : '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            </div>
          ))}
        </motion.div>

        {/* Error Message */}
        <div className="h-6 mb-8 w-full text-center">
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-ember text-xs tracking-widest uppercase"
              >
                ACCESO DENEGADO
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Cyber Keypad */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              disabled={isPending}
              className="w-full aspect-square bg-[#141210] hover:bg-white/10 active:bg-bone active:text-obsidian border border-white/5 flex items-center justify-center text-xl transition-all disabled:opacity-30 mx-auto group"
            >
              <span className="group-hover:scale-125 transition-transform">{num}</span>
            </button>
          ))}
          <div className="w-full aspect-square mx-auto"></div>
          <button
            onClick={() => handleNumber(0)}
            disabled={isPending}
            className="w-full aspect-square bg-[#141210] hover:bg-white/10 active:bg-bone active:text-obsidian border border-white/5 flex items-center justify-center text-xl transition-all disabled:opacity-30 mx-auto group"
          >
            <span className="group-hover:scale-125 transition-transform">0</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending || pin.length === 0}
            className="w-full aspect-square flex items-center justify-center text-slate hover:text-ember active:scale-90 transition-all disabled:opacity-30 mx-auto"
          >
            <Delete size={24} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
