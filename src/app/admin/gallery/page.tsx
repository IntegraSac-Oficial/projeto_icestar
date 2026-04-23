'use client';

/**
 * Gallery Management Page
 * Admin interface for managing gallery images
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus, Edit2, Trash2, GripVertical, Save } from 'lucide-react';

interface GalleryImage {
  id: number;
  image_path: string;
  caption: string;
  display_order: number;
}

export default function GalleryManagementPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newCaption, setNewCaption] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const [editFile, setEditFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch images
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('Erro ao carregar imagens');
    } finally {
      setLoading(false);
    }
  };

  // Add new image
  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newImage || !newCaption.trim()) {
      alert('Por favor, selecione uma imagem e adicione uma legenda');
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('image', newImage);
      formData.append('caption', newCaption);

      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao adicionar imagem');
      }

      // Reset form
      setNewImage(null);
      setNewCaption('');
      setShowAddModal(false);

      // Refresh images
      await fetchImages();

      alert('Imagem adicionada com sucesso!');
    } catch (error: any) {
      console.error('Error adding image:', error);
      alert(error.message || 'Erro ao adicionar imagem');
    } finally {
      setSaving(false);
    }
  };

  // Edit image
  const handleEditImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingImage || !editCaption.trim()) {
      alert('Por favor, adicione uma legenda');
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();
      if (editFile) {
        formData.append('image', editFile);
      }
      formData.append('caption', editCaption);

      const response = await fetch(`/api/admin/gallery/${editingImage.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar imagem');
      }

      // Reset form
      setEditingImage(null);
      setEditCaption('');
      setEditFile(null);
      setShowEditModal(false);

      // Refresh images
      await fetchImages();

      alert('Imagem atualizada com sucesso!');
    } catch (error: any) {
      console.error('Error updating image:', error);
      alert(error.message || 'Erro ao atualizar imagem');
    } finally {
      setSaving(false);
    }
  };

  // Delete image
  const handleDeleteImage = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta imagem?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao deletar imagem');
      }

      // Refresh images
      await fetchImages();

      alert('Imagem deletada com sucesso!');
    } catch (error: any) {
      console.error('Error deleting image:', error);
      alert(error.message || 'Erro ao deletar imagem');
    }
  };

  // Open edit modal
  const openEditModal = (image: GalleryImage) => {
    setEditingImage(image);
    setEditCaption(image.caption);
    setEditFile(null);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="p-2 hover:bg-neutral-light rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-black">Galeria de Aplicações</h1>
            <p className="text-gray-600 mt-1">
              Gerencie as fotos da galeria de aplicações
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Imagem</span>
        </button>
      </div>

      {/* Images Grid */}
      {images.length === 0 ? (
        <div className="bg-white rounded-lg shadow-card p-12 text-center">
          <p className="text-gray-600 mb-4">Nenhuma imagem na galeria</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Adicionar Primeira Imagem</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-square bg-gray-200">
                <Image
                  src={image.image_path}
                  alt={image.caption}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Caption and Actions */}
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                  {image.caption}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(image)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Editar</span>
                  </button>

                  <button
                    onClick={() => handleDeleteImage(image.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Deletar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Adicionar Imagem</h2>

            <form onSubmit={handleAddImage} className="space-y-4">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem *
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceitos: JPEG, PNG, WebP (máx. 5MB)
                </p>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legenda *
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Ex: Isolamento térmico em Fiat Fiorino"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewImage(null);
                    setNewCaption('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Editar Imagem</h2>

            <form onSubmit={handleEditImage} className="space-y-4">
              {/* Current Image Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem Atual
                </label>
                <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={editingImage.image_path}
                    alt={editingImage.caption}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* New Image Upload (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nova Imagem (opcional)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Deixe em branco para manter a imagem atual
                </p>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legenda *
                </label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  placeholder="Ex: Isolamento térmico em Fiat Fiorino"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingImage(null);
                    setEditCaption('');
                    setEditFile(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={saving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  disabled={saving}
                >
                  {saving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
