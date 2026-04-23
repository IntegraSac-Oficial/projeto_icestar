import React from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import Card from '@/components/ui/Card';
import { differentials } from '@/data/differentials';

/**
 * Differentials Section Component
 * Highlights competitive advantages
 * Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5
 */
const Differentials: React.FC = () => {
  return (
    <section id="differentials" className="scroll-mt-28">
      <SectionContainer background="neutral-gray" className="py-12 md:py-16 lg:py-24">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Nossos Diferenciais
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            O que nos torna a escolha ideal para seu projeto de refrigeração veicular
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {differentials.map((differential) => {
            const IconComponent = differential.icon;
            return (
              <Card key={differential.id} className="p-6 md:p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-black">
                    {differential.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed">
                    {differential.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
};

export default Differentials;
