'use client';

import { useState, useEffect } from 'react';
import { Delete } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [pin, setPin] = useState<string>('');
  const [isPending, setIsPending] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [clickedKey, setClickedKey] = useState<number | null>(null);

  // Handle number click
  const handleNumber = (num: number) => {
    if (pin.length < 4 && !isPending) {
      setClickedKey(num);
      setTimeout(() => setClickedKey(null), 400);
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
            }, 800); // 800ms for the "power cut" effect
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

  // Width mapping for the liquid line
  const lineWidths = ['30px', '70px', '120px', '170px', '220px'];
  const lineHeights = ['2px', '4px', '6px', '8px', '4px'];

  return (
    <motion.div 
      className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 font-[family-name:var(--font-die-grotesk-b)] selection:bg-transparent overflow-hidden"
      animate={{ backgroundColor: errorShake ? '#000000' : '#141210' }}
      transition={{ duration: errorShake ? 0.1 : 0.8 }}
    >
      <motion.div 
        animate={{ 
          opacity: errorShake ? [1, 0, 0, 1] : 1,
          scale: errorShake ? [1, 0.95, 0.95, 1] : 1,
          filter: errorShake ? ['blur(0px)', 'blur(10px)', 'blur(10px)', 'blur(0px)'] : 'blur(0px)'
        }}
        transition={{ duration: 0.8, times: [0, 0.1, 0.7, 1] }}
        className="w-full max-w-xs flex flex-col items-center relative z-10"
      >
        {/* Texts */}
        <motion.p 
          animate={{ opacity: isPending ? 0.3 : 1 }}
          className="text-slate text-xs mb-16 tracking-[0.4em] uppercase font-light"
        >
          {isPending ? 'Sincronizando' : 'Identidad'}
        </motion.p>

        {/* Liquid PIN Line */}
        <div className="h-12 flex items-center justify-center mb-16 relative w-full">
          {/* Main growing line */}
          <motion.div
            initial={false}
            animate={{
              width: lineWidths[pin.length],
              height: lineHeights[pin.length],
              backgroundColor: isPending ? '#FF4400' : '#eae5d9',
              boxShadow: isPending ? '0 0 20px rgba(255,68,0,0.5)' : pin.length > 0 ? '0 0 15px rgba(234,229,217,0.3)' : 'none',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-full absolute"
          />
          
          {/* Explosion particles on error */}
          <AnimatePresence>
            {errorShake && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 200, 
                      y: (Math.random() - 0.5) * 200, 
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-2 h-2 bg-bone rounded-full"
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Liquid Keypad */}
        <div className="grid grid-cols-3 gap-y-6 gap-x-8 w-full px-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num} className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <AnimatePresence>
                {clickedKey === num && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0.5 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 bg-bone/20 rounded-full pointer-events-none"
                  />
                )}
              </AnimatePresence>
              <button
                onClick={() => handleNumber(num)}
                disabled={isPending}
                className="w-full h-full rounded-full flex items-center justify-center text-3xl font-light text-bone/80 hover:text-bone transition-colors disabled:opacity-30 relative z-10"
              >
                {num}
              </button>
            </div>
          ))}
          <div className="w-16 h-16 mx-auto"></div>
          
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <AnimatePresence>
              {clickedKey === 0 && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0.5 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 bg-bone/20 rounded-full pointer-events-none"
                />
              )}
            </AnimatePresence>
            <button
              onClick={() => handleNumber(0)}
              disabled={isPending}
              className="w-full h-full rounded-full flex items-center justify-center text-3xl font-light text-bone/80 hover:text-bone transition-colors disabled:opacity-30 relative z-10"
            >
              0
            </button>
          </div>

          <button
            onClick={handleDelete}
            disabled={isPending || pin.length === 0}
            className="w-16 h-16 rounded-full flex items-center justify-center text-slate hover:text-bone transition-colors disabled:opacity-30 mx-auto"
          >
            <Delete size={22} strokeWidth={1.5} />
          </button>
        </div>
      </motion.div>
      
      {/* Background ambient light */}
      <motion.div
        animate={{
          opacity: pin.length > 0 && !errorShake ? 0.5 : 0,
          scale: 1 + (pin.length * 0.1)
        }}
        transition={{ duration: 0.5 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bone/5 rounded-full blur-[100px] pointer-events-none z-0"
      />
    </motion.div>
  );
}
