import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
}) => {
  // Base styles
  const baseStyles = 'bg-white rounded-lg shadow-card';

  // Hover styles
  const hoverStyles = hoverable
    ? 'transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1'
    : '';

  // Combine all styles
  const cardClasses = `${baseStyles} ${hoverStyles} ${className}`.trim();

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;
