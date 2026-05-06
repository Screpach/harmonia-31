export type ThemeMode = 'light';

export type ThemeDefinition = {
  mode: ThemeMode;
  rootClassName: string;
};

export const defaultTheme: ThemeDefinition = {
  mode: 'light',
  rootClassName: 'theme-light',
};
