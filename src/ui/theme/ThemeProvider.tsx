import type { ReactNode } from 'react';
import { defaultTheme } from './theme';

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  return <div className={defaultTheme.rootClassName}>{children}</div>;
}

export default ThemeProvider;
