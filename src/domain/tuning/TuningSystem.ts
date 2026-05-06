import { makeSpelledPitch, type SpelledPitch } from '../pitch/SpelledPitch';

export type ThirtyOneEdoTuning = {
  readonly referencePitch: SpelledPitch;
  readonly referenceFrequency: number;
};

export const DEFAULT_31EDO_TUNING: ThirtyOneEdoTuning = Object.freeze({
  referencePitch: makeSpelledPitch({ letter: 'A', accidental: 0, octave: 4 }),
  referenceFrequency: 440,
});
