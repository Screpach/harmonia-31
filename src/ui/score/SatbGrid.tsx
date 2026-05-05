import { formatPitch } from '../../domain/pitch/formatPitch';
import { makeSpelledPitch } from '../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../domain/duration/Rational';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import type { Project } from '../../domain/score/Project';
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

function voiceMeasureText(project: Project, voiceId: (typeof project.score.voices)[number], measureId: string): string {
  const measure = project.score.measures.find((candidate) => candidate.id === measureId);
  if (!measure) {
    return '—';
  }

  const events = measure.events.filter((event) => event.voiceId === voiceId);
  if (events.length === 0) {
    return 'rest';
  }

  return events
    .map((event) => (event.kind === 'note' ? formatPitch(event.pitch, 'ascii') : 'rest'))
    .join(', ');
}

function SatbGrid() {
  const project = createDemoProject();

  return (
    <section aria-label="SATB score grid" className="satb-grid">
      <h3>SATB Grid (placeholder renderer)</h3>
      <p className="satb-grid__help">Text-based pitch spellings are shown for accessibility and early integration.</p>
      <table>
        <caption>{project.title}</caption>
        <thead>
          <tr>
            <th scope="col">Voice</th>
            {project.score.measures.map((measure) => (
              <th key={measure.id} scope="col">Measure {measure.index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {project.score.voices.map((voiceId) => (
            <tr key={voiceId}>
              <th scope="row">{voiceId}</th>
              {project.score.measures.map((measure) => (
                <td key={`${voiceId}-${measure.id}`}>{voiceMeasureText(project, voiceId, measure.id)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SatbGrid;
