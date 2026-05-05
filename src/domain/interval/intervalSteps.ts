import type { SpelledPitch } from '../pitch/SpelledPitch';
import { EDO31_DIVISIONS_PER_OCTAVE } from '../tuning/edo31';
import { absoluteStep31 } from '../tuning/frequency';

export function directedEdoSteps(from: SpelledPitch, to: SpelledPitch): number {
  return absoluteStep31(to) - absoluteStep31(from);
}

export function simpleEdoSteps(edoSteps: number): number {
  const mod = ((edoSteps % EDO31_DIVISIONS_PER_OCTAVE) + EDO31_DIVISIONS_PER_OCTAVE) % EDO31_DIVISIONS_PER_OCTAVE;
  return mod;
}
