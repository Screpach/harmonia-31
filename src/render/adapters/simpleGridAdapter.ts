import { formatPitch } from '../../domain/pitch/formatPitch';
import type { Project } from '../../domain/score/Project';
import type { ScoreEvent } from '../../domain/score/Event';
import type { NotationAdapter, NotationAdapterRenderResult } from './NotationAdapter';

function eventsForVoice(project: Project, voiceId: Project['score']['voices'][number], measureId: string): readonly ScoreEvent[] {
  const measure = project.score.measures.find((candidate) => candidate.id === measureId);
  if (!measure) {
    return [];
  }

  return measure.events.filter((event) => event.voiceId === voiceId);
}

function voiceMeasureText(events: readonly ScoreEvent[]): string {
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
        rows: project.score.voices.map((voiceId, rowIndex) => ({
          voiceId,
          cells: project.score.measures.map((measure, measureIndex) => {
            const events = eventsForVoice(project, voiceId, measure.id);

            return {
              voiceId,
              measureId: measure.id,
              text: voiceMeasureText(events),
              eventIds: events.map((event) => event.id),
              bounds: { x: measureIndex, y: rowIndex, width: 1, height: 1 },
            };
          }),
        })),
      },
    };
  },
};
