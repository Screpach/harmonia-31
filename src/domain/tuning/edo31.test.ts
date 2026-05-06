import { describe, expect, it } from 'vitest';
import {
  EDO31_ACCIDENTAL_SHIFT_STEPS,
  EDO31_DIVISIONS_PER_OCTAVE,
  EDO31_LETTER_BASE_STEPS,
  EDO31_STEP_SIZE_CENTS,
} from './edo31';

describe('edo31 constants', () => {
  it('uses 31 equal divisions per octave', () => {
    expect(EDO31_DIVISIONS_PER_OCTAVE).toBe(31);
  });

  it('defines exact step size in cents as 1200/31', () => {
    expect(EDO31_STEP_SIZE_CENTS).toBe(1200 / 31);
  });

  it('defines letter base steps and accidental shifts', () => {
    expect(EDO31_LETTER_BASE_STEPS.C).toBe(0);
    expect(EDO31_LETTER_BASE_STEPS.D).toBe(5);
    expect(EDO31_LETTER_BASE_STEPS.E).toBe(10);
    expect(EDO31_LETTER_BASE_STEPS.F).toBe(13);
    expect(EDO31_LETTER_BASE_STEPS.G).toBe(18);
    expect(EDO31_LETTER_BASE_STEPS.A).toBe(23);
    expect(EDO31_LETTER_BASE_STEPS.B).toBe(28);

    expect(EDO31_ACCIDENTAL_SHIFT_STEPS.sharp).toBe(2);
    expect(EDO31_ACCIDENTAL_SHIFT_STEPS.flat).toBe(-2);
  });
});
