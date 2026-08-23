import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin_session');
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try {
      await jwtVerify(sessionCookie.value, secret);
    } catch (e) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }

    const { newPin } = await request.json();

    if (!newPin || newPin.length !== 4) {
      return NextResponse.json({ error: 'El PIN debe tener 4 dígitos' }, { status: 400 });
    }

    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json({ error: 'Falta SUPABASE_SERVICE_ROLE_KEY en Vercel para modificar la base de datos de forma segura.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL!,
      serviceKey,
      { auth: { persistSession: false } }
    );

    // Update or insert the pin
    const { error } = await supabaseAdmin
      .from('app_settings')
      .upsert({ id: 'admin_pin', value: newPin });

    if (error) {
      console.error('Error updating PIN in Supabase:', error);
      return NextResponse.json({ error: 'Error al actualizar el PIN en la base de datos' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Error del servidor' }, { status: 500 });
  }
}
