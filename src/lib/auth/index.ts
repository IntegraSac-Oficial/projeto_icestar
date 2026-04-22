/**
 * Authentication Utilities
 * 
 * Exports NextAuth.js authentication functions for use throughout the application.
 * Provides auth(), signIn(), and signOut() functions.
 */

import NextAuth from 'next-auth';
import { authConfig } from './config';

/**
 * Initialize NextAuth.js and export authentication functions
 */
export const { auth, signIn, signOut } = NextAuth(authConfig);
