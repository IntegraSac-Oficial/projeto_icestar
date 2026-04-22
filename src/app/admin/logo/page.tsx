'use client';

/**
 * Logo Management Page
 * 
 * Allows uploading and managing the site logo.
 * Features:
 * - File upload with drag-and-drop support
 * - File preview before upload
 * - Client-side validation (type, size)
 * - Display current active logo
 * - Upload progress indicator
 * 
 * Requirements: 13.1, 13.2, 13.5, 13.6, 13.10, 18.3, 18.4
 */

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Image as ImageIcon, AlertCircle, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

interface LogoData {
  id: number;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
  is_active: boolean;
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function LogoManagementPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentLogo, setCurrentLogo] = useState<LogoData | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    if (status === 'authenticated') {
      fetchCurrentLogo();
    }
  }, [status, router]);

  useEffect(() => {
    // Cleanup preview URL
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fetchCurrentLogo = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/admin/logo');

      if (!response.ok) {
        if (response.status === 404) {
          // No logo uploaded yet
          setCurrentLogo(null);
          return;
        }
        throw new Error('Erro ao carregar logo');
      }

      const data = await response.json();
      setCurrentLogo(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Tipo de arquivo inválido. Use PNG, JPG, JPEG, SVG ou WEBP.';
    }

    // Check file size
    if (file.size > MAX_SIZE) {
      return 'Arquivo muito grande. O tamanho máximo é 5MB.';
    }

    return null;
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setPreviewFile(file);

    // Create preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!previewFile) {
      setError('Selecione um arquivo para fazer upload');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      setSuccessMessage(null);

      const formData = new FormData();
      formData.append('file', previewFile);

      const response = await fetch('/api/admin/logo', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao fazer upload');
      }

      const data = await response.json();
      setCurrentLogo(data);
      setSuccessMessage('Logo enviada com sucesso!');
      
      // Clear preview
      setPreviewFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelPreview = () => {
    setPreviewFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-black">Gerenciar Logo</h1>
          <p className="text-gray-600 mt-1">
            Faça upload da logo do site (PNG, JPG, SVG ou WEBP - máx. 5MB)
          </p>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-500 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-primary rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-gray-700">{error}</p>
          </div>
        </div>
      )}

      {/* Current Logo */}
      {currentLogo && (
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-bold text-black mb-4">Logo Atual</h2>
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-48 h-48 bg-neutral-light rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src={currentLogo.file_path}
                alt="Logo atual"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-sm font-semibold text-gray-700">Nome do Arquivo:</p>
                <p className="text-sm text-gray-600">{currentLogo.file_name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Tamanho:</p>
                <p className="text-sm text-gray-600">{formatFileSize(currentLogo.file_size)}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Tipo:</p>
                <p className="text-sm text-gray-600">{currentLogo.mime_type}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Enviado em:</p>
                <p className="text-sm text-gray-600">{formatDate(currentLogo.uploaded_at)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-card p-6">
        <h2 className="text-xl font-bold text-black mb-4">
          {currentLogo ? 'Substituir Logo' : 'Enviar Nova Logo'}
        </h2>

        {/* Preview */}
        {previewFile && previewUrl && (
          <div className="mb-6 p-4 border-2 border-primary rounded-lg bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-black">Preview</h3>
              <button
                onClick={handleCancelPreview}
                className="p-1 hover:bg-white rounded transition-colors"
                disabled={isUploading}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-neutral">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-black">{previewFile.name}</p>
                <p className="text-sm text-gray-600">{formatFileSize(previewFile.size)}</p>
                <p className="text-sm text-gray-600">{previewFile.type}</p>
              </div>
            </div>
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="w-5 h-5" />
              <span>{isUploading ? 'Enviando...' : 'Confirmar Upload'}</span>
            </button>
          </div>
        )}

        {/* Drag and Drop Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-blue-50'
              : 'border-neutral hover:border-primary hover:bg-neutral-light'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-full">
              <ImageIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-semibold text-black mb-1">
                Arraste e solte a logo aqui
              </p>
              <p className="text-sm text-gray-600 mb-4">
                ou clique no botão abaixo para selecionar
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                onChange={handleFileInputChange}
                className="hidden"
                disabled={isUploading}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selecionar Arquivo
              </button>
            </div>
            <div className="text-xs text-gray-500">
              <p>Formatos aceitos: PNG, JPG, JPEG, SVG, WEBP</p>
              <p>Tamanho máximo: 5MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
