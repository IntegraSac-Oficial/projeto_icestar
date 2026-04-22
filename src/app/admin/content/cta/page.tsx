'use client';

/**
 * CTA Section Editor Page
 * 
 * Allows editing of the CTA (Call-to-Action) section content.
 * Requirements: 10.1, 10.2, 10.3, 18.1, 18.3, 18.4
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ctaSchema, type CTAContent } from '@/lib/validations/content-schemas';
import { ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function CTAEditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CTAContent>({
    resolver: zodResolver(ctaSchema),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    if (status === 'authenticated') {
      fetchContent();
    }
  }, [status, router]);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/admin/content/cta');

      if (!response.ok) {
        throw new Error('Erro ao carregar conteúdo');
      }

      const data = await response.json();
      reset(data.section_data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CTAContent) => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/admin/content/cta', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar conteúdo');
      }

      setSuccessMessage('Conteúdo salvo com sucesso!');

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsSaving(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando conteúdo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard"
          className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Editar Chamada para Ação (CTA)</h1>
          <p className="text-gray-600 mt-1">
            Edite o conteúdo da seção de chamada para ação
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-primary rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-gray-700">{error}</p>
          </div>
        </div>
      )}

      {/* Editor Form */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Headline */}
          <div>
            <label htmlFor="headline" className="block text-sm font-medium text-black mb-2">
              Título / Chamada
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="headline"
              type="text"
              placeholder="Ex: Pronto para Transformar seu Veículo?"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.headline
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('headline')}
              disabled={isSaving}
            />
            {errors.headline && (
              <p className="mt-2 text-sm text-primary">{errors.headline.message}</p>
            )}
          </div>

          {/* Button Text */}
          <div>
            <label htmlFor="button_text" className="block text-sm font-medium text-black mb-2">
              Texto do Botão
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="button_text"
              type="text"
              placeholder="Ex: Fale Conosco Agora"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.button_text
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('button_text')}
              disabled={isSaving}
            />
            {errors.button_text && (
              <p className="mt-2 text-sm text-primary">{errors.button_text.message}</p>
            )}
          </div>

          {/* Button Link (Optional) */}
          <div>
            <label htmlFor="button_href" className="block text-sm font-medium text-black mb-2">
              Link do Botão (Opcional)
            </label>
            <input
              id="button_href"
              type="text"
              placeholder="Ex: #contact ou /contato"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.button_href
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('button_href')}
              disabled={isSaving}
            />
            {errors.button_href && (
              <p className="mt-2 text-sm text-primary">{errors.button_href.message}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Deixe vazio para usar #contact (padrão). Use # para âncoras, / para páginas internas, ou URL completa.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Salvando...' : 'Salvar Alterações'}</span>
            </button>
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border-2 border-neutral text-black rounded-lg hover:bg-neutral-light transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
