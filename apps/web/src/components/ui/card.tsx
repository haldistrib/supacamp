import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'paper' | 'notebook' | 'folded';
  children: ReactNode;
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-white rounded-xl border border-gray-200',
    paper: 'bg-gray-50 rounded-xl border border-gray-200',
    notebook: 'bg-white rounded-xl border border-gray-200',
    folded: 'bg-white rounded-xl border border-gray-200',
  };

  return (
    <div className={`p-6 ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-lg font-semibold text-ink-900 ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-ink-500 ${className}`} {...props}>
      {children}
    </div>
  );
}
