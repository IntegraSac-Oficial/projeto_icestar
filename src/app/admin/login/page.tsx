'use client';

/**
 * Admin Login Page
 * 
 * Provides authentication interface for Ice Star admin panel.
 * Features:
 * - Email and password login form
 * - Form validation using React Hook Form + Zod
 * - NextAuth.js integration for authentication
 * - Error messages in Portuguese
 * - Redirect to dashboard or callbackUrl on success
 * 
 * Requirements: 1.1, 1.2, 1.3, 18.1, 18.2, 18.3, 18.4
 */

import React, { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth-schemas';
import Button from '@/components/ui/Button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
  
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        // Authentication failed
        setAuthError('Credenciais inválidas');
        setIsLoading(false);
      } else if (result?.ok) {
        // Authentication successful - redirect to dashboard or callbackUrl
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Erro ao fazer login. Tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">Ice Star</h1>
            <p className="text-gray-600">Painel Administrativo</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email
                <span className="text-primary ml-1">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@icestar.com"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email
                    ? 'border-primary ring-2 ring-primary'
                    : 'border-neutral focus:border-primary'
                }`}
                {...register('email')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-primary">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                Senha
                <span className="text-primary ml-1">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.password
                    ? 'border-primary ring-2 ring-primary'
                    : 'border-neutral focus:border-primary'
                }`}
                {...register('password')}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-primary">{errors.password.message}</p>
              )}
            </div>

            {/* Authentication Error Message */}
            {authError && (
              <div className="bg-red-50 border border-primary rounded-lg p-4">
                <p className="text-sm text-primary">{authError}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © {new Date().getFullYear()} Ice Star. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
