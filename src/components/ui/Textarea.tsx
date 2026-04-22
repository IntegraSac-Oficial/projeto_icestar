import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  register: UseFormRegister<any>;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  placeholder,
  rows = 4,
  error,
  required = false,
  register,
}) => {
  // Base textarea styles
  const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary resize-vertical';

  // Error state styles
  const errorStyles = error
    ? 'border-primary ring-2 ring-primary'
    : 'border-neutral focus:border-primary';

  // Combine all styles
  const textareaClasses = `${baseStyles} ${errorStyles}`;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-black mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={textareaClasses}
        {...register(name)}
      />
      {error && (
        <p className="mt-2 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
