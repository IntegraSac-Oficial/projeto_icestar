/**
 * Content Section API Endpoints
 * 
 * GET /api/admin/content/[section] - Retrieve content for a specific section
 * PUT /api/admin/content/[section] - Update content for a specific section
 * 
 * All endpoints require authentication.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getSection, updateSection } from '@/lib/services/content.service';
import { clearContentCache } from '@/lib/utils/content-fetcher';
import {
  heroSchema,
  aboutSchema,
  ctaSchema,
  contactFormSchema,
  footerSchema,
} from '@/lib/validations/content-schemas';
import { z } from 'zod';

/**
 * Map of section keys to their validation schemas
 */
const sectionSchemas: Record<string, z.ZodSchema> = {
  hero: heroSchema,
  about: aboutSchema,
  cta: ctaSchema,
  contact_form: contactFormSchema,
  footer: footerSchema,
};

/**
 * GET /api/admin/content/[section]
 * 
 * Retrieve content for a specific section
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing section key
 * @returns JSON response with section data or error
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    // Verify authentication
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { section } = await params;

    // Retrieve section content
    const sectionData = await getSection(section);

    if (!sectionData) {
      return NextResponse.json(
        { error: 'Seção não encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(sectionData, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/admin/content/[section]:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar conteúdo da seção' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/content/[section]
 * 
 * Update content for a specific section
 * 
 * @param request - Next.js request object
 * @param params - Route parameters containing section key
 * @returns JSON response with success message or error
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    // Verify authentication
    const session = await auth();
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { section } = await params;

    // Parse request body
    let body: Record<string, any>;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Corpo da requisição inválido' },
        { status: 400 }
      );
    }

    // Validate request body using appropriate schema
    const schema = sectionSchemas[section];
    
    if (!schema) {
      return NextResponse.json(
        { error: 'Seção não suportada' },
        { status: 400 }
      );
    }

    let validatedData: Record<string, any>;
    try {
      validatedData = schema.parse(body) as Record<string, any>;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodError = error as any;
        return NextResponse.json(
          {
            error: 'Dados inválidos',
            details: zodError.errors.map((err: any) => ({
              field: err.path.join('.'),
              message: err.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // Update section content
    await updateSection(section, validatedData, session.user.email);

    // Clear cache to reflect changes immediately
    clearContentCache();

    return NextResponse.json(
      {
        success: true,
        message: 'Conteúdo atualizado com sucesso',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in PUT /api/admin/content/[section]:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar conteúdo da seção' },
      { status: 500 }
    );
  }
}
