/**
 * Logo Management API Endpoint
 * 
 * POST /api/admin/logo - Upload a new logo
 * GET /api/admin/logo - Retrieve the active logo
 * 
 * Requires authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadLogo, getActiveLogo } from '@/lib/services/logo.service';

/**
 * POST /api/admin/logo
 * 
 * Upload a new logo file
 * 
 * @param request - Next.js request object with multipart form data
 * @returns JSON response with logo record or error
 */
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      );
    }

    // Upload logo using logo service
    const logoRecord = await uploadLogo(file);

    return NextResponse.json(logoRecord, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/admin/logo:', error);
    
    // Check if error is a validation error (from logo service)
    if (error instanceof Error && error.message.includes('inválido')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('muito grande')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao fazer upload do logo' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/logo
 * 
 * Retrieve the currently active logo
 * 
 * @param request - Next.js request object
 * @returns JSON response with logo record or null
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Retrieve active logo
    const logo = await getActiveLogo();

    return NextResponse.json(logo, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/logo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar logo ativo' },
      { status: 500 }
    );
  }
}
