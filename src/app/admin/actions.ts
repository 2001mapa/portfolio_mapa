'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { SignJWT } from 'jose';

export async function loginAction(pin: string) {
  const adminPin = process.env.ADMIN_PIN || '2001'; // Default fallback

  if (pin === adminPin) {
    if (!process.env.JWT_SECRET) return { error: 'Error Crítico: JWT_SECRET no está configurado en Vercel' };
    
    try {
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

      return { success: true };
    } catch (e: any) {
      return { error: 'Login Error: ' + (e?.message || String(e)) };
    }
  } else {
    return { error: 'Contraseña incorrecta' };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/admin/enter');
}
