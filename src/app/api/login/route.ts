import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();
    const adminPin = process.env.ADMIN_PIN || '2001';

    if (pin !== adminPin) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ error: 'Error Crítico: JWT_SECRET no está configurado en Vercel' }, { status: 500 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    
    // Sign a JWT token
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1w')
      .sign(secret);

    // Set a secure cookie for the session
    const cookieStore = await cookies();
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'strict'
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: 'Login Error: ' + (error?.message || String(error)) }, { status: 500 });
  }
}
