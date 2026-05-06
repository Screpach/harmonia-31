import type { Diagnostic } from '../diagnostics/Diagnostic';

export type PluginRunStatus = 'ok' | 'unavailable' | 'error' | 'disabled';

export type PluginRunResult = {
  readonly pluginId: string;
  readonly status: PluginRunStatus;
  readonly reason?: string;
  readonly diagnosticCount: number;
};

export type AnalysisResult = {
  readonly diagnostics: readonly Diagnostic[];
  readonly pluginResults: readonly PluginRunResult[];
};
