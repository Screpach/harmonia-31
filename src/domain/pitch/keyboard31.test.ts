import { describe, expect, it } from 'vitest';
import { KEYBOARD31_ONE_OCTAVE } from './keyboard31';

describe('keyboard31 mapping', () => {
  it('contains exactly 31 step entries', () => {
    expect(KEYBOARD31_ONE_OCTAVE).toHaveLength(31);
  });

  it('covers 31 unique steps', () => {
    const uniqueSteps = new Set(KEYBOARD31_ONE_OCTAVE.map((entry) => entry.step));
    expect(uniqueSteps.size).toBe(31);
  });

  it('keeps C# and Db distinct', () => {
    const cSharp = KEYBOARD31_ONE_OCTAVE.find((entry) => entry.spelling === 'C#');
    const dFlat = KEYBOARD31_ONE_OCTAVE.find((entry) => entry.spelling === 'Db');

    expect(cSharp?.step).toBe(2);
    expect(dFlat?.step).toBe(3);
  });

  it('uses integer step values from 0 through 30', () => {
    const steps = KEYBOARD31_ONE_OCTAVE.map((entry) => entry.step);

    for (const step of steps) {
      expect(Number.isInteger(step)).toBe(true);
      expect(step).toBeGreaterThanOrEqual(0);
      expect(step).toBeLessThanOrEqual(30);
    }
  });
});
