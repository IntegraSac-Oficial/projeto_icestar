import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputProps {
  label: string;
  type: 'text' | 'email' | 'tel';
  name: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  register: UseFormRegister<any>;
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  name,
  placeholder,
  error,
  required = false,
  register,
}) => {
  // Base input styles
  const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary';

  // Error state styles
  const errorStyles = error
    ? 'border-primary ring-2 ring-primary'
    : 'border-neutral focus:border-primary';

  // Combine all styles
  const inputClasses = `${baseStyles} ${errorStyles}`;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-black mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
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

export default Input;
