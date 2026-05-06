import type { SpelledPitch } from '../pitch/SpelledPitch';

export const VOICE_IDS = ['soprano', 'alto', 'tenor', 'bass'] as const;
export type VoiceId = (typeof VOICE_IDS)[number];

export type VoiceRange = {
  readonly hardLow: SpelledPitch;
  readonly hardHigh: SpelledPitch;
  readonly comfortableLow?: SpelledPitch;
  readonly comfortableHigh?: SpelledPitch;
};

export type VoiceRangeMap = Readonly<Record<VoiceId, VoiceRange>>;
