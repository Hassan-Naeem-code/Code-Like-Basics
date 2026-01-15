"use client";

import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme, loadTheme } = useThemeStore();

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center gap-2 p-2 rounded-lg
        bg-white/10 hover:bg-white/20
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-transparent
        ${className}
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        <Sun
          className={`
            absolute inset-0 w-6 h-6 text-brand-gold
            transition-all duration-300
            ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}
          `}
        />
        <Moon
          className={`
            absolute inset-0 w-6 h-6 text-brand-blue-light
            transition-all duration-300
            ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
          `}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-white/80">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};

export default ThemeToggle;
