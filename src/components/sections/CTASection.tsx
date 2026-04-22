'use client';

import React from 'react';
import Button from '@/components/ui/Button';

/**
 * CTA Section Component
 * Intermediate call-to-action before contact form
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */

interface CTASectionProps {
  headline: string;
  buttonText: string;
  buttonHref: string;
}

const CTASection: React.FC<CTASectionProps> = ({ headline, buttonText, buttonHref }) => {
  const handleClick = () => {
    const targetElement = document.getElementById(buttonHref.replace('#', ''));
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-primary py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
          {headline}
        </h2>

        {/* CTA Button */}
        <Button
          variant="secondary"
          size="lg"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
