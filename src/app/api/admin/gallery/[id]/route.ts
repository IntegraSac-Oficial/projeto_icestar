/**
 * Gallery Image API Routes (Single Image)
 * Handles update and delete operations for individual gallery images
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
} from '@/lib/services/gallery.service';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * PUT /api/admin/gallery/[id]
 * Update a gallery image
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Check if image exists
    const existingImage = await getGalleryImageById(id);
    if (!existingImage) {
      return NextResponse.json(
        { error: 'Imagem não encontrada' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    const caption = formData.get('caption') as string | null;
    const displayOrder = formData.get('display_order') as string | null;

    let imagePath = existingImage.image_path;

    // If new image is provided, upload it
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Tipo de arquivo inválido. Use JPEG, PNG ou WebP' },
          { status: 400 }
        );
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: 'Arquivo muito grande. Tamanho máximo: 5MB' },
          { status: 400 }
        );
      }

      // Create upload directory if it doesn't exist
      const uploadDir = join(process.cwd(), 'public', 'uploads', 'gallery');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop();
      const filename = `gallery-${timestamp}-${randomString}.${extension}`;
      const filepath = join(uploadDir, filename);

      // Save new file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      // Delete old file
      try {
        const oldFilePath = join(process.cwd(), 'public', existingImage.image_path);
        if (existsSync(oldFilePath)) {
          await unlink(oldFilePath);
        }
      } catch (error) {
        console.error('Error deleting old file:', error);
        // Continue even if old file deletion fails
      }

      imagePath = `/uploads/gallery/${filename}`;
    }

    // Update database
    const updateData: any = {};
    if (imagePath !== existingImage.image_path) {
      updateData.image_path = imagePath;
    }
    if (caption !== null) {
      updateData.caption = caption;
    }
    if (displayOrder !== null) {
      updateData.display_order = parseInt(displayOrder);
    }

    const success = await updateGalleryImage(id, updateData);

    if (!success) {
      return NextResponse.json(
        { error: 'Erro ao atualizar imagem' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      image: {
        id,
        image_path: imagePath,
        caption: caption || existingImage.caption,
      },
    });
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar imagem' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/gallery/[id]
 * Delete a gallery image
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'ID inválido' },
        { status: 400 }
      );
    }

    // Get image info before deleting
    const image = await getGalleryImageById(id);
    if (!image) {
      return NextResponse.json(
        { error: 'Imagem não encontrada' },
        { status: 404 }
      );
    }

    // Delete from database
    const success = await deleteGalleryImage(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Erro ao deletar imagem' },
        { status: 500 }
      );
    }

    // Delete file from filesystem
    try {
      const filepath = join(process.cwd(), 'public', image.image_path);
      if (existsSync(filepath)) {
        await unlink(filepath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
      // Continue even if file deletion fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Erro ao deletar imagem' },
      { status: 500 }
    );
  }
}
