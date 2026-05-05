export const PITCH_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;
export type PitchLetter = (typeof PITCH_LETTERS)[number];

export type SpelledPitch = {
  readonly letter: PitchLetter;
  readonly accidental: number;
  readonly octave: number;
};

export function isPitchLetter(value: string): value is PitchLetter {
  return (PITCH_LETTERS as readonly string[]).includes(value);
}

export function isSpelledPitch(value: unknown): value is SpelledPitch {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.letter === 'string' &&
    isPitchLetter(candidate.letter) &&
    typeof candidate.accidental === 'number' &&
    Number.isInteger(candidate.accidental) &&
    typeof candidate.octave === 'number' &&
    Number.isInteger(candidate.octave)
  );
}

export function makeSpelledPitch(input: SpelledPitch): SpelledPitch {
  if (!isSpelledPitch(input)) {
    throw new Error('Invalid SpelledPitch input.');
  }

  return Object.freeze({ ...input });
}
