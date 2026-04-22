'use client';

/**
 * Hero Section Editor Page
 * 
 * Allows editing of the hero/banner section content including:
 * - Main title
 * - Subtitle
 * - Description
 * - Primary button text
 * - Secondary button text
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 18.1, 18.3, 18.4
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { heroSchema, type HeroContent } from '@/lib/validations/content-schemas';
import { ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HeroEditorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<HeroContent | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<HeroContent>({
    resolver: zodResolver(heroSchema),
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

      const response = await fetch('/api/admin/content/hero');

      if (!response.ok) {
        throw new Error('Erro ao carregar conteúdo');
      }

      const data = await response.json();
      setCurrentContent(data.section_data);
      reset(data.section_data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: HeroContent) => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/admin/content/hero', {
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
      setCurrentContent(data);

      // Clear success message after 3 seconds
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
          <h1 className="text-3xl font-bold text-black">Editar Hero / Banner Principal</h1>
          <p className="text-gray-600 mt-1">
            Edite o conteúdo da seção principal do site
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
          {/* Main Title */}
          <div>
            <label htmlFor="main_title" className="block text-sm font-medium text-black mb-2">
              Título Principal
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="main_title"
              type="text"
              placeholder="Ex: Soluções Completas em Isolamento Térmico"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.main_title
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('main_title')}
              disabled={isSaving}
            />
            {errors.main_title && (
              <p className="mt-2 text-sm text-primary">{errors.main_title.message}</p>
            )}
          </div>

          {/* Subtitle */}
          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-black mb-2">
              Subtítulo
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="subtitle"
              type="text"
              placeholder="Ex: Transforme seu veículo em uma câmara frigorífica profissional"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.subtitle
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('subtitle')}
              disabled={isSaving}
            />
            {errors.subtitle && (
              <p className="mt-2 text-sm text-primary">{errors.subtitle.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-black mb-2">
              Descrição
              <span className="text-primary ml-1">*</span>
            </label>
            <textarea
              id="description"
              rows={4}
              placeholder="Descreva os serviços e diferenciais da empresa..."
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.description
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('description')}
              disabled={isSaving}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-primary">{errors.description.message}</p>
            )}
          </div>

          {/* Primary Button Text */}
          <div>
            <label htmlFor="primary_button_text" className="block text-sm font-medium text-black mb-2">
              Texto do Botão Primário
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="primary_button_text"
              type="text"
              placeholder="Ex: Solicite um Orçamento"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.primary_button_text
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('primary_button_text')}
              disabled={isSaving}
            />
            {errors.primary_button_text && (
              <p className="mt-2 text-sm text-primary">{errors.primary_button_text.message}</p>
            )}
          </div>

          {/* Secondary Button Text */}
          <div>
            <label htmlFor="secondary_button_text" className="block text-sm font-medium text-black mb-2">
              Texto do Botão Secundário
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="secondary_button_text"
              type="text"
              placeholder="Ex: Conheça Nossos Serviços"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.secondary_button_text
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('secondary_button_text')}
              disabled={isSaving}
            />
            {errors.secondary_button_text && (
              <p className="mt-2 text-sm text-primary">{errors.secondary_button_text.message}</p>
            )}
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

      {/* Current Content Preview */}
      {currentContent && (
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-bold text-black mb-4">Preview do Conteúdo Atual</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Título Principal:</p>
              <p className="text-gray-600">{currentContent.main_title}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Subtítulo:</p>
              <p className="text-gray-600">{currentContent.subtitle}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Descrição:</p>
              <p className="text-gray-600">{currentContent.description}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="font-semibold text-gray-700">Botão Primário:</p>
                <p className="text-gray-600">{currentContent.primary_button_text}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700">Botão Secundário:</p>
                <p className="text-gray-600">{currentContent.secondary_button_text}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
