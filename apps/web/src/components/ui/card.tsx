import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'paper' | 'notebook' | 'folded';
  children: ReactNode;
}

export function Card({ variant = 'default', className = '', children, ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-white rounded-2xl shadow-paper border border-ink-100',
    paper: 'bg-paper-warm rounded-2xl shadow-paper paper-texture',
    notebook: 'bg-white rounded-2xl shadow-paper notebook-lines border border-ink-100',
    folded: 'bg-white rounded-2xl shadow-paper border border-ink-100',
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
    <h3 className={`font-heading text-xl text-ink-900 ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-ink-700 ${className}`} {...props}>
      {children}
    </div>
  );
}
