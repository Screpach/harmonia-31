import type { PitchLetter, SpelledPitch } from '../pitch/SpelledPitch';

const LETTER_ORDER: readonly PitchLetter[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

function letterIndex(letter: PitchLetter): number {
  return LETTER_ORDER.indexOf(letter);
}

export function genericIntervalNumber(from: SpelledPitch, to: SpelledPitch): number {
  const letterDelta = letterIndex(to.letter) - letterIndex(from.letter);
  const octaveDelta = to.octave - from.octave;

  return octaveDelta * 7 + letterDelta + 1;
}
