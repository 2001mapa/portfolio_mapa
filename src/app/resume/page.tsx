export default function ResumePage() {
  return (
    <div className="bg-white text-black min-h-screen p-8 md:p-16 font-sans">
      <div className="max-w-4xl mx-auto bg-white" id="resume-content">
        
        {/* HEADER */}
        <header className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase mb-2">MIGUEL ALEJANDRO PAZ ALBORNOZ</h1>
          <p className="text-lg font-semibold mb-2">Desarrollador Web Full-Stack | Next.js • React • Supabase • IA</p>
          <div className="text-sm flex flex-wrap justify-center gap-2">
            <span>Medellín, Antioquia, Colombia</span>
            <span>|</span>
            <span>+57 3XX XXX XXXX</span>
            <span>|</span>
            <span>tuemail@ejemplo.com</span>
          </div>
          <div className="text-sm flex flex-wrap justify-center gap-2 mt-1">
            <a href="https://linkedin.com/in/miguel-alejandro-paz-albornoz" className="text-blue-600 hover:underline">LinkedIn: linkedin.com/in/miguel-alejandro-paz-albornoz</a>
            <span>|</span>
            <a href="https://github.com/tu-usuario" className="text-blue-600 hover:underline">GitHub: github.com/tu-usuario</a>
            <span>|</span>
            <a href="https://tu-portafolio.vercel.app" className="text-blue-600 hover:underline">Portafolio: tu-portafolio.vercel.app</a>
          </div>
        </header>

        {/* RESUMEN PROFESIONAL */}
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3 pb-1">Resumen Profesional</h2>
          <p className="text-justify text-sm leading-relaxed">
            Técnico Laboral en Desarrollo de Software especializado en la creación de aplicaciones web modernas, plataformas E-commerce y sistemas ERP a medida. Experiencia práctica en el stack Next.js, React, TypeScript, Tailwind CSS, Supabase y PostgreSQL, integrando herramientas de Inteligencia Artificial para optimizar flujos de desarrollo. Sólida trayectoria previa en gestión de inventarios y administración comercial, aportando una visión estratégica enfocada en resultados del negocio.
          </p>
        </section>

        {/* HABILIDADES TÉCNICAS */}
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3 pb-1">Habilidades Técnicas</h2>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li><strong>Lenguajes y Frontend:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3, React.js, Next.js, Tailwind CSS.</li>
            <li><strong>Backend y Bases de Datos:</strong> Supabase, PostgreSQL, Node.js, API RESTful.</li>
            <li><strong>Herramientas e Integraciones:</strong> Git, GitHub, Vercel, Wompi, Stripe, Google Analytics (GA4), Meta Pixel, Prompts e Integración de IA.</li>
            <li><strong>Competencias Complementarias:</strong> Control de inventarios, gestión comercial, resolución de problemas.</li>
          </ul>
        </section>

        {/* EXPERIENCIA LABORAL */}
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3 pb-1">Experiencia Laboral</h2>
          
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base font-bold">Desarrollador Web Full-Stack & Consultor Digital</h3>
              <span className="text-sm font-semibold">Jun. 2024 – Presente</span>
            </div>
            <p className="text-sm italic mb-2">Freelance / Afenta</p>
            <ul className="list-disc list-outside ml-5 text-sm leading-relaxed space-y-1">
              <li>Diseño y desarrollo de aplicaciones web responsivas y soluciones E-commerce/ERP personalizadas utilizando Next.js, React y Supabase.</li>
              <li>Implementación de pasarelas de pago automatizadas (Wompi, Stripe) e integración de arquitecturas de bases de datos relacionales con PostgreSQL.</li>
              <li>Configuración de herramientas de analítica digital y seguimiento de conversiones mediante GA4 y Meta Pixel.</li>
              <li>Optimización de los tiempos de entrega mediante el uso asistido de herramientas de Inteligencia Artificial en el flujo de desarrollo.</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base font-bold">Encargado de Local Comercial</h3>
              <span className="text-sm font-semibold">2025 – 2025</span>
            </div>
            <p className="text-sm italic mb-2">Sector Bisutería / Retail</p>
            <ul className="list-disc list-outside ml-5 text-sm leading-relaxed space-y-1">
              <li>Administración general del punto de venta, control de caja, atención personalizada al cliente y exhibición estratégica de productos.</li>
            </ul>
          </div>

          <div className="mb-2">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base font-bold">Encargado y Auxiliar de Bodega</h3>
              <span className="text-sm font-semibold">Oct. 2020 – Abr. 2024</span>
            </div>
            <p className="text-sm italic mb-2">Rio Accesorios</p>
            <ul className="list-disc list-outside ml-5 text-sm leading-relaxed space-y-1">
              <li>Gestión integral de inventarios, recepción de mercancía y control de existencias utilizando hojas de cálculo estructuradas.</li>
              <li>Promoción interna a Encargado de Bodega tras optimizar los procesos de organización del stock y tiempos de despacho.</li>
            </ul>
          </div>
        </section>

        {/* EDUCACIÓN Y FORMACIÓN */}
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3 pb-1">Educación y Formación</h2>
          
          <div className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-bold">Técnico Laboral por Competencias en Desarrollo de Software</h3>
              <span className="text-sm font-semibold">2023 – 2024</span>
            </div>
            <p className="text-sm">CESDE, Medellín, Colombia</p>
          </div>

          <div className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-bold">Formación Autodidacta en Desarrollo Web Full-Stack</h3>
              <span className="text-sm font-semibold">2024 – Presente</span>
            </div>
            <p className="text-sm">Platzi / Cursos de Especialización en Línea</p>
          </div>
        </section>

        {/* IDIOMAS */}
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b border-black mb-3 pb-1">Idiomas</h2>
          <ul className="list-disc list-inside text-sm leading-relaxed space-y-1">
            <li><strong>Español:</strong> Nativo</li>
            <li><strong>Inglés:</strong> Lectura técnica / Intermedio en desarrollo</li>
          </ul>
        </section>

      </div>
      
      {/* BOTON IMPRIMIR (no sale en el PDF) */}
      <div className="mt-8 text-center print:hidden">
        <button 
          onClick={() => window.print()} 
          className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg"
        >
          Imprimir / Guardar como PDF
        </button>
      </div>
    </div>
  );
}
