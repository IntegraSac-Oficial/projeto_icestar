/**
 * Authentication Service
 * 
 * Handles password hashing, comparison, and credential verification
 * for the Ice Star admin panel authentication system.
 */

import bcrypt from 'bcrypt';
import { query } from '@/lib/db/connection';
import type { RowDataPacket } from 'mysql2/promise';

/**
 * Admin user interface matching database schema
 */
export interface AdminUser {
  id: number;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Number of bcrypt salt rounds (10 rounds as specified)
 */
const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 * 
 * @param password - Plain text password to hash
 * @returns Promise resolving to bcrypt hash string
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a bcrypt hash
 * 
 * @param password - Plain text password to verify
 * @param hash - Bcrypt hash to compare against
 * @returns Promise resolving to true if password matches, false otherwise
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Verify user credentials against the database
 * 
 * @param email - User email address
 * @param password - Plain text password
 * @returns Promise resolving to AdminUser if credentials valid, null otherwise
 * @throws Error if database query fails
 */
export async function verifyCredentials(
  email: string,
  password: string
): Promise<AdminUser | null> {
  try {
    // Query database for user by email
    const [rows] = await query<RowDataPacket[]>(
      'SELECT id, email, password_hash, created_at, updated_at FROM admin_users WHERE email = ?',
      [email]
    );

    // Check if user exists
    if (!rows || rows.length === 0) {
      return null;
    }

    const user = rows[0] as AdminUser;

    // Compare password with stored hash
    const isValid = await comparePassword(password, user.password_hash);

    if (!isValid) {
      return null;
    }

    // Return user without password hash for security
    return {
      id: user.id,
      email: user.email,
      password_hash: user.password_hash,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  } catch (error) {
    console.error('Error verifying credentials:', error);
    throw new Error('Database error during credential verification');
  }
}
