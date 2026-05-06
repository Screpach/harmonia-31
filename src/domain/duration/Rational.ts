export type Rational = {
  readonly numerator: number;
  readonly denominator: number;
};

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);

  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }

  return x === 0 ? 1 : x;
}

export function normalizeRational(input: Rational): Rational {
  if (!Number.isInteger(input.numerator) || !Number.isInteger(input.denominator)) {
    throw new Error('Rational values must be integers.');
  }

  if (input.denominator === 0) {
    throw new Error('Rational denominator cannot be zero.');
  }

  const sign = input.denominator < 0 ? -1 : 1;
  const numerator = input.numerator * sign;
  const denominator = input.denominator * sign;
  const divisor = gcd(numerator, denominator);

  return Object.freeze({
    numerator: numerator / divisor,
    denominator: denominator / divisor,
  });
}
