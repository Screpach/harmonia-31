import type { SpelledPitch } from '../pitch/SpelledPitch';

export type ChordCandidate = {
  readonly chordKindId: string;
  readonly chordKindName: string;
  readonly root: SpelledPitch;
  readonly matchedSpelledPitches: readonly SpelledPitch[];
  readonly confidence: number;
  readonly rationale: 'synthetic-exact-step-set-match' | 'synthetic-partial-match';
};

export type ChordRecognitionResult = {
  readonly candidates: readonly ChordCandidate[];
  readonly status: 'matched' | 'unknown';
  readonly source: 'synthetic-development-only';
};
