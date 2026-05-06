import type { SpelledPitch } from './SpelledPitch';

export type PitchFormatStyle = 'symbol' | 'ascii';

function accidentalToString(accidental: number, style: PitchFormatStyle): string {
  if (accidental === 0) {
    return '';
  }

  const up = accidental > 0;
  const count = Math.abs(accidental);

  if (style === 'symbol') {
    return up ? '♯'.repeat(count) : '♭'.repeat(count);
  }

  return up ? '#'.repeat(count) : 'b'.repeat(count);
}

export function formatPitch(pitch: SpelledPitch, style: PitchFormatStyle = 'symbol'): string {
  return `${pitch.letter}${accidentalToString(pitch.accidental, style)}${pitch.octave}`;
}
