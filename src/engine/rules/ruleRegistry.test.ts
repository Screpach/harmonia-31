import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { createDiagnostic } from '../diagnostics/Diagnostic';
import { atMeasure } from '../diagnostics/locations';
import { createRuleContext } from './RuleContext';
import { createRuleRegistry } from './ruleRegistry';

describe('rule registry', () => {
  it('registers and runs a dummy mechanical rule', () => {
    const registry = createRuleRegistry();
    registry.register({
      id: 'mechanical-demo',
      version: '0.1.0',
      modes: ['mechanical'],
      requiredData: { kind: 'none' },
      analyze: () => ({
        status: 'ok',
        diagnostics: [
          createDiagnostic({
            severity: 'info',
            category: 'other',
            message: 'Mechanical pass',
            beginnerExplanation: 'Everything is currently fine in this synthetic check.',
            technicalExplanation: 'No violations emitted by mechanical demo rule.',
            locations: [atMeasure('m1')],
          }),
        ],
      }),
    });

    const context = createRuleContext(createEmptyProject('rule-test'));
    const results = registry.runAll(context);

    expect(results).toHaveLength(1);
    expect(results[0]?.result.status).toBe('ok');
    expect(results[0]?.result.diagnostics).toHaveLength(1);
  });

  it('returns unavailable status when external data is required but missing', () => {
    const registry = createRuleRegistry();
    registry.register({
      id: 'historical-pack-demo',
      version: '0.1.0',
      modes: ['historical'],
      requiredData: { kind: 'external', reason: 'awaiting-private-rule-pack', rulePackId: 'pack.alpha' },
      analyze: () => ({ status: 'ok', diagnostics: [] }),
    });

    const context = createRuleContext(createEmptyProject('rule-test-2'));
    const [result] = registry.runAll(context);

    expect(result?.result.status).toBe('unavailable');
    expect(result?.result.reason).toBe('awaiting-private-rule-pack');
  });
});
