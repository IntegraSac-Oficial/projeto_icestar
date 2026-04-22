/**
 * Authentication Service Tests
 * 
 * Unit tests for password hashing, comparison, and credential verification
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { hashPassword, comparePassword, verifyCredentials } from './auth.service';
import { query, closePool } from '@/lib/db/connection';

describe('Authentication Service', () => {
  describe('hashPassword', () => {
    it('should hash password with bcrypt', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      
      // Bcrypt hash should start with $2a$, $2b$, or $2y$ followed by cost factor
      expect(hash).toMatch(/^\$2[aby]\$\d{2}\$/);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'SecurePass123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      // Hashes should be different due to random salt
      expect(hash1).not.toBe(hash2);
    });

    it('should use 10 rounds (cost factor)', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      
      // Extract cost factor from hash (format: $2a$10$...)
      const costFactor = hash.split('$')[2];
      expect(costFactor).toBe('10');
    });
  });

  describe('comparePassword', () => {
    it('should verify correct password', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      const isValid = await comparePassword(password, hash);
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      const isValid = await comparePassword('WrongPassword', hash);
      
      expect(isValid).toBe(false);
    });

    it('should handle empty password', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);
      const isValid = await comparePassword('', hash);
      
      expect(isValid).toBe(false);
    });
  });

  describe('verifyCredentials', () => {
    beforeAll(async () => {
      // Create test admin user
      const testEmail = 'test@icestar.com';
      const testPassword = 'TestPass123!';
      const testHash = await hashPassword(testPassword);
      
      // Delete if exists
      await query('DELETE FROM admin_users WHERE email = ?', [testEmail]);
      
      // Insert test user
      await query(
        'INSERT INTO admin_users (email, password_hash) VALUES (?, ?)',
        [testEmail, testHash]
      );
    });

    afterAll(async () => {
      // Clean up test user
      await query('DELETE FROM admin_users WHERE email = ?', ['test@icestar.com']);
      await closePool();
    });

    it('should return user with valid credentials', async () => {
      const user = await verifyCredentials('test@icestar.com', 'TestPass123!');
      
      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@icestar.com');
      expect(user?.id).toBeDefined();
    });

    it('should return null with invalid password', async () => {
      const user = await verifyCredentials('test@icestar.com', 'WrongPassword');
      
      expect(user).toBeNull();
    });

    it('should return null with non-existent email', async () => {
      const user = await verifyCredentials('nonexistent@icestar.com', 'TestPass123!');
      
      expect(user).toBeNull();
    });

    it('should return null with empty credentials', async () => {
      const user = await verifyCredentials('', '');
      
      expect(user).toBeNull();
    });
  });
});
