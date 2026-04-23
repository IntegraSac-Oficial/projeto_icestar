'use client';

/**
 * Admin Dashboard Page
 * 
 * Displays overview of admin panel with:
 * - Content sections with last updated timestamps
 * - Current active logo information
 * - Contact form submissions count
 * - Recent content changes
 * - Quick edit links to each section
 * 
 * Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 22.4
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Image as ImageIcon,
  Mail,
  Clock,
  Edit,
  AlertCircle,
} from 'lucide-react';

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

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    // Fetch dashboard data
    if (status === 'authenticated') {
      fetchDashboardData();
    }
  }, [status, router]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/admin/dashboard');

      if (!response.ok) {
        throw new Error('Erro ao carregar dados do dashboard');
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getContentEditLink = (sectionKey: string) => {
    return `/admin/content/${sectionKey}`;
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-primary rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary mb-1">Erro ao carregar dashboard</h3>
            <p className="text-sm text-gray-700">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-3 text-sm text-primary hover:underline"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Bem-vindo ao painel administrativo da Ice Star
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Content Sections Card */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Seções de Conteúdo</p>
              <p className="text-2xl font-bold text-black">
                {dashboardData?.sections.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Card */}
        <Link href="/admin/gallery" className="bg-white rounded-lg shadow-card p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Galeria</p>
              <p className="text-2xl font-bold text-black">
                Gerenciar
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Fotos de aplicações
          </p>
        </Link>

        {/* Logo Card */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Logo Ativa</p>
              <p className="text-2xl font-bold text-black">
                {dashboardData?.logo ? '1' : '0'}
              </p>
            </div>
          </div>
          {dashboardData?.logo && (
            <p className="text-xs text-gray-500 truncate">
              {dashboardData.logo.file_name}
            </p>
          )}
        </div>

        {/* Contact Submissions Card */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Mensagens Recebidas</p>
              <p className="text-2xl font-bold text-black">
                {dashboardData?.contact_submissions_count || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-bold text-black mb-4">Seções de Conteúdo</h2>
        <div className="space-y-3">
          {dashboardData?.sections.map((section) => (
            <div
              key={section.key}
              className="flex items-center justify-between p-4 border border-neutral rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-black mb-1">{section.label}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    Atualizado em {formatDate(section.last_updated)}
                    {section.updated_by && ` por ${section.updated_by}`}
                  </span>
                </div>
              </div>
              <Link
                href={getContentEditLink(section.key)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Editar</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Changes */}
      {dashboardData?.recent_changes && dashboardData.recent_changes.length > 0 && (
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-bold text-black mb-4">Alterações Recentes</h2>
          <div className="space-y-3">
            {dashboardData.recent_changes.map((change) => (
              <div
                key={change.id}
                className="flex items-start gap-3 p-3 border border-neutral rounded-lg"
              >
                <Clock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-black">
                    <span className="font-semibold">{change.section_key}</span>
                    {' → '}
                    <span className="text-gray-600">{change.field_key}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(change.changed_at)} por {change.changed_by}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
