'use client';

import { useState, useEffect } from 'react';
import { Lock, Delete, Loader2 } from 'lucide-react';
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
            setShake(true);
            setTimeout(() => {
              setShake(false);
              setPin('');
              setIsPending(false);
            }, 600); // Wait for shake to finish before resetting
          } else if (result.success) {
            window.location.href = '/admin';
          }
        } catch (err: any) {
          setPin('');
          setIsPending(false);
        }
      }
    };
    
    submitPin();
  }, [pin]);

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 font-[family-name:var(--font-die-grotesk-b)] selection:bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xs flex flex-col items-center"
      >
        {/* Header Icon */}
        <div className="flex justify-center mb-8 h-12">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-slate"
              >
                <Loader2 size={32} className="animate-spin" strokeWidth={1.5} />
              </motion.div>
            ) : (
              <motion.div
                key="lock"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-bone"
              >
                <Lock size={32} strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Texts */}
        <h1 className="text-xl text-bone mb-2 tracking-wide">
          Panel de Administración
        </h1>
        <p className="text-slate text-sm mb-12 font-[family-name:var(--font-ibm-plex-mono)] tracking-widest uppercase">
          Ingresa tu PIN
        </p>

        {/* PIN Dots (iOS Style) */}
        <motion.div 
          className="flex gap-6 mb-16"
          animate={shake ? { x: [-12, 12, -10, 10, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index} 
              className={`w-3.5 h-3.5 rounded-full border border-bone transition-all duration-300 ease-out flex items-center justify-center ${shake ? 'border-red-500' : ''}`}
            >
              <motion.div
                initial={false}
                animate={{
                  scale: pin.length > index ? 1 : 0,
                  opacity: pin.length > index ? 1 : 0
                }}
                transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 30 }}
                className={`w-full h-full rounded-full ${shake ? 'bg-red-500' : 'bg-bone'}`}
              />
            </div>
          ))}
        </motion.div>

        {/* Elegant Keypad */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-8 w-full px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumber(num)}
              disabled={isPending}
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-light text-bone mx-auto transition-all duration-200 active:bg-white/10 hover:bg-white/5 active:scale-90 disabled:opacity-50"
            >
              {num}
            </button>
          ))}
          <div className="w-16 h-16 mx-auto"></div>
          <button
            onClick={() => handleNumber(0)}
            disabled={isPending}
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-light text-bone mx-auto transition-all duration-200 active:bg-white/10 hover:bg-white/5 active:scale-90 disabled:opacity-50"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending || pin.length === 0}
            className="w-16 h-16 rounded-full flex items-center justify-center text-slate mx-auto transition-all duration-200 active:bg-white/10 hover:bg-white/5 active:scale-90 disabled:opacity-30"
          >
            <Delete size={24} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
