/**
 * NextAuth.js API Route Handler
 * 
 * Dynamic route handler for NextAuth.js v5 (Auth.js) authentication endpoints.
 * Handles all authentication-related requests including sign in, sign out, and session management.
 * 
 * Route: /api/auth/*
 * Methods: GET, POST
 */

import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth/config';

/**
 * Initialize NextAuth.js with configuration and export handlers
 */
const { handlers } = NextAuth(authConfig);

/**
 * Export GET and POST handlers for Next.js App Router
 */
export const { GET, POST } = handlers;
