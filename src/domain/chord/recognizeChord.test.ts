import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../pitch/SpelledPitch';
import { recognizeChord } from './recognizeChord';

describe('recognizeChord', () => {
  it('recognizes synthetic C major-like triad', () => {
    const sonority = [
      makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }),
      makeSpelledPitch({ letter: 'E', accidental: 0, octave: 4 }),
      makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 }),
    ];

    const result = recognizeChord(sonority);
    expect(result.status).toBe('matched');
    expect(result.candidates.some((candidate) => candidate.chordKindId === 'major-triad-synthetic')).toBe(true);
  });

  it('preserves distinct C and Db spellings in output matches', () => {
    const sonority = [
      makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }),
      makeSpelledPitch({ letter: 'E', accidental: 0, octave: 4 }),
      makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 }),
      makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }),
    ];

    const result = recognizeChord(sonority);
    const spellings = result.candidates.flatMap((candidate) => candidate.matchedSpelledPitches.map((pitch) => `${pitch.letter}${pitch.accidental}`));
    expect(spellings).toContain('C0');
    expect(spellings).toContain('D-1');
  });

  it('ambiguous or non-matching sonority returns unknown or multiple candidates, not forced certainty', () => {
    const sonority = [
      makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }),
      makeSpelledPitch({ letter: 'D', accidental: 0, octave: 4 }),
      makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 }),
    ];

    const result = recognizeChord(sonority);
    expect(result.status === 'unknown' || result.candidates.length > 1).toBe(true);
  });
});
