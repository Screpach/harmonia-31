import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import type { ScoreEvent } from '../../domain/score/Event';
import { DEFAULT_VOICE_RANGES } from '../../domain/voice/defaultRanges';
import type { VoiceId } from '../../domain/voice/Voice';
import type { GenerationCandidate } from './GenerationCandidate';
import type { GenerationRequest } from './GenerationRequest';
import type { GenerationResult } from './GenerationResult';
import { scoreCandidate } from './scoring';

const VOICE_OCTAVE_OFFSETS: Readonly<Record<VoiceId, number>> = {
  soprano: 0,
  alto: -1,
  tenor: -1,
  bass: -2,
};

export function generateFromFixedVoice(request: GenerationRequest): GenerationResult {
  const measure = request.project.score.measures[0];
  const fixedNote = measure?.events.find(
    (event): event is Extract<ScoreEvent, { kind: 'note' }> => event.kind === 'note' && event.voiceId === request.activeVoice,
  );

  if (!measure || !fixedNote) {
    return {
      requestId: request.requestId,
      status: 'rejected',
      candidates: [],
      rejectionReasons: [{ code: 'no-valid-candidates', detail: 'No fixed note found for active voice in first measure.' }],
      explanation: 'Synthetic/provisional generator could not locate the required fixed note.',
      telemetry: { elapsedMs: 0, nodesVisited: 0, workerReady: false, cancellationSupported: false },
    };
  }

  const generatedEvents: ScoreEvent[] = request.targetVoices
    .filter((voiceId) => voiceId !== request.activeVoice)
    .map((voiceId) => ({
      id: `gen-${request.requestId}-${voiceId}`,
      kind: 'note' as const,
      voiceId,
      onset: fixedNote.onset,
      duration: fixedNote.duration,
      pitch: makeSpelledPitch({
        letter: fixedNote.pitch.letter,
        accidental: fixedNote.pitch.accidental,
        octave: fixedNote.pitch.octave + VOICE_OCTAVE_OFFSETS[voiceId],
      }),
    }));

  const scored = scoreCandidate({
    measureId: measure.id,
    generatedEvents: [fixedNote, ...generatedEvents],
    ranges: DEFAULT_VOICE_RANGES,
  });

  if (scored.hardConstraintViolation) {
    return {
      requestId: request.requestId,
      status: 'rejected',
      candidates: [],
      rejectionReasons: [{ code: 'no-valid-candidates', detail: 'Synthetic mechanical constraints failed.' }],
      explanation: 'Synthetic/provisional generator rejected all candidates under current hard constraints.',
      telemetry: { elapsedMs: 1, nodesVisited: 1, workerReady: false, cancellationSupported: false },
    };
  }

  const candidate: GenerationCandidate = {
    candidateId: `cand-${request.requestId}-0`,
    rank: 1,
    generatedEvents,
    replacedEventIds: [],
    diagnostics: scored.diagnostics,
    score: scored.score,
    explanation:
      'Synthetic/provisional candidate only: deterministic placeholder pending rule/chord data packs (awaiting-private-rule-pack).',
  };

  return {
    requestId: request.requestId,
    status: 'ok',
    candidates: [candidate],
    rejectionReasons: [],
    explanation: 'Synthetic/provisional generation completed with deterministic placeholder logic.',
    telemetry: { elapsedMs: 1, nodesVisited: 1, workerReady: false, cancellationSupported: false },
  };
}
