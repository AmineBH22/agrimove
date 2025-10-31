import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  containerClassName?: string;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    label,
    options,
    helperText,
    error,
    fullWidth = false,
    containerClassName = '',
    className = '',
    onChange,
    ...props
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={`
              block appearance-none rounded-md border border-neutral-300 px-3 py-2 pr-10 shadow-sm
              focus:border-primary-600 focus:outline-none focus:ring-1 focus:ring-primary-600 sm:text-sm
              ${error ? 'border-error-DEFAULT focus:border-error-DEFAULT focus:ring-error-DEFAULT' : ''}
              ${fullWidth ? 'w-full' : ''}
              ${className}
            `}
            onChange={handleChange}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          </div>
        </div>

        {helperText && !error && (
          <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
        )}

        {error && (
          <p className="mt-1 text-sm text-error-DEFAULT">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;