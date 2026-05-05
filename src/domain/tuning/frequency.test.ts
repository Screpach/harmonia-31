import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../pitch/SpelledPitch';
import { DEFAULT_31EDO_TUNING } from './TuningSystem';
import { frequencyOfPitch } from './frequency';

describe('31-EDO frequency conversion', () => {
  it('returns 440 Hz for A4 under default tuning', () => {
    const a4 = makeSpelledPitch({ letter: 'A', accidental: 0, octave: 4 });
    expect(frequencyOfPitch(a4, DEFAULT_31EDO_TUNING)).toBeCloseTo(440, 10);
  });

  it('returns 880 Hz for A5 under default tuning', () => {
    const a5 = makeSpelledPitch({ letter: 'A', accidental: 0, octave: 5 });
    expect(frequencyOfPitch(a5, DEFAULT_31EDO_TUNING)).toBeCloseTo(880, 10);
  });

  it('keeps C#4 and Db4 as distinct frequencies', () => {
    const cSharp4 = makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 });
    const dFlat4 = makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 });

    expect(frequencyOfPitch(cSharp4)).not.toBeCloseTo(frequencyOfPitch(dFlat4), 10);
  });

  it('doubles frequency for octave transposition', () => {
    const f4 = makeSpelledPitch({ letter: 'F', accidental: 0, octave: 4 });
    const f5 = makeSpelledPitch({ letter: 'F', accidental: 0, octave: 5 });

    expect(frequencyOfPitch(f5)).toBeCloseTo(frequencyOfPitch(f4) * 2, 10);
  });
});
