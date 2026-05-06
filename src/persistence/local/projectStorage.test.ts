import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../domain/duration/Rational';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { createProjectStorage } from './projectStorage';

function memoryStorage() {
  const m = new Map<string, string>();
  return {
    getItem: (key: string) => m.get(key) ?? null,
    setItem: (key: string, value: string) => m.set(key, value),
    removeItem: (key: string) => m.delete(key),
  };
}

describe('projectStorage', () => {
  it('save/load round-trip preserves C# and Db spellings', () => {
    const base = createEmptyProject('persist');
    const project = {
      ...base,
      score: {
        ...base.score,
        measures: [{
          id: 'm1',
          index: 0,
          events: [
            { id: 's1', kind: 'note' as const, voiceId: 'soprano' as const, onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }) },
            { id: 'a1', kind: 'note' as const, voiceId: 'alto' as const, onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }) },
          ],
        }],
      },
    };

    const storage = createProjectStorage(memoryStorage());
    storage.save(project);
    const loaded = storage.load();

    const notes = loaded?.score.measures[0]?.events.filter((e): e is Extract<typeof e, { kind: 'note' }> => e.kind === 'note') ?? [];
    expect(notes.some((n) => n.pitch.letter === 'C' && n.pitch.accidental === 1)).toBe(true);
    expect(notes.some((n) => n.pitch.letter === 'D' && n.pitch.accidental === -1)).toBe(true);
  });

  it('invalid stored data returns null and does not throw', () => {
    const storage = memoryStorage();
    storage.setItem('harmonia31.current-project.v1', '{ bad-json');
    const repo = createProjectStorage(storage);
    expect(() => repo.load()).not.toThrow();
    expect(repo.load()).toBeNull();
  });

  it('storage layer is mockable', () => {
    const spy = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
    const repo = createProjectStorage(spy);
    expect(repo.load()).toBeNull();
  });
});
