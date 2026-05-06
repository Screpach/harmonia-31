import type { SpelledPitch } from '../pitch/SpelledPitch';
import { genericIntervalNumber } from './genericInterval';
import { directedEdoSteps, simpleEdoSteps } from './intervalSteps';

export type IntervalDirection = 'ascending' | 'descending' | 'unison';

export type NamedInterval = {
  readonly genericNumber: number;
  readonly direction: IntervalDirection;
  readonly edoSteps: number;
  readonly simpleEdoSteps: number;
  readonly quality: 'unknown';
};

export function buildNamedInterval(from: SpelledPitch, to: SpelledPitch): NamedInterval {
  const edoSteps = directedEdoSteps(from, to);
  const generic = genericIntervalNumber(from, to);

  const direction: IntervalDirection = edoSteps > 0 ? 'ascending' : edoSteps < 0 ? 'descending' : 'unison';

  return {
    genericNumber: Math.abs(generic),
    direction,
    edoSteps,
    simpleEdoSteps: simpleEdoSteps(edoSteps),
    quality: 'unknown',
  };
}
