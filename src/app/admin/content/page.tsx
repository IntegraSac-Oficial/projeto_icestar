'use client';

/**
 * Content Management Index Page
 * 
 * Lists all available content sections for editing.
 * Provides navigation to individual section editors.
 */

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Edit } from 'lucide-react';

interface ContentSection {
  key: string;
  label: string;
  description: string;
  available: boolean;
}

const contentSections: ContentSection[] = [
  {
    key: 'hero',
    label: 'Hero / Banner Principal',
    description: 'Título, subtítulo, descrição e botões da seção principal',
    available: true,
  },
  {
    key: 'about',
    label: 'Sobre a Empresa',
    description: 'Descrição da empresa e benefícios/diferenciais',
    available: true,
  },
  {
    key: 'services',
    label: 'Serviços',
    description: 'Lista de serviços oferecidos pela empresa',
    available: false,
  },
  {
    key: 'differentials',
    label: 'Diferenciais',
    description: 'Diferenciais competitivos da empresa',
    available: false,
  },
  {
    key: 'cta',
    label: 'Chamada para Ação (CTA)',
    description: 'Título e botão da seção de chamada para ação',
    available: true,
  },
  {
    key: 'contact_form',
    label: 'Formulário de Contato',
    description: 'Textos e labels do formulário de contato',
    available: true,
  },
  {
    key: 'footer',
    label: 'Rodapé',
    description: 'Informações de contato, endereço e redes sociais',
    available: true,
  },
];

export default function ContentIndexPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard"
          className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Gerenciar Conteúdo do Site</h1>
          <p className="text-gray-600 mt-1">
            Selecione uma seção para editar seu conteúdo
          </p>
        </div>
      </div>

      {/* Content Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contentSections.map((section) => (
          <div
            key={section.key}
            className={`bg-white rounded-lg shadow-card p-6 ${
              section.available
                ? 'hover:shadow-lg transition-shadow'
                : 'opacity-60'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-black mb-1">
                  {section.label}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {section.description}
                </p>
                {section.available ? (
                  <Link
                    href={`/admin/content/${section.key}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </Link>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed">
                    <span>Em breve</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Informação</h3>
        <p className="text-sm text-blue-800">
          Os editores marcados como "Em breve" serão implementados nas próximas atualizações.
          Por enquanto, você pode editar as seções Hero, Sobre e CTA através do painel.
        </p>
      </div>
    </div>
  );
}
