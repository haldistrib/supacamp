import { forwardRef, type SelectHTMLAttributes, type ReactNode, useId } from 'react';

type SelectVariant = 'default' | 'paper';
type SelectSize = 'sm' | 'md' | 'lg';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: SelectVariant;
  selectSize?: SelectSize;
  label?: ReactNode;
  error?: string;
  placeholder?: string;
  children: ReactNode;
}

const variantStyles: Record<SelectVariant, string> = {
  default: 'bg-white border border-ink-100 rounded-lg shadow-paper',
  paper: 'bg-paper-warm border-2 border-ink-900 hand-drawn-border paper-texture',
};

const sizeStyles: Record<SelectSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3.5 text-lg',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant = 'default', selectSize = 'md', label, error, placeholder, className = '', id, children, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id ?? generatedId;
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="font-heading font-bold text-ink-900 text-sm">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={`
              w-full font-body text-ink-900 appearance-none pr-10
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              ${variantStyles[variant]}
              ${sizeStyles[selectSize]}
              ${error ? 'border-danger ring-1 ring-danger' : ''}
              ${className}
            `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-ink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={errorId} className="text-danger text-sm font-body" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
