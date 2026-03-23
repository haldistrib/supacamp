import type { HTMLAttributes } from 'react';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
  xl: 'h-20 w-20 text-xl',
};

const PRESET_COLORS = [
  'bg-primary-200 text-primary-600',
  'bg-secondary-200 text-secondary-500',
  'bg-tertiary-200 text-tertiary-400',
  'bg-accent-200 text-accent-400',
];

function getColorFromFallback(fallback: string): string {
  let hash = 0;
  for (let i = 0; i < fallback.length; i++) {
    hash = fallback.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PRESET_COLORS[Math.abs(hash) % PRESET_COLORS.length];
}

export function Avatar({ src, alt = '', size = 'md', fallback, className = '', ...props }: AvatarProps) {
  const initials = fallback
    ? fallback
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  const colorClass = fallback ? getColorFromFallback(fallback) : PRESET_COLORS[0];

  return (
    <div
      role="img"
      aria-label={alt || fallback || 'Avatar'}
      className={`
        relative inline-flex items-center justify-center rounded-full
        border-2 border-ink-100 shadow-paper overflow-hidden
        font-heading font-bold shrink-0
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || fallback || 'Avatar'}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className={`flex h-full w-full items-center justify-center ${colorClass}`}>
          {initials}
        </span>
      )}
    </div>
  );
}

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  children: React.ReactNode[];
}

export function AvatarGroup({ max = 4, children, className = '', ...props }: AvatarGroupProps) {
  const visible = children.slice(0, max);
  const overflow = children.length - max;

  return (
    <div className={`flex -space-x-2 ${className}`} role="group" aria-label="Avatar group" {...props}>
      {visible}
      {overflow > 0 && (
        <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink-100 bg-paper-warm font-heading font-bold text-sm text-ink-700 shadow-paper">
          +{overflow}
        </div>
      )}
    </div>
  );
}
