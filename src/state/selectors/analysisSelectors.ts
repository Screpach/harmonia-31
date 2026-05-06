import type { AnalysisResult } from '../../engine/analysis/AnalysisResult';

export function selectDiagnosticCountsBySeverity(result: AnalysisResult): Record<'error' | 'warning' | 'info', number> {
  return result.diagnostics.reduce(
    (acc, diagnostic) => ({ ...acc, [diagnostic.severity]: acc[diagnostic.severity] + 1 }),
    { error: 0, warning: 0, info: 0 },
  );
}

export function selectDiagnosticsForEvent(result: AnalysisResult, eventId: string | null): readonly AnalysisResult['diagnostics'][number][] {
  if (!eventId) return [];
  return result.diagnostics.filter((diagnostic) => diagnostic.locations.some((location) => location.eventId === eventId));
}
