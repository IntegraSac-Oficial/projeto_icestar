/**
 * NextAuth.js Configuration
 * 
 * Configures authentication for the Ice Star admin panel using NextAuth.js v5 (Auth.js).
 * Implements credentials-based authentication with JWT session strategy.
 */

import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyCredentials } from '@/lib/services/auth.service';

/**
 * NextAuth.js configuration object
 * 
 * Features:
 * - Credentials provider for email/password authentication
 * - JWT session strategy with 24-hour expiration
 * - Custom login page at /admin/login
 * - Session callbacks to include user data
 */
export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@icestar.com',
        },
        password: {
          label: 'Senha',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          // Validate credentials exist
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          // Verify credentials against database
          const user = await verifyCredentials(
            credentials.email as string,
            credentials.password as string
          );

          // Return user object if valid, null otherwise
          if (user) {
            return {
              id: user.id.toString(),
              email: user.email,
            };
          }

          return null;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to token on sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Add user data from token to session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
};
