'use client';

/**
 * Settings Page (Placeholder)
 * 
 * This page is referenced in the admin navigation but not yet implemented.
 * It's a placeholder to prevent 404 errors.
 */

import React from 'react';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/dashboard"
          className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Configurações</h1>
          <p className="text-gray-600 mt-1">
            Gerencie as configurações do painel administrativo
          </p>
        </div>
      </div>

      {/* Placeholder Content */}
      <div className="bg-white rounded-lg shadow-card p-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-blue-100 rounded-full mb-4">
            <SettingsIcon className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            Página em Desenvolvimento
          </h2>
          <p className="text-gray-600 max-w-md">
            A página de configurações está em desenvolvimento e será disponibilizada em breve.
            Por enquanto, você pode gerenciar o conteúdo do site e a logo através das outras seções do painel.
          </p>
          <Link
            href="/admin/dashboard"
            className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>

      {/* Future Features */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h3 className="text-lg font-bold text-black mb-4">Recursos Futuros</h3>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Alterar senha do administrador</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Gerenciar usuários administrativos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Configurações de e-mail e notificações</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Backup e restauração de conteúdo</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>Logs de auditoria e atividades</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
