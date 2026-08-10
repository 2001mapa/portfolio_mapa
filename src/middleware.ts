import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the route is under /admin but NOT the login page itself
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check for the admin session cookie
    const session = request.cookies.get('admin_session');
    
    // If no session exists, redirect to login page
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Only run the middleware on /admin routes to save performance on the public portfolio
export const config = {
  matcher: '/admin/:path*',
};
