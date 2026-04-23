'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SectionContainer from '@/components/ui/SectionContainer';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { contactFormSchema, ContactFormData } from '@/lib/validations';
import { SelectOption } from '@/types/form';
import type { ContactFormContent } from '@/lib/utils/content-fetcher';

/**
 * Contact Form Section Component
 * Lead capture form with validation
 * Validates: Requirements 8.1-8.12
 */

interface ContactFormProps {
  content: ContactFormContent;
}

const ContactForm: React.FC<ContactFormProps> = ({ content }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const vehicleTypeOptions: SelectOption[] = [
    { value: '', label: content.form_fields?.vehicle_type_placeholder || 'Selecione o tipo de veículo' },
    { value: 'fiorino', label: 'Fiorino' },
    { value: 'ducato', label: 'Ducato' },
    { value: 'sprinter', label: 'Sprinter' },
    { value: 'van', label: 'Van' },
    { value: 'truck', label: 'Caminhão' },
    { value: 'other', label: 'Outro' },
  ];

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Form submitted:', data);

      // Show success message
      setSubmitSuccess(true);

      // Reset form
      reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-28">
      <SectionContainer background="white" className="py-12 md:py-16 lg:py-24">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            {content.section_title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {content.section_description}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Two-column layout for desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <Input
                label={content.form_fields?.full_name_label || 'Nome Completo'}
                type="text"
                name="fullName"
                placeholder={content.form_fields?.full_name_placeholder || 'Seu nome completo'}
                error={errors.fullName?.message}
                required
                register={register}
              />

              {/* Phone */}
              <Input
                label={content.form_fields?.phone_label || 'Telefone / WhatsApp'}
                type="tel"
                name="phone"
                placeholder={content.form_fields?.phone_placeholder || '(00) 00000-0000'}
                error={errors.phone?.message}
                required
                register={register}
              />
            </div>

            {/* Email - Full width */}
            <Input
              label={content.form_fields?.email_label || 'E-mail'}
              type="email"
              name="email"
              placeholder={content.form_fields?.email_placeholder || 'seu@email.com'}
              error={errors.email?.message}
              required
              register={register}
            />

            {/* Vehicle Type - Full width */}
            <Select
              label={content.form_fields?.vehicle_type_label || 'Tipo de Veículo'}
              name="vehicleType"
              options={vehicleTypeOptions}
              error={errors.vehicleType?.message}
              required
              register={register}
            />

            {/* Message - Full width */}
            <Textarea
              label={content.form_fields?.message_label || 'Mensagem (Opcional)'}
              name="message"
              placeholder={content.form_fields?.message_placeholder || 'Conte-nos mais sobre suas necessidades...'}
              rows={5}
              error={errors.message?.message}
              register={register}
            />

            {/* Success Message */}
            {submitSuccess && (
              <div
                className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
                role="alert"
                aria-live="polite"
              >
                <p className="font-semibold">{content.success_message}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                fullWidth={false}
              >
                {isSubmitting ? 'Enviando...' : content.submit_button_text}
              </Button>
            </div>
          </form>
        </div>
      </SectionContainer>
    </section>
  );
};

export default ContactForm;
