'use client';

import { useState, useCallback, useRef, useId, type ReactNode, type KeyboardEvent } from 'react';

interface Tab {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'paper';
  className?: string;
}

const variantStyles = {
  default: {
    list: 'bg-white border border-ink-100 rounded-lg shadow-paper',
    active: 'bg-primary-500 text-white shadow-paper',
    inactive: 'text-ink-700 hover:bg-paper-warm',
  },
  paper: {
    list: 'bg-paper-warm border-2 border-ink-900 hand-drawn-border',
    active: 'bg-secondary-300 text-ink-900 shadow-paper',
    inactive: 'text-ink-500 hover:bg-paper-ruled',
  },
};

export function Tabs({ tabs, defaultValue, value, onValueChange, variant = 'default', className = '' }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? tabs[0]?.value ?? '');
  const activeValue = value ?? internalValue;
  const tabListRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const setActiveValue = useCallback(
    (val: string) => {
      if (value === undefined) setInternalValue(val);
      onValueChange?.(val);
    },
    [value, onValueChange]
  );

  const enabledTabs = tabs.filter((t) => !t.disabled);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const currentIdx = enabledTabs.findIndex((t) => t.value === activeValue);
      let nextIdx = currentIdx;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextIdx = (currentIdx + 1) % enabledTabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        nextIdx = (currentIdx - 1 + enabledTabs.length) % enabledTabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIdx = enabledTabs.length - 1;
      } else {
        return;
      }

      const nextTab = enabledTabs[nextIdx];
      setActiveValue(nextTab.value);

      const btn = tabListRef.current?.querySelector<HTMLButtonElement>(
        `[data-tab-value="${nextTab.value}"]`
      );
      btn?.focus();
    },
    [activeValue, enabledTabs, setActiveValue]
  );

  const activeTab = tabs.find((t) => t.value === activeValue);
  const styles = variantStyles[variant];

  return (
    <div className={className}>
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        className={`inline-flex gap-1 p-1 rounded-lg ${styles.list}`}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === activeValue;
          const tabId = `${baseId}-tab-${tab.value}`;
          const panelId = `${baseId}-panel-${tab.value}`;

          return (
            <button
              key={tab.value}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              aria-disabled={tab.disabled || undefined}
              tabIndex={isActive ? 0 : -1}
              data-tab-value={tab.value}
              disabled={tab.disabled}
              onKeyDown={handleKeyDown}
              onClick={() => setActiveValue(tab.value)}
              className={`
                px-4 py-2 rounded-md font-heading font-bold text-sm
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-1
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isActive ? styles.active : styles.inactive}
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const isActive = tab.value === activeValue;
        const tabId = `${baseId}-tab-${tab.value}`;
        const panelId = `${baseId}-panel-${tab.value}`;

        return (
          <div
            key={tab.value}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={0}
            hidden={!isActive}
            className="mt-4 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 rounded-lg"
          >
            {isActive && tab.content}
          </div>
        );
      })}
    </div>
  );
}
