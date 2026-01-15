import { create } from 'zustand';
import { storage } from '@/utils/storage';

type Theme = 'dark' | 'light';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  loadTheme: () => void;
}

const THEME_KEY = 'app_theme';

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'dark',

  setTheme: (theme: Theme) => {
    storage.set(THEME_KEY, theme);
    set({ theme });

    // Apply theme to document
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(newTheme);
  },

  loadTheme: () => {
    const savedTheme = storage.get<Theme>(THEME_KEY, 'dark');
    get().setTheme(savedTheme);
  },
}));
