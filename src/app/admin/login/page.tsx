'use client';

import { useState, useEffect } from 'react';
import { loginAction } from '../actions';
import { Lock, Delete } from 'lucide-react';
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
        const result = await loginAction(pin);
        
        if (result?.error) {
          setError(result.error);
          setPin('');
          setShake(true);
          setTimeout(() => setShake(false), 500);
          setIsPending(false);
        } else if (result?.success) {
          window.location.href = '/admin';
        }
      }
    };
    
    submitPin();
  }, [pin]);

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-bone font-[family-name:var(--font-die-grotesk-b)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            animate={{ 
              boxShadow: isPending ? ['0px 0px 0px rgba(255,255,255,0)', '0px 0px 30px rgba(255,255,255,0.2)', '0px 0px 0px rgba(255,255,255,0)'] : 'none',
            }}
            transition={{ duration: 1.5, repeat: isPending ? Infinity : 0 }}
            className="w-16 h-16 rounded-full bg-[#1c1a17] border border-white/5 flex items-center justify-center text-bone"
          >
            <Lock size={28} className={isPending ? 'opacity-50' : 'opacity-100'} />
          </motion.div>
        </div>
        
        <h1 className="text-2xl text-center mb-1 font-medium tracking-tight">Acceso Restringido</h1>
        <p className="text-slate text-center text-xs mb-8 font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-widest">
          Ingresa tu PIN
        </p>

        {/* PIN Dots */}
        <motion.div 
          className="flex gap-4 mb-10"
          animate={shake ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map((index) => (
            <motion.div 
              key={index}
              className={`w-4 h-4 rounded-full border-2 ${pin.length > index ? 'bg-bone border-bone' : 'bg-transparent border-white/20'}`}
              initial={false}
              animate={{
                scale: pin.length > index ? [1, 1.3, 1] : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </motion.div>

        {/* Error Message */}
        <div className="h-6 mb-6 w-full text-center">
          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 md:gap-6 w-full max-w-[280px]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              disabled={isPending}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1c1a17] hover:bg-white/10 border border-white/5 flex items-center justify-center text-2xl font-medium transition-colors disabled:opacity-50 mx-auto"
            >
              {num}
            </button>
          ))}
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto"></div> {/* Empty space */}
          <button
            onClick={() => handleNumber(0)}
            disabled={isPending}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1c1a17] hover:bg-white/10 border border-white/5 flex items-center justify-center text-2xl font-medium transition-colors disabled:opacity-50 mx-auto"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending || pin.length === 0}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-slate hover:text-bone transition-colors disabled:opacity-30 mx-auto"
          >
            <Delete size={28} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
