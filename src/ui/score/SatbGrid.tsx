import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../domain/duration/Rational';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import type { Project } from '../../domain/score/Project';
import { simpleGridAdapter } from '../../render/adapters/simpleGridAdapter';
import { hitTest, type HitTestTarget } from '../../render/hitTesting/hitTest';
import { selectSelectedEventIds, useAppStore } from '../../state/useAppStore';
import SelectionOverlay from './SelectionOverlay';
import './SatbGrid.css';

function createDemoProject(): Project {
  const base = createEmptyProject('demo-project', 'SATB Grid Demo');

  return {
    ...base,
    score: {
      ...base.score,
      measures: [
        {
          id: 'm1',
          index: 0,
          events: [
            {
              id: 'e-s-csharp', kind: 'note', voiceId: 'soprano', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
            },
            {
              id: 'e-a-db', kind: 'note', voiceId: 'alto', onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }),
            },
          ],
        },
      ],
    },
  };
}

function SatbGrid() {
  const project = createDemoProject();
  const view = simpleGridAdapter.render(project);
  const selectedEventIds = useAppStore(selectSelectedEventIds);
  const setSelectedEventIds = useAppStore((state) => state.setSelectedEventIds);

  const targets: HitTestTarget<string>[] = view.grid.rows.flatMap((row) =>
    row.cells
      .filter((cell) => cell.eventIds.length > 0)
      .map((cell) => ({ id: cell.eventIds[0], bounds: cell.bounds })),
  );

  return (
    <section aria-label="SATB score grid" className="satb-grid">
      <h3>SATB Grid (placeholder renderer)</h3>
      <p className="satb-grid__help">Text-based pitch spellings are shown for accessibility and early integration.</p>
      <table>
        <caption>{view.grid.title}</caption>
        <thead><tr><th scope="col">Voice</th>{view.grid.measureHeaders.map((measure) => <th key={measure.id} scope="col">{measure.label}</th>)}</tr></thead>
        <tbody>
          {view.grid.rows.map((row) => (
            <tr key={row.voiceId}>
              <th scope="row">{row.voiceId}</th>
              {row.cells.map((cell) => {
                const selected = cell.eventIds.some((eventId) => selectedEventIds.includes(eventId));
                return (
                  <td
                    key={`${cell.voiceId}-${cell.measureId}`}
                    onClick={() => {
                      const hit = hitTest(targets, { x: cell.bounds.x + 0.5, y: cell.bounds.y + 0.5 });
                      if (!hit) return;
                      setSelectedEventIds([hit.id]);
                    }}
                  >
                    <SelectionOverlay selected={selected}>{cell.text}</SelectionOverlay>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SatbGrid;
