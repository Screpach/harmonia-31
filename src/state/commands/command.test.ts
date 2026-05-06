import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { applyCommand } from './applyCommand';
import { applyWithHistory, createHistoryState, redo, undo } from './history';

describe('command pattern foundation', () => {
  it('no-op command preserves structural equality', () => {
    const project = createEmptyProject('project-command-001');
    const result = applyCommand(project, {
      kind: 'noop',
      meta: {
        commandId: 'cmd-001',
        issuedAt: '2026-05-05T00:00:00.000Z',
        source: 'user',
      },
      reason: 'test no-op',
    });

    expect(result).toEqual(project);
  });

  it('undo and redo work around a no-op command', () => {
    const initial = createEmptyProject('project-command-002');
    const start = createHistoryState(initial);

    const applied = applyWithHistory(start, {
      kind: 'noop',
      meta: {
        commandId: 'cmd-002',
        issuedAt: '2026-05-05T00:00:01.000Z',
        source: 'user',
      },
    });

    expect(applied.past).toHaveLength(1);

    const undone = undo(applied);
    expect(undone.present).toEqual(initial);
    expect(undone.future).toHaveLength(1);

    const redone = redo(undone);
    expect(redone.present).toEqual(initial);
    expect(redone.past).toHaveLength(1);
  });

  it('history operations do not mutate original project object', () => {
    const initial = createEmptyProject('project-command-003');
    const snapshot = JSON.stringify(initial);
    const start = createHistoryState(initial);

    const applied = applyWithHistory(start, {
      kind: 'noop',
      meta: {
        commandId: 'cmd-003',
        issuedAt: '2026-05-05T00:00:02.000Z',
        source: 'system',
      },
    });

    undo(applied);
    redo(applied);

    expect(JSON.stringify(initial)).toBe(snapshot);
  });
});
