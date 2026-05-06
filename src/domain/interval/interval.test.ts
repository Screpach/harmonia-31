import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../pitch/SpelledPitch';
import { buildNamedInterval } from './NamedInterval';

describe('interval primitives', () => {
  it('computes C to G as generic fifth with 18 simple steps', () => {
    const c4 = makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 });
    const g4 = makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 });

    const interval = buildNamedInterval(c4, g4);
    expect(interval.genericNumber).toBe(5);
    expect(interval.simpleEdoSteps).toBe(18);
    expect(interval.direction).toBe('ascending');
  });

  it('computes C# to G# as generic fifth with 18 simple steps', () => {
    const cSharp4 = makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 });
    const gSharp4 = makeSpelledPitch({ letter: 'G', accidental: 1, octave: 4 });

    const interval = buildNamedInterval(cSharp4, gSharp4);
    expect(interval.genericNumber).toBe(5);
    expect(interval.simpleEdoSteps).toBe(18);
  });

  it('preserves spelled interval identity differences (C#->G# vs C#->Ab)', () => {
    const cSharp4 = makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 });
    const gSharp4 = makeSpelledPitch({ letter: 'G', accidental: 1, octave: 4 });
    const aFlat4 = makeSpelledPitch({ letter: 'A', accidental: -1, octave: 4 });

    const sharpInterval = buildNamedInterval(cSharp4, gSharp4);
    const flatInterval = buildNamedInterval(cSharp4, aFlat4);

    expect(sharpInterval.genericNumber).toBe(5);
    expect(flatInterval.genericNumber).toBe(6);
    expect(sharpInterval).not.toEqual(flatInterval);
  });

  it('preserves descending direction', () => {
    const g4 = makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 });
    const c4 = makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 });

    const interval = buildNamedInterval(g4, c4);
    expect(interval.direction).toBe('descending');
    expect(interval.edoSteps).toBeLessThan(0);
  });
});
