import { makeSpelledPitch } from '../pitch/SpelledPitch';
import type { VoiceRangeMap } from './Voice';

/**
 * Placeholder defaults for SATB exploration.
 * These are configurable engineering defaults, not historical claims.
 */
export const DEFAULT_VOICE_RANGES: VoiceRangeMap = Object.freeze({
  soprano: {
    hardLow: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }),
    hardHigh: makeSpelledPitch({ letter: 'A', accidental: 0, octave: 5 }),
    comfortableLow: makeSpelledPitch({ letter: 'E', accidental: 0, octave: 4 }),
    comfortableHigh: makeSpelledPitch({ letter: 'G', accidental: 0, octave: 5 }),
  },
  alto: {
    hardLow: makeSpelledPitch({ letter: 'G', accidental: 0, octave: 3 }),
    hardHigh: makeSpelledPitch({ letter: 'D', accidental: 0, octave: 5 }),
    comfortableLow: makeSpelledPitch({ letter: 'A', accidental: 0, octave: 3 }),
    comfortableHigh: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 5 }),
  },
  tenor: {
    hardLow: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 3 }),
    hardHigh: makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 }),
    comfortableLow: makeSpelledPitch({ letter: 'D', accidental: 0, octave: 3 }),
    comfortableHigh: makeSpelledPitch({ letter: 'F', accidental: 0, octave: 4 }),
  },
  bass: {
    hardLow: makeSpelledPitch({ letter: 'E', accidental: 0, octave: 2 }),
    hardHigh: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }),
    comfortableLow: makeSpelledPitch({ letter: 'G', accidental: 0, octave: 2 }),
    comfortableHigh: makeSpelledPitch({ letter: 'A', accidental: 0, octave: 3 }),
  },
});
