import { forwardRef, type InputHTMLAttributes, type ReactNode, useId } from 'react';

type InputVariant = 'default' | 'paper';
type InputSize = 'sm' | 'md' | 'lg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  label?: ReactNode;
  error?: string;
}

const variantStyles: Record<InputVariant, string> = {
  default: 'bg-white border border-ink-100 rounded-lg shadow-paper',
  paper: 'bg-paper-warm border-2 border-ink-900 hand-drawn-border paper-texture',
};

const sizeStyles: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-base',
  lg: 'px-5 py-3.5 text-lg',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', inputSize = 'md', label, error, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="font-heading font-bold text-ink-900 text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`
            w-full font-body text-ink-900 placeholder:text-ink-300
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${variantStyles[variant]}
            ${sizeStyles[inputSize]}
            ${error ? 'border-danger ring-1 ring-danger' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-danger text-sm font-body" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
