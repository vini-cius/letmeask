import { createContext, ReactNode } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { usePersistedState } from "../hooks/usePersistedState";

import { light } from '../styles/themes/light';
import { dark } from '../styles/themes/dark';

type ThemeContextType = {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

type ThemeContextProviderProps = {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('letmeask.theme', light);

  function toggleTheme() {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}