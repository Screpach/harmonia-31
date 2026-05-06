export const EDO31_DIVISIONS_PER_OCTAVE = 31 as const;
export const EDO31_STEP_SIZE_CENTS = 1200 / EDO31_DIVISIONS_PER_OCTAVE;

export const EDO31_LETTER_BASE_STEPS = Object.freeze({
  C: 0,
  D: 5,
  E: 10,
  F: 13,
  G: 18,
  A: 23,
  B: 28,
} as const);

export const EDO31_ACCIDENTAL_SHIFT_STEPS = Object.freeze({
  flat: -2,
  natural: 0,
  sharp: 2,
} as const);
