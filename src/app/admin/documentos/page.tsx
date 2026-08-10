'use client';

import { useState } from 'react';
import { FileText, Download } from 'lucide-react';

export default function DocumentosPage() {
  const [docType, setDocType] = useState('cotizacion');
  const [clientName, setClientName] = useState('Nombre del Cliente');
  const [projectName, setProjectName] = useState('E-commerce Nivel 2');
  const [projectValue, setProjectValue] = useState('3000000');
  
  // Campos personalizables de la propuesta
  const [problemText, setProblemText] = useState('Actualmente el proceso de ventas es manual, se pierde tiempo respondiendo mensajes y no hay un sistema centralizado.');
  const [solutionText, setSolutionText] = useState('Una infraestructura digital de alto rendimiento diseñada para automatizar ventas 24/7 y centralizar la administración.');
  const [deliverablesText, setDeliverablesText] = useState('Diseño UI de alto impacto.\nDesarrollo frontend ultrarrápido.\nEnlace directo con WhatsApp.\nPanel administrativo básico.');
  const [optionalModulesText, setOptionalModulesText] = useState('Dominio y Hosting anual: $ 150.000\nMantenimiento mensual: $ 80.000');
  const [timelineText, setTimelineText] = useState('Fase 1 (Diseño): 3-5 días.\nFase 2 (Programación): 7-10 días.\nFase 3 (Lanzamiento): 2-3 días.');
  const [validityDays, setValidityDays] = useState('15');
  
  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(amount));
  };

  const halfValue = formatCurrency((Number(projectValue) / 2).toString());

  return (
    <div className="flex flex-col gap-8 h-full print:block print:h-auto">
      <style type="text/css" media="print">
        {`
          @page { margin: 0; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        `}
      </style>
      
      {/* NO PRINT AREA: Controls */}
      <div className="print:hidden flex flex-col gap-6 bg-[#141210] border border-white/5 rounded-2xl p-6">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-die-grotesk-b)] mb-2">Generador de Documentos</h1>
          <p className="text-slate text-sm">Llena los datos y usa el botón de imprimir para guardar como PDF (A4).</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate uppercase tracking-widest">Tipo</label>
            <select value={docType} onChange={e => setDocType(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone">
              <option value="cotizacion">Propuesta Comercial</option>
              <option value="contrato">Contrato de Servicios</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate uppercase tracking-widest">Cliente / Empresa</label>
            <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate uppercase tracking-widest">Servicio Base</label>
            <input type="text" value={projectName} onChange={e => setProjectName(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate uppercase tracking-widest">Valor Base (COP)</label>
            <input type="number" value={projectValue} onChange={e => setProjectValue(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" />
          </div>
        </div>

        {docType === 'cotizacion' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/10 pt-6 mt-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate uppercase tracking-widest text-orange-400">El Problema / Dolor</label>
              <textarea value={problemText} onChange={e => setProblemText(e.target.value)} rows={3} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate uppercase tracking-widest text-green-400">La Solución Propuesta</label>
              <textarea value={solutionText} onChange={e => setSolutionText(e.target.value)} rows={3} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate uppercase tracking-widest text-blue-400">Validez (Días)</label>
              <input type="number" value={validityDays} onChange={e => setValidityDays(e.target.value)} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate uppercase tracking-widest">Entregables Principales</label>
              <textarea value={deliverablesText} onChange={e => setDeliverablesText(e.target.value)} rows={4} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-xs" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate uppercase tracking-widest">Módulos Opcionales</label>
              <textarea value={optionalModulesText} onChange={e => setOptionalModulesText(e.target.value)} rows={4} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-xs" placeholder="Deja vacío si no hay opcionales" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-slate uppercase tracking-widest">Cronograma Fases</label>
              <textarea value={timelineText} onChange={e => setTimelineText(e.target.value)} rows={4} className="bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-xs" />
            </div>
          </div>
        )}

        <button onClick={handlePrint} className="bg-bone text-obsidian px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors flex justify-center items-center gap-2 mt-4">
          <Download size={18} /> Descargar PDF
        </button>
      </div>

      {/* PRINT AREA: The actual Document */}
      <div className="bg-white text-black p-10 md:p-16 rounded-xl shadow-2xl print:shadow-none print:p-16 font-[family-name:var(--font-ibm-plex-mono)] mx-auto w-full max-w-[210mm] min-h-[297mm]">
        
        {/* HEADER COMPARTIDO */}
        <div className="flex justify-between items-end border-b-2 border-black pb-6 mb-10">
          <div>
            <img src="/icon.png" alt="Miguel Albornoz" className="h-16 w-auto object-contain grayscale" />
            <p className="tracking-widest text-[10px] font-bold mt-2 uppercase">Software Engineer & CRM Expert</p>
          </div>
          <div className="text-right text-xs">
            <p>Fecha: {new Date().toLocaleDateString('es-CO')}</p>
            <p>Cliente: {clientName}</p>
          </div>
        </div>

        {/* CONTENIDO CONDICIONAL: COTIZACIÓN */}
        {docType === 'cotizacion' && (
          <div className="flex flex-col gap-8 text-sm">
            <h2 className="text-2xl font-black font-[family-name:var(--font-die-grotesk-b)] uppercase text-center mb-4">Propuesta Comercial Formal</h2>
            
            <div>
              <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">1. DIAGNÓSTICO Y SOLUCIÓN</h3>
              <p className="mb-2 text-gray-700 italic">"{problemText}"</p>
              <p>Desarrollaremos un <strong>{projectName}</strong>. {solutionText}</p>
            </div>

            <div>
              <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">2. ALCANCE TÉCNICO Y ENTREGABLES</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {deliverablesText.split('\n').map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">3. CRONOGRAMA DE EJECUCIÓN</h3>
              <p className="mb-2">El tiempo comienza a correr tras la entrega total de insumos y el pago del anticipo.</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                {timelineText.split('\n').map((item, index) => (
                  <li key={index}><strong>{item.split(':')[0]}:</strong> {item.split(':')[1] || ''}</li>
                ))}
              </ul>
            </div>

            <div className="break-inside-avoid">
              <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">4. INVERSIÓN TÉCNICA</h3>
              <table className="w-full text-left border-collapse mt-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 border border-gray-300">Descripción del Servicio</th>
                    <th className="p-3 border border-gray-300 w-1/3">Valor (COP)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border border-gray-300 font-bold">{projectName} - Desarrollo Base</td>
                    <td className="p-3 border border-gray-300 font-bold text-lg">{formatCurrency(projectValue)}</td>
                  </tr>
                  {optionalModulesText.trim() !== '' && optionalModulesText.split('\n').map((item, index) => (
                    <tr key={index} className="text-gray-500 text-xs">
                      <td className="p-3 border border-gray-300 italic">+ Opcional: {item.split(':')[0]}</td>
                      <td className="p-3 border border-gray-300">{item.split(':')[1] || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-6 bg-gray-50 border border-gray-200 break-inside-avoid">
              <h3 className="font-bold text-lg mb-2">CONDICIONES Y SIGUIENTES PASOS</h3>
              <p>Para agendar el espacio en el calendario de desarrollo, requerimos la aprobación de esta propuesta y el pago del <strong>50% de anticipo ({halfValue})</strong>. El 50% restante se abona contra entrega final.</p>
              <p className="text-xs text-gray-500 mt-2">* Esta propuesta tiene una validez técnica y comercial de <strong>{validityDays} días calendario</strong>.</p>
            </div>
          </div>
        )}

        {/* CONTENIDO CONDICIONAL: CONTRATO */}
        {docType === 'contrato' && (
          <div className="flex flex-col gap-6 text-xs text-justify">
            <h2 className="text-xl font-black font-[family-name:var(--font-die-grotesk-b)] uppercase text-center mb-2">Contrato de Desarrollo de Software</h2>
            
            <p>Entre los suscritos, por una parte, <strong>MIGUEL ALBORNOZ</strong>, en adelante EL CONTRATISTA, y por la otra <strong>{clientName}</strong>, en adelante EL CLIENTE, hemos convenido celebrar el presente contrato:</p>

            <p><strong>PRIMERA - OBJETO:</strong> EL CONTRATISTA se compromete a desarrollar y entregar un <strong>{projectName}</strong> con las especificaciones detalladas en la Propuesta Comercial previamente enviada.</p>

            <p><strong>SEGUNDA - LÍMITES:</strong> Cualquier módulo extra, página adicional o integración de pasarela de pagos que no esté expresamente descrita en la cotización inicial, será considerada fuera de alcance, cotizada y facturada de manera independiente.</p>

            <p><strong>TERCERA - OBLIGACIONES:</strong> EL CLIENTE se compromete a entregar todos los insumos necesarios en los tiempos estipulados. Los retrasos mayores a 3 días hábiles en la entrega de material pausarán el cronograma de desarrollo. Si EL CLIENTE suspende la comunicación por 30 días, el proyecto se considerará abandonado sin devolución del anticipo (Cláusula de Abandono).</p>

            <p><strong>CUARTA - FORMA DE PAGO:</strong> El valor total del proyecto es de <strong>{formatCurrency(projectValue)}</strong>. Se pagará 50% (<strong>{halfValue}</strong>) como anticipo no reembolsable. El 50% restante (<strong>{halfValue}</strong>) se pagará contra entrega en entorno de pruebas y <strong>estrictamente antes</strong> de la migración al dominio final o entrega del código fuente.</p>

            <p><strong>QUINTA - PROPIEDAD Y GARANTÍA:</strong> Tras el pago del 100%, los derechos de uso comercial pasarán a EL CLIENTE. EL CONTRATISTA se reserva el derecho de exhibir el proyecto finalizado en su portafolio. Se ofrece garantía de 15 días para la corrección de errores de código (bugs). La garantía se anula si terceros alteran el código.</p>

            <div className="flex justify-between mt-20 pt-4 border-t border-gray-300">
              <div className="w-[45%] text-center">
                <div className="border-b border-black w-full mb-2"></div>
                <strong>MIGUEL ALBORNOZ</strong><br/>EL CONTRATISTA
              </div>
              <div className="w-[45%] text-center">
                <div className="border-b border-black w-full mb-2"></div>
                <strong>{clientName}</strong><br/>EL CLIENTE
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
