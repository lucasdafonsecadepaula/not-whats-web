import { useCallback, useLayoutEffect, useState } from 'react';

const useDarkMode = () => {
  const [isDarkModeOn, setIsDarkModeOn] = useState(false);

  useLayoutEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setIsDarkModeOn(true);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkModeOn((prev) => {
      localStorage.setItem('theme', prev ? 'light' : 'dark');
      return !prev;
    });
  }, []);

  return {
    isDarkModeOn,
    toggleDarkMode,
  };
};

export default useDarkMode;
