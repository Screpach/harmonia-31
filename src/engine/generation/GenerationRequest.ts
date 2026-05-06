import type { Project } from '../../domain/score/Project';
import type { ScoreEvent } from '../../domain/score/Event';
import type { VoiceId } from '../../domain/voice/Voice';

export type GenerationSearchLimits = {
  readonly maxCandidates: number;
  readonly maxNodesVisited: number;
  readonly timeoutMs: number;
};

export type LockedGenerationEvent = {
  readonly eventId: ScoreEvent['id'];
  readonly reason: 'user-locked' | 'pedagogical-anchor' | 'awaiting-private-rule-pack';
};

export type GenerationRequest = {
  readonly project: Project;
  readonly activeVoice: VoiceId;
  readonly targetVoices: readonly VoiceId[];
  readonly selectedFixedVoices: readonly VoiceId[];
  readonly lockedEvents: readonly LockedGenerationEvent[];
  readonly searchLimits: GenerationSearchLimits;
  readonly requestId: string;
  readonly requestedAt: string;
};

export function createGenerationRequest(input: GenerationRequest): GenerationRequest {
  if (!input.targetVoices.includes(input.activeVoice)) {
    throw new Error('activeVoice must be included in targetVoices.');
  }

  if (new Set(input.targetVoices).size !== input.targetVoices.length) {
    throw new Error('targetVoices must not contain duplicates.');
  }

  if (input.targetVoices.length === 0) {
    throw new Error('targetVoices must include at least one voice.');
  }

  if (input.searchLimits.maxCandidates < 1 || input.searchLimits.maxNodesVisited < 1 || input.searchLimits.timeoutMs < 1) {
    throw new Error('searchLimits values must be positive.');
  }

  return input;
}
