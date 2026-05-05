import { describe, expect, it } from 'vitest';
import { normalizeRational } from './Rational';
import {
  addRational,
  compareRational,
  equalRational,
  multiplyRationalByInteger,
  subtractRational,
} from './durationMath';

describe('duration rational math', () => {
  it('adds quarter plus quarter to half', () => {
    const result = addRational({ numerator: 1, denominator: 4 }, { numerator: 1, denominator: 4 });
    expect(result).toEqual({ numerator: 1, denominator: 2 });
  });

  it('normalizes equivalent rationals (1/2 equals 2/4)', () => {
    expect(equalRational({ numerator: 1, denominator: 2 }, { numerator: 2, denominator: 4 })).toBe(true);
  });

  it('compares one-third and one-fourth correctly', () => {
    expect(compareRational({ numerator: 1, denominator: 3 }, { numerator: 1, denominator: 4 })).toBe(1);
    expect(compareRational({ numerator: 1, denominator: 4 }, { numerator: 1, denominator: 3 })).toBe(-1);
  });

  it('rejects zero denominator consistently', () => {
    expect(() => normalizeRational({ numerator: 1, denominator: 0 })).toThrowError(
      'Rational denominator cannot be zero.',
    );
  });

  it('supports subtract and integer multiply helpers', () => {
    const half = subtractRational({ numerator: 3, denominator: 4 }, { numerator: 1, denominator: 4 });
    const one = multiplyRationalByInteger({ numerator: 1, denominator: 2 }, 2);

    expect(half).toEqual({ numerator: 1, denominator: 2 });
    expect(one).toEqual({ numerator: 1, denominator: 1 });
  });
});
