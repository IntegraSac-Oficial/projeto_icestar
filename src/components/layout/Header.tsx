'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { navigationItems } from '@/data/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { scrollToSection } from '@/lib/utils';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/Button';
import MobileMenu from '@/components/layout/MobileMenu';

/**
 * Header component with fixed positioning, navigation menu, and mobile menu toggle
 * Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 10.2, 11.2, 11.6
 */

interface HeaderProps {
  logoPath: string | null;
}

const Header: React.FC<HeaderProps> = ({ logoPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get the currently active section for highlighting
  const activeSection = useScrollSpy(navigationItems.map(item => item.id));

  /**
   * Toggle mobile menu visibility
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  /**
   * Handle desktop navigation item click
   */
  const handleDesktopNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  /**
   * Handle desktop CTA button click
   */
  const handleDesktopCTAClick = () => {
    scrollToSection('contact');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleDesktopNavClick('hero')}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Ice Star - Voltar ao início"
            >
              {logoPath ? (
                <Image
                  src={logoPath}
                  alt="Ice Star"
                  width={120}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              ) : (
                <span className="text-2xl font-bold text-primary hover:text-primary-dark transition-colors">
                  Ice Star
                </span>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navegação principal">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleDesktopNavClick(item.id)}
                className={cn(
                  'text-base font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1',
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-gray-700'
                )}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="md"
              onClick={handleDesktopCTAClick}
            >
              Solicitar Orçamento
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        activeSection={activeSection}
      />
    </header>
  );
};

export default Header;
