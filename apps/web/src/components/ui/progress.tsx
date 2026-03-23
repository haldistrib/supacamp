import type { HTMLAttributes } from 'react';

type ProgressVariant = 'default' | 'paper';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  label?: string;
  showValue?: boolean;
}

const trackVariantStyles: Record<ProgressVariant, string> = {
  default: 'bg-ink-100 rounded-full',
  paper: 'bg-paper-ruled rounded-full border border-ink-300',
};

const barVariantStyles: Record<ProgressVariant, string> = {
  default: 'bg-primary-500 rounded-full',
  paper: 'bg-secondary-300 rounded-full',
};

const sizeStyles: Record<ProgressSize, string> = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-5',
};

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  label,
  showValue = false,
  className = '',
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const displayLabel = label ?? `${Math.round(pct)}% complete`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} {...props}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="font-heading font-bold text-sm text-ink-900">{label}</span>}
          {showValue && (
            <span className="font-heading text-sm text-ink-500">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={displayLabel}
        className={`w-full overflow-hidden ${trackVariantStyles[variant]} ${sizeStyles[size]}`}
      >
        <div
          className={`h-full transition-all duration-500 ease-out ${barVariantStyles[variant]}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
