import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../domain/score/createEmptyProject';
import { normalizeRational } from '../domain/duration/Rational';
import { makeSpelledPitch } from '../domain/pitch/SpelledPitch';
import { exportNativeProject } from './export/exportNativeProject';
import { importNativeProject, ImportNativeProjectError } from './import/importNativeProject';

describe('native JSON import/export', () => {
  it('round-trips project preserving spelled pitches and tuning', () => {
    const base = createEmptyProject('json-roundtrip');
    const project = {
      ...base,
      tuning: { referencePitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }), referenceFrequency: 442 },
      score: {
        ...base.score,
        measures: [{ id: 'm1', index: 0, events: [{ id: 'n1', kind: 'note' as const, voiceId: 'soprano' as const, onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }) }] }],
      },
    };

    const exported = exportNativeProject(project);
    const imported = importNativeProject(exported);

    const note = imported.score.measures[0]?.events[0];
    expect(imported.tuning.referencePitch.letter).toBe('C');
    expect(imported.tuning.referencePitch.accidental).toBe(1);
    expect(note && note.kind === 'note' ? note.pitch.accidental : null).toBe(-1);
  });

  it('invalid JSON reports controlled error', () => {
    expect(() => importNativeProject('{bad')).toThrow(ImportNativeProjectError);
  });

  it('future schema version follows migration policy and fails clearly', () => {
    const payload = JSON.stringify({ schemaVersion: 999, id: 'x' });
    expect(() => importNativeProject(payload)).toThrow(ImportNativeProjectError);
  });
});
