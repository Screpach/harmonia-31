import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import type { Project } from '../../domain/score/Project';
import { DEFAULT_31EDO_TUNING } from '../../domain/tuning/TuningSystem';
import { VOICE_IDS } from '../../domain/voice/Voice';
import { createAudioSchedule } from './createAudioSchedule';

function fixtureProject(events: Project['score']['measures'][number]['events']): Project {
  return {
    schemaVersion: 1,
    id: 'audio-fixture',
    title: 'Audio Fixture',
    tuning: DEFAULT_31EDO_TUNING,
    createdAt: '2026-05-06T00:00:00.000Z',
    updatedAt: '2026-05-06T00:00:00.000Z',
    score: {
      tempoBpm: 120,
      timeSignature: { numerator: 4, denominator: 4 },
      voices: VOICE_IDS,
      measures: [{ id: 'm1', index: 0, events }],
    },
  };
}

describe('createAudioSchedule', () => {
  it('schedules C# and Db as distinct frequencies', () => {
    const project = fixtureProject([
      {
        id: 'e-csharp',
        kind: 'note',
        voiceId: 'soprano',
        onset: { numerator: 0, denominator: 1 },
        duration: { numerator: 1, denominator: 4 },
        pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
      },
      {
        id: 'e-dflat',
        kind: 'note',
        voiceId: 'alto',
        onset: { numerator: 0, denominator: 1 },
        duration: { numerator: 1, denominator: 4 },
        pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }),
      },
    ]);

    const schedule = createAudioSchedule(project);
    expect(schedule).toHaveLength(2);
    expect(schedule[0]!.frequencyHz).not.toBe(schedule[1]!.frequencyHz);
  });

  it('ignores rest events', () => {
    const project = fixtureProject([
      {
        id: 'rest-1',
        kind: 'rest',
        voiceId: 'tenor',
        onset: { numerator: 0, denominator: 1 },
        duration: { numerator: 1, denominator: 1 },
      },
    ]);

    const schedule = createAudioSchedule(project);
    expect(schedule).toHaveLength(0);
  });

  it('sorts by start beat and then voice order', () => {
    const project = fixtureProject([
      {
        id: 'late-soprano',
        kind: 'note',
        voiceId: 'soprano',
        onset: { numerator: 1, denominator: 4 },
        duration: { numerator: 1, denominator: 4 },
        pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }),
      },
      {
        id: 'early-bass',
        kind: 'note',
        voiceId: 'bass',
        onset: { numerator: 0, denominator: 1 },
        duration: { numerator: 1, denominator: 4 },
        pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 3 }),
      },
      {
        id: 'early-alto',
        kind: 'note',
        voiceId: 'alto',
        onset: { numerator: 0, denominator: 1 },
        duration: { numerator: 1, denominator: 4 },
        pitch: makeSpelledPitch({ letter: 'E', accidental: 0, octave: 4 }),
      },
    ]);

    const schedule = createAudioSchedule(project);
    expect(schedule.map((event) => event.eventId)).toEqual(['early-alto', 'early-bass', 'late-soprano']);
  });
});
