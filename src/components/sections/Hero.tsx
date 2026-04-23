'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import SectionContainer from '@/components/ui/SectionContainer';
import type { HeroContent } from '@/lib/utils/content-fetcher';

interface HeroProps {
  content: HeroContent;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  const handlePrimaryClick = () => {
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryClick = () => {
    // Scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-[80vh] flex items-center bg-white scroll-mt-28">
      <SectionContainer className="py-12 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content - Left Side */}
          <div className="space-y-6">
            {/* H1 Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
              {content.main_title}
            </h1>

            {/* H2 Subheadline */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">
              {content.subtitle}
            </h2>

            {/* Supporting Paragraph */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {content.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handlePrimaryClick}
              >
                {content.primary_button_text}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleSecondaryClick}
              >
                {content.secondary_button_text}
              </Button>
            </div>
          </div>

          {/* Hero Image - Right Side */}
          <div className="flex justify-center items-center order-first md:order-last">
            <div className="w-full max-w-lg">
              {/* Placeholder SVG for vehicle image */}
              <svg
                viewBox="0 0 600 400"
                className="w-full h-auto"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Veículo refrigerado Ice Star"
              >
                {/* Background */}
                <rect width="600" height="400" fill="#F5F5F5" />
                
                {/* Vehicle Body */}
                <rect x="100" y="150" width="400" height="180" fill="#FFFFFF" stroke="#C62828" strokeWidth="4" rx="8" />
                
                {/* Vehicle Cabin */}
                <path d="M 100 200 L 100 150 L 200 150 L 220 200 Z" fill="#FFFFFF" stroke="#C62828" strokeWidth="4" />
                
                {/* Windshield */}
                <path d="M 110 160 L 110 180 L 190 180 L 200 160 Z" fill="#E3F2FD" stroke="#C62828" strokeWidth="2" />
                
                {/* Wheels */}
                <circle cx="180" cy="330" r="35" fill="#111111" stroke="#C62828" strokeWidth="3" />
                <circle cx="180" cy="330" r="20" fill="#EAEAEA" />
                <circle cx="420" cy="330" r="35" fill="#111111" stroke="#C62828" strokeWidth="3" />
                <circle cx="420" cy="330" r="20" fill="#EAEAEA" />
                
                {/* Refrigeration Unit */}
                <rect x="450" y="170" width="40" height="60" fill="#C62828" rx="4" />
                <rect x="455" y="175" width="30" height="20" fill="#FFFFFF" opacity="0.3" />
                <line x1="460" y1="200" x2="480" y2="200" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="460" y1="210" x2="480" y2="210" stroke="#FFFFFF" strokeWidth="2" />
                <line x1="460" y1="220" x2="480" y2="220" stroke="#FFFFFF" strokeWidth="2" />
                
                {/* Door Lines */}
                <line x1="350" y1="150" x2="350" y2="330" stroke="#C62828" strokeWidth="2" strokeDasharray="5,5" />
                
                {/* Ice Star Logo Text */}
                <text x="250" y="250" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#C62828" textAnchor="middle">
                  Ice Star
                </text>
                
                {/* Snowflake Icon */}
                <g transform="translate(280, 270)">
                  <line x1="0" y1="-15" x2="0" y2="15" stroke="#C62828" strokeWidth="3" />
                  <line x1="-15" y1="0" x2="15" y2="0" stroke="#C62828" strokeWidth="3" />
                  <line x1="-10" y1="-10" x2="10" y2="10" stroke="#C62828" strokeWidth="3" />
                  <line x1="-10" y1="10" x2="10" y2="-10" stroke="#C62828" strokeWidth="3" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default Hero;
