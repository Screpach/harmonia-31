import { normalizeRational } from '../../domain/duration/Rational';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import type { Project } from '../../domain/score/Project';
import { createEmptyProject } from '../../domain/score/createEmptyProject';

export function createDemoProject(): Project {
  const base = createEmptyProject('demo-project', 'SATB Grid Demo');
  return {
    ...base,
    score: {
      ...base.score,
      measures: [{ id: 'm1', index: 0, events: [
        { id: 'e-s-csharp', kind: 'note', voiceId: 'soprano', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }) },
        { id: 'e-a-db', kind: 'note', voiceId: 'alto', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }) },
      ] }],
    },
  };
}
