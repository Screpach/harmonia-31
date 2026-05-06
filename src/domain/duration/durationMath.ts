import { normalizeRational, type Rational } from './Rational';

export function addRational(a: Rational, b: Rational): Rational {
  return normalizeRational({
    numerator: a.numerator * b.denominator + b.numerator * a.denominator,
    denominator: a.denominator * b.denominator,
  });
}

export function subtractRational(a: Rational, b: Rational): Rational {
  return normalizeRational({
    numerator: a.numerator * b.denominator - b.numerator * a.denominator,
    denominator: a.denominator * b.denominator,
  });
}

export function multiplyRationalByInteger(value: Rational, factor: number): Rational {
  if (!Number.isInteger(factor)) {
    throw new Error('Rational multiplication factor must be an integer.');
  }

  return normalizeRational({
    numerator: value.numerator * factor,
    denominator: value.denominator,
  });
}

export function compareRational(a: Rational, b: Rational): -1 | 0 | 1 {
  const left = a.numerator * b.denominator;
  const right = b.numerator * a.denominator;

  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }

  return 0;
}

export function equalRational(a: Rational, b: Rational): boolean {
  const left = normalizeRational(a);
  const right = normalizeRational(b);

  return left.numerator === right.numerator && left.denominator === right.denominator;
}
