import { isPitchLetter, makeSpelledPitch, type SpelledPitch } from './SpelledPitch';

const PITCH_PATTERN = /^([A-G])([#bx♯♭]*)(-?\d+)$/;

function parseAccidental(accidentalToken: string): number | null {
  if (accidentalToken.length === 0) {
    return 0;
  }

  let total = 0;
  for (const char of accidentalToken) {
    if (char === '#' || char === '♯') {
      total += 1;
    } else if (char === 'b' || char === '♭') {
      total -= 1;
    } else if (char === 'x') {
      total += 2;
    } else {
      return null;
    }
  }

  return total;
}

export function parsePitch(input: string): SpelledPitch | null {
  const trimmed = input.trim();
  const match = PITCH_PATTERN.exec(trimmed);

  if (!match) {
    return null;
  }

  const [, letterToken, accidentalToken, octaveToken] = match;

  if (!isPitchLetter(letterToken)) {
    return null;
  }

  const accidental = parseAccidental(accidentalToken);
  const octave = Number(octaveToken);

  if (accidental === null || !Number.isInteger(octave)) {
    return null;
  }

  return makeSpelledPitch({
    letter: letterToken,
    accidental,
    octave,
  });
}
