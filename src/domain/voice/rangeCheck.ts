import type { SpelledPitch } from '../pitch/SpelledPitch';
import { absoluteStep31 } from '../tuning/frequency';
import type { VoiceRange } from './Voice';

export type VoiceRangeStatus = 'hard-ok' | 'outside-hard-range' | 'outside-comfort-range';

export type VoiceRangeCheckResult = {
  readonly status: VoiceRangeStatus;
  readonly inHardRange: boolean;
  readonly inComfortRange: boolean;
};

export function checkVoiceRange(pitch: SpelledPitch, range: VoiceRange): VoiceRangeCheckResult {
  const pitchStep = absoluteStep31(pitch);
  const hardLowStep = absoluteStep31(range.hardLow);
  const hardHighStep = absoluteStep31(range.hardHigh);

  const inHardRange = pitchStep >= hardLowStep && pitchStep <= hardHighStep;
  if (!inHardRange) {
    return {
      status: 'outside-hard-range',
      inHardRange: false,
      inComfortRange: false,
    };
  }

  const hasComfortBounds = Boolean(range.comfortableLow && range.comfortableHigh);
  if (!hasComfortBounds) {
    return {
      status: 'hard-ok',
      inHardRange: true,
      inComfortRange: true,
    };
  }

  const comfortableLowStep = absoluteStep31(range.comfortableLow!);
  const comfortableHighStep = absoluteStep31(range.comfortableHigh!);
  const inComfortRange = pitchStep >= comfortableLowStep && pitchStep <= comfortableHighStep;

  return {
    status: inComfortRange ? 'hard-ok' : 'outside-comfort-range',
    inHardRange: true,
    inComfortRange,
  };
}
