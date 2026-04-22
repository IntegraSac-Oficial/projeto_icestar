/**
 * Authentication Middleware
 * 
 * TEMPORARILY DISABLED due to Next.js 16 + Turbopack + NextAuth.js v5 compatibility issue
 * 
 * Authentication is now handled in the admin layout component
 */

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // Temporarily allow all requests - auth is handled in layout
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
