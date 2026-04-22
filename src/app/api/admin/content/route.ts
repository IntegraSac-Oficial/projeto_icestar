/**
 * Content Sections List API Endpoint
 * 
 * GET /api/admin/content - Retrieve all content sections
 * 
 * Requires authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getAllSections } from '@/lib/services/content.service';

/**
 * GET /api/admin/content
 * 
 * Retrieve all content sections
 * 
 * @param request - Next.js request object
 * @returns JSON response with array of all sections or error
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

    // Retrieve all sections
    const sections = await getAllSections();

    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/content:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar seções de conteúdo' },
      { status: 500 }
    );
  }
}
