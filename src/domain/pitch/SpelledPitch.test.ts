import { describe, expect, it } from 'vitest';
import { formatPitch } from './formatPitch';
import { parsePitch } from './parsePitch';
import { isPitchLetter, isSpelledPitch, makeSpelledPitch } from './SpelledPitch';

describe('SpelledPitch validation and formatting', () => {
  it('validates legal letter names', () => {
    expect(isPitchLetter('C')).toBe(true);
    expect(isPitchLetter('G')).toBe(true);
    expect(isPitchLetter('H')).toBe(false);
  });

  it('formats C#4 and Db4 distinctly', () => {
    const cSharp4 = makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 });
    const dFlat4 = makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 });

    expect(formatPitch(cSharp4, 'ascii')).toBe('C#4');
    expect(formatPitch(dFlat4, 'ascii')).toBe('Db4');
    expect(formatPitch(cSharp4, 'ascii')).not.toBe(formatPitch(dFlat4, 'ascii'));
  });

  it('rejects invalid letters and non-integer octave structures', () => {
    expect(isSpelledPitch({ letter: 'H', accidental: 0, octave: 4 })).toBe(false);
    expect(isSpelledPitch({ letter: 'C', accidental: 0, octave: 4.5 })).toBe(false);
  });

  it('parses basic supported spellings deterministically', () => {
    expect(parsePitch('C4')).toEqual({ letter: 'C', accidental: 0, octave: 4 });
    expect(parsePitch('C#4')).toEqual({ letter: 'C', accidental: 1, octave: 4 });
    expect(parsePitch('Db4')).toEqual({ letter: 'D', accidental: -1, octave: 4 });
    expect(parsePitch('C##4')).toEqual({ letter: 'C', accidental: 2, octave: 4 });
    expect(parsePitch('Dbb3')).toEqual({ letter: 'D', accidental: -2, octave: 3 });
    expect(parsePitch('A4')).toEqual({ letter: 'A', accidental: 0, octave: 4 });
  });

  it('does not collapse enharmonics to one pitch class', () => {
    const cSharp = parsePitch('C#4');
    const dFlat = parsePitch('Db4');

    expect(cSharp).not.toEqual(dFlat);
  });
});
