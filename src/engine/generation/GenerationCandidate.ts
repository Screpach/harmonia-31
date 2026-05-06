import type { ScoreEvent } from '../../domain/score/Event';
import type { Diagnostic } from '../diagnostics/Diagnostic';

export type GenerationScoreBreakdown = {
  readonly total: number;
  readonly mechanicalPenalty: number;
  readonly stylisticPenalty: number;
  readonly tieBreaker: number;
};

export type GenerationCandidate = {
  readonly candidateId: string;
  readonly rank: number;
  readonly generatedEvents: readonly ScoreEvent[];
  readonly replacedEventIds: readonly ScoreEvent['id'][];
  readonly score: GenerationScoreBreakdown;
  readonly diagnostics: readonly Diagnostic[];
  readonly explanation: string;
};
