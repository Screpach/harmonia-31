import { create } from 'zustand';
import { DEFAULT_APP_SETTINGS, type AppSettingsState, type ThemeMode } from './appSettings';
import { DEFAULT_SELECTION_STATE } from './selection/Selection';
import { clearSelection, selectEventIds, setActiveVoice } from './selection/selectionReducers';

type AppSettingsActions = {
  setActiveVoice: (voice: AppStore['activeVoice']) => void;
  setThemeMode: (mode: ThemeMode) => void;
  setInspectorVisible: (visible: boolean) => void;
  toggleInspectorVisible: () => void;
  setTempoBpm: (tempoBpm: number) => void;
  setSelectedEventIds: (eventIds: readonly string[]) => void;
  clearSelection: () => void;
};

export type AppStore = AppSettingsState & typeof DEFAULT_SELECTION_STATE & AppSettingsActions;

export const useAppStore = create<AppStore>((set) => ({
  ...DEFAULT_APP_SETTINGS,
  ...DEFAULT_SELECTION_STATE,
  setActiveVoice: (voiceId) => set((state) => setActiveVoice(state, voiceId)),
  setThemeMode: (themeMode) => set({ themeMode }),
  setInspectorVisible: (inspectorVisible) => set({ inspectorVisible }),
  toggleInspectorVisible: () =>
    set((state) => ({
      inspectorVisible: !state.inspectorVisible,
    })),
  setTempoBpm: (tempoBpm) => set({ tempoBpm }),
  setSelectedEventIds: (eventIds) => set((state) => selectEventIds(state, eventIds)),
  clearSelection: () => set((state) => clearSelection(state)),
}));

export const selectActiveVoice = (state: AppStore) => state.activeVoice;
export const selectThemeMode = (state: AppStore) => state.themeMode;
export const selectInspectorVisible = (state: AppStore) => state.inspectorVisible;
export const selectTempoBpm = (state: AppStore) => state.tempoBpm;
export const selectSelectedEventIds = (state: AppStore) => state.selectedEventIds;
