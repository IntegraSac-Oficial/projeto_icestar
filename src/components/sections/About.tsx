import React from 'react';
import SectionContainer from '@/components/ui/SectionContainer';
import { CheckCircle, Target, Users, Award } from 'lucide-react';
import type { AboutContent } from '@/lib/utils/content-fetcher';

/**
 * About Section Component
 * Displays company value proposition and key benefits
 * Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
 */

interface AboutProps {
  content: AboutContent;
}

// Icon mapping for dynamic benefits
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Award,
  CheckCircle,
  Users,
};

const About: React.FC<AboutProps> = ({ content }) => {

  return (
    <section id="about" className="scroll-mt-28">
      <SectionContainer background="light-gray" className="py-12 md:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center mb-12">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
            {content.section_title}
          </h2>

          {/* Value Proposition */}
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            {content.main_description}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {content.benefits.map((benefit) => {
            const IconComponent = iconMap[benefit.icon] || CheckCircle;
            return (
              <div
                key={benefit.id}
                className="flex flex-col items-center text-center space-y-4"
              >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-black">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-base text-gray-600">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
};

export default About;
