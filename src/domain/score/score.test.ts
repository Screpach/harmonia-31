import { describe, expect, it } from 'vitest';
import { normalizeRational } from '../duration/Rational';
import type { ScoreEvent } from './Event';
import { createEmptyProject } from './createEmptyProject';

describe('score project model', () => {
  it('creates empty project with all four voices', () => {
    const project = createEmptyProject('project-001');
    expect(project.score.voices).toEqual(['soprano', 'alto', 'tenor', 'bass']);
  });

  it('uses default 31-EDO reference tuning', () => {
    const project = createEmptyProject('project-002');
    expect(project.tuning.referencePitch).toEqual({ letter: 'A', accidental: 0, octave: 4 });
    expect(project.tuning.referenceFrequency).toBe(440);
  });

  it('models event onset/duration as rationals and ids as stable strings', () => {
    const event: ScoreEvent = {
      id: 'event-voice-soprano-0001',
      kind: 'note',
      voiceId: 'soprano',
      pitch: { letter: 'C', accidental: 1, octave: 4 },
      onset: normalizeRational({ numerator: 1, denominator: 4 }),
      duration: normalizeRational({ numerator: 1, denominator: 8 }),
    };

    expect(typeof event.id).toBe('string');
    expect(event.id).not.toBe('0');
    expect(event.onset).toEqual({ numerator: 1, denominator: 4 });
    expect(event.duration).toEqual({ numerator: 1, denominator: 8 });
  });

  it('serializes project without circular references', () => {
    const project = createEmptyProject('project-003', 'Fixture');
    const serialized = JSON.stringify(project);

    expect(serialized).toContain('"schemaVersion":1');
    expect(serialized).toContain('"voices":["soprano","alto","tenor","bass"]');
  });
});
