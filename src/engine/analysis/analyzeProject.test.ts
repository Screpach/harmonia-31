import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../../domain/score/createEmptyProject';
import { createDiagnostic } from '../diagnostics/Diagnostic';
import { atEvent, atMeasure } from '../diagnostics/locations';
import type { RulePlugin } from '../rules/RulePlugin';
import { analyzeProject } from './analyzeProject';

const stablePlugin: RulePlugin = {
  id: 'stable.plugin',
  version: '0.1.0',
  modes: ['mechanical'],
  requiredData: { kind: 'none' },
  analyze: () => ({
    status: 'ok',
    diagnostics: [
      createDiagnostic({ severity: 'warning', category: 'other', message: 'B', beginnerExplanation: 'B', technicalExplanation: 'B', locations: [atEvent('m2', 'e2', 'alto')] }),
      createDiagnostic({ severity: 'error', category: 'other', message: 'A', beginnerExplanation: 'A', technicalExplanation: 'A', locations: [atEvent('m1', 'e1', 'soprano')] }),
    ],
  }),
};

describe('analyzeProject', () => {
  it('returns stable diagnostic ids/order across runs', () => {
    const project = createEmptyProject('a1');
    const first = analyzeProject(project, [stablePlugin]);
    const second = analyzeProject(project, [stablePlugin]);

    expect(first.diagnostics.map((d) => d.id)).toEqual(second.diagnostics.map((d) => d.id));
    expect(first.diagnostics.map((d) => d.message)).toEqual(['A', 'B']);
  });

  it('does not run disabled plugin', () => {
    const project = createEmptyProject('a2');
    const result = analyzeProject(project, [stablePlugin], { disabledPluginIds: ['stable.plugin'] });

    expect(result.diagnostics).toHaveLength(0);
    expect(result.pluginResults[0]?.status).toBe('disabled');
  });

  it('captures thrown plugin error as controlled engine diagnostic', () => {
    const project = createEmptyProject('a3');
    const thrower: RulePlugin = {
      id: 'thrower', version: '0.1.0', modes: ['mechanical'], requiredData: { kind: 'none' },
      analyze: () => { throw new Error('boom'); },
    };
    const result = analyzeProject(project, [thrower]);

    expect(result.pluginResults[0]?.status).toBe('error');
    expect(result.diagnostics[0]?.locations[0]).toEqual(atMeasure('analysis-runner'));
  });
});
