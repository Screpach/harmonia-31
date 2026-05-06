import type { Diagnostic } from '../diagnostics/Diagnostic';
import type { RuleContext } from './RuleContext';

export type RulePluginMode = 'mechanical' | 'historical' | 'hybrid';

export type RuleRequiredData =
  | { readonly kind: 'none' }
  | { readonly kind: 'external'; readonly reason: 'awaiting-private-rule-pack'; readonly rulePackId?: string };

export type RulePluginResult = {
  readonly status: 'ok' | 'unavailable';
  readonly diagnostics: readonly Diagnostic[];
  readonly reason?: string;
};

export type RulePlugin = {
  readonly id: string;
  readonly version: string;
  readonly modes: readonly RulePluginMode[];
  readonly requiredData: RuleRequiredData;
  analyze: (context: RuleContext) => RulePluginResult;
};
