/**
 * Content Service
 * 
 * Handles content section management for the Ice Star admin panel.
 * Provides functions to retrieve, update, and track content changes.
 */

import { query, getConnection } from '@/lib/db/connection';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

/**
 * Content section interface matching database schema
 */
export interface ContentSection {
  section_key: string;
  section_data: Record<string, any>;
  updated_at: Date;
  updated_by: string | null;
}

/**
 * Content history interface matching database schema
 */
export interface ContentHistory {
  id: number;
  section_key: string;
  field_key: string;
  old_value: string | null;
  new_value: string | null;
  changed_by: string;
  changed_at: Date;
}

/**
 * Get a content section by section key
 * 
 * @param sectionKey - The unique identifier for the content section
 * @returns Promise resolving to ContentSection or null if not found
 * @throws Error if database query fails
 */
export async function getSection(
  sectionKey: string
): Promise<ContentSection | null> {
  try {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT section_key, section_data, updated_at, updated_by FROM content_sections WHERE section_key = ?',
      [sectionKey]
    );

    if (!rows || rows.length === 0) {
      return null;
    }

    const row = rows[0];
    
    return {
      section_key: row.section_key,
      section_data: typeof row.section_data === 'string' 
        ? JSON.parse(row.section_data) 
        : row.section_data,
      updated_at: row.updated_at,
      updated_by: row.updated_by,
    };
  } catch (error) {
    console.error(`Error retrieving section ${sectionKey}:`, error);
    throw new Error(`Failed to retrieve content section: ${sectionKey}`);
  }
}

/**
 * Get all content sections
 * 
 * @returns Promise resolving to array of ContentSection objects
 * @throws Error if database query fails
 */
export async function getAllSections(): Promise<ContentSection[]> {
  try {
    const [rows] = await query<RowDataPacket[]>(
      'SELECT section_key, section_data, updated_at, updated_by FROM content_sections ORDER BY section_key'
    );

    return rows.map((row) => ({
      section_key: row.section_key,
      section_data: typeof row.section_data === 'string' 
        ? JSON.parse(row.section_data) 
        : row.section_data,
      updated_at: row.updated_at,
      updated_by: row.updated_by,
    }));
  } catch (error) {
    console.error('Error retrieving all sections:', error);
    throw new Error('Failed to retrieve content sections');
  }
}

/**
 * Update a content section with new data and track history
 * 
 * @param sectionKey - The unique identifier for the content section
 * @param data - The new content data as a JSON object
 * @param updatedBy - Email of the admin user making the change
 * @returns Promise that resolves when update is complete
 * @throws Error if database operation fails
 */
export async function updateSection(
  sectionKey: string,
  data: Record<string, any>,
  updatedBy: string
): Promise<void> {
  const connection = await getConnection();
  
  // Set connection charset explicitly for this operation
  await connection.query('SET NAMES utf8mb4');
  await connection.query('SET CHARACTER SET utf8mb4');
  
  try {
    // Start transaction
    await connection.beginTransaction();

    // Get current content for history tracking
    const [currentRows] = await connection.query<RowDataPacket[]>(
      'SELECT section_data FROM content_sections WHERE section_key = ?',
      [sectionKey]
    );

    if (currentRows && currentRows.length > 0) {
      const currentData = typeof currentRows[0].section_data === 'string'
        ? JSON.parse(currentRows[0].section_data)
        : currentRows[0].section_data;

      // Record changes to content_history for each modified field
      for (const [fieldKey, newValue] of Object.entries(data)) {
        const oldValue = currentData[fieldKey];
        
        // Only record if value actually changed
        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
          await connection.query(
            `INSERT INTO content_history (section_key, field_key, old_value, new_value, changed_by)
             VALUES (?, ?, ?, ?, ?)`,
            [
              sectionKey,
              fieldKey,
              oldValue !== undefined ? JSON.stringify(oldValue) : null,
              JSON.stringify(newValue),
              updatedBy,
            ]
          );
        }
      }
    }

    // Update the content section
    const [result] = await connection.query<ResultSetHeader>(
      `UPDATE content_sections 
       SET section_data = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
       WHERE section_key = ?`,
      [JSON.stringify(data), updatedBy, sectionKey]
    );

    // If no rows were updated, the section doesn't exist - insert it
    if (result.affectedRows === 0) {
      await connection.query<ResultSetHeader>(
        `INSERT INTO content_sections (section_key, section_data, updated_by)
         VALUES (?, ?, ?)`,
        [sectionKey, JSON.stringify(data), updatedBy]
      );
    }

    // Commit transaction
    await connection.commit();
    
    // Clear cache for this section after successful update
    try {
      const { clearCacheEntry } = await import('@/lib/utils/content-fetcher');
      clearCacheEntry(sectionKey);
    } catch (cacheError) {
      // Log but don't fail if cache clearing fails
      console.warn(`Failed to clear cache for ${sectionKey}:`, cacheError);
    }
  } catch (error) {
    // Rollback on error
    await connection.rollback();
    console.error(`Error updating section ${sectionKey}:`, error);
    throw new Error(`Failed to update content section: ${sectionKey}`);
  } finally {
    // Release connection back to pool
    connection.release();
  }
}

/**
 * Get content change history for a section
 * 
 * @param sectionKey - The unique identifier for the content section
 * @param limit - Maximum number of history records to return (default: 50)
 * @returns Promise resolving to array of ContentHistory objects
 * @throws Error if database query fails
 */
export async function getSectionHistory(
  sectionKey: string,
  limit: number = 50
): Promise<ContentHistory[]> {
  try {
    const [rows] = await query<RowDataPacket[]>(
      `SELECT id, section_key, field_key, old_value, new_value, changed_by, changed_at
       FROM content_history
       WHERE section_key = ?
       ORDER BY changed_at DESC
       LIMIT ?`,
      [sectionKey, limit]
    );

    return rows.map((row) => ({
      id: row.id,
      section_key: row.section_key,
      field_key: row.field_key,
      old_value: row.old_value,
      new_value: row.new_value,
      changed_by: row.changed_by,
      changed_at: row.changed_at,
    }));
  } catch (error) {
    console.error(`Error retrieving history for section ${sectionKey}:`, error);
    throw new Error(`Failed to retrieve content history: ${sectionKey}`);
  }
}
