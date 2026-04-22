import React from 'react';
import { UseFormRegister } from 'react-hook-form';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  register: UseFormRegister<any>;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  error,
  required = false,
  register,
}) => {
  // Base select styles
  const baseStyles = 'w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary bg-white';

  // Error state styles
  const errorStyles = error
    ? 'border-primary ring-2 ring-primary'
    : 'border-neutral focus:border-primary';

  // Combine all styles
  const selectClasses = `${baseStyles} ${errorStyles}`;

  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium text-black mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <select
        id={name}
        className={selectClasses}
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-primary">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
