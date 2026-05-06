import { describe, expect, it } from 'vitest';
import { DEFAULT_SELECTION_STATE } from './Selection';
import { clearSelection, selectEventIds, setActiveVoice } from './selectionReducers';

describe('selection reducers', () => {
  it('defaults active voice to soprano', () => {
    expect(DEFAULT_SELECTION_STATE.activeVoice).toBe('soprano');
  });

  it('changing active voice preserves selected event ids', () => {
    const selected = selectEventIds(DEFAULT_SELECTION_STATE, ['evt-1', 'evt-2']);
    const changedVoice = setActiveVoice(selected, 'alto');

    expect(changedVoice.activeVoice).toBe('alto');
    expect(changedVoice.selectedEventIds).toEqual(['evt-1', 'evt-2']);
  });

  it('clearing selection is deterministic', () => {
    const selected = {
      ...DEFAULT_SELECTION_STATE,
      selectedEventIds: ['evt-1'],
      selectedMeasureId: 'm-1',
      selectedMeasureIndex: 0,
      cursorOnset: { numerator: 1, denominator: 4 },
    };

    const clearedA = clearSelection(selected);
    const clearedB = clearSelection(selected);

    expect(clearedA).toEqual(clearedB);
    expect(clearedA.selectedEventIds).toEqual([]);
    expect(clearedA.selectedMeasureId).toBeNull();
    expect(clearedA.selectedMeasureIndex).toBeNull();
    expect(clearedA.cursorOnset).toBeNull();
  });
});
