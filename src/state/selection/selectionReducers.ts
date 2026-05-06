import type { VoiceId } from '../../domain/voice/Voice';
import type { SelectionState } from './Selection';

export function setActiveVoice(selection: SelectionState, voiceId: VoiceId): SelectionState {
  return {
    ...selection,
    activeVoice: voiceId,
  };
}

export function selectEventIds(selection: SelectionState, eventIds: readonly string[]): SelectionState {
  return {
    ...selection,
    selectedEventIds: [...eventIds],
  };
}

export function clearSelection(selection: SelectionState): SelectionState {
  return {
    ...selection,
    selectedEventIds: [],
    selectedMeasureId: null,
    selectedMeasureIndex: null,
    cursorOnset: null,
  };
}
