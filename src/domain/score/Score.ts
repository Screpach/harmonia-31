import type { VoiceId } from '../voice/Voice';
import type { Measure } from './Measure';

export type TimeSignature = {
  readonly numerator: number;
  readonly denominator: number;
};

export type Score = {
  readonly tempoBpm: number;
  readonly timeSignature: TimeSignature;
  readonly voices: readonly VoiceId[];
  readonly measures: readonly Measure[];
};
