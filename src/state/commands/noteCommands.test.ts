import { describe, expect, it } from 'vitest';
import { normalizeRational } from '../../domain/duration/Rational';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { validateProjectData } from '../../domain/schema/projectSchema';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { applyCommand } from './applyCommand';
import { applyWithHistory, createHistoryState, redo, undo } from './history';

function projectWithMeasure() {
  const project = createEmptyProject('project-edit-001');
  return {
    ...project,
    score: {
      ...project.score,
      measures: [
        {
          id: 'measure-001',
          index: 0,
          events: [],
        },
      ],
    },
  };
}

describe('note command application', () => {
  it('insert note adds exactly one event', () => {
    const project = projectWithMeasure();
    const updated = applyCommand(project, {
      kind: 'insert-note',
      meta: { commandId: 'c1', issuedAt: '2026-05-05T00:00:00.000Z', source: 'user' },
      measureId: 'measure-001',
      eventId: 'event-001',
      voiceId: 'soprano',
      onset: normalizeRational({ numerator: 0, denominator: 1 }),
      duration: normalizeRational({ numerator: 1, denominator: 4 }),
      pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
    });

    expect(updated.score.measures[0].events).toHaveLength(1);
    expect(validateProjectData(updated)).toBeDefined();
  });

  it('delete removes only targeted event', () => {
    const withTwo = {
      ...projectWithMeasure(),
      score: {
        ...projectWithMeasure().score,
        measures: [
          {
            id: 'measure-001',
            index: 0,
            events: [
              {
                id: 'event-001',
                kind: 'note' as const,
                voiceId: 'soprano' as const,
                onset: normalizeRational({ numerator: 0, denominator: 1 }),
                duration: normalizeRational({ numerator: 1, denominator: 4 }),
                pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
              },
              {
                id: 'event-002',
                kind: 'rest' as const,
                voiceId: 'alto' as const,
                onset: normalizeRational({ numerator: 1, denominator: 4 }),
                duration: normalizeRational({ numerator: 1, denominator: 4 }),
              },
            ],
          },
        ],
      },
    };

    const updated = applyCommand(withTwo, {
      kind: 'delete-event',
      meta: { commandId: 'c2', issuedAt: '2026-05-05T00:00:01.000Z', source: 'user' },
      measureId: 'measure-001',
      eventId: 'event-001',
    });

    expect(updated.score.measures[0].events).toHaveLength(1);
    expect(updated.score.measures[0].events[0].id).toBe('event-002');
  });

  it('update pitch preserves explicit spelling', () => {
    const project = {
      ...projectWithMeasure(),
      score: {
        ...projectWithMeasure().score,
        measures: [
          {
            id: 'measure-001',
            index: 0,
            events: [
              {
                id: 'event-001',
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

    const updated = applyCommand(project, {
      kind: 'update-note-pitch',
      meta: { commandId: 'c3', issuedAt: '2026-05-05T00:00:02.000Z', source: 'user' },
      measureId: 'measure-001',
      eventId: 'event-001',
      pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }),
    });

    const updatedEvent = updated.score.measures[0].events[0];
    if (updatedEvent.kind !== 'note') {
      throw new Error('Expected note event.');
    }

    expect(updatedEvent.pitch).toEqual({ letter: 'D', accidental: -1, octave: 4 });
  });

  it('undo/redo works for insert and delete via history snapshots', () => {
    const start = createHistoryState(projectWithMeasure());

    const inserted = applyWithHistory(start, {
      kind: 'insert-note',
      meta: { commandId: 'c4', issuedAt: '2026-05-05T00:00:03.000Z', source: 'user' },
      measureId: 'measure-001',
      eventId: 'event-001',
      voiceId: 'soprano',
      onset: normalizeRational({ numerator: 0, denominator: 1 }),
      duration: normalizeRational({ numerator: 1, denominator: 4 }),
      pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
    });

    const deleted = applyWithHistory(inserted, {
      kind: 'delete-event',
      meta: { commandId: 'c5', issuedAt: '2026-05-05T00:00:04.000Z', source: 'user' },
      measureId: 'measure-001',
      eventId: 'event-001',
    });

    const undoDelete = undo(deleted);
    expect(undoDelete.present.score.measures[0].events).toHaveLength(1);

    const undoInsert = undo(undoDelete);
    expect(undoInsert.present.score.measures[0].events).toHaveLength(0);

    const redoInsert = redo(undoInsert);
    expect(redoInsert.present.score.measures[0].events).toHaveLength(1);
  });
});
