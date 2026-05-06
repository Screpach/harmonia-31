import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../pitch/SpelledPitch';
import { DEFAULT_VOICE_RANGES } from './defaultRanges';
import { checkVoiceRange } from './rangeCheck';

describe('voice ranges', () => {
  it('defines defaults for all SATB voices', () => {
    expect(DEFAULT_VOICE_RANGES.soprano).toBeDefined();
    expect(DEFAULT_VOICE_RANGES.alto).toBeDefined();
    expect(DEFAULT_VOICE_RANGES.tenor).toBeDefined();
    expect(DEFAULT_VOICE_RANGES.bass).toBeDefined();
  });

  it('fails pitches below hard low', () => {
    const belowBass = makeSpelledPitch({ letter: 'D', accidental: 0, octave: 2 });
    const result = checkVoiceRange(belowBass, DEFAULT_VOICE_RANGES.bass);

    expect(result.status).toBe('outside-hard-range');
    expect(result.inHardRange).toBe(false);
  });

  it('distinguishes comfort warning from hard violation', () => {
    const sopranoComfortLowMiss = makeSpelledPitch({ letter: 'D', accidental: 0, octave: 4 });
    const result = checkVoiceRange(sopranoComfortLowMiss, DEFAULT_VOICE_RANGES.soprano);

    expect(result.status).toBe('outside-comfort-range');
    expect(result.inHardRange).toBe(true);
    expect(result.inComfortRange).toBe(false);
  });
});
