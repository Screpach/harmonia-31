import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Edo31Keyboard from './Edo31Keyboard';
import { useProjectStore } from '../../state/projectStore';
import { useAppStore } from '../../state/useAppStore';
import { createHistoryState } from '../../state/commands/history';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { validateProjectData } from '../../domain/schema/projectSchema';

function resetProjectStore() {
  const base = createEmptyProject('p-note-entry', 'Note Entry Test');
  const project = { ...base, score: { ...base.score, measures: [{ id: 'm1', index: 0, events: [] }] } };
  useProjectStore.setState({ history: createHistoryState(project) });
}

describe('keyboard note entry', () => {
  beforeEach(() => {
    resetProjectStore();
    useAppStore.setState({ activeVoice: 'soprano', selectedEventIds: [] });
  });
  afterEach(() => cleanup());

  it('clicking C# inserts C# note and records history', () => {
    const apply = useProjectStore.getState().applyKeyboardPitch;
    render(<Edo31Keyboard onKeyPress={({ spelling }) => {
      if (spelling === 'C#') apply({ letter: 'C', accidental: 1, octave: 4 }, { activeVoice: 'soprano', selectedEventId: null });
    }} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Step 2: C#' })[0]);

    const state = useProjectStore.getState().history;
    const event = state.present.score.measures[0]?.events[0];
    expect(event && event.kind === 'note' ? event.pitch.accidental : null).toBe(1);
    expect(state.past.length).toBe(1);
    expect(() => validateProjectData(state.present)).not.toThrow();
  });

  it('clicking Db updates selected note distinctly', () => {
    const apply = useProjectStore.getState().applyKeyboardPitch;
    apply({ letter: 'C', accidental: 1, octave: 4 }, { activeVoice: 'soprano', selectedEventId: null });
    const insertedId = useProjectStore.getState().history.present.score.measures[0]?.events[0]?.id ?? null;

    render(<Edo31Keyboard onKeyPress={({ spelling }) => {
      if (spelling === 'Db') apply({ letter: 'D', accidental: -1, octave: 4 }, { activeVoice: 'soprano', selectedEventId: insertedId });
    }} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Step 3: Db' })[0]);

    const event = useProjectStore.getState().history.present.score.measures[0]?.events[0];
    expect(event && event.kind === 'note' ? `${event.pitch.letter}${event.pitch.accidental}` : null).toBe('D-1');
  });
});
