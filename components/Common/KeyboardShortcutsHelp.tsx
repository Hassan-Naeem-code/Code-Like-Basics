"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { X, Keyboard } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useKeyboardNavigation';

interface Shortcut {
  keys: { mac: string[]; other: string[] };
  description: string;
}

const shortcuts: Shortcut[] = [
  { keys: { mac: ['⌥', 'H'], other: ['Alt', 'H'] }, description: 'Go to Dashboard' },
  { keys: { mac: ['⌥', 'P'], other: ['Alt', 'P'] }, description: 'Go to Progress' },
  { keys: { mac: ['⌥', 'A'], other: ['Alt', 'A'] }, description: 'Go to Achievements' },
  { keys: { mac: ['⌘', '/'], other: ['Ctrl', '/'] }, description: 'Show this help' },
  { keys: { mac: ['Esc'], other: ['Esc'] }, description: 'Close modal/popup' },
  { keys: { mac: ['Tab'], other: ['Tab'] }, description: 'Navigate to next element' },
  { keys: { mac: ['⇧', 'Tab'], other: ['Shift', 'Tab'] }, description: 'Navigate to previous element' },
  { keys: { mac: ['Return'], other: ['Enter'] }, description: 'Activate focused button' },
  { keys: { mac: ['Space'], other: ['Space'] }, description: 'Toggle checkbox/button' },
  { keys: { mac: ['↑', '↓'], other: ['↑', '↓'] }, description: 'Navigate list items' },
];

const KeyboardShortcutsHelp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect if user is on Mac
  const isMac = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  }, []);

  useFocusTrap(modalRef, isOpen);

  useEffect(() => {
    const handleShowHelp = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    window.addEventListener('show-shortcuts-help', handleShowHelp);
    window.addEventListener('close-modal', handleCloseModal);

    return () => {
      window.removeEventListener('show-shortcuts-help', handleShowHelp);
      window.removeEventListener('close-modal', handleCloseModal);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div
        ref={modalRef}
        className="glass-card w-full max-w-md p-6 animate-scale-in"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-brand-gold" />
            <h2 id="shortcuts-title" className="text-xl font-bold text-white">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <p className="text-xs text-white/50 mb-4">
          {isMac ? 'Showing shortcuts for Mac' : 'Showing shortcuts for Windows/Linux'}
        </p>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {shortcuts.map((shortcut, index) => {
            const keys = isMac ? shortcut.keys.mac : shortcut.keys.other;
            return (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-white/10 last:border-0"
              >
                <span className="text-white/80 text-sm">
                  {shortcut.description}
                </span>
                <div className="flex gap-1">
                  {keys.map((key, keyIndex) => (
                    <kbd
                      key={keyIndex}
                      className="px-2 py-1 text-xs font-mono bg-white/10 rounded border border-white/20 text-white/90"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-white/50 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/70">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
};

export default KeyboardShortcutsHelp;
