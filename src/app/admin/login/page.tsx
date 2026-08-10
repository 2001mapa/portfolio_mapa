'use client';

import { useActionState } from 'react';
import { loginAction } from '../actions';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6 text-bone font-[family-name:var(--font-die-grotesk-b)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1c1a17] border border-white/5 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-bone/5 flex items-center justify-center text-bone">
            <Lock size={32} />
          </div>
        </div>
        
        <h1 className="text-3xl text-center mb-2 font-medium tracking-tight">Acceso Restringido</h1>
        <p className="text-slate text-center text-sm mb-8 font-[family-name:var(--font-ibm-plex-mono)]">
          SISTEMA CENTRAL // MIGUEL ALBORNOZ
        </p>

        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-slate uppercase tracking-widest font-[family-name:var(--font-ibm-plex-mono)]">
              Contraseña Maestra
            </label>
            <input 
              type="password" 
              name="password"
              required
              className="bg-obsidian border border-white/10 rounded-xl px-4 py-3 text-bone focus:outline-none focus:border-bone transition-colors"
              placeholder="••••••••"
            />
            {state?.error && (
              <p className="text-red-400 text-sm mt-1">{state.error}</p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isPending}
            className="w-full bg-bone text-obsidian rounded-xl py-3 font-bold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
          >
            {isPending ? 'Verificando...' : 'Entrar al Panel'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
