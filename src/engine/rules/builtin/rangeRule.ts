import { formatPitch } from '../../../domain/pitch/formatPitch';
import { DEFAULT_VOICE_RANGES } from '../../../domain/voice/defaultRanges';
import { checkVoiceRange } from '../../../domain/voice/rangeCheck';
import { createDiagnostic } from '../../diagnostics/Diagnostic';
import { atEvent } from '../../diagnostics/locations';
import type { RulePlugin } from '../RulePlugin';

export const rangeRule: RulePlugin = {
  id: 'builtin.range',
  version: '0.1.0',
  modes: ['mechanical'],
  requiredData: { kind: 'none' },
  analyze(context) {
    const diagnostics = context.project.score.measures.flatMap((measure) =>
      measure.events.flatMap((event) => {
        if (event.kind !== 'note') return [];
        const status = checkVoiceRange(event.pitch, DEFAULT_VOICE_RANGES[event.voiceId]);
        if (status.status !== 'outside-hard-range') return [];
        return [createDiagnostic({
          severity: 'warning',
          category: 'spacing',
          message: `${event.voiceId} note ${formatPitch(event.pitch, 'ascii')} is outside configured hard range.`,
          beginnerExplanation: 'This note is outside the project\'s configured voice range for that part.',
          technicalExplanation: 'Mechanical range check failed against DEFAULT_VOICE_RANGES hard bounds.',
          locations: [atEvent(measure.id, event.id, event.voiceId)],
          provenance: { source: 'analyzer', analyzerId: 'builtin.range' },
        })];
      }),
    );
    return { status: 'ok', diagnostics };
  },
};
