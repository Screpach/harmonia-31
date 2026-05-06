import { describe, expect, it } from 'vitest';
import { DEFAULT_31EDO_TUNING } from '../../domain/tuning/TuningSystem';
import { VOICE_IDS } from '../../domain/voice/Voice';
import { validateProjectData } from '../../domain/schema/projectSchema';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import type { Project } from '../../domain/score/Project';
import { generateFromFixedVoice } from './generateFromFixedVoice';
import { createGenerationRequest } from './GenerationRequest';

function makeFixture(sopranoOctave = 5): Project {
  return {
    schemaVersion: 1,
    id: 'gen-fixture',
    title: 'Generation Fixture',
    tuning: DEFAULT_31EDO_TUNING,
    createdAt: '2026-05-06T00:00:00.000Z',
    updatedAt: '2026-05-06T00:00:00.000Z',
    score: {
      tempoBpm: 96,
      timeSignature: { numerator: 4, denominator: 4 },
      voices: VOICE_IDS,
      measures: [
        {
          id: 'm1',
          index: 0,
          events: [
            {
              id: 'fixed-s',
              kind: 'note',
              voiceId: 'soprano',
              onset: { numerator: 0, denominator: 1 },
              duration: { numerator: 1, denominator: 1 },
              pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: sopranoOctave }),
            },
          ],
        },
      ],
    },
  };
}

describe('generateFromFixedVoice', () => {
  it('returns at least one candidate for other voices from one fixed soprano note', () => {
    const request = createGenerationRequest({
      project: makeFixture(),
      requestId: 'req-synth-1',
      requestedAt: '2026-05-06T00:00:00.000Z',
      activeVoice: 'soprano',
      targetVoices: ['soprano', 'alto', 'tenor', 'bass'],
      selectedFixedVoices: ['soprano'],
      lockedEvents: [{ eventId: 'fixed-s', reason: 'user-locked' }],
      searchLimits: { maxCandidates: 1, maxNodesVisited: 10, timeoutMs: 50 },
    });

    const result = generateFromFixedVoice(request);
    expect(result.candidates.length).toBeGreaterThan(0);
  });

  it('generated notes pass project schema validation when merged into measure', () => {
    const project = makeFixture();
    const request = createGenerationRequest({
      project,
      requestId: 'req-synth-2',
      requestedAt: '2026-05-06T00:00:00.000Z',
      activeVoice: 'soprano',
      targetVoices: ['soprano', 'alto', 'tenor', 'bass'],
      selectedFixedVoices: ['soprano'],
      lockedEvents: [],
      searchLimits: { maxCandidates: 1, maxNodesVisited: 10, timeoutMs: 50 },
    });

    const result = generateFromFixedVoice(request);
    const candidate = result.candidates[0];
    const merged = {
      ...project,
      score: {
        ...project.score,
        measures: [
          {
            ...project.score.measures[0]!,
            events: [...project.score.measures[0]!.events, ...(candidate?.generatedEvents ?? [])],
          },
        ],
      },
    };

    expect(() => validateProjectData(merged)).not.toThrow();
  });

  it('candidate includes score breakdown and provisional explanation', () => {
    const request = createGenerationRequest({
      project: makeFixture(),
      requestId: 'req-synth-3',
      requestedAt: '2026-05-06T00:00:00.000Z',
      activeVoice: 'soprano',
      targetVoices: ['soprano', 'alto', 'tenor', 'bass'],
      selectedFixedVoices: ['soprano'],
      lockedEvents: [],
      searchLimits: { maxCandidates: 1, maxNodesVisited: 10, timeoutMs: 50 },
    });

    const candidate = generateFromFixedVoice(request).candidates[0];
    expect(candidate?.score.mechanicalPenalty).toBeGreaterThanOrEqual(0);
    expect(candidate?.explanation.includes('Synthetic/provisional')).toBe(true);
  });

  it('returns no candidates when impossible constraints are supplied', () => {
    const request = createGenerationRequest({
      project: makeFixture(8),
      requestId: 'req-synth-4',
      requestedAt: '2026-05-06T00:00:00.000Z',
      activeVoice: 'soprano',
      targetVoices: ['soprano', 'alto', 'tenor', 'bass'],
      selectedFixedVoices: ['soprano'],
      lockedEvents: [],
      searchLimits: { maxCandidates: 1, maxNodesVisited: 10, timeoutMs: 50 },
    });

    const result = generateFromFixedVoice(request);
    expect(result.candidates).toHaveLength(0);
    expect(result.status).toBe('rejected');
  });
});
