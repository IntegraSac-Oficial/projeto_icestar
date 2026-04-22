/**
 * Content Validation Schemas
 * 
 * Zod schemas for validating content section data.
 * All error messages are in Portuguese as specified.
 */

import { z } from 'zod';

/**
 * Hero section validation schema
 * Fields: main_title, subtitle, description, primary_button_text, secondary_button_text
 */
export const heroSchema = z.object({
  main_title: z
    .string()
    .min(1, 'Título principal é obrigatório')
    .max(200, 'Título principal deve ter no máximo 200 caracteres'),
  subtitle: z
    .string()
    .min(1, 'Subtítulo é obrigatório')
    .max(200, 'Subtítulo deve ter no máximo 200 caracteres'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
  primary_button_text: z
    .string()
    .min(1, 'Texto do botão primário é obrigatório')
    .max(50, 'Texto do botão primário deve ter no máximo 50 caracteres'),
  secondary_button_text: z
    .string()
    .min(1, 'Texto do botão secundário é obrigatório')
    .max(50, 'Texto do botão secundário deve ter no máximo 50 caracteres'),
});

/**
 * About section benefit item schema
 */
const benefitItemSchema = z.object({
  id: z.string().min(1, 'ID do benefício é obrigatório'),
  title: z
    .string()
    .min(1, 'Título do benefício é obrigatório')
    .max(100, 'Título do benefício deve ter no máximo 100 caracteres'),
  description: z
    .string()
    .min(1, 'Descrição do benefício é obrigatória')
    .max(500, 'Descrição do benefício deve ter no máximo 500 caracteres'),
  icon: z.string().min(1, 'Ícone do benefício é obrigatório'),
});

/**
 * About section validation schema
 * Fields: section_title, main_description, benefits (array of 4 items)
 */
export const aboutSchema = z.object({
  section_title: z
    .string()
    .min(1, 'Título da seção é obrigatório')
    .max(100, 'Título da seção deve ter no máximo 100 caracteres'),
  main_description: z
    .string()
    .min(1, 'Descrição principal é obrigatória')
    .max(1000, 'Descrição principal deve ter no máximo 1000 caracteres'),
  benefits: z
    .array(benefitItemSchema)
    .min(1, 'Pelo menos um benefício é obrigatório')
    .max(10, 'Máximo de 10 benefícios permitidos'),
});

/**
 * CTA section validation schema
 * Fields: headline, button_text
 */
export const ctaSchema = z.object({
  headline: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres'),
  button_text: z
    .string()
    .min(1, 'Texto do botão é obrigatório')
    .max(50, 'Texto do botão deve ter no máximo 50 caracteres'),
  button_href: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.startsWith('#') || val.startsWith('/') || val.startsWith('http'),
      'Link deve ser uma âncora (#), caminho relativo (/) ou URL completa (http/https)'
    ),
});

/**
 * Contact form section validation schema
 * Fields: section_title, section_description, submit_button_text, success_message
 */
export const contactFormSchema = z.object({
  section_title: z
    .string()
    .min(1, 'Título da seção é obrigatório')
    .max(100, 'Título da seção deve ter no máximo 100 caracteres'),
  section_description: z
    .string()
    .min(1, 'Descrição da seção é obrigatória')
    .max(500, 'Descrição da seção deve ter no máximo 500 caracteres'),
  submit_button_text: z
    .string()
    .min(1, 'Texto do botão de envio é obrigatório')
    .max(50, 'Texto do botão de envio deve ter no máximo 50 caracteres'),
  success_message: z
    .string()
    .min(1, 'Mensagem de sucesso é obrigatória')
    .max(200, 'Mensagem de sucesso deve ter no máximo 200 caracteres'),
  form_fields: z
    .object({
      full_name_label: z.string().optional(),
      full_name_placeholder: z.string().optional(),
      phone_label: z.string().optional(),
      phone_placeholder: z.string().optional(),
      email_label: z.string().optional(),
      email_placeholder: z.string().optional(),
      vehicle_type_label: z.string().optional(),
      vehicle_type_placeholder: z.string().optional(),
      message_label: z.string().optional(),
      message_placeholder: z.string().optional(),
    })
    .optional(),
});

/**
 * Footer section social media links schema
 */
const socialMediaLinksSchema = z.object({
  facebook: z
    .string()
    .url('Link do Facebook deve ser uma URL válida')
    .optional()
    .or(z.literal('')),
  instagram: z
    .string()
    .url('Link do Instagram deve ser uma URL válida')
    .optional()
    .or(z.literal('')),
  linkedin: z
    .string()
    .url('Link do LinkedIn deve ser uma URL válida')
    .optional()
    .or(z.literal('')),
  twitter: z
    .string()
    .url('Link do Twitter deve ser uma URL válida')
    .optional()
    .or(z.literal('')),
});

/**
 * Footer section address schema
 */
const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  full: z.string().min(1, 'Endereço completo é obrigatório'),
});

/**
 * Footer section validation schema
 * Fields: company_description, phone, email, address, social_media_links
 */
export const footerSchema = z.object({
  company_name: z
    .string()
    .min(1, 'Nome da empresa é obrigatório')
    .max(100, 'Nome da empresa deve ter no máximo 100 caracteres'),
  company_description: z
    .string()
    .min(1, 'Descrição da empresa é obrigatória')
    .max(500, 'Descrição da empresa deve ter no máximo 500 caracteres'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .regex(/^[\d\s\(\)\-\+]+$/, 'Telefone deve conter apenas números e caracteres de formatação'),
  email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail deve ser válido'),
  address: addressSchema,
  social_media_links: socialMediaLinksSchema.optional(),
  social_media_text: z.string().optional(),
  copyright_text: z.string().optional(),
});

/**
 * Type exports for TypeScript usage
 */
export type HeroContent = z.infer<typeof heroSchema>;
export type AboutContent = z.infer<typeof aboutSchema>;
export type CTAContent = z.infer<typeof ctaSchema>;
export type ContactFormContent = z.infer<typeof contactFormSchema>;
export type FooterContent = z.infer<typeof footerSchema>;
