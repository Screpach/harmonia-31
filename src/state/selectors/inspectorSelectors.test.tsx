import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../domain/duration/Rational';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import InspectorPanel from '../../ui/inspector/InspectorPanel';
import { useAppStore } from '../useAppStore';
import { selectInspectorSelectionSummary } from './inspectorSelectors';

function projectWithTwoNotes() {
  const base = createEmptyProject('inspector-01', 'Inspector Test');
  return {
    ...base,
    score: {
      ...base.score,
      measures: [{
        id: 'm1',
        index: 0,
        events: [
          { id: 'csharp', kind: 'note' as const, voiceId: 'soprano' as const, onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }) },
          { id: 'db', kind: 'note' as const, voiceId: 'alto' as const, onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }) },
        ],
      }],
    },
  };
}

describe('inspector selectors', () => {
  it('selected C# and Db produce different step/frequency summaries', () => {
    const project = projectWithTwoNotes();

    const csharp = selectInspectorSelectionSummary(project, { activeVoice: 'soprano', selectedEventIds: ['csharp'] });
    const db = selectInspectorSelectionSummary(project, { activeVoice: 'alto', selectedEventIds: ['db'] });

    expect(csharp.selectedPitch).toBe('C#4');
    expect(db.selectedPitch).toBe('Db4');
    expect(csharp.edoStep).not.toBe(db.edoStep);
    expect(csharp.frequencyHz).not.toBe(db.frequencyHz);
  });

  it('returns helpful empty state when nothing is selected', () => {
    const project = projectWithTwoNotes();
    const summary = selectInspectorSelectionSummary(project, { activeVoice: 'tenor', selectedEventIds: [] });

    expect(summary.emptyState).toContain('Select a note');
    expect(summary.selectedEventId).toBeNull();
  });

  it('InspectorPanel smoke test', () => {
    const project = projectWithTwoNotes();
    useAppStore.setState({ selectedEventIds: ['csharp'], activeVoice: 'soprano' });

    render(<InspectorPanel project={project} />);

    expect(screen.getByText('Inspector')).toBeTruthy();
    expect(screen.getByText(/Pitch: C#4/)).toBeTruthy();
  });
});
