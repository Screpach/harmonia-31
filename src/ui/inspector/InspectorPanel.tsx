import type { Project } from '../../domain/score/Project';
import { selectInspectorSelectionSummary } from '../../state/selectors/inspectorSelectors';
import { useAppStore } from '../../state/useAppStore';

type InspectorPanelProps = { project: Project };

function InspectorPanel({ project }: InspectorPanelProps) {
  const activeVoice = useAppStore((state) => state.activeVoice);
  const selectedEventIds = useAppStore((state) => state.selectedEventIds);
  const summary = selectInspectorSelectionSummary(project, { activeVoice, selectedEventIds });

  return (
    <section aria-label="Inspector panel">
      <h3>Inspector</h3>
      <p>Active voice: {summary.activeVoice}</p>
      {summary.emptyState ? (
        <p>{summary.emptyState}</p>
      ) : (
        <ul>
          <li>Event: {summary.selectedEventId}</li>
          <li>Pitch: {summary.selectedPitch}</li>
          <li>31-EDO step: {summary.edoStep}</li>
          <li>Frequency (Hz): {summary.frequencyHz?.toFixed(3)}</li>
          <li>Duration: {summary.durationText}</li>
          <li>Diagnostics: {summary.diagnosticsCount}</li>
        </ul>
      )}
    </section>
  );
}

export default InspectorPanel;
