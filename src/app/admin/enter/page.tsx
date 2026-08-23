'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [pin, setPin] = useState<string>('');
  const [isPending, setIsPending] = useState(false);
  const [errorShake, setErrorShake] = useState(false);

  // Handle number click
  const handleNumber = (num: number) => {
    if (pin.length < 4 && !isPending) {
      setPin(prev => prev + num);
    }
  };

  // Handle delete click
  const handleDelete = () => {
    if (pin.length > 0 && !isPending) {
      setPin(prev => prev.slice(0, -1));
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
            setErrorShake(true);
            setTimeout(() => {
              setErrorShake(false);
              setPin('');
              setIsPending(false);
            }, 600);
          } else if (result.success) {
            window.location.href = '/admin';
          }
        } catch (err) {
          setPin('');
          setIsPending(false);
        }
      }
    };
    
    submitPin();
  }, [pin]);

  // Array of numbers for the odometer column
  const columnNumbers = ['-', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="min-h-screen bg-[#1c1c1c] flex flex-col items-center justify-center p-6 font-[family-name:var(--font-ibm-plex-mono)] selection:bg-transparent">
      
      <div className="w-full max-w-xs flex flex-col items-center">
        
        {/* Brand Text */}
        <h1 className="text-xl text-neutral-400 mb-1 tracking-[0.2em] font-medium uppercase">
          Caja Fuerte
        </h1>
        <p className="text-neutral-600 text-xs mb-12 tracking-[0.3em] uppercase">
          Mecanismo de Bloqueo
        </p>

        {/* Odometer Display */}
        <motion.div 
          className="flex gap-2 mb-16 p-4 bg-[#111] rounded-xl border-t-2 border-l-2 border-[#0a0a0a] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)] relative"
          animate={errorShake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Internal glass reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-xl pointer-events-none" />

          {[0, 1, 2, 3].map((slotIndex) => {
            const hasDigit = pin.length > slotIndex;
            const displayChar = hasDigit ? pin[slotIndex] : '-';

            return (
              <div 
                key={slotIndex} 
                className={`w-12 h-12 bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-800 rounded flex items-center justify-center overflow-hidden border border-black shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] relative ${errorShake ? 'border-red-900' : ''}`}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={errorShake ? `error-${slotIndex}` : displayChar}
                    initial={{ y: errorShake ? 0 : -40, opacity: errorShake ? 1 : 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: errorShake ? 0 : 40, opacity: errorShake ? 1 : 0, filter: 'blur(4px)' }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`absolute flex items-center justify-center text-2xl font-bold ${displayChar === '-' ? 'text-neutral-500' : 'text-neutral-200'}`}
                    style={{ textShadow: '0 2px 2px rgba(0,0,0,0.8)' }}
                  >
                    {displayChar}
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* Mechanical Keypad */}
        <div className="grid grid-cols-3 gap-y-4 gap-x-4 w-full px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              disabled={isPending}
              className="w-16 h-14 mx-auto rounded bg-gradient-to-b from-neutral-700 to-neutral-800 border border-neutral-900 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex items-center justify-center text-xl font-bold text-neutral-300 transition-all duration-75 disabled:opacity-50"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDelete}
            disabled={isPending || pin.length === 0}
            className="w-16 h-14 mx-auto rounded bg-gradient-to-b from-red-900/50 to-red-950/80 border border-neutral-900 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex items-center justify-center text-sm font-bold text-red-400 transition-all duration-75 disabled:opacity-50 uppercase tracking-wider"
          >
            DEL
          </button>
          <button
            onClick={() => handleNumber(0)}
            disabled={isPending}
            className="w-16 h-14 mx-auto rounded bg-gradient-to-b from-neutral-700 to-neutral-800 border border-neutral-900 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex items-center justify-center text-xl font-bold text-neutral-300 transition-all duration-75 disabled:opacity-50"
          >
            0
          </button>
          <div className="w-16 h-14 mx-auto" />
        </div>

      </div>
    </div>
  );
}
