import { create } from 'zustand';
import { DEFAULT_APP_SETTINGS, type ActiveVoice, type AppSettingsState, type ThemeMode } from './appSettings';

type AppSettingsActions = {
  setActiveVoice: (voice: ActiveVoice) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setInspectorVisible: (visible: boolean) => void;
  toggleInspectorVisible: () => void;
  setTempoBpm: (tempoBpm: number) => void;
};

export type AppStore = AppSettingsState & AppSettingsActions;

export const useAppStore = create<AppStore>((set) => ({
  ...DEFAULT_APP_SETTINGS,
  setActiveVoice: (activeVoice) => set({ activeVoice }),
  setThemeMode: (themeMode) => set({ themeMode }),
  setInspectorVisible: (inspectorVisible) => set({ inspectorVisible }),
  toggleInspectorVisible: () =>
    set((state) => ({
      inspectorVisible: !state.inspectorVisible,
    })),
  setTempoBpm: (tempoBpm) => set({ tempoBpm }),
}));

export const selectActiveVoice = (state: AppStore) => state.activeVoice;
export const selectThemeMode = (state: AppStore) => state.themeMode;
export const selectInspectorVisible = (state: AppStore) => state.inspectorVisible;
export const selectTempoBpm = (state: AppStore) => state.tempoBpm;
