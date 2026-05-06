export const VOICE_OPTIONS = ['soprano', 'alto', 'tenor', 'bass'] as const;
export type ActiveVoice = (typeof VOICE_OPTIONS)[number];

export type ThemeMode = 'light';

export type AppSettingsState = {
  activeVoice: ActiveVoice;
  themeMode: ThemeMode;
  inspectorVisible: boolean;
  tempoBpm: number;
};

export const DEFAULT_APP_SETTINGS: AppSettingsState = {
  activeVoice: 'soprano',
  themeMode: 'light',
  inspectorVisible: true,
  tempoBpm: 96,
};
