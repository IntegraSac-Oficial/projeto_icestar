import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'light-gray' | 'neutral-gray';
  id?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  children,
  className = '',
  background = 'white',
  id,
}) => {
  // Background color mapping
  const backgroundStyles = {
    white: 'bg-white',
    'light-gray': 'bg-neutral-light',
    'neutral-gray': 'bg-neutral',
  };

  // Base styles with max-width, centered alignment, and responsive padding
  const baseStyles = 'w-full mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8';

  // Combine all styles
  const containerClasses = `${backgroundStyles[background]} ${baseStyles} ${className}`.trim();

  return (
    <section id={id} className={containerClasses}>
      {children}
    </section>
  );
};

export default SectionContainer;
