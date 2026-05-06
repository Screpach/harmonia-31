import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import type { GenerationCandidate } from './GenerationCandidate';
import { createGenerationRequest } from './GenerationRequest';
import type { GenerationResult } from './GenerationResult';

describe('generation contracts', () => {
  it('validates active voice and target voices', () => {
    const project = createEmptyProject('generation');

    expect(() =>
      createGenerationRequest({
        project,
        requestId: 'req-1',
        requestedAt: '2026-05-06T00:00:00.000Z',
        activeVoice: 'alto',
        targetVoices: ['soprano'],
        selectedFixedVoices: ['tenor'],
        lockedEvents: [],
        searchLimits: { maxCandidates: 4, maxNodesVisited: 500, timeoutMs: 2000 },
      }),
    ).toThrow('activeVoice must be included in targetVoices.');
  });

  it('candidate contains generated events and explanation', () => {
    const candidate: GenerationCandidate = {
      candidateId: 'cand-1',
      rank: 1,
      generatedEvents: [
        {
          id: 'ev-1',
          kind: 'note',
          voiceId: 'soprano',
          onset: { numerator: 0, denominator: 1 },
          duration: { numerator: 1, denominator: 1 },
          pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
        },
      ],
      replacedEventIds: ['ev-old-1'],
      score: { total: 10, mechanicalPenalty: 1, stylisticPenalty: 2, tieBreaker: 0 },
      diagnostics: [],
      explanation: 'Synthetic candidate for contract testing.',
    };

    expect(candidate.generatedEvents[0]?.id).toBe('ev-1');
    expect(candidate.explanation.length).toBeGreaterThan(0);
  });

  it('result is JSON-safe for transport and persistence', () => {
    const result: GenerationResult = {
      requestId: 'req-1',
      status: 'ok',
      candidates: [],
      rejectionReasons: [],
      explanation: 'No algorithm yet; contract only.',
      telemetry: { elapsedMs: 3, nodesVisited: 0, workerReady: false, cancellationSupported: false },
    };

    expect(() => JSON.parse(JSON.stringify(result))).not.toThrow();
  });
});
