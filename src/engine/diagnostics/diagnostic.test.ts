import { describe, expect, it } from 'vitest';
import { createDiagnostic } from './Diagnostic';
import { atEvent, atMeasure } from './locations';

describe('diagnostic model', () => {
  it('constructor requires severity and location by type and runtime location guard', () => {
    expect(() =>
      createDiagnostic({
        severity: 'warning',
        category: 'spelling',
        message: 'Enharmonic spelling mismatch',
        beginnerExplanation: 'Try the expected spelling for this context.',
        technicalExplanation: 'Spelling does not match the requested pitch identity.',
        locations: [],
      }),
    ).toThrow(/requires at least one location/);
  });

  it('provenance may be omitted or marked synthetic/awaiting-private-rule-pack', () => {
    const synthetic = createDiagnostic({
      severity: 'info',
      category: 'adapter',
      message: 'Synthetic diagnostic',
      beginnerExplanation: 'Placeholder for upcoming analyzer integration.',
      technicalExplanation: 'No private rule corpus has been loaded.',
      locations: [atMeasure('m1')],
    });

    const awaiting = createDiagnostic({
      severity: 'warning',
      category: 'voice-leading',
      message: 'Rule data unavailable',
      beginnerExplanation: 'Historical checks are not active yet.',
      technicalExplanation: 'Analyzer deferred pending awaiting-private-rule-pack.',
      locations: [atEvent('m1', 'e1', 'soprano')],
      provenance: { source: 'awaiting-private-rule-pack' },
    });

    expect(synthetic.provenance.source).toBe('synthetic');
    expect(awaiting.provenance.source).toBe('awaiting-private-rule-pack');
  });

  it('diagnostics are JSON-serializable', () => {
    const diagnostic = createDiagnostic({
      severity: 'error',
      category: 'schema',
      message: 'Event ID missing',
      beginnerExplanation: 'A note is missing required ID data.',
      technicalExplanation: 'Validation failed for score event id min length.',
      locations: [atEvent('m2', 'e-missing')],
      suggestedFixes: [{ summary: 'Regenerate event IDs from migration helper.' }],
      provenance: { source: 'analyzer', analyzerId: 'schema-check-v1' },
    });

    const json = JSON.stringify(diagnostic);
    expect(typeof json).toBe('string');
    expect(JSON.parse(json).id).toBe(diagnostic.id);
  });
});
