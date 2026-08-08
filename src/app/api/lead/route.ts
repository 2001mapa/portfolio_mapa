import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // ----------------------------------------------------------------------
    // 🛡️ SHADOW SAVE (Guardado Oculto)
    // Aquí puedes conectar Supabase, Resend (Emails) o Google Sheets.
    // Aunque el cliente cierre la pestaña sin enviar el WhatsApp,
    // sus datos ya estarán seguros en tu base de datos.
    // ----------------------------------------------------------------------
    
    // Ejemplo de conexión a Supabase (Descomentar cuando tengas las keys):
    /*
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        name: data.name,
        message: data.message,
        pricing_data: data.pricingSummary,
        created_at: new Date().toISOString()
      })
    });
    */

    // Simulación de guardado exitoso para la terminal
    console.log("-----------------------------------------");
    console.log("📥 NUEVO LEAD GUARDADO EN SHADOW SAVE:");
    console.log("Nombre:", data.name);
    console.log("Mensaje:", data.message);
    if (data.pricingSummary) {
      console.log("Presupuesto Base:", data.pricingSummary.totalMin, "-", data.pricingSummary.totalMax);
    }
    console.log("-----------------------------------------");

    return NextResponse.json({ success: true, message: "Lead guardado correctamente en la sombra." });
  } catch (error) {
    console.error("Error en Shadow Save:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}
