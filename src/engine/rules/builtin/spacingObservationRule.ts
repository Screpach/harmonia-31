import { absoluteStep31 } from '../../../domain/tuning/frequency';
import { createDiagnostic } from '../../diagnostics/Diagnostic';
import { atEvent } from '../../diagnostics/locations';
import type { RulePlugin } from '../RulePlugin';

export function createSpacingObservationRule(maxUpperNeighborSteps: number): RulePlugin {
  return {
    id: 'builtin.spacing-observation',
    version: '0.1.0',
    modes: ['mechanical'],
    requiredData: { kind: 'none' },
    analyze(context) {
      if (maxUpperNeighborSteps <= 0) {
        return { status: 'ok', diagnostics: [] };
      }
      const diagnostics = context.project.score.measures.flatMap((measure) => {
        const notes = measure.events.filter((event): event is Extract<typeof event, { kind: 'note' }> => event.kind === 'note');
        const soprano = notes.find((n) => n.voiceId === 'soprano');
        const alto = notes.find((n) => n.voiceId === 'alto');
        if (!soprano || !alto) return [];
        const distance = Math.abs(absoluteStep31(soprano.pitch) - absoluteStep31(alto.pitch));
        if (distance <= maxUpperNeighborSteps) return [];
        return [createDiagnostic({
          severity: 'info',
          category: 'spacing',
          message: 'Upper-voice spacing observation exceeded project heuristic.',
          beginnerExplanation: 'This spacing is wider than the configured project heuristic.',
          technicalExplanation: `Observed soprano/alto distance ${distance} > configured ${maxUpperNeighborSteps} steps.`,
          locations: [atEvent(measure.id, soprano.id, 'soprano'), atEvent(measure.id, alto.id, 'alto')],
          provenance: { source: 'analyzer', analyzerId: 'builtin.spacing-observation' },
        })];
      });
      return { status: 'ok', diagnostics };
    },
  };
}
