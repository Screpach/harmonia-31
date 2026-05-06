import { useMemo } from 'react';
import { analyzeProject } from '../../engine/analysis/analyzeProject';
import { rangeRule } from '../../engine/rules/builtin/rangeRule';
import { createSpacingObservationRule } from '../../engine/rules/builtin/spacingObservationRule';
import { voiceOrderRule } from '../../engine/rules/builtin/voiceOrderRule';
import { simpleGridAdapter } from '../../render/adapters/simpleGridAdapter';
import { hitTest, type HitTestTarget } from '../../render/hitTesting/hitTest';
import { useProjectStore } from '../../state/projectStore';
import { selectSelectedEventIds, useAppStore } from '../../state/useAppStore';
import SelectionOverlay from './SelectionOverlay';
import './SatbGrid.css';

function SatbGrid() {
  const project = useProjectStore((state) => state.history.present);
  const view = simpleGridAdapter.render(project);
  const analysis = useMemo(() => analyzeProject(project, [rangeRule, voiceOrderRule, createSpacingObservationRule(10)]), [project]);
  const selectedEventIds = useAppStore(selectSelectedEventIds);
  const setSelectedEventIds = useAppStore((state) => state.setSelectedEventIds);
  const targets: HitTestTarget<string>[] = view.grid.rows.flatMap((row) => row.cells.filter((cell) => cell.eventIds.length > 0).map((cell) => ({ id: cell.eventIds[0], bounds: cell.bounds })));

  return (
    <section aria-label="SATB score grid" className="satb-grid">
      <h3>SATB Grid (placeholder renderer)</h3>
      <p className="satb-grid__help">Text-based pitch spellings are shown for accessibility and early integration.</p>
      <table>
        <caption>{view.grid.title}</caption>
        <thead><tr><th scope="col">Voice</th>{view.grid.measureHeaders.map((measure) => <th key={measure.id} scope="col">{measure.label}</th>)}</tr></thead>
        <tbody>{view.grid.rows.map((row) => <tr key={row.voiceId}><th scope="row">{row.voiceId}</th>{row.cells.map((cell) => { const selected = cell.eventIds.some((eventId) => selectedEventIds.includes(eventId)); const hasDiagnostic = analysis.diagnostics.some((d) => d.locations.some((l) => cell.eventIds.includes(l.eventId ?? ''))); return <td key={`${cell.voiceId}-${cell.measureId}`} onClick={() => { const hit = hitTest(targets, { x: cell.bounds.x + 0.5, y: cell.bounds.y + 0.5 }); if (!hit) return; setSelectedEventIds([hit.id]); }}><SelectionOverlay selected={selected}>{cell.text}</SelectionOverlay>{hasDiagnostic ? <span aria-label="diagnostic marker"> ⚠</span> : null}</td>; })}</tr>)}</tbody>
      </table>
    </section>
  );
}

export default SatbGrid;
