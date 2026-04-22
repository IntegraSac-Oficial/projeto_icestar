import { z } from 'zod';

/**
 * Contact form validation schema using Zod
 * Validates: Requirements 8.6, 8.7, 8.8, 11.1
 */
export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .trim(),
  
  phone: z
    .string()
    .regex(
      /^[\d\s\-\(\)\+]+$/,
      'Telefone inválido. Use apenas números, espaços, parênteses, hífens ou +'
    )
    .min(1, 'Telefone é obrigatório'),
  
  email: z
    .string()
    .email('E-mail inválido')
    .min(1, 'E-mail é obrigatório'),
  
  vehicleType: z
    .string()
    .min(1, 'Selecione um tipo de veículo'),
  
  message: z
    .string()
    .max(500, 'Mensagem muito longa (máximo 500 caracteres)')
    .optional()
    .or(z.literal('')),
});

/**
 * Inferred TypeScript type from the Zod schema
 * This ensures type safety between validation and form handling
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;
