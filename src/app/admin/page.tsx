'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Briefcase, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

type ProjectStats = {
  totalRevenue: number;
  totalPending: number;
  activeProjects: number;
  completedProjects: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<ProjectStats>({
    totalRevenue: 0,
    totalPending: 0,
    activeProjects: 0,
    completedProjects: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data, error } = await supabase.from('projects').select('*');
        if (error) throw error;

        if (data) {
          let revenue = 0;
          let pending = 0;
          let active = 0;
          let completed = 0;

          data.forEach(project => {
            revenue += Number(project.amount_paid || 0);
            pending += (Number(project.total_value || 0) - Number(project.amount_paid || 0));
            
            if (project.status === 'entregado' || project.status === 'archivado') {
              completed += 1;
            } else {
              active += 1;
            }
          });

          setStats({ totalRevenue: revenue, totalPending: pending, activeProjects: active, completedProjects: completed });
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
  };

  if (loading) {
    return <div className="animate-pulse flex space-x-4"><div className="flex-1 space-y-6 py-1"><div className="h-4 bg-white/10 rounded w-1/4"></div><div className="space-y-3"><div className="h-20 bg-white/10 rounded"></div></div></div></div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-[family-name:var(--font-die-grotesk-b)] mb-2">Resumen Financiero</h1>
        <p className="text-slate text-sm">Vista general del rendimiento de tu negocio freelance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#141210] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Ingresos Totales</p>
            <div className="p-2 bg-green-500/10 text-green-400 rounded-lg"><CreditCard size={20} /></div>
          </div>
          <h3 className="text-3xl font-[family-name:var(--font-die-grotesk-b)]">{formatCurrency(stats.totalRevenue)}</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#141210] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Por Cobrar</p>
            <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg"><Clock size={20} /></div>
          </div>
          <h3 className="text-3xl font-[family-name:var(--font-die-grotesk-b)] text-orange-400">{formatCurrency(stats.totalPending)}</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#141210] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Proyectos Activos</p>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Briefcase size={20} /></div>
          </div>
          <h3 className="text-3xl font-[family-name:var(--font-die-grotesk-b)]">{stats.activeProjects}</h3>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-[#141210] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate text-sm font-[family-name:var(--font-ibm-plex-mono)] uppercase tracking-wider">Entregados</p>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg"><CheckCircle size={20} /></div>
          </div>
          <h3 className="text-3xl font-[family-name:var(--font-die-grotesk-b)]">{stats.completedProjects}</h3>
        </motion.div>
      </div>
    </div>
  );
}
