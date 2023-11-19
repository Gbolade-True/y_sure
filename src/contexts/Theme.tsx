import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<{
  darkTheme?: boolean;
  setDarkTheme: (val: boolean) => void;
  toggleDarkTheme: () => void;
}>({
  darkTheme: undefined,
  setDarkTheme: () => {},
  toggleDarkTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

const themeLocalStorageName = 'y_sure_theme';

const ThemeProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = useState<boolean | undefined>(true);

  const toggleDarkTheme = () => {
    localStorage.setItem(themeLocalStorageName, !darkTheme ? 'dark' : 'light');
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkTheme);
  }, [darkTheme]);

  useEffect(() => {
    if (
      localStorage[themeLocalStorageName] === 'dark' ||
      (!(themeLocalStorageName in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
        toggleDarkTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
