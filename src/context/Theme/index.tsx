import useDarkMode from '@/hooks/useDarkMode';
import { createContext } from 'react';

export const ThemeContext = createContext({
  isDarkModeOn: false,
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkModeOn, toggleDarkMode } = useDarkMode();

  return (
    <ThemeContext.Provider
      value={{
        isDarkModeOn,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
