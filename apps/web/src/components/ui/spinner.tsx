import type { HTMLAttributes } from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  label?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-3',
};

export function Spinner({ size = 'md', label = 'Loading', className = '', ...props }: SpinnerProps) {
  return (
    <div role="status" aria-label={label} className={`inline-flex items-center justify-center ${className}`} {...props}>
      <div
        className={`
          animate-spin rounded-full
          border-primary-200 border-t-primary-500
          ${sizeStyles[size]}
        `}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
