import { formatPitch } from '../../domain/pitch/formatPitch';
import type { Project } from '../../domain/score/Project';
import type { NotationAdapter, NotationAdapterRenderResult } from './NotationAdapter';

function voiceMeasureText(project: Project, voiceId: Project['score']['voices'][number], measureId: string): string {
  const measure = project.score.measures.find((candidate) => candidate.id === measureId);
  if (!measure) {
    return '—';
  }

  const events = measure.events.filter((event) => event.voiceId === voiceId);
  if (events.length === 0) {
    return 'rest';
  }

  return events.map((event) => (event.kind === 'note' ? formatPitch(event.pitch, 'ascii') : 'rest')).join(', ');
}

export const simpleGridAdapter: NotationAdapter = {
  render(project: Project): NotationAdapterRenderResult {
    return {
      kind: 'satb-grid',
      decisionTag: 'awaiting-private-rule-pack',
      grid: {
        title: project.title,
        measureHeaders: project.score.measures.map((measure) => ({ id: measure.id, label: `Measure ${measure.index + 1}` })),
        rows: project.score.voices.map((voiceId) => ({
          voiceId,
          cells: project.score.measures.map((measure) => ({
            voiceId,
            measureId: measure.id,
            text: voiceMeasureText(project, voiceId, measure.id),
          })),
        })),
      },
    };
  },
};
