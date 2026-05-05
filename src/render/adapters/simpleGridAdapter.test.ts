import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../domain/duration/Rational';
import { simpleGridAdapter } from './simpleGridAdapter';
import type { NotationAdapter } from './NotationAdapter';

function buildProject() {
  const project = createEmptyProject('p1', 'Adapter Test Project');

  return {
    ...project,
    score: {
      ...project.score,
      measures: [
        {
          id: 'm1',
          index: 0,
          events: [
            {
              id: 'e1',
              kind: 'note' as const,
              voiceId: 'soprano' as const,
              onset: normalizeRational({ numerator: 0, denominator: 1 }),
              duration: normalizeRational({ numerator: 1, denominator: 4 }),
              pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
            },
          ],
        },
      ],
    },
  };
}

describe('simpleGridAdapter', () => {
  it('satisfies the notation adapter interface', () => {
    const adapter: NotationAdapter = simpleGridAdapter;
    expect(typeof adapter.render).toBe('function');
  });

  it('maps at least one note to display text', () => {
    const result = simpleGridAdapter.render(buildProject());

    expect(result.kind).toBe('satb-grid');
    expect(result.decisionTag).toBe('awaiting-private-rule-pack');
    expect(result.grid.rows[0]?.cells[0]?.text).toBe('C#4');
  });
});
