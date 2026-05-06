import type { DiagnosticLocation } from './locations';

export type DiagnosticSeverity = 'info' | 'warning' | 'error';
export type DiagnosticCategory = 'voice-leading' | 'spacing' | 'spelling' | 'rhythm' | 'adapter' | 'schema' | 'other';

export type DiagnosticProvenance = {
  readonly source: 'synthetic' | 'analyzer' | 'awaiting-private-rule-pack';
  readonly analyzerId?: string;
  readonly rulePackId?: string;
  readonly ruleId?: string;
};

export type SuggestedFix = {
  readonly summary: string;
  readonly actionId?: string;
};

export type Diagnostic = {
  readonly id: string;
  readonly severity: DiagnosticSeverity;
  readonly category: DiagnosticCategory;
  readonly message: string;
  readonly beginnerExplanation: string;
  readonly technicalExplanation: string;
  readonly locations: readonly DiagnosticLocation[];
  readonly suggestedFixes: readonly SuggestedFix[];
  readonly provenance: DiagnosticProvenance;
};

export type CreateDiagnosticInput = Omit<Diagnostic, 'id' | 'suggestedFixes' | 'provenance'> & {
  readonly suggestedFixes?: readonly SuggestedFix[];
  readonly provenance?: DiagnosticProvenance;
  readonly idSeed?: string;
};

function stableHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash.toString(16).padStart(8, '0');
}

export function createDiagnostic(input: CreateDiagnosticInput): Diagnostic {
  if (input.locations.length === 0) {
    throw new Error('Diagnostic requires at least one location.');
  }

  const idSeed = input.idSeed ?? `${input.category}|${input.severity}|${input.message}|${JSON.stringify(input.locations)}`;

  return {
    id: `diag-${stableHash(idSeed)}`,
    severity: input.severity,
    category: input.category,
    message: input.message,
    beginnerExplanation: input.beginnerExplanation,
    technicalExplanation: input.technicalExplanation,
    locations: input.locations,
    suggestedFixes: input.suggestedFixes ?? [],
    provenance: input.provenance ?? { source: 'synthetic' },
  };
}
