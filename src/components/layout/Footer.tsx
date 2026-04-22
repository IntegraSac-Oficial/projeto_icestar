'use client';

import React from 'react';
import { Phone, Mail, MapPin, Share2 } from 'lucide-react';
import { navigationItems } from '@/data/navigation';
import { scrollToSection } from '@/lib/utils';
import type { FooterContent } from '@/lib/utils/content-fetcher';

/**
 * Footer component with company info, quick links, contact details, and social media
 * Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.3, 11.6, 12.2
 */

interface FooterProps {
  content: FooterContent;
}

const Footer: React.FC<FooterProps> = ({ content }) => {
  /**
   * Handle quick link click
   * Scrolls to the target section
   */
  const handleQuickLinkClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  /**
   * Get current year for copyright notice
   */
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main footer content */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{content.company_name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {content.company_description}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Links Rápidos</h4>
            <nav aria-label="Links rápidos do rodapé">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleQuickLinkClick(item.id)}
                      className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark rounded px-1 py-0.5"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <a
                    href={`tel:${content.phone.replace(/\D/g, '')}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark rounded"
                  >
                    {content.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <a
                    href={`mailto:${content.email}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark rounded"
                  >
                    {content.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-gray-300 text-sm">
                    {content.address.street && <>{content.address.street}<br /></>}
                    {content.address.city && content.address.state && <>{content.address.city} - {content.address.state}<br /></>}
                    {content.address.zip && <>CEP {content.address.zip}</>}
                    {!content.address.street && !content.address.city && content.address.full}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Redes Sociais</h4>
            <ul className="space-y-2">
              {content.social_media_links?.facebook && (
                <li>
                  <a
                    href={content.social_media_links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark rounded inline-flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    Facebook
                  </a>
                </li>
              )}
              {content.social_media_links?.instagram && (
                <li>
                  <a
                    href={content.social_media_links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark rounded inline-flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    Instagram
                  </a>
                </li>
              )}
              {content.social_media_links?.linkedin && (
                <li>
                  <a
                    href={content.social_media_links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark rounded inline-flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              )}
              {content.social_media_links?.twitter && (
                <li>
                  <a
                    href={content.social_media_links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-dark rounded inline-flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    Twitter
                  </a>
                </li>
              )}
            </ul>
            {content.social_media_text && (
              <p className="text-gray-300 text-sm mt-4">
                {content.social_media_text}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-700">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} {content.copyright_text || `${content.company_name}. Todos os direitos reservados.`}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
