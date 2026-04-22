/**
 * Authentication Middleware Tests
 * 
 * Tests the middleware's behavior for protecting admin routes.
 * Verifies that:
 * - /admin/login is accessible without authentication
 * - Other /admin/* routes require authentication
 * - Unauthenticated users are redirected to login
 * - Authenticated users can access protected routes
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

// Mock the auth function
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

import { auth } from '@/lib/auth';

describe('Authentication Middleware', () => {
  const mockAuth = auth as jest.MockedFunction<typeof auth>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Public Routes', () => {
    it('should allow access to /admin/login without authentication', async () => {
      // Mock no session
      mockAuth.mockResolvedValue(null);

      const request = new NextRequest(new URL('http://localhost:3000/admin/login'));
      const response = await middleware(request);

      // Should proceed without redirect
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-next')).toBeTruthy();
    });
  });

  describe('Protected Routes', () => {
    it('should redirect unauthenticated users to login', async () => {
      // Mock no session
      mockAuth.mockResolvedValue(null);

      const request = new NextRequest(new URL('http://localhost:3000/admin/dashboard'));
      const response = await middleware(request);

      // Should redirect to login
      expect(response.status).toBe(307); // Temporary redirect
      expect(response.headers.get('location')).toContain('/admin/login');
      expect(response.headers.get('location')).toContain('callbackUrl=%2Fadmin%2Fdashboard');
    });

    it('should allow authenticated users to access protected routes', async () => {
      // Mock valid session
      mockAuth.mockResolvedValue({
        user: {
          id: '1',
          email: 'admin@icestar.com',
        },
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      });

      const request = new NextRequest(new URL('http://localhost:3000/admin/dashboard'));
      const response = await middleware(request);

      // Should proceed without redirect
      expect(response.status).toBe(200);
      expect(response.headers.get('x-middleware-next')).toBeTruthy();
    });

    it('should protect nested admin routes', async () => {
      // Mock no session
      mockAuth.mockResolvedValue(null);

      const request = new NextRequest(new URL('http://localhost:3000/admin/content/hero'));
      const response = await middleware(request);

      // Should redirect to login
      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toContain('/admin/login');
      expect(response.headers.get('location')).toContain('callbackUrl=%2Fadmin%2Fcontent%2Fhero');
    });
  });

  describe('Error Handling', () => {
    it('should redirect to login if auth check fails', async () => {
      // Mock auth error
      mockAuth.mockRejectedValue(new Error('Auth service unavailable'));

      const request = new NextRequest(new URL('http://localhost:3000/admin/dashboard'));
      const response = await middleware(request);

      // Should redirect to login for safety
      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toContain('/admin/login');
    });
  });

  describe('Callback URL', () => {
    it('should preserve original destination in callback URL', async () => {
      // Mock no session
      mockAuth.mockResolvedValue(null);

      const request = new NextRequest(new URL('http://localhost:3000/admin/content/services'));
      const response = await middleware(request);

      // Should include callback URL
      const location = response.headers.get('location');
      expect(location).toContain('callbackUrl=%2Fadmin%2Fcontent%2Fservices');
    });
  });
});
