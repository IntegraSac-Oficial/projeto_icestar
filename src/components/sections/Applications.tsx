'use client';

import React from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { applications } from '@/data/applications';
import { Truck } from 'lucide-react';

/**
 * Applications Section Component
 * Displays supported vehicle types
 * Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */
const Applications: React.FC = () => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="applications" className="scroll-mt-20">
      <SectionContainer background="light-gray" className="py-12 md:py-16 lg:py-24">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Aplicações
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Trabalhamos com diversos modelos de veículos comerciais para atender 
            suas necessidades de transporte refrigerado
          </p>
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {applications.map((application) => (
            <Card key={application.id} hoverable className="p-6 flex flex-col">
              <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                {/* Vehicle Icon */}
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/10">
                  <Truck className="w-10 h-10 text-primary" />
                </div>

                {/* Vehicle Name */}
                <h3 className="text-xl md:text-2xl font-semibold text-black">
                  {application.name}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600 leading-relaxed flex-grow">
                  {application.description}
                </p>

                {/* CTA Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleContactClick}
                  fullWidth
                >
                  Saiba Mais
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default Applications;
