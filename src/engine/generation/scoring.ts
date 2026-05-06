import type { ScoreEvent } from '../../domain/score/Event';
import { absoluteStep31 } from '../../domain/tuning/frequency';
import { checkVoiceRange } from '../../domain/voice/rangeCheck';
import type { VoiceId, VoiceRangeMap } from '../../domain/voice/Voice';
import { createDiagnostic, type Diagnostic } from '../diagnostics/Diagnostic';
import { atEvent } from '../diagnostics/locations';
import type { GenerationScoreBreakdown } from './GenerationCandidate';

const ORDER: readonly VoiceId[] = ['soprano', 'alto', 'tenor', 'bass'];

export type ScoreCandidateInput = {
  readonly measureId: string;
  readonly generatedEvents: readonly ScoreEvent[];
  readonly ranges: VoiceRangeMap;
};

export type ScoreCandidateResult = {
  readonly score: GenerationScoreBreakdown;
  readonly diagnostics: readonly Diagnostic[];
  readonly hardConstraintViolation: boolean;
};

export function scoreCandidate(input: ScoreCandidateInput): ScoreCandidateResult {
  const diagnostics: Diagnostic[] = [];
  let mechanicalPenalty = 0;
  let hardConstraintViolation = false;

  const notes = input.generatedEvents.filter((event): event is Extract<ScoreEvent, { kind: 'note' }> => event.kind === 'note');

  for (const note of notes) {
    const rangeStatus = checkVoiceRange(note.pitch, input.ranges[note.voiceId]);
    if (!rangeStatus.inHardRange) {
      hardConstraintViolation = true;
      mechanicalPenalty += 100;
      diagnostics.push(createDiagnostic({
        severity: 'error',
        category: 'voice-leading',
        message: `Generated ${note.voiceId} note is outside hard range.`,
        beginnerExplanation: 'This generated note is outside the configured hard range for the voice.',
        technicalExplanation: 'Hard-range guard failed during synthetic generation scoring.',
        locations: [atEvent(input.measureId, note.id, note.voiceId)],
        provenance: { source: 'synthetic', analyzerId: 'generation.scoring' },
      }));
    }
  }

  const byVoice = new Map(notes.map((note) => [note.voiceId, note] as const));
  for (let i = 0; i < ORDER.length - 1; i += 1) {
    const upper = byVoice.get(ORDER[i]);
    const lower = byVoice.get(ORDER[i + 1]);
    if (!upper || !lower) continue;
    if (absoluteStep31(upper.pitch) < absoluteStep31(lower.pitch)) {
      hardConstraintViolation = true;
      mechanicalPenalty += 50;
      diagnostics.push(createDiagnostic({
        severity: 'warning',
        category: 'voice-leading',
        message: `Generated voices cross between ${upper.voiceId} and ${lower.voiceId}.`,
        beginnerExplanation: 'An upper generated voice fell below a lower voice.',
        technicalExplanation: 'Voice-order check failed during synthetic generation scoring.',
        locations: [atEvent(input.measureId, upper.id, upper.voiceId), atEvent(input.measureId, lower.id, lower.voiceId)],
        provenance: { source: 'synthetic', analyzerId: 'generation.scoring' },
      }));
    }
  }

  return {
    hardConstraintViolation,
    diagnostics,
    score: {
      total: -(mechanicalPenalty),
      mechanicalPenalty,
      stylisticPenalty: 0,
      tieBreaker: 0,
    },
  };
}
