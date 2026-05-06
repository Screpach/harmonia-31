import type { Rational } from '../../domain/duration/Rational';
import type { VoiceId } from '../../domain/voice/Voice';

export type SelectionState = {
  readonly activeVoice: VoiceId;
  readonly selectedEventIds: readonly string[];
  readonly selectedMeasureId: string | null;
  readonly selectedMeasureIndex: number | null;
  readonly cursorOnset: Rational | null;
};

export const DEFAULT_SELECTION_STATE: SelectionState = Object.freeze({
  activeVoice: 'soprano',
  selectedEventIds: [],
  selectedMeasureId: null,
  selectedMeasureIndex: null,
  cursorOnset: null,
});
