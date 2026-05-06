import type { Project } from '../../domain/score/Project';
import { createDiagnostic, type Diagnostic } from '../diagnostics/Diagnostic';
import { atMeasure } from '../diagnostics/locations';
import type { RuleExternalData } from '../rules/RuleContext';
import { createRuleContext } from '../rules/RuleContext';
import type { RulePlugin } from '../rules/RulePlugin';
import type { AnalysisResult, PluginRunResult } from './AnalysisResult';

type AnalyzeOptions = {
  disabledPluginIds?: readonly string[];
  externalData?: RuleExternalData;
};

const SEVERITY_ORDER = { error: 0, warning: 1, info: 2 } as const;

function sortDiagnostics(diagnostics: readonly Diagnostic[]): Diagnostic[] {
  return [...diagnostics].sort((a, b) => {
    const al = a.locations[0];
    const bl = b.locations[0];
    const locationCmp = `${al?.measureId ?? ''}|${al?.eventId ?? ''}|${al?.voiceId ?? ''}`.localeCompare(`${bl?.measureId ?? ''}|${bl?.eventId ?? ''}|${bl?.voiceId ?? ''}`);
    if (locationCmp !== 0) return locationCmp;
    const severityCmp = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    if (severityCmp !== 0) return severityCmp;
    return a.id.localeCompare(b.id);
  });
}

export function analyzeProject(project: Project, plugins: readonly RulePlugin[], options: AnalyzeOptions = {}): AnalysisResult {
  const context = createRuleContext(project, options.externalData);
  const disabled = new Set(options.disabledPluginIds ?? []);
  const diagnostics: Diagnostic[] = [];
  const pluginResults: PluginRunResult[] = [];

  for (const plugin of plugins) {
    if (disabled.has(plugin.id)) {
      pluginResults.push({ pluginId: plugin.id, status: 'disabled', diagnosticCount: 0, reason: 'disabled-by-options' });
      continue;
    }

    if (plugin.requiredData.kind === 'external' && !context.externalData) {
      pluginResults.push({ pluginId: plugin.id, status: 'unavailable', diagnosticCount: 0, reason: plugin.requiredData.reason });
      continue;
    }

    try {
      const result = plugin.analyze(context);
      diagnostics.push(...result.diagnostics);
      pluginResults.push({ pluginId: plugin.id, status: result.status, diagnosticCount: result.diagnostics.length, reason: result.reason });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown plugin error';
      diagnostics.push(createDiagnostic({
        severity: 'error',
        category: 'adapter',
        message: `Plugin ${plugin.id} threw during analysis.`,
        beginnerExplanation: 'A validator plugin crashed while analyzing this project.',
        technicalExplanation: message,
        locations: [atMeasure('analysis-runner')],
        provenance: { source: 'analyzer', analyzerId: 'engine.analyzeProject' },
      }));
      pluginResults.push({ pluginId: plugin.id, status: 'error', diagnosticCount: 1, reason: message });
    }
  }

  return {
    diagnostics: sortDiagnostics(diagnostics),
    pluginResults,
  };
}
