"use client";

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardNavigationOptions {
  enabled?: boolean;
  shortcuts?: KeyboardShortcut[];
}

// Global keyboard shortcuts
const useKeyboardNavigation = (options: UseKeyboardNavigationOptions = {}) => {
  const { enabled = true, shortcuts = [] } = options;
  const router = useRouter();

  // Default global shortcuts
  const defaultShortcuts: KeyboardShortcut[] = [
    {
      key: 'h',
      alt: true,
      action: () => router.push('/dashboard'),
      description: 'Go to Dashboard',
    },
    {
      key: 'p',
      alt: true,
      action: () => router.push('/progress'),
      description: 'Go to Progress',
    },
    {
      key: 'a',
      alt: true,
      action: () => router.push('/achievements'),
      description: 'Go to Achievements',
    },
    {
      key: '/',
      ctrl: true,
      action: () => {
        // Focus search or show shortcuts help
        const event = new CustomEvent('show-shortcuts-help');
        window.dispatchEvent(event);
      },
      description: 'Show keyboard shortcuts',
    },
    {
      key: 'Escape',
      action: () => {
        // Close any open modals/popups
        const event = new CustomEvent('close-modal');
        window.dispatchEvent(event);
      },
      description: 'Close modal/popup',
    },
  ];

  const allShortcuts = [...defaultShortcuts, ...shortcuts];

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        // Only allow Escape in input fields
        if (event.key !== 'Escape') {
          return;
        }
      }

      for (const shortcut of allShortcuts) {
        // Use event.code for letter keys (to handle Mac Option+letter producing special chars)
        // event.code gives physical key like "KeyH", event.key gives character produced
        let keyMatch = false;
        const shortcutKey = shortcut.key.toLowerCase();

        if (shortcutKey.length === 1 && shortcutKey >= 'a' && shortcutKey <= 'z') {
          // For letter keys, use event.code (e.g., "KeyH" for H)
          keyMatch = event.code.toLowerCase() === `key${shortcutKey}`;
        } else {
          // For special keys (Escape, /, etc.), use event.key
          keyMatch = event.key.toLowerCase() === shortcutKey || event.key === shortcutKey;
        }

        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
          return;
        }
      }
    },
    [allShortcuts]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);

  return { shortcuts: allShortcuts };
};

// Hook for focusable elements navigation
export const useFocusTrap = (containerRef: React.RefObject<HTMLElement | null>, isActive: boolean = true) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when trap activates
    firstElement?.focus();

    container.addEventListener('keydown', handleTabKey);
    return () => container.removeEventListener('keydown', handleTabKey);
  }, [containerRef, isActive]);
};

// Hook for arrow key navigation in lists
export const useArrowNavigation = (
  items: HTMLElement[],
  options: { wrap?: boolean; orientation?: 'horizontal' | 'vertical' | 'both' } = {}
) => {
  const { wrap = true, orientation = 'vertical' } = options;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = items.findIndex((item) => item === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      const isVertical = orientation === 'vertical' || orientation === 'both';
      const isHorizontal = orientation === 'horizontal' || orientation === 'both';

      if ((e.key === 'ArrowDown' && isVertical) || (e.key === 'ArrowRight' && isHorizontal)) {
        e.preventDefault();
        nextIndex = currentIndex + 1;
        if (nextIndex >= items.length) {
          nextIndex = wrap ? 0 : items.length - 1;
        }
      } else if ((e.key === 'ArrowUp' && isVertical) || (e.key === 'ArrowLeft' && isHorizontal)) {
        e.preventDefault();
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = wrap ? items.length - 1 : 0;
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = items.length - 1;
      }

      items[nextIndex]?.focus();
    };

    items.forEach((item) => item.addEventListener('keydown', handleKeyDown));
    return () => items.forEach((item) => item.removeEventListener('keydown', handleKeyDown));
  }, [items, wrap, orientation]);
};

export default useKeyboardNavigation;
