'use client';

/**
 * Footer Section Editor Page
 * 
 * Allows editing of the footer section content.
 * Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 18.1, 18.3, 18.4, 18.5
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { footerSchema, type FooterContent } from '@/lib/validations/content-schemas';
import { ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function FooterEditorPage() {
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
  } = useForm<FooterContent>({
    resolver: zodResolver(footerSchema),
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

      const response = await fetch('/api/admin/content/footer');

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

  const onSubmit = async (data: FooterContent) => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/admin/content/footer', {
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
          <h1 className="text-3xl font-bold text-black">Editar Rodapé</h1>
          <p className="text-gray-600 mt-1">
            Edite as informações de contato e redes sociais do rodapé
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
          {/* Company Name */}
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-black mb-2">
              Nome da Empresa
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="company_name"
              type="text"
              placeholder="Ice Star"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.company_name
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('company_name')}
              disabled={isSaving}
            />
            {errors.company_name && (
              <p className="mt-2 text-sm text-primary">{errors.company_name.message}</p>
            )}
          </div>

          {/* Company Description */}
          <div>
            <label htmlFor="company_description" className="block text-sm font-medium text-black mb-2">
              Descrição da Empresa
              <span className="text-primary ml-1">*</span>
            </label>
            <textarea
              id="company_description"
              rows={3}
              placeholder="Especialistas em isolamento térmico..."
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.company_description
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('company_description')}
              disabled={isSaving}
            />
            {errors.company_description && (
              <p className="mt-2 text-sm text-primary">{errors.company_description.message}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="border-t border-neutral pt-6">
            <h3 className="text-lg font-semibold text-black mb-4">Informações de Contato</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                  Telefone
                  <span className="text-primary ml-1">*</span>
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="(11) 99999-9999"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.phone
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-neutral focus:border-primary'
                  }`}
                  {...register('phone')}
                  disabled={isSaving}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-primary">{errors.phone.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                  E-mail
                  <span className="text-primary ml-1">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="contato@icestar.com.br"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-neutral focus:border-primary'
                  }`}
                  {...register('email')}
                  disabled={isSaving}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-primary">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="border-t border-neutral pt-6">
            <h3 className="text-lg font-semibold text-black mb-4">Endereço</h3>

            <div className="space-y-4">
              {/* Full Address */}
              <div>
                <label htmlFor="address.full" className="block text-sm font-medium text-black mb-2">
                  Endereço Completo
                  <span className="text-primary ml-1">*</span>
                </label>
                <input
                  id="address.full"
                  type="text"
                  placeholder="Rua Exemplo, 123 - São Paulo - SP - CEP 01234-567"
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.address?.full
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-neutral focus:border-primary'
                  }`}
                  {...register('address.full')}
                  disabled={isSaving}
                />
                {errors.address?.full && (
                  <p className="mt-2 text-sm text-primary">{errors.address.full.message}</p>
                )}
              </div>

              {/* Optional Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Rua (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Rua Exemplo, 123"
                    className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register('address.street')}
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Cidade (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="São Paulo"
                    className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register('address.city')}
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Estado (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="SP"
                    className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register('address.state')}
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    CEP (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="01234-567"
                    className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                    {...register('address.zip')}
                    disabled={isSaving}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="border-t border-neutral pt-6">
            <h3 className="text-lg font-semibold text-black mb-4">Redes Sociais (Opcional)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  placeholder="https://facebook.com/icestar"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.social_media_links?.facebook
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-neutral focus:border-primary'
                  }`}
                  {...register('social_media_links.facebook')}
                  disabled={isSaving}
                />
                {errors.social_media_links?.facebook && (
                  <p className="mt-1 text-sm text-primary">{errors.social_media_links.facebook.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/icestar"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.social_media_links?.instagram
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-neutral focus:border-primary'
                  }`}
                  {...register('social_media_links.instagram')}
                  disabled={isSaving}
                />
                {errors.social_media_links?.instagram && (
                  <p className="mt-1 text-sm text-primary">{errors.social_media_links.instagram.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/icestar"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.social_media_links?.linkedin
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-neutral focus:border-primary'
                  }`}
                  {...register('social_media_links.linkedin')}
                  disabled={isSaving}
                />
                {errors.social_media_links?.linkedin && (
                  <p className="mt-1 text-sm text-primary">{errors.social_media_links.linkedin.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Twitter
                </label>
                <input
                  type="url"
                  placeholder="https://twitter.com/icestar"
                  className={`w-full px-4 py-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.social_media_links?.twitter
                      ? 'border-primary ring-2 ring-primary'
                      : 'border-neutral focus:border-primary'
                  }`}
                  {...register('social_media_links.twitter')}
                  disabled={isSaving}
                />
                {errors.social_media_links?.twitter && (
                  <p className="mt-1 text-sm text-primary">{errors.social_media_links.twitter.message}</p>
                )}
              </div>
            </div>

            {/* Social Media Text */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-black mb-2">
                Texto das Redes Sociais (Opcional)
              </label>
              <input
                type="text"
                placeholder="Siga-nos nas redes sociais..."
                className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                {...register('social_media_text')}
                disabled={isSaving}
              />
            </div>
          </div>

          {/* Copyright Text */}
          <div className="border-t border-neutral pt-6">
            <label className="block text-sm font-medium text-black mb-2">
              Texto de Copyright (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ice Star. Todos os direitos reservados."
              className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
              {...register('copyright_text')}
              disabled={isSaving}
            />
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
