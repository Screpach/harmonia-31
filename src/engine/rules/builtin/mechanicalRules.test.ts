import { describe, expect, it } from 'vitest';
import { createEmptyProject } from '../../../domain/score/createEmptyProject';
import { makeSpelledPitch } from '../../../domain/pitch/SpelledPitch';
import { normalizeRational } from '../../../domain/duration/Rational';
import { createRuleContext } from '../RuleContext';
import { createRuleRegistry } from '../ruleRegistry';
import { rangeRule } from './rangeRule';
import { voiceOrderRule } from './voiceOrderRule';
import { createSpacingObservationRule } from './spacingObservationRule';

function projectWithEvents(events: Array<{ id: string; voiceId: 'soprano'|'alto'|'tenor'|'bass'; pitch: ReturnType<typeof makeSpelledPitch> }>) {
  const base = createEmptyProject('mech-1');
  return {
    ...base,
    score: {
      ...base.score,
      measures: [{ id: 'm1', index: 0, events: events.map((e) => ({ id: e.id, kind: 'note' as const, voiceId: e.voiceId, onset: normalizeRational({ numerator: 0, denominator: 1 }), duration: normalizeRational({ numerator: 1, denominator: 4 }), pitch: e.pitch })) }],
    },
  };
}

describe('mechanical builtin rules', () => {
  it('out-of-range note produces diagnostic', () => {
    const project = projectWithEvents([{ id: 's1', voiceId: 'soprano', pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 6 }) }]);
    const result = rangeRule.analyze(createRuleContext(project));
    expect(result.diagnostics.length).toBeGreaterThan(0);
  });

  it('voice crossing produces diagnostic', () => {
    const project = projectWithEvents([
      { id: 's1', voiceId: 'soprano', pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }) },
      { id: 'a1', voiceId: 'alto', pitch: makeSpelledPitch({ letter: 'E', accidental: 0, octave: 4 }) },
    ]);
    const result = voiceOrderRule.analyze(createRuleContext(project));
    expect(result.diagnostics.length).toBeGreaterThan(0);
  });

  it('spacing observation can be disabled/configured', () => {
    const project = projectWithEvents([
      { id: 's1', voiceId: 'soprano', pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 5 }) },
      { id: 'a1', voiceId: 'alto', pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }) },
    ]);
    const disabled = createSpacingObservationRule(0).analyze(createRuleContext(project));
    const enabled = createSpacingObservationRule(10).analyze(createRuleContext(project));
    expect(disabled.diagnostics).toHaveLength(0);
    expect(enabled.diagnostics.length).toBeGreaterThan(0);
  });

  it('clean fixture has no mechanical diagnostics when registered as plugins', () => {
    const project = projectWithEvents([
      { id: 's1', voiceId: 'soprano', pitch: makeSpelledPitch({ letter: 'G', accidental: 0, octave: 4 }) },
      { id: 'a1', voiceId: 'alto', pitch: makeSpelledPitch({ letter: 'E', accidental: 0, octave: 4 }) },
      { id: 't1', voiceId: 'tenor', pitch: makeSpelledPitch({ letter: 'C', accidental: 0, octave: 4 }) },
      { id: 'b1', voiceId: 'bass', pitch: makeSpelledPitch({ letter: 'G', accidental: 0, octave: 3 }) },
    ]);
    const registry = createRuleRegistry();
    registry.register(rangeRule);
    registry.register(voiceOrderRule);
    registry.register(createSpacingObservationRule(10));
    const totalDiagnostics = registry.runAll(createRuleContext(project)).flatMap((entry) => entry.result.diagnostics);
    expect(totalDiagnostics).toHaveLength(0);
  });
});
