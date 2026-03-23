'use client';

import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  type HTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from 'react';

interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
  open: boolean;
  onClose: () => void;
  variant?: 'default' | 'paper';
  children: ReactNode;
}

const variantStyles = {
  default: 'bg-white rounded-xl shadow-paper border border-ink-100',
  paper: 'bg-paper-warm rounded-xl shadow-paper paper-texture hand-drawn-border',
};

export const Dialog = forwardRef<HTMLDialogElement, DialogProps>(
  ({ open, onClose, variant = 'default', className = '', children, ...props }, forwardedRef) => {
    const internalRef = useRef<HTMLDialogElement>(null);
    const dialogRef = (forwardedRef as React.RefObject<HTMLDialogElement>) ?? internalRef;

    useEffect(() => {
      const el = dialogRef.current;
      if (!el) return;

      if (open) {
        if (!el.open) el.showModal();
      } else {
        if (el.open) el.close();
      }
    }, [open, dialogRef]);

    useEffect(() => {
      const el = dialogRef.current;
      if (!el) return;

      const handleClose = () => onClose();
      el.addEventListener('close', handleClose);
      return () => el.removeEventListener('close', handleClose);
    }, [onClose, dialogRef]);

    const handleBackdropClick = useCallback(
      (e: MouseEvent<HTMLDialogElement>) => {
        const el = dialogRef.current;
        if (el && e.target === el) {
          onClose();
        }
      },
      [onClose, dialogRef]
    );

    return (
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className={`
          p-0 max-w-lg w-full backdrop:bg-ink-900/40 backdrop:backdrop-blur-sm
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      >
        <div className="p-6">{children}</div>
      </dialog>
    );
  }
);

Dialog.displayName = 'Dialog';

export function DialogHeader({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className = '', children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={`font-heading text-xl font-bold text-ink-900 ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function DialogContent({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`text-ink-700 font-body ${className}`} {...props}>
      {children}
    </div>
  );
}

export function DialogFooter({ className = '', children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-6 flex justify-end gap-3 ${className}`} {...props}>
      {children}
    </div>
  );
}
