import { useMemo } from 'react';
import type { Project } from '../../domain/score/Project';
import { analyzeProject } from '../../engine/analysis/analyzeProject';
import { rangeRule } from '../../engine/rules/builtin/rangeRule';
import { createSpacingObservationRule } from '../../engine/rules/builtin/spacingObservationRule';
import { voiceOrderRule } from '../../engine/rules/builtin/voiceOrderRule';
import { selectInspectorSelectionSummary } from '../../state/selectors/inspectorSelectors';
import { useAppStore } from '../../state/useAppStore';
import DiagnosticList from '../diagnostics/DiagnosticList';

type InspectorPanelProps = { project: Project };

function InspectorPanel({ project }: InspectorPanelProps) {
  const activeVoice = useAppStore((state) => state.activeVoice);
  const selectedEventIds = useAppStore((state) => state.selectedEventIds);
  const summary = selectInspectorSelectionSummary(project, { activeVoice, selectedEventIds });
  const analysis = useMemo(() => analyzeProject(project, [rangeRule, voiceOrderRule, createSpacingObservationRule(10)]), [project]);

  return (
    <section aria-label="Inspector panel">
      <h3>Inspector</h3>
      <p>Active voice: {summary.activeVoice}</p>
      {summary.emptyState ? <p>{summary.emptyState}</p> : (
        <ul>
          <li>Event: {summary.selectedEventId}</li>
          <li>Pitch: {summary.selectedPitch}</li>
          <li>31-EDO step: {summary.edoStep}</li>
          <li>Frequency (Hz): {summary.frequencyHz?.toFixed(3)}</li>
          <li>Duration: {summary.durationText}</li>
          <li>Diagnostics: {analysis.diagnostics.length}</li>
        </ul>
      )}
      <DiagnosticList diagnostics={analysis.diagnostics} />
    </section>
  );
}

export default InspectorPanel;
