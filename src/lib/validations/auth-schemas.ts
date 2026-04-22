/**
 * Authentication Validation Schemas
 * 
 * Zod schemas for authentication forms in the Ice Star admin panel.
 * Provides validation for login credentials with Portuguese error messages.
 */

import { z } from 'zod';

/**
 * Login form validation schema
 * 
 * Validates:
 * - Email: required, valid email format
 * - Password: required, minimum 8 characters
 * 
 * Error messages in Portuguese as per requirements 18.1, 18.2, 18.3, 18.4
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

/**
 * Inferred TypeScript type from the login schema
 * Ensures type safety between validation and form handling
 */
export type LoginFormData = z.infer<typeof loginSchema>;
