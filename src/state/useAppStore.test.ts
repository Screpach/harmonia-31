import { describe, expect, it } from 'vitest';
import { DEFAULT_APP_SETTINGS } from './appSettings';
import { useAppStore } from './useAppStore';

describe('useAppStore', () => {
  it('exposes expected defaults', () => {
    const state = useAppStore.getState();

    expect(state.activeVoice).toBe(DEFAULT_APP_SETTINGS.activeVoice);
    expect(state.themeMode).toBe(DEFAULT_APP_SETTINGS.themeMode);
    expect(state.inspectorVisible).toBe(DEFAULT_APP_SETTINGS.inspectorVisible);
    expect(state.tempoBpm).toBe(DEFAULT_APP_SETTINGS.tempoBpm);
  });

  it('updates basic settings actions without storage', () => {
    useAppStore.setState(DEFAULT_APP_SETTINGS);

    useAppStore.getState().setActiveVoice('tenor');
    useAppStore.getState().setTempoBpm(112);
    useAppStore.getState().setInspectorVisible(false);
    useAppStore.getState().toggleInspectorVisible();

    const state = useAppStore.getState();
    expect(state.activeVoice).toBe('tenor');
    expect(state.tempoBpm).toBe(112);
    expect(state.inspectorVisible).toBe(true);
  });
});
