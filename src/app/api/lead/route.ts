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

    // Validate payload size (e.g. roughly less than 10KB to avoid abuse)
    const jsonString = JSON.stringify(data);
    if (jsonString.length > 10000) {
      return NextResponse.json({ success: false, message: "Payload too large" }, { status: 413 });
    }

    if (!data.name || typeof data.name !== 'string' || data.name.length > 100) {
      return NextResponse.json({ success: false, message: "Invalid name" }, { status: 400 });
    }

    if (!data.message || typeof data.message !== 'string' || data.message.length > 2000) {
      return NextResponse.json({ success: false, message: "Invalid message" }, { status: 400 });
    }

    // Shadow save simulation logic...
    
    console.log("📥 NUEVO LEAD PROCESADO Y VALIDADO (PII oculto).");

    return NextResponse.json({ success: true, message: "Lead guardado correctamente en la sombra." });
  } catch (error) {
    console.error("Error en Shadow Save:", error);
    return NextResponse.json({ success: false, message: "Error interno" }, { status: 500 });
  }
}

