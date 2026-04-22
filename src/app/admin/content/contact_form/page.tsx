'use client';

/**
 * Contact Form Section Editor Page
 * 
 * Allows editing of the contact form section content.
 * Requirements: 11.1, 11.2, 11.3, 18.1, 18.3, 18.4
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { contactFormSchema, type ContactFormContent } from '@/lib/validations/content-schemas';
import { ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContactFormEditorPage() {
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
  } = useForm<ContactFormContent>({
    resolver: zodResolver(contactFormSchema),
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

      const response = await fetch('/api/admin/content/contact_form');

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

  const onSubmit = async (data: ContactFormContent) => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetch('/api/admin/content/contact_form', {
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
          <h1 className="text-3xl font-bold text-black">Editar Formulário de Contato</h1>
          <p className="text-gray-600 mt-1">
            Edite os textos e labels do formulário de contato
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
              placeholder="Ex: Solicite um Orçamento"
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

          {/* Section Description */}
          <div>
            <label htmlFor="section_description" className="block text-sm font-medium text-black mb-2">
              Descrição da Seção
              <span className="text-primary ml-1">*</span>
            </label>
            <textarea
              id="section_description"
              rows={3}
              placeholder="Preencha o formulário abaixo..."
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                errors.section_description
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('section_description')}
              disabled={isSaving}
            />
            {errors.section_description && (
              <p className="mt-2 text-sm text-primary">{errors.section_description.message}</p>
            )}
          </div>

          {/* Submit Button Text */}
          <div>
            <label htmlFor="submit_button_text" className="block text-sm font-medium text-black mb-2">
              Texto do Botão de Envio
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="submit_button_text"
              type="text"
              placeholder="Ex: Enviar Solicitação"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.submit_button_text
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('submit_button_text')}
              disabled={isSaving}
            />
            {errors.submit_button_text && (
              <p className="mt-2 text-sm text-primary">{errors.submit_button_text.message}</p>
            )}
          </div>

          {/* Success Message */}
          <div>
            <label htmlFor="success_message" className="block text-sm font-medium text-black mb-2">
              Mensagem de Sucesso
              <span className="text-primary ml-1">*</span>
            </label>
            <input
              id="success_message"
              type="text"
              placeholder="Ex: Mensagem enviada com sucesso!"
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                errors.success_message
                  ? 'border-primary ring-2 ring-primary'
                  : 'border-neutral focus:border-primary'
              }`}
              {...register('success_message')}
              disabled={isSaving}
            />
            {errors.success_message && (
              <p className="mt-2 text-sm text-primary">{errors.success_message.message}</p>
            )}
          </div>

          {/* Form Fields Section (Optional) */}
          <div className="border-t border-neutral pt-6">
            <h3 className="text-lg font-semibold text-black mb-4">
              Labels e Placeholders dos Campos (Opcional)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Personalize os textos dos campos do formulário. Deixe em branco para usar os padrões.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Label "Nome Completo"
                </label>
                <input
                  type="text"
                  placeholder="Nome Completo"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.full_name_label')}
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Placeholder "Nome Completo"
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.full_name_placeholder')}
                  disabled={isSaving}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Label "Telefone"
                </label>
                <input
                  type="text"
                  placeholder="Telefone / WhatsApp"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.phone_label')}
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Placeholder "Telefone"
                </label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.phone_placeholder')}
                  disabled={isSaving}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Label "E-mail"
                </label>
                <input
                  type="text"
                  placeholder="E-mail"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.email_label')}
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Placeholder "E-mail"
                </label>
                <input
                  type="text"
                  placeholder="seu@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.email_placeholder')}
                  disabled={isSaving}
                />
              </div>

              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Label "Tipo de Veículo"
                </label>
                <input
                  type="text"
                  placeholder="Tipo de Veículo"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.vehicle_type_label')}
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Placeholder "Tipo de Veículo"
                </label>
                <input
                  type="text"
                  placeholder="Selecione o tipo de veículo"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.vehicle_type_placeholder')}
                  disabled={isSaving}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Label "Mensagem"
                </label>
                <input
                  type="text"
                  placeholder="Mensagem (Opcional)"
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.message_label')}
                  disabled={isSaving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Placeholder "Mensagem"
                </label>
                <input
                  type="text"
                  placeholder="Conte-nos mais sobre suas necessidades..."
                  className="w-full px-4 py-2 rounded-lg border border-neutral focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register('form_fields.message_placeholder')}
                  disabled={isSaving}
                />
              </div>
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
