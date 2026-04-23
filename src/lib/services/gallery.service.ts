/**
 * Gallery Service
 * Handles CRUD operations for gallery images
 */

import { query } from '@/lib/db/connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface GalleryImage {
  id: number;
  image_path: string;
  caption: string;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateGalleryImageData {
  image_path: string;
  caption: string;
  display_order?: number;
}

export interface UpdateGalleryImageData {
  image_path?: string;
  caption?: string;
  display_order?: number;
}

/**
 * Get all gallery images ordered by display_order
 */
export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const sql = `
    SELECT id, image_path, caption, display_order, created_at, updated_at
    FROM gallery_images
    ORDER BY display_order ASC, created_at DESC
  `;
  
  const [rows] = await query<RowDataPacket[]>(sql);
  
  // Convert to plain objects to avoid serialization issues
  return rows.map(row => ({
    id: row.id,
    image_path: row.image_path,
    caption: row.caption,
    display_order: row.display_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}

/**
 * Get a single gallery image by ID
 */
export async function getGalleryImageById(id: number): Promise<GalleryImage | null> {
  const sql = `
    SELECT id, image_path, caption, display_order, created_at, updated_at
    FROM gallery_images
    WHERE id = ?
  `;
  
  const [rows] = await query<RowDataPacket[]>(sql, [id]);
  
  if (rows.length === 0) {
    return null;
  }
  
  const row = rows[0];
  return {
    id: row.id,
    image_path: row.image_path,
    caption: row.caption,
    display_order: row.display_order,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * Create a new gallery image
 */
export async function createGalleryImage(data: CreateGalleryImageData): Promise<number> {
  // Get the next display order if not provided
  let displayOrder = data.display_order;
  
  if (displayOrder === undefined) {
    const maxOrderSql = 'SELECT COALESCE(MAX(display_order), 0) + 1 as next_order FROM gallery_images';
    const [maxOrderRows] = await query<RowDataPacket[]>(maxOrderSql);
    displayOrder = maxOrderRows[0].next_order;
  }
  
  const sql = `
    INSERT INTO gallery_images (image_path, caption, display_order)
    VALUES (?, ?, ?)
  `;
  
  const [result] = await query<ResultSetHeader>(sql, [
    data.image_path,
    data.caption,
    displayOrder,
  ]);
  
  return result.insertId;
}

/**
 * Update a gallery image
 */
export async function updateGalleryImage(
  id: number,
  data: UpdateGalleryImageData
): Promise<boolean> {
  const updates: string[] = [];
  const values: any[] = [];
  
  if (data.image_path !== undefined) {
    updates.push('image_path = ?');
    values.push(data.image_path);
  }
  
  if (data.caption !== undefined) {
    updates.push('caption = ?');
    values.push(data.caption);
  }
  
  if (data.display_order !== undefined) {
    updates.push('display_order = ?');
    values.push(data.display_order);
  }
  
  if (updates.length === 0) {
    return false;
  }
  
  values.push(id);
  
  const sql = `
    UPDATE gallery_images
    SET ${updates.join(', ')}
    WHERE id = ?
  `;
  
  const result = await query<ResultSetHeader>(sql, values);
  return result.affectedRows > 0;
}

/**
 * Delete a gallery image
 */
export async function deleteGalleryImage(id: number): Promise<boolean> {
  const sql = 'DELETE FROM gallery_images WHERE id = ?';
  const result = await query<ResultSetHeader>(sql, [id]);
  return result.affectedRows > 0;
}

/**
 * Reorder gallery images
 */
export async function reorderGalleryImages(imageIds: number[]): Promise<boolean> {
  try {
    // Update display_order for each image
    for (let i = 0; i < imageIds.length; i++) {
      const sql = 'UPDATE gallery_images SET display_order = ? WHERE id = ?';
      await query(sql, [i + 1, imageIds[i]]);
    }
    return true;
  } catch (error) {
    console.error('Error reordering gallery images:', error);
    return false;
  }
}
