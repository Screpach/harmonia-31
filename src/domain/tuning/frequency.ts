import type { SpelledPitch } from '../pitch/SpelledPitch';
import { EDO31_DIVISIONS_PER_OCTAVE, EDO31_LETTER_BASE_STEPS } from './edo31';
import { DEFAULT_31EDO_TUNING, type ThirtyOneEdoTuning } from './TuningSystem';

const STEPS_PER_ACCIDENTAL = 2;

function baseStepOfPitchClass(pitch: SpelledPitch): number {
  const natural = EDO31_LETTER_BASE_STEPS[pitch.letter];
  return natural + pitch.accidental * STEPS_PER_ACCIDENTAL;
}

export function absoluteStep31(pitch: SpelledPitch): number {
  const pitchClassStep = baseStepOfPitchClass(pitch);
  const octaveShift = Math.floor(pitchClassStep / EDO31_DIVISIONS_PER_OCTAVE);
  const normalizedPitchClassStep = ((pitchClassStep % EDO31_DIVISIONS_PER_OCTAVE) + EDO31_DIVISIONS_PER_OCTAVE) % EDO31_DIVISIONS_PER_OCTAVE;

  return (pitch.octave + octaveShift) * EDO31_DIVISIONS_PER_OCTAVE + normalizedPitchClassStep;
}

export function frequencyOfPitch(
  pitch: SpelledPitch,
  tuning: ThirtyOneEdoTuning = DEFAULT_31EDO_TUNING,
): number {
  const targetStep = absoluteStep31(pitch);
  const referenceStep = absoluteStep31(tuning.referencePitch);
  const relativeSteps = targetStep - referenceStep;

  return tuning.referenceFrequency * 2 ** (relativeSteps / EDO31_DIVISIONS_PER_OCTAVE);
}
