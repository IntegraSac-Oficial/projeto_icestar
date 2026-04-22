/**
 * NextAuth.js Type Definitions
 * 
 * Extends NextAuth.js types to include custom user properties
 * for the Ice Star admin panel authentication system.
 */

import 'next-auth';
import 'next-auth/jwt';

/**
 * Extend the built-in session types
 */
declare module 'next-auth' {
  /**
   * Extended User interface with custom properties
   */
  interface User {
    id: string;
    email: string;
  }

  /**
   * Extended Session interface with custom user properties
   */
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}

/**
 * Extend the built-in JWT types
 */
declare module 'next-auth/jwt' {
  /**
   * Extended JWT interface with custom properties
   */
  interface JWT {
    id: string;
    email: string;
  }
}
