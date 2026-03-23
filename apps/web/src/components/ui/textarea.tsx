import { forwardRef, type TextareaHTMLAttributes, type ReactNode, useId } from 'react';

type TextareaVariant = 'default' | 'paper';
type TextareaSize = 'sm' | 'md' | 'lg';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant;
  textareaSize?: TextareaSize;
  label?: ReactNode;
  error?: string;
}

const variantStyles: Record<TextareaVariant, string> = {
  default: 'bg-white border border-ink-100 rounded-lg shadow-paper',
  paper: 'bg-paper-warm border-2 border-ink-900 hand-drawn-border paper-texture notebook-lines',
};

const sizeStyles: Record<TextareaSize, string> = {
  sm: 'px-3 py-1.5 text-sm min-h-[80px]',
  md: 'px-4 py-2.5 text-base min-h-[120px]',
  lg: 'px-5 py-3.5 text-lg min-h-[180px]',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'default', textareaSize = 'md', label, error, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="font-heading font-bold text-ink-900 text-sm">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={`
            w-full font-body text-ink-900 placeholder:text-ink-300 resize-y
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${variantStyles[variant]}
            ${sizeStyles[textareaSize]}
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

Textarea.displayName = 'Textarea';
