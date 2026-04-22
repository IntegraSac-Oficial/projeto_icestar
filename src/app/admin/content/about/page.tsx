'use client';

/**
 * About Section Editor Page
 * 
 * Allows editing of the about section content including:
 * - Section title
 * - Main description
 * - Benefits array (title, description, icon for each)
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 18.1, 18.3, 18.4
 */

import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { aboutSchema, type AboutContent } from '@/lib/validations/content-schemas';
import { ArrowLeft, Save, AlertCircle, CheckCircle, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function AboutEditorPage() {
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
    control,
  } = useForm<AboutContent>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      benefits: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'benefits',
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

      const response = await fetch('/api/admin/content/about');

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

  const onSubmit = async (data: AboutContent) => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/admin/content/about', {
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

  const addBenefit = () => {
    append({
      id: `benefit-${Date.now()}`,
      title: '',
      description: '',
      icon: 'CheckCircle',
    });
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
          <h1 className="text-3xl font-bold text-black">Editar Sobre a Empresa</h1>
          <p className="text-gray-600 mt-1">
            Edite o conteúdo da seção "Sobre" do site
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
          {/* Section Title */}
          <div>
            <label htmlFor="section_title" className="block text-sm font-medium text-black mb-2">
              Título da Seção
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="section_title"
              type="text"
              placeholder="Ex: Sobre a Ice Star"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.section_title
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('section_title')}
              disabled={isSaving}
            />
            {errors.section_title && (
              <p className="mt-2 text-sm text-primary">{errors.section_title.message}</p>
            )}
          </div>

          {/* Main Description */}
          <div>
            <label htmlFor="main_description" className="block text-sm font-medium text-black mb-2">
              Descrição Principal
              <span className="text-primary ml-1">*</span>
            </label>
            <textarea
              id="main_description"
              rows={4}
              placeholder="Descreva a empresa, sua missão e valores..."
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.main_description
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('main_description')}
              disabled={isSaving}
            />
            {errors.main_description && (
              <p className="mt-2 text-sm text-primary">{errors.main_description.message}</p>
            )}
          </div>

          {/* Benefits Section */}
          <div className="border-t border-neutral pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-black">Benefícios / Diferenciais</h3>
              <button
                type="button"
                onClick={addBenefit}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                disabled={isSaving}
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Benefício</span>
              </button>
            </div>

            {errors.benefits && typeof errors.benefits.message === 'string' && (
              <p className="mb-4 text-sm text-primary">{errors.benefits.message}</p>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border border-neutral rounded-lg space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-black">Benefício {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 text-primary hover:bg-red-50 rounded-lg transition-colors"
                      disabled={isSaving}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Benefit Title */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Título
                      <span className="text-primary ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Expertise Técnica"
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.benefits?.[index]?.title
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-neutral focus:border-primary'
                      }`}
                      {...register(`benefits.${index}.title`)}
                      disabled={isSaving}
                    />
                    {errors.benefits?.[index]?.title && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.benefits[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  {/* Benefit Description */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Descrição
                      <span className="text-primary ml-1">*</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Descreva o benefício..."
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                        errors.benefits?.[index]?.description
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-neutral focus:border-primary'
                      }`}
                      {...register(`benefits.${index}.description`)}
                      disabled={isSaving}
                    />
                    {errors.benefits?.[index]?.description && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.benefits[index]?.description?.message}
                      </p>
                    )}
                  </div>

                  {/* Benefit Icon */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      Ícone (Lucide React)
                      <span className="text-primary ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Target, Award, CheckCircle, Users"
                      className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.benefits?.[index]?.icon
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-neutral focus:border-primary'
                      }`}
                      {...register(`benefits.${index}.icon`)}
                      disabled={isSaving}
                    />
                    {errors.benefits?.[index]?.icon && (
                      <p className="mt-1 text-sm text-primary">
                        {errors.benefits[index]?.icon?.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Nome do ícone do Lucide React (ex: Target, Award, CheckCircle)
                    </p>
                  </div>

                  {/* Hidden ID field */}
                  <input type="hidden" {...register(`benefits.${index}.id`)} />
                </div>
              ))}

              {fields.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Nenhum benefício adicionado. Clique em "Adicionar Benefício" para começar.
                </p>
              )}
            </div>
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
