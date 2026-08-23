import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  // Check if the route is under /admin but NOT the login page itself
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check for the admin session cookie
    const session = request.cookies.get('admin_session');
    
    // If no session exists, redirect to login page
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      if (!process.env.JWT_SECRET) {
        return NextResponse.redirect(new URL('/admin/login?error=missing_secret', request.url));
      }
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      // Verify the JWT mathematically
      await jwtVerify(session.value, secret);
    } catch (error) {
      // If the signature is invalid or the token expired, reject it
      return NextResponse.redirect(new URL('/admin/login?error=invalid_token', request.url));
    }
  }
  
  return NextResponse.next();
}

// Only run the middleware on /admin routes to save performance on the public portfolio
export const config = {
  matcher: '/admin/:path*',
};
