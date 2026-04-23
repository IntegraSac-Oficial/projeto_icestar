import React from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import Card from '@/components/ui/Card';
import { services } from '@/data/services';

/**
 * Services Section Component
 * Displays service offerings in card format
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8
 */
const Services: React.FC = () => {
  return (
    <section id="services" className="scroll-mt-28">
      <SectionContainer background="white" className="py-12 md:py-16 lg:py-24">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para transformar seu veículo em uma 
            câmara frigorífica profissional
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <Card key={service.id} hoverable className="p-6 md:p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-black">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed">
                    {service.description}
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

export default Services;
