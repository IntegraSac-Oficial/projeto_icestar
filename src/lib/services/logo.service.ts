/**
 * Logo Service
 * 
 * Handles logo file upload, validation, and management for the Ice Star admin panel.
 * Provides functions to upload, retrieve, and manage logo files.
 */

import { query, getConnection } from '@/lib/db/connection';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

/**
 * Logo record interface matching database schema
 */
export interface LogoRecord {
  id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: Date;
  is_active: boolean;
}

/**
 * File validation result interface
 */
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Allowed MIME types for logo uploads
 */
const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/svg+xml',
  'image/webp',
];

/**
 * Maximum file size in bytes (5MB)
 */
const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Upload directory path relative to public folder
 */
const UPLOAD_DIR = 'uploads/logos';

/**
 * Validate file type and size
 * 
 * @param file - The file to validate
 * @returns ValidationResult with valid flag and optional error message
 */
export function validateFile(file: File): ValidationResult {
  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Tipo de arquivo inválido. Apenas PNG, JPG, JPEG, SVG e WEBP são permitidos.',
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `Arquivo muito grande. O tamanho máximo é ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Sanitize filename by removing special characters and path traversal sequences
 * 
 * @param filename - The original filename
 * @returns Sanitized filename
 */
export function sanitizeFilename(filename: string): string {
  // Remove path traversal sequences
  let sanitized = filename.replace(/\.\.[/\\]/g, '');
  
  // Remove any remaining path separators
  sanitized = sanitized.replace(/[/\\]/g, '');
  
  // Replace spaces with hyphens
  sanitized = sanitized.replace(/\s+/g, '-');
  
  // Keep only alphanumeric, hyphens, underscores, and dots
  sanitized = sanitized.replace(/[^a-zA-Z0-9\-_.]/g, '');
  
  return sanitized;
}

/**
 * Generate unique filename with timestamp and random string
 * 
 * @param originalFilename - The original filename
 * @returns Unique filename with format: logo-{timestamp}-{random}.{ext}
 */
export function generateUniqueFilename(originalFilename: string): string {
  // Extract file extension
  const ext = path.extname(originalFilename);
  
  // Generate timestamp
  const timestamp = Date.now();
  
  // Generate random string (6 characters)
  const randomStr = Math.random().toString(36).substring(2, 8);
  
  // Combine into unique filename
  return `logo-${timestamp}-${randomStr}${ext}`;
}

/**
 * Upload logo file to filesystem and save metadata to database
 * 
 * @param file - The file to upload
 * @returns Promise resolving to LogoRecord
 * @throws Error if validation fails or upload fails
 */
export async function uploadLogo(file: File): Promise<LogoRecord> {
  // Validate file
  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // Sanitize and generate unique filename
  const sanitizedOriginal = sanitizeFilename(file.name);
  const uniqueFilename = generateUniqueFilename(sanitizedOriginal);
  
  // Prepare file path
  const publicDir = path.join(process.cwd(), 'public');
  const uploadPath = path.join(publicDir, UPLOAD_DIR);
  const filePath = path.join(uploadPath, uniqueFilename);
  // Use API route for serving files to work in both dev and production
  const relativeFilePath = `/api/uploads/logos/${uniqueFilename}`;

  try {
    // Ensure upload directory exists
    if (!existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true });
    }

    // Convert File to Buffer and write to filesystem
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    // Get database connection for transaction
    const connection = await getConnection();

    try {
      await connection.beginTransaction();

      // Set all existing logos to inactive
      await connection.query(
        'UPDATE logos SET is_active = FALSE WHERE is_active = TRUE'
      );

      // Insert new logo record
      const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO logos (file_name, file_path, file_size, mime_type, is_active)
         VALUES (?, ?, ?, ?, TRUE)`,
        [uniqueFilename, relativeFilePath, file.size, file.type]
      );

      // Commit transaction
      await connection.commit();

      // Return logo record
      return {
        id: result.insertId,
        file_name: uniqueFilename,
        file_path: relativeFilePath,
        file_size: file.size,
        mime_type: file.type,
        uploaded_at: new Date(),
        is_active: true,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw new Error('Erro ao fazer upload do logo. Por favor, tente novamente.');
  }
}

/**
 * Get the currently active logo
 * 
 * @returns Promise resolving to LogoRecord or null if no active logo
 * @throws Error if database query fails
 */
export async function getActiveLogo(): Promise<LogoRecord | null> {
  try {
    const [rows] = await query<RowDataPacket[]>(
      `SELECT id, file_name, file_path, file_size, mime_type, uploaded_at, is_active
       FROM logos
       WHERE is_active = TRUE
       LIMIT 1`
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const row = rows[0];
    return {
      id: row.id,
      file_name: row.file_name,
      file_path: row.file_path,
      file_size: row.file_size,
      mime_type: row.mime_type,
      uploaded_at: row.uploaded_at,
      is_active: row.is_active,
    };
  } catch (error) {
    console.error('Error retrieving active logo:', error);
    throw new Error('Erro ao buscar logo ativo.');
  }
}
