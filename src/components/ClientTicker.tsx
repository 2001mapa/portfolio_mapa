export function ClientTicker() {
  const clients = [
    "WOMPI INTEGRATION",
    "ENTERPRISE ERP",
    "SUPABASE SYNC",
    "INVENTORY SYSTEM",
    "B2B PLATFORM",
    "PAYMENT GATEWAY",
  ];

  return (
    <div className="w-full overflow-hidden border-y border-graphite bg-fog py-6 flex items-center">
      <div className="flex w-max animate-marquee">
        {clients.map((client, index) => (
          <div key={index} className="flex items-center text-slate font-[family-name:var(--font-die-grotesk-b)] text-body-lg font-medium whitespace-nowrap opacity-60">
            <span className="px-16">{client}</span>
            <div className="w-[1px] h-8 bg-graphite transform rotate-[15deg]"></div>
          </div>
        ))}
        {clients.map((client, index) => (
          <div key={`dup-${index}`} className="flex items-center text-slate font-[family-name:var(--font-die-grotesk-b)] text-body-lg font-medium whitespace-nowrap opacity-60">
            <span className="px-16">{client}</span>
            <div className="w-[1px] h-8 bg-graphite transform rotate-[15deg]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
