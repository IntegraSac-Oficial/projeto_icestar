/**
 * Dashboard API Endpoint
 * 
 * GET /api/admin/dashboard
 * Returns aggregated dashboard data including:
 * - All content sections with last updated timestamps
 * - Current active logo information
 * - Contact form submissions count
 * - Recent content changes (last 10)
 * 
 * Requirements: 20.2, 20.3, 20.4, 20.5
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { query } from '@/lib/db/connection';
import type { RowDataPacket } from 'mysql2/promise';

/**
 * Dashboard data interface
 */
interface DashboardData {
  sections: Array<{
    key: string;
    label: string;
    last_updated: string;
    updated_by: string | null;
  }>;
  logo: {
    file_name: string;
    file_path: string;
    uploaded_at: string;
  } | null;
  contact_submissions_count: number;
  recent_changes: Array<{
    id: number;
    section_key: string;
    field_key: string;
    changed_by: string;
    changed_at: string;
  }>;
}

/**
 * Section label mapping for user-friendly display
 */
const sectionLabels: Record<string, string> = {
  hero: 'Hero / Banner Principal',
  about: 'Sobre a Empresa',
  cta: 'Chamada para Ação (CTA)',
  contact_form: 'Formulário de Contato',
  footer: 'Rodapé',
};

/**
 * GET /api/admin/dashboard
 * Retrieve aggregated dashboard data
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Fetch all content sections with timestamps
    const [sectionsRows] = await query<RowDataPacket[]>(
      `SELECT section_key, updated_at, updated_by
       FROM content_sections
       ORDER BY section_key`
    );

    const sections = sectionsRows.map((row) => ({
      key: row.section_key,
      label: sectionLabels[row.section_key] || row.section_key,
      last_updated: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
      updated_by: row.updated_by || null,
    }));

    // Fetch active logo information
    const [logoRows] = await query<RowDataPacket[]>(
      `SELECT file_name, file_path, uploaded_at
       FROM logos
       WHERE is_active = TRUE
       LIMIT 1`
    );

    const logo = logoRows.length > 0
      ? {
          file_name: logoRows[0].file_name,
          file_path: logoRows[0].file_path,
          uploaded_at: new Date(logoRows[0].uploaded_at).toISOString(),
        }
      : null;

    // Fetch contact submissions count
    const [countRows] = await query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM contact_submissions`
    );

    const contact_submissions_count = countRows[0]?.count || 0;

    // Fetch recent content changes (last 10)
    const [historyRows] = await query<RowDataPacket[]>(
      `SELECT id, section_key, field_key, changed_by, changed_at
       FROM content_history
       ORDER BY changed_at DESC
       LIMIT 10`
    );

    const recent_changes = historyRows.map((row) => ({
      id: row.id,
      section_key: row.section_key,
      field_key: row.field_key,
      changed_by: row.changed_by,
      changed_at: new Date(row.changed_at).toISOString(),
    }));

    // Construct dashboard data
    const dashboardData: DashboardData = {
      sections,
      logo,
      contact_submissions_count,
      recent_changes,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      {
        error: 'Erro ao carregar dados do dashboard',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
