/**
 * Cache Management API Endpoint
 * 
 * DELETE /api/admin/cache - Clear content cache
 * 
 * Requires authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { clearContentCache } from '@/lib/utils/content-fetcher';

/**
 * DELETE /api/admin/cache
 * 
 * Clear the in-memory content cache
 * 
 * @param request - Next.js request object
 * @returns JSON response with success message
 */
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Clear cache
    clearContentCache();

    return NextResponse.json(
      {
        success: true,
        message: 'Cache limpo com sucesso',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/admin/cache:', error);
    return NextResponse.json(
      { error: 'Erro ao limpar cache' },
      { status: 500 }
    );
  }
}
