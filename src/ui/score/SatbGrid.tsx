import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../domain/duration/Rational';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import type { Project } from '../../domain/score/Project';
import { simpleGridAdapter } from '../../render/adapters/simpleGridAdapter';
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
              id: 'e-s-csharp',
              kind: 'note',
              voiceId: 'soprano',
              onset: normalizeRational({ numerator: 0, denominator: 1 }),
              duration: normalizeRational({ numerator: 1, denominator: 4 }),
              pitch: makeSpelledPitch({ letter: 'C', accidental: 1, octave: 4 }),
            },
            {
              id: 'e-a-db',
              kind: 'note',
              voiceId: 'alto',
              onset: normalizeRational({ numerator: 0, denominator: 1 }),
              duration: normalizeRational({ numerator: 1, denominator: 4 }),
              pitch: makeSpelledPitch({ letter: 'D', accidental: -1, octave: 4 }),
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

  return (
    <section aria-label="SATB score grid" className="satb-grid">
      <h3>SATB Grid (placeholder renderer)</h3>
      <p className="satb-grid__help">Text-based pitch spellings are shown for accessibility and early integration.</p>
      <table>
        <caption>{view.grid.title}</caption>
        <thead>
          <tr>
            <th scope="col">Voice</th>
            {view.grid.measureHeaders.map((measure) => (
              <th key={measure.id} scope="col">{measure.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {view.grid.rows.map((row) => (
            <tr key={row.voiceId}>
              <th scope="row">{row.voiceId}</th>
              {row.cells.map((cell) => (
                <td key={`${cell.voiceId}-${cell.measureId}`}>{cell.text}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SatbGrid;
