'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { NavigationItem } from '@/types';
import { scrollToSection, cn } from '@/lib/utils';
import Button from '@/components/ui/Button';

/**
 * MobileMenu component with slide-in animation from right side
 * Validates: Requirements 1.6, 1.7, 10.2, 11.2
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  activeSection?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  activeSection,
}) => {
  /**
   * Handle navigation item click
   * Scrolls to the target section and closes the menu
   */
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    onClose();
  };

  /**
   * Handle CTA button click
   * Scrolls to contact section and closes the menu
   */
  const handleCTAClick = () => {
    scrollToSection('contact');
    onClose();
  };

  /**
   * Handle backdrop click
   * Closes the menu when clicking outside
   */
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  /**
   * Handle escape key press
   * Closes the menu when pressing Escape key
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Don't render anything if menu is not open
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Slide-in menu panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação mobile"
      >
        {/* Menu header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            aria-label="Fechar menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex flex-col p-4 space-y-2" aria-label="Navegação mobile">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                'w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                activeSection === item.id
                  ? 'text-primary bg-red-50'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              )}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}

          {/* CTA Button */}
          <div className="pt-4">
            <Button
              variant="primary"
              size="md"
              onClick={handleCTAClick}
              fullWidth
            >
              Solicitar Orçamento
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
