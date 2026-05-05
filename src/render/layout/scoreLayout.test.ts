import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../domain/duration/Rational';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { layoutScore } from './scoreLayout';

describe('score layout contract', () => {
  it('returns all four SATB rows', () => {
    const project = createEmptyProject('layout-001');
    const layout = layoutScore(project, { width: 800, zoom: 1 });

    expect(layout.staves.map((s) => s.voiceId)).toEqual(['soprano', 'alto', 'tenor', 'bass']);
  });

  it('returns stable note bounds with note ID', () => {
    const base = createEmptyProject('layout-002');
    const project = {
      ...base,
      score: {
        ...base.score,
        measures: [
          {
            id: 'measure-001',
            index: 0,
            events: [
              {
                id: 'event-note-001',
                kind: 'note' as const,
                voiceId: 'soprano' as const,
                onset: normalizeRational({ numerator: 1, denominator: 4 }),
                duration: normalizeRational({ numerator: 1, denominator: 4 }),
                pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
              },
            ],
          },
        ],
      },
    };

    const layout = layoutScore(project, { width: 800, zoom: 1 });
    expect(layout.events).toHaveLength(1);
    expect(layout.events[0].eventId).toBe('event-note-001');
    expect(layout.events[0].bounds.x).toBeGreaterThan(0);
  });

  it('changing zoom or width affects coordinates predictably', () => {
    const base = createEmptyProject('layout-003');
    const project = {
      ...base,
      score: {
        ...base.score,
        measures: [
          {
            id: 'measure-001',
            index: 0,
            events: [
              {
                id: 'event-note-002',
                kind: 'note' as const,
                voiceId: 'alto' as const,
                onset: normalizeRational({ numerator: 1, denominator: 2 }),
                duration: normalizeRational({ numerator: 1, denominator: 4 }),
                pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }),
              },
            ],
          },
        ],
      },
    };

    const narrow = layoutScore(project, { width: 400, zoom: 1 });
    const wide = layoutScore(project, { width: 800, zoom: 1 });
    const zoomed = layoutScore(project, { width: 800, zoom: 2 });

    expect(wide.events[0].bounds.x).toBeGreaterThan(narrow.events[0].bounds.x);
    expect(zoomed.events[0].bounds.width).toBeGreaterThan(wide.events[0].bounds.width);
  });
});
