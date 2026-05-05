import type { Project } from '../../domain/score/Project';
import { formatPitch } from '../../domain/pitch/formatPitch';
import { absoluteStep31, frequencyOfPitch } from '../../domain/tuning/frequency';
import type { AppStore } from '../useAppStore';

export type InspectorSelectionSummary = {
  readonly activeVoice: AppStore['activeVoice'];
  readonly selectedEventId: string | null;
  readonly selectedPitch: string | null;
  readonly edoStep: number | null;
  readonly frequencyHz: number | null;
  readonly durationText: string | null;
  readonly diagnosticsCount: number;
  readonly emptyState: string | null;
};

export function selectInspectorSelectionSummary(project: Project, store: Pick<AppStore, 'activeVoice' | 'selectedEventIds'>): InspectorSelectionSummary {
  const selectedEventId = store.selectedEventIds[0] ?? null;
  if (!selectedEventId) {
    return {
      activeVoice: store.activeVoice,
      selectedEventId: null,
      selectedPitch: null,
      edoStep: null,
      frequencyHz: null,
      durationText: null,
      diagnosticsCount: 0,
      emptyState: 'Select a note to inspect pitch, 31-EDO step, frequency, and duration.',
    };
  }

  const event = project.score.measures.flatMap((measure) => measure.events).find((candidate) => candidate.id === selectedEventId);
  if (!event || event.kind !== 'note') {
    return {
      activeVoice: store.activeVoice,
      selectedEventId,
      selectedPitch: null,
      edoStep: null,
      frequencyHz: null,
      durationText: null,
      diagnosticsCount: 0,
      emptyState: 'Selected event is not a pitched note yet.',
    };
  }

  return {
    activeVoice: store.activeVoice,
    selectedEventId,
    selectedPitch: formatPitch(event.pitch, 'ascii'),
    edoStep: absoluteStep31(event.pitch),
    frequencyHz: frequencyOfPitch(event.pitch, project.tuning),
    durationText: `${event.duration.numerator}/${event.duration.denominator}`,
    diagnosticsCount: 0,
    emptyState: null,
  };
}
