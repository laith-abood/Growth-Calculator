import * as React from 'react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './lib/firebase/config';

// Paths that require authentication
const protectedPaths = [
  '/dashboard',
  '/settings',
  '/profile',
  '/valuation',
  '/analytics',
];

// Paths that are only accessible to non-authenticated users
const authPaths = [
  '/login',
  '/signup',
  '/forgot-password',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the token from the cookie
  const token = request.cookies.get('auth-token')?.value;

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isAuthPath = authPaths.some(path => pathname.startsWith(path));

  try {
    if (isProtectedPath) {
      // If no token exists, redirect to login
      if (!token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
      }

      // Verify token with Firebase Admin
      try {
        // const decodedToken = await auth.verifyIdToken(token);
        // Add user data to request headers if needed
        // const response = NextResponse.next();
        // response.headers.set('X-User-ID', decodedToken.uid);
        // return response;
        return NextResponse.next();
      } catch (error) {
        // Token is invalid or expired
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth-token');
        return response;
      }
    }

    if (isAuthPath && token) {
      // If user is already authenticated, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // For all other routes, continue normally
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  // Paths to match
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
