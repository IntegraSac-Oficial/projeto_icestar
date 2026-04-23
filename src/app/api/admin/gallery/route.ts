/**
 * Gallery API Routes
 * Handles CRUD operations for gallery images
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import {
  getAllGalleryImages,
  createGalleryImage,
  reorderGalleryImages,
} from '@/lib/services/gallery.service';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * GET /api/admin/gallery
 * Get all gallery images
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const images = await getAllGalleryImages();

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar imagens' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/gallery
 * Create a new gallery image
 */
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('image') as File;
    const caption = formData.get('caption') as string;
    const displayOrder = formData.get('display_order') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'Imagem é obrigatória' },
        { status: 400 }
      );
    }

    if (!caption) {
      return NextResponse.json(
        { error: 'Legenda é obrigatória' },
        { status: 400 }
      );
    }

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

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Save to database
    const imagePath = `/uploads/gallery/${filename}`;
    const imageId = await createGalleryImage({
      image_path: imagePath,
      caption,
      display_order: displayOrder ? parseInt(displayOrder) : undefined,
    });

    return NextResponse.json({
      success: true,
      image: {
        id: imageId,
        image_path: imagePath,
        caption,
      },
    });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Erro ao criar imagem' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/gallery
 * Reorder gallery images
 */
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { imageIds } = await request.json();

    if (!Array.isArray(imageIds)) {
      return NextResponse.json(
        { error: 'imageIds deve ser um array' },
        { status: 400 }
      );
    }

    const success = await reorderGalleryImages(imageIds);

    if (!success) {
      return NextResponse.json(
        { error: 'Erro ao reordenar imagens' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error reordering gallery images:', error);
    return NextResponse.json(
      { error: 'Erro ao reordenar imagens' },
      { status: 500 }
    );
  }
}
