'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CircleDollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

type Project = {
  id: string;
  client_name: string;
  project_name: string;
  status: string;
  total_value: number;
  amount_paid: number;
  created_at: string;
};

export default function FinanzasPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFinances() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    }
    fetchFinances();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  const totalRevenue = projects.reduce((sum, p) => sum + Number(p.amount_paid), 0);
  const totalPending = projects.reduce((sum, p) => sum + (Number(p.total_value) - Number(p.amount_paid)), 0);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-[family-name:var(--font-die-grotesk-b)] mb-2">Control Financiero</h1>
          <p className="text-slate text-sm">Registro detallado de pagos, cobros y flujos de caja.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#1c1a17] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <CircleDollarSign className="text-green-400" size={20} />
            <h3 className="text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Caja Actual (Pagado)</h3>
          </div>
          <p className="text-3xl font-[family-name:var(--font-die-grotesk-b)] text-green-400">{formatCurrency(totalRevenue)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-[#1c1a17] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <Activity className="text-orange-400" size={20} />
            <h3 className="text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Deuda Viva (Por Cobrar)</h3>
          </div>
          <p className="text-3xl font-[family-name:var(--font-die-grotesk-b)] text-orange-400">{formatCurrency(totalPending)}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-[#1c1a17] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <ArrowUpRight className="text-blue-400" size={20} />
            <h3 className="text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Valor Proyectado Total</h3>
          </div>
          <p className="text-3xl font-[family-name:var(--font-die-grotesk-b)] text-blue-400">{formatCurrency(totalRevenue + totalPending)}</p>
        </motion.div>
      </div>

      <div className="bg-[#141210] border border-white/5 rounded-2xl overflow-hidden mt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1c1a17] border-b border-white/5 font-[family-name:var(--font-ibm-plex-mono)] text-xs uppercase tracking-widest text-slate">
                <th className="p-4 whitespace-nowrap">Cliente / Proyecto</th>
                <th className="p-4 whitespace-nowrap">Estado</th>
                <th className="p-4 whitespace-nowrap">Valor Total</th>
                <th className="p-4 whitespace-nowrap">Abonado</th>
                <th className="p-4 whitespace-nowrap">Saldo Pendiente</th>
                <th className="p-4 whitespace-nowrap">Progreso de Pago</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate animate-pulse">Cargando libros contables...</td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate">No hay registros financieros todavía. Crea tu primer proyecto en el Kanban.</td>
                </tr>
              ) : (
                projects.map((project) => {
                  const pending = Number(project.total_value) - Number(project.amount_paid);
                  const progress = Number(project.total_value) > 0 ? (Number(project.amount_paid) / Number(project.total_value)) * 100 : 0;
                  
                  return (
                    <motion.tr 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      key={project.id} 
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 whitespace-nowrap">
                        <p className="font-bold text-bone">{project.client_name}</p>
                        <p className="text-xs text-slate">{project.project_name}</p>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-white/10 bg-white/5 text-slate">
                          {project.status}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap font-[family-name:var(--font-ibm-plex-mono)] text-sm">{formatCurrency(project.total_value)}</td>
                      <td className="p-4 whitespace-nowrap font-[family-name:var(--font-ibm-plex-mono)] text-sm text-green-400">{formatCurrency(project.amount_paid)}</td>
                      <td className="p-4 whitespace-nowrap font-[family-name:var(--font-ibm-plex-mono)] text-sm text-orange-400">{formatCurrency(pending)}</td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div className="bg-green-400 h-2 rounded-full" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                          </div>
                          <span className="text-xs text-slate w-8">{Math.round(progress)}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
