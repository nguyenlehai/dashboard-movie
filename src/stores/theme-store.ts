import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_COLOR, THEME_MODE } from '@/utils/constants';

interface ThemeState {
  mode: THEME_MODE;
  primaryColor: string;
  isCustomColor: boolean;
  setMode: (mode: THEME_MODE) => void;
  setPrimaryColor: (color: string, isCustom: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      mode: 'system',
      primaryColor: DEFAULT_COLOR,
      isCustomColor: false,
      setMode: mode => set({ mode }),
      setPrimaryColor: (color, isCustom) =>
        set({ primaryColor: color, isCustomColor: isCustom }),
    }),
    {
      name: 'theme-storage',
    },
  ),
);
